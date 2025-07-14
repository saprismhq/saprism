import { Request, Response } from "express";
import { IUserService } from "../core/UserService";

export class UserController {
  constructor(private userService: IUserService) {}

  async getCurrentUser(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user.claims.sub;
      const user = await this.userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }
}