import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import {
  IRefreshTokenUserRequestDTO,
  IRefreshTokenUserResponseDTO,
} from "./refresh-token-user.dto";
import { RefreshTokenUserUseCase } from "./refresh-token-user.usecase";

@controller("/")
class RefreshTokenUserController extends BaseController {
  constructor(private refreshTokenUserUseCase: RefreshTokenUserUseCase) {
    super("refresh-token-user-controller");
  }

  @httpPost("auth/refresh-token")
  async execute(
    @requestBody() req: IRefreshTokenUserRequestDTO,
    @response() res: any,
  ): Promise<IRefreshTokenUserResponseDTO> {
    return this.callUseCase(
      await this.refreshTokenUserUseCase.execute(req.refreshToken),
      res,
      StatusCode.Accepted,
    );
  }
}

export { RefreshTokenUserController };
