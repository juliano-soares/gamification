import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestParam,
  response,
} from "inversify-express-utils";
import {
  IForgotPasswordUserRequestDTO,
  IForgotPasswordUserResponseDTO,
} from "./forgotpassword-user.dto";
import { ForgotPasswordUserUseCase } from "./forgotpassword-user.usecase";

@controller("/")
class ForgotPasswordUserController extends BaseController {
  constructor(private forgotPasswordUserUseCase: ForgotPasswordUserUseCase) {
    super("forgotpassword-user-controller");
  }

  @httpPost("auth/forgot-password")
  async execute(
    @requestParam() req: IForgotPasswordUserRequestDTO,
    @response() res: any,
  ): Promise<IForgotPasswordUserResponseDTO> {
    return this.callUseCase(
      await this.forgotPasswordUserUseCase.execute(req),
      res,
      StatusCode.OK,
    );
  }
}

export { ForgotPasswordUserController };
