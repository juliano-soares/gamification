import { AppError, Report, StatusCode } from "@expressots/core";
import { database } from "../database/prismaClient";
import qrcode from "qrcode";

class GenerateQRCode {
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
          "User not exists for create QRCode",
          "generate-qrcode",
        ),
      );
    } else {
      const userURL = process.env.APP_URL + "/user/" + user.username;

      // Generate QRCode for user
      qrcode.toDataURL(userURL, async (err: any, url: any) => {
        if (err) {
          Report.Error(
            new AppError(
              StatusCode.BadRequest,
              "Error to generate QRCode",
              "generate-qrcode",
            ),
          );
        }
        await database.users.update({
          where: {
            id: user_id,
          },
          data: {
            qrcode: url,
          },
        });
      });
    }
  }
}

export { GenerateQRCode };
