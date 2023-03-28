import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpDelete,
  requestParam,
  response,
} from "inversify-express-utils";
import { MIDDLEWARES } from "../../../providers/middlewares/role.user";
import { IDeleteUserRequestDTO } from "./delete-user.dto";
import { DeleteUserUseCase } from "./delete-user.usecase";

@controller("/")
class DeleteUserController extends BaseController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {
    super("delete-user-controller");
  }

  @httpDelete(
    "user/:id",
    MIDDLEWARES.EnsureAuthenticate,
    MIDDLEWARES.EnsureAdmin,
  )
  async execute(
    @requestParam() data: IDeleteUserRequestDTO,
    @response() res: any,
  ): Promise<IDeleteUserRequestDTO> {
    return this.callUseCase(
      await this.deleteUserUseCase.execute(data.id),
      res,
      StatusCode.Created,
    );
  }
}

export { DeleteUserController };
