import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils";
import {
  IEmailVerificationUserResponseDTO,
  IEmailVerificationUserResquestDTO,
} from "./emailverification-user.dto";
import { EmailVerificationUserUseCase } from "./emailverification-user.usecase";

@controller("/")
class DeleteUserController extends BaseController {
  constructor(
    private emailVerificationUserUseCase: EmailVerificationUserUseCase,
  ) {
    super("email-verification-user-controller");
  }

  @httpGet("verify/:token")
  async execute(
    @requestParam() data: IEmailVerificationUserResquestDTO,
    @response() res: any,
  ): Promise<IEmailVerificationUserResponseDTO | null> {
    return this.callUseCase(
      await this.emailVerificationUserUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}

export { DeleteUserController };
