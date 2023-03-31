import { CreateModule } from "@expressots/core";
import { AuthenticateUserController } from "./authenticate/authenticate-user.controller";
import { CreateUserController } from "./create/create-user.controller";
import { FindAllUserController } from "./findall/findall-user.controller";
import { FindByUsernameController } from "./find_by_username/findbyusername-user.controller";
import { SearchUserController } from "./search/search-user.controller";
import { RefreshTokenUserController } from "./refresh_token/refresh-token-user.controller";
import { DeleteUserController } from "./delete/delete-user.controller";
import { ForgotPasswordUserController } from "./forgot_password/forgotpassword-user.controller";
import { ResetPasswordUserController } from "./reset_password/resetpassword-user.controller";
import { EmailVerificationUserController } from "./email_verification/emailverification-user.controller";

const UserModule = CreateModule([
  CreateUserController,
  FindAllUserController,
  FindByUsernameController,
  SearchUserController,
  AuthenticateUserController,
  RefreshTokenUserController,
  DeleteUserController,
  ForgotPasswordUserController,
  ResetPasswordUserController,
  EmailVerificationUserController,
]);

export { UserModule };
