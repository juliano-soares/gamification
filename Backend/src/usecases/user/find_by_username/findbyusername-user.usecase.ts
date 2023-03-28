import { provide } from "inversify-binding-decorators";
import { IFindByUsernameUserResponseDTO } from "./findbyusername-user.dto";
import { UserRepository } from "../../../repositories/user.repository";
import { Users } from "../../../entities/user";
import { AppError, Report, StatusCode } from "@expressots/core";

@provide(FindByUsernameUserUseCase)
class FindByUsernameUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userName: string) {
    try {
      const user: Users[] | null = await this.userRepository.findByUsername(
        userName,
      );

      if (!user) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "User not exists",
            "findbyusername-user-usecase",
          ),
        );
      }

      let response: IFindByUsernameUserResponseDTO;

      if (user !== null) {
        response = {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          username: user[0].username,
        };
        return response;
      }

      return null;
    } catch (error: any) {
      throw error;
    }
  }
}

export { FindByUsernameUserUseCase };
