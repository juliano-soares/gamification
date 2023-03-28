import { AppError, Report, StatusCode } from "@expressots/core";
import { database } from "../database/prismaClient";

class UserVerification {
  async execute(user_id: string) {
    const user = await database.users.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      Report.Error(
        new AppError(
          StatusCode.BadRequest,
          "Non-existing user to verify email",
          "user-verification",
        ),
      );
    }

    // Send email to user for verification
  }
}

export { UserVerification };
