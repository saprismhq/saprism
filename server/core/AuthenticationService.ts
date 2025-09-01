import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { IUserService } from "./UserService";

export interface IAuthenticationService {
  setupAuth(app: Express): Promise<void>;
  getAuthenticatedMiddleware(): RequestHandler;
  getSessionMiddleware(): RequestHandler;
}

export class AuthenticationService implements IAuthenticationService {
  private oidcConfig: any;

  constructor(private userService: IUserService) {
    this.oidcConfig = memoize(
      async () => {
        return await client.discovery(
          new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
          process.env.REPL_ID!
        );
      },
      { maxAge: 3600 * 1000 }
    );
  }

  getSessionMiddleware(): RequestHandler {
    const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
    const pgStore = connectPg(session);
    const sessionStore = new pgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: false,
      ttl: sessionTtl,
      tableName: "sessions",
    });
    
    return session({
      secret: process.env.SESSION_SECRET!,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: sessionTtl,
      },
    });
  }

  private updateUserSession(
    user: any,
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
  ): void {
    user.claims = tokens.claims();
    user.access_token = tokens.access_token;
    user.refresh_token = tokens.refresh_token;
    user.expires_at = user.claims?.exp;
  }

  private async upsertUser(claims: any): Promise<void> {
    await this.userService.upsertUser({
      id: claims["sub"],
      email: claims["email"],
      firstName: claims["first_name"],
      lastName: claims["last_name"],
      profileImageUrl: claims["profile_image_url"],
    });
  }

  async setupAuth(app: Express): Promise<void> {
    if (!process.env.REPLIT_DOMAINS) {
      throw new Error("Environment variable REPLIT_DOMAINS not provided");
    }

    app.set("trust proxy", 1);
    app.use(this.getSessionMiddleware());
    app.use(passport.initialize());
    app.use(passport.session());

    const config = await this.oidcConfig();

    const verify: VerifyFunction = async (
      tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
      verified: passport.AuthenticateCallback
    ) => {
      const user = {};
      this.updateUserSession(user, tokens);
      await this.upsertUser(tokens.claims());
      verified(null, user);
    };

    for (const domain of process.env.REPLIT_DOMAINS!.split(",")) {
      const strategy = new Strategy(
        {
          name: `replitauth:${domain}`,
          config,
          scope: "openid email profile offline_access",
          callbackURL: `https://${domain}/api/callback`,
        },
        verify,
      );
      passport.use(strategy);
    }

    passport.serializeUser((user: Express.User, cb) => cb(null, user));
    passport.deserializeUser((user: Express.User, cb) => cb(null, user));

    this.setupAuthRoutes(app, config);
  }

  private setupAuthRoutes(app: Express, config: any): void {
    app.get("/api/login", (req, res, next) => {
      // For local development, use the first registered domain
      const domain = req.hostname === 'localhost' 
        ? process.env.REPLIT_DOMAINS!.split(',')[0] 
        : req.hostname;
      passport.authenticate(`replitauth:${domain}`, {
        prompt: "login consent",
        scope: ["openid", "email", "profile", "offline_access"],
      })(req, res, next);
    });

    app.get("/api/callback", (req, res, next) => {
      // For local development, use the first registered domain
      const domain = req.hostname === 'localhost' 
        ? process.env.REPLIT_DOMAINS!.split(',')[0] 
        : req.hostname;
      passport.authenticate(`replitauth:${domain}`, {
        successReturnToOrRedirect: "/",
        failureRedirect: "/api/login",
      })(req, res, next);
    });

    app.get("/api/logout", (req, res) => {
      req.logout(() => {
        res.redirect(
          client.buildEndSessionUrl(config, {
            client_id: process.env.REPL_ID!,
            post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
          }).href
        );
      });
    });
  }

  getAuthenticatedMiddleware(): RequestHandler {
    return async (req, res, next) => {
      const user = req.user as any;

      if (!req.isAuthenticated() || !user.expires_at) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const now = Math.floor(Date.now() / 1000);
      if (now <= user.expires_at) {
        return next();
      }

      const refreshToken = user.refresh_token;
      if (!refreshToken) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      try {
        const config = await this.oidcConfig();
        const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
        this.updateUserSession(user, tokenResponse);
        return next();
      } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
    };
  }
}