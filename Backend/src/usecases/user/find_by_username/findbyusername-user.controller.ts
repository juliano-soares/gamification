import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils";
import {
  IFindByUsernameUserRequestDTO,
  IFindByUsernameUserResponseDTO,
} from "./findbyusername-user.dto";
import { FindByUsernameUserUseCase } from "./findbyusername-user.usecase";

@controller("/")
class FindByUsernameController extends BaseController {
  constructor(private findByUsernameUserUseCase: FindByUsernameUserUseCase) {
    super("findbyusername-user-controller");
  }

  @httpGet("user/:username")
  async execute(
    @requestParam() req: IFindByUsernameUserRequestDTO,
    @response() res: any,
  ): Promise<IFindByUsernameUserResponseDTO> {
    return this.callUseCase(
      await this.findByUsernameUserUseCase.execute(req.username),
      res,
      StatusCode.Accepted,
    );
  }
}

export { FindByUsernameController };
