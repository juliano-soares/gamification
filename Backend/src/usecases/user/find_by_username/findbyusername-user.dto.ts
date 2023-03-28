interface IFindByUsernameUserRequestDTO {
  username: string;
}

interface IFindByUsernameUserResponseDTO {
  id: string;
  name: string;
  email: string;
  username: string;
}

export { IFindByUsernameUserRequestDTO, IFindByUsernameUserResponseDTO };
