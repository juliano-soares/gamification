import { AppError, Report, StatusCode } from "@expressots/core";
import { Refreshtokens } from "@prisma/client";
import dayjs from "dayjs";
import { provide } from "inversify-binding-decorators";
import { database } from "../../../providers/database/prismaClient";
import { GenerateRefreshToken } from "../../../providers/tokens/generate-refresh-token";
import { GenerateTokenUser } from "../../../providers/tokens/generate-token";
import { IRefreshTokenUserResponseDTO } from "./refresh-token-user.dto";

@provide(RefreshTokenUserUseCase)
class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    try {
      const refreshToken: Refreshtokens | null =
        await database.refreshtokens.findFirst({
          where: {
            id: refresh_token,
          },
        });

      if (!refreshToken || refreshToken === null) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "Refresh token invalid",
            "refresh-token-user-usecase",
          ),
        );
      } else {
        // TODO: Refactor this code to generate a new token if is expired
        const generateToken = new GenerateTokenUser();
        const token = await generateToken.execute(refreshToken.user_id);

        const refreshTokenExpired = dayjs().isAfter(
          dayjs.unix(refreshToken.expires_in),
        );

        if (refreshTokenExpired) {
          const generateRefreshToken = new GenerateRefreshToken();
          const newrRefreshToken = await generateRefreshToken.execute(
            refreshToken.user_id,
          );

          const response: IRefreshTokenUserResponseDTO = {
            token: token,
            refreshToken: newrRefreshToken,
          };
          return response;
        }

        const response: IRefreshTokenUserResponseDTO = {
          token: token,
          refreshToken: refreshToken,
        };
        return response;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export { RefreshTokenUserUseCase };
