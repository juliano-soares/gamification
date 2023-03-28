import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  response,
  queryParam,
} from "inversify-express-utils";
import { MIDDLEWARES } from "../../../providers/middlewares/role.user";
import {
  ISearchUserRequestDTO,
  ISearchUserResponseDTO,
} from "./search-user.dtd";
import { SearchUserUseCase } from "./search-user.usecase";

@controller("/")
class SearchUserController extends BaseController {
  constructor(private searchUserUseCase: SearchUserUseCase) {
    super("search-user-controller");
  }

  @httpGet("search-user", MIDDLEWARES.EnsureAuthenticate)
  async execute(
    @queryParam() req: ISearchUserRequestDTO,
    @response() res: any,
  ): Promise<ISearchUserResponseDTO | null> {
    return this.callUseCase(
      await this.searchUserUseCase.execute(req),
      res,
      StatusCode.Accepted,
    );
  }
}

export { SearchUserController };
