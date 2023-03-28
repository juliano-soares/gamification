import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestBody,
  response,
} from "inversify-express-utils";
import { IFindAllUserResponseDTO } from "./findall-user.dto";
import { FindAllUserUseCase } from "./findall-user.usecase";

@controller("/")
class FindAllUserController extends BaseController {
  constructor(private findAllUserUseCase: FindAllUserUseCase) {
    super("findall-user-controller");
  }

  @httpGet("user")
  async execute(
    @requestBody() req: any,
    @response() res: any,
  ): Promise<IFindAllUserResponseDTO[]> {
    return this.callUseCase(
      await this.findAllUserUseCase.execute(),
      res,
      StatusCode.Accepted,
    );
  }
}

export { FindAllUserController };
