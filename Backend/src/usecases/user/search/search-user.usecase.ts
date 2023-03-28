import { provide } from "inversify-binding-decorators";
import { Users } from "../../../entities/user";
import { UserRepository } from "../../../repositories/user.repository";
import {
  ISearchUserRequestDTO,
  ISearchUserResponseDTO,
} from "./search-user.dtd";

@provide(SearchUserUseCase)
class SearchUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    req: ISearchUserRequestDTO,
  ): Promise<ISearchUserResponseDTO[] | null> {
    try {
      const { username, email, name, search } = req;

      let users: Users | Users[] | null = null;
      if (username) {
        users = await this.userRepository.findByUsername(username);
      } else if (email) {
        users = await this.userRepository.findByEmail(email);
      } else if (name) {
        users = await this.userRepository.findByNames(name);
      } else if (search) {
        users = await this.userRepository.searchUsers(search);
      }

      console.log(users);

      let response: ISearchUserResponseDTO[];

      if (users !== null) {
        if (!Array.isArray(users)) {
          users = [users];
        }

        response = users.map((user: Users) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
          };
        });
        return response;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }
}

export { SearchUserUseCase };
