import { AppError, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import { decode, verify } from "jsonwebtoken";
import path from "path";
import { readFileSync } from "fs";
import { UserRepository } from "../../../repositories/user.repository";
import { IEmailVerificationUserResquestDTO } from "./emailverification-user.dto";

@provide(EmailVerificationUserUseCase)
class EmailVerificationUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: IEmailVerificationUserResquestDTO): Promise<any | null> {
    try {
      // Recieve data from controller with email and code
      const { token } = data;

      if (process.env.JWT_SECRET !== undefined) {
        const authenticate = verify(token, process.env.JWT_SECRET);

        if (!authenticate) {
          Report.Error(
            new AppError(
              StatusCode.Unauthorized,
              "Token invalid",
              "email-verification-user-usecase",
            ),
          );
        }
      }
      // decrypt token
      const decodedToken = decode(token);

      if (
        decodedToken &&
        typeof decodedToken === "object" &&
        "user_id" in decodedToken
      ) {
        const user_id = decodedToken.user_id;
        const user = await this.userRepository.findById(user_id);
        // // Check if user exists
        if (!user) {
          Report.Error(
            new AppError(
              StatusCode.BadRequest,
              "User not found",
              "email-verification-user-usecase",
            ),
          );
        } else {
          // update user email_verified to true
          const updatedUser =
            await this.userRepository.updateEmailVerificationToken(user_id);
          if (updatedUser) {
            // return view with success message
            const html = readFileSync(
              path.join(
                __dirname,
                "..",
                "..",
                "..",
                "providers",
                "email",
                "templates",
                "verified_email.html",
              ),
              "utf8",
            );
            return html;
          } else {
            Report.Error(
              new AppError(
                StatusCode.BadRequest,
                "Error updating user",
                "email-verification-user-usecase",
              ),
            );
          }
        }
      } else {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "Invalid token",
            "email-verification-user-usecase",
          ),
        );
      }
      return null;
    } catch (error: any) {
      throw error;
    }
  }
}

export { EmailVerificationUserUseCase };
