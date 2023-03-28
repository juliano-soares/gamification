import { provide } from "inversify-binding-decorators";
import { IFindAllUserResponseDTO } from "./findall-user.dto";
import { UserRepository } from "../../../repositories/user.repository";
import { Users } from "../../../entities/user";

@provide(FindAllUserUseCase)
class FindAllUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    try {
      const allUsers: Users[] = await this.userRepository.findAll();

      const allUsersResponse: IFindAllUserResponseDTO[] = allUsers.map(
        (user: Users) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
          };
        },
      );

      return allUsersResponse;
    } catch (error: any) {
      throw error;
    }
  }
}

export { FindAllUserUseCase };
