import { AppError, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import bcrypt from "bcrypt";
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from "./create-user.dto";
import { UserRepository } from "../../../repositories/user.repository";
import { Users } from "../../../entities/user";
import { GenerateQRCode } from "../../../providers/qrcode/generate-qrcode";

@provide(CreateUserUseCase)
class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: ICreateUserRequestDTO) {
    try {
      // Crypt password
      const saltRounds = 10;
      const salt: string = bcrypt.genSaltSync(saltRounds);
      data.password = bcrypt.hashSync(data.password, salt);

      // Search user by email and username
      if (data.username) {
        const searchUsername = await this.userRepository.findByUsername(
          data.username,
        );
        if (searchUsername && searchUsername?.length > 0) {
          Report.Error(
            new AppError(
              StatusCode.BadRequest,
              "Username already exists",
              "create-user-usecase",
            ),
          );
        }
      }

      if (data.email) {
        // Regex for email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(data.email)) {
          Report.Error(
            new AppError(
              StatusCode.BadRequest,
              "Invalid email",
              "create-user-usecase",
            ),
          );
        }

        const searchEmail = await this.userRepository.findByEmail(data.email);
        if (searchEmail && searchEmail?.length > 0) {
          Report.Error(
            new AppError(
              StatusCode.BadRequest,
              "Email already exists",
              "create-user-usecase",
            ),
          );
        }
      }

      const user: Users = await this.userRepository.create(data);

      if (!user) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "Error creating user",
            "create-user-usecase",
          ),
        );
      }

      // Generate QRCode for user
      const qrcode = new GenerateQRCode();
      await qrcode.execute(user.id);

      // Send email to user for verification

      let response: ICreateUserResponseDTO;

      if (user !== null) {
        response = {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          created_at: user.created_at,
          status: "success",
        };
        return response;
      }

      return null;
    } catch (error: any) {
      throw error;
    }
  }
}

export { CreateUserUseCase };
