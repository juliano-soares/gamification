interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  username: string;
}

interface ICreateUserResponseDTO {
  id: string;
  name: string;
  email: string;
  username: string;
  created_at: Date;
  status: string;
}

export { ICreateUserRequestDTO, ICreateUserResponseDTO };
