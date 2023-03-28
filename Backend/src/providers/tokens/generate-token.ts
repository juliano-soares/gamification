import { AppError, Report, StatusCode } from "@expressots/core";
import { sign } from "jsonwebtoken";

class GenerateTokenUser {
  async execute(user_id: string) {
    if (!process.env.JWT_SECRET) {
      Report.Error(
        new AppError(
          StatusCode.InternalServerError,
          "JWT secret not found",
          "authenticate-user-usecase",
        ),
      );
    } else {
      const token = sign({}, process.env.JWT_SECRET, {
        subject: user_id,
        expiresIn: "1h",
      });

      return token;
    }
    return null;
  }
}

export { GenerateTokenUser };
