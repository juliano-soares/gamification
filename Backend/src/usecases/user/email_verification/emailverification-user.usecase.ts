import { AppError, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import { decode } from "jsonwebtoken";
import path from "path";
import { UserRepository } from "../../../repositories/user.repository";
import {
  IEmailVerificationUserResponseDTO,
  IEmailVerificationUserResquestDTO
} from "./emailverification-user.dto";

@provide(EmailVerificationUserUseCase)
class EmailVerificationUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    data: IEmailVerificationUserResquestDTO,
  ): Promise<IEmailVerificationUserResponseDTO | null> {
    try {
      // Recieve data from controller with email and code
      const { token } = data;
      // decrypt token
      const decoded = decode(token);
      console.log(decoded);

      // if (decoded) {
      //   const user = await this.userRepository.findById(decoded..id);
      //   // Check if user exists
      //   if (!user) {
      //     Report.Error(
      //       new AppError(
      //         StatusCode.BadRequest,
      //         "User not found",
      //         "email-verification-user-usecase",
      //       ),
      //     );
      //   } else {
      //     // open view

      //     console.log(__dirname);

      //     //const view_email_verification = path.resolve(__dirname,

      //     // const response = {
      //     //   view: view_email_verification,
      //     //   status: "Email verified",
      //     // };


      //     // return response;
      //   }
      // }
      return null;
    } catch (error: any) {
      throw error;
    }
  }
}

export { EmailVerificationUserUseCase };
