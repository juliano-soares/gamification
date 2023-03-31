import { AppError, Report, StatusCode } from "@expressots/core";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

@injectable()
export class EnsureAuthenticate extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = req.headers.authorization;

      if (!authToken) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "Token is required",
            "ensure-authenticate",
          ),
        );
      } else {
        const [, token] = authToken.split(" ");
        if (process.env.JWT_SECRET !== undefined) {
          const authenticate = verify(token, process.env.JWT_SECRET);

          if (!authenticate) {
            Report.Error(
              new AppError(
                StatusCode.Unauthorized,
                "Token invalid",
                "ensure-authenticate",
              ),
            );
          }

          return next();
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
