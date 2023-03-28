import { Refreshtokens } from "@prisma/client";

interface IRefreshTokenUserRequestDTO {
  refreshToken: string;
}

interface IRefreshTokenUserResponseDTO {
  token: string | null;
  refreshToken?: Refreshtokens | null;
}

export { IRefreshTokenUserRequestDTO, IRefreshTokenUserResponseDTO };
