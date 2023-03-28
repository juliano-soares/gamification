interface IResetPasswordUserRequestDTO {
  email: string;
  password: string;
  confirm_password: string;
  token: string;
}

interface IResetPasswordUserResponseDTO {
  status: string;
}

export { IResetPasswordUserRequestDTO, IResetPasswordUserResponseDTO };
