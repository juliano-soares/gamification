import { provide } from "inversify-binding-decorators";
import { UserRepository } from "../../../repositories/user.repository";

@provide(DeleteUserUseCase)
class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user_id: string) {
    try {
      const user = await this.userRepository.delete(user_id);

      if (user !== null) {
        console.log(user);
        const response = {
          message: "User deleted successfully",
        };
        return response;
      }
      return null;
    } catch (error: any) {
      throw error;
    }
  }
}

export { DeleteUserUseCase };
