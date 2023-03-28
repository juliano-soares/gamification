import { AppError, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import { UserRepository } from "../../../repositories/user.repository";
import { Users } from "../../../entities/user";
import { Nodemailer } from "../../../providers/email/nodemailer-config";
import crypto from "crypto";
import {
  IForgotPasswordUserRequestDTO,
  IForgotPasswordUserResponseDTO,
} from "./forgotpassword-user.dto";

@provide(ForgotPasswordUserUseCase)
class ForgotPasswordUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: IForgotPasswordUserRequestDTO) {
    try {
      const user: Users[] | null = await this.userRepository.findByEmail(
        data.email,
      );

      if (!user || user.length === 0) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "User does not exists",
            "forgot-password-usecase",
          ),
        );
      } else {
        const token = crypto.randomInt(1000, 9999).toString();
        // TODO: Set local time to UTC
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await this.userRepository.updatePasswordTokens(user[0].id, token, now);

        const options = {
          from: "gamification@gm.com",
          to: user[0].email,
          subject: "Reset your password",
          template: "forgot_password",
          context: {
            token,
          },
        };

        Nodemailer.sendMail(options, (err) => {
          if (err) {
            console.log(err);
            Report.Error(
              new AppError(
                StatusCode.BadRequest,
                "Error sending email",
                "forgot-password-usecase",
              ),
            );
          }

          const response: IForgotPasswordUserResponseDTO = {
            status: "success",
          };
          return response;
        });
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export { ForgotPasswordUserUseCase };
