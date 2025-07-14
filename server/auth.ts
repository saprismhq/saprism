// Legacy auth module - now replaced by AuthenticationService
// This file is kept for backward compatibility

import { Container } from "./container/Container";
import { IAuthenticationService } from "./core/AuthenticationService";
import type { Express, RequestHandler } from "express";

const container = Container.getInstance();
const authService = container.get<IAuthenticationService>('AuthenticationService');

export async function setupAuth(app: Express): Promise<void> {
  return await authService.setupAuth(app);
}

export const isAuthenticated: RequestHandler = authService.getAuthenticatedMiddleware();