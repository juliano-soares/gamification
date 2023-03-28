import { AppError, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import bcrypt from "bcrypt";
import {
  IAuthenticateUserRequestDTO,
  IAuthenticateUserResponseDTO,
} from "./authenticate-user.dto";
import { UserRepository } from "../../../repositories/user.repository";
import { Users } from "../../../entities/user";
import { GenerateTokenUser } from "../../../providers/tokens/generate-token";
import { GenerateRefreshToken } from "../../../providers/tokens/generate-refresh-token";

@provide(AuthenticateUserUseCase)
class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: IAuthenticateUserRequestDTO) {
    try {
      if (!data.email && !data.username) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "Email or username is required",
            "authenticate-user-usecase",
          ),
        );
      }

      let user: Users[] | null = null;
      if (data.email) {
        user = await this.userRepository.findByEmail(data.email);
      } else if (data.username) {
        user = await this.userRepository.findByUsername(data.username);
      }

      if (!user || user.length === 0) {
        Report.Error(
          new AppError(
            StatusCode.Unauthorized,
            "Credentials incorrect",
            "authenticate-user-usecase",
          ),
        );
      }

      if (user !== null) {
        if (user[0].verified === false) {
          Report.Error(
            new AppError(
              StatusCode.Unauthorized,
              "User not verified",
              "authenticate-user-usecase",
            ),
          );
        }

        const passwordMatch = await bcrypt.compare(
          data.password,
          user[0].password,
        );

        if (!passwordMatch) {
          Report.Error(
            new AppError(
              StatusCode.Unauthorized,
              "Credentials incorrect",
              "authenticate-user-usecase",
            ),
          );
        }

        // Update last login date
        await this.userRepository.updateLastLogin(user[0].id);

        const generateTokenUser = new GenerateTokenUser();
        const token = await generateTokenUser.execute(user[0].id);

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(user[0].id);

        if (!token || !refreshToken) {
          Report.Error(
            new AppError(
              StatusCode.InternalServerError,
              "Token not generated",
              "authenticate-user-usecase",
            ),
          );
        } else {
          const response: IAuthenticateUserResponseDTO = {
            id: user[0].id,
            username: user[0].username,
            name: user[0].name,
            email: user[0].email,
            avatar: user[0].avatar,
            token: token,
            refresh_token: refreshToken,
            status: "success",
          };

          return response;
        }
      }
      return null;
    } catch (error: any) {
      throw error;
    }
  }
}

export { AuthenticateUserUseCase };
