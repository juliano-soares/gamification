interface ISearchUserRequestDTO {
  username?: string;
  email?: string;
  name?: string;
  search?: string;
}

interface ISearchUserResponseDTO {
  id: string;
  name: string;
  email: string;
  username: string;
}

export { ISearchUserRequestDTO, ISearchUserResponseDTO };
