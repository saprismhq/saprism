import { Request, Response } from "express";
import { IUserService } from "../core/UserService";
import { getLogger } from "../utils/LoggerFactory";
import winston from "winston";

export class UserController {
  private logger: winston.Logger;
  
  constructor(private userService: IUserService) {
    this.logger = getLogger('UserController');
  }

  async getCurrentUser(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user.claims.sub;
      const user = await this.userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      this.logger.error('Error fetching user', { 
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }
}