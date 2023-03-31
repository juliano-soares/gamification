import { BaseController } from "@expressots/core";
import {
  controller,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils";
import { IEmailVerificationUserResquestDTO } from "./emailverification-user.dto";
import { EmailVerificationUserUseCase } from "./emailverification-user.usecase";

@controller("/")
class EmailVerificationUserController extends BaseController {
  constructor(
    private emailVerificationUserUseCase: EmailVerificationUserUseCase,
  ) {
    super("email-verification-user-controller");
  }

  @httpGet("verify-email/:token")
  async execute(
    @requestParam() data: IEmailVerificationUserResquestDTO,
    @response() res: any,
  ) {
    return res.send(await this.emailVerificationUserUseCase.execute(data));
  }
}

export { EmailVerificationUserController };
