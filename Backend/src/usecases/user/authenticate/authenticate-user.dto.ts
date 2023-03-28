import { Refreshtokens } from "@prisma/client";

interface IAuthenticateUserRequestDTO {
  email?: string;
  username?: string;
  password: string;
}

interface IAuthenticateUserResponseDTO {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string | null | undefined;
  token: string;
  refresh_token: Refreshtokens;
  status: "success";
}

export { IAuthenticateUserRequestDTO, IAuthenticateUserResponseDTO };
