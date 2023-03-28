import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import {
  IResetPasswordUserRequestDTO,
  IResetPasswordUserResponseDTO,
} from "./resetpassword-user.dto";
import { ResetPasswordUserUseCase } from "./resetpassword-user.usecase";

@controller("/")
class ResetPasswordUserController extends BaseController {
  constructor(private resetPasswordUserUseCase: ResetPasswordUserUseCase) {
    super("Login-user-controller");
  }

  @httpPost("auth/reset-password")
  async execute(
    @requestBody() data: IResetPasswordUserRequestDTO,
    @response() res: any,
  ): Promise<IResetPasswordUserResponseDTO> {
    return this.callUseCase(
      await this.resetPasswordUserUseCase.execute(data),
      res,
      StatusCode.OK,
    );
  }
}

export { ResetPasswordUserController };
