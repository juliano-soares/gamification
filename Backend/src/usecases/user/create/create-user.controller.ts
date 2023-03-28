import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from "./create-user.dto";
import { CreateUserUseCase } from "./create-user.usecase";

@controller("/")
class CreateUserController extends BaseController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super("create-user-controller");
  }

  @httpPost("user")
  async execute(
    @requestBody() data: ICreateUserRequestDTO,
    @response() res: any,
  ): Promise<ICreateUserResponseDTO> {
    return this.callUseCase(
      await this.createUserUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}

export { CreateUserController };
