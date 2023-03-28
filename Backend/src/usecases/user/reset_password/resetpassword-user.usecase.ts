import { AppError, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import bcrypt from "bcrypt";
import { UserRepository } from "../../../repositories/user.repository";
import { Users } from "../../../entities/user";
import {
  IResetPasswordUserRequestDTO,
  IResetPasswordUserResponseDTO,
} from "./resetpassword-user.dto";

@provide(ResetPasswordUserUseCase)
class ResetPasswordUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: IResetPasswordUserRequestDTO) {
    try {
      if (data.password !== data.confirm_password) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "Passwords do not match",
            "reset-password-usecase",
          ),
        );
      }

      const user: Users[] | null = await this.userRepository.findByEmail(
        data.email,
      );

      if (!user || user.length === 0) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "User does not exists",
            "reset-password-usecase",
          ),
        );
      } else {
        if (user[0].password_reset_token !== data.token) {
          Report.Error(
            new AppError(
              StatusCode.BadRequest,
              "Invalid token",
              "reset-password-usecase",
            ),
          );
        } else {
          const now = new Date();
          if (
            user[0].password_reset_expires_in &&
            now > user[0].password_reset_expires_in
          ) {
            Report.Error(
              new AppError(
                StatusCode.BadRequest,
                "Token expired, generate a new one",
                "reset-password-usecase",
              ),
            );
          } else {
            // Crypt password
            const saltRounds = 10;
            const salt: string = bcrypt.genSaltSync(saltRounds);
            data.password = bcrypt.hashSync(data.password, salt);

            await this.userRepository.updatePassword(user[0].id, data.password);
            const response: IResetPasswordUserResponseDTO = {
              status: "success",
            };
            return response;
          }
        }
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export { ResetPasswordUserUseCase };
