import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import {
  IAuthenticateUserRequestDTO,
  IAuthenticateUserResponseDTO,
} from "./authenticate-user.dto";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";

@controller("/")
class AuthenticateUserController extends BaseController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {
    super("Login-user-controller");
  }

  @httpPost("auth/login")
  async execute(
    @requestBody() data: IAuthenticateUserRequestDTO,
    @response() res: any,
  ): Promise<IAuthenticateUserResponseDTO> {
    return this.callUseCase(
      await this.authenticateUserUseCase.execute(data),
      res,
      StatusCode.OK,
    );
  }
}

export { AuthenticateUserController };
