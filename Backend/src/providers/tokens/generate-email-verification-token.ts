import { AppError, Report, StatusCode } from "@expressots/core";
import { sign } from "jsonwebtoken";
import { Users } from "../../entities/user";

class GenerateEmailVerificationToken {
  async execute(user: Users) {
    if (!process.env.JWT_SECRET) {
      Report.Error(
        new AppError(
          StatusCode.InternalServerError,
          "JWT secret not found",
          "email-verification-user-usecase",
        ),
      );
    } else {
      const token = sign(
        {
          user_id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: "1h",
        },
      );

      return token;
    }
    return null;
  }
}

export { GenerateEmailVerificationToken };
