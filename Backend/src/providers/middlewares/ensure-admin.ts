import { AppError, Report, StatusCode } from "@expressots/core";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { decode } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Users } from "../../entities/user";
import { UserRepository } from "../../repositories/user.repository";

@injectable()
export class EnsureAdmin extends BaseMiddleware {
  public async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = req.headers.authorization;

      if (!authToken) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "Token is required",
            "ensure-admin",
          ),
        );
      } else {
        const [, token] = authToken.split(" ");

        const decoded = decode(token);

        if (decoded && decoded.sub) {
          const userRepository = new UserRepository();
          const user: Users | null = await userRepository.findById(
            decoded.sub.toString(),
          );

          if (user && user.role === "admin") {
            return next();
          }
        }
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "Token is required",
            "ensure-admin",
          ),
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
