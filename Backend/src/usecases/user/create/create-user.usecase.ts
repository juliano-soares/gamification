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
import { GenerateEmailVerificationToken } from "../../../providers/tokens/generate-email-verification-token";
import { Nodemailer } from "../../../providers/email/nodemailer-config";
import process from "process";

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

      // Generate token Send email to user for verification
      const emailVerification = new GenerateEmailVerificationToken();
      const token = await emailVerification.execute(user);
      const link = process.env.APP_URL + `/verify-email/${token}`;
      const options = {
        from: "gamification@gmail.com",
        to: user.email,
        subject: "Email verification",
        template: "email_verification",
        context: {
          link,
          name: user.name,
        },
      };

      Nodemailer.sendMail(options, (err) => {
        if (err) {
          console.log(err);
          Report.Error(
            new AppError(
              StatusCode.BadRequest,
              "Error sending email verification",
              "create-user-usecase",
            ),
          );
        }
      });

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
