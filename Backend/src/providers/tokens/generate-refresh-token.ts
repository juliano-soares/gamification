import dayjs from "dayjs";
import { database } from "../database/prismaClient";

class GenerateRefreshToken {
  async execute(user_id: string) {
    await database.refreshtokens.deleteMany({
      where: {
        user_id: user_id,
      },
    });

    const expiresIn = dayjs().add(20, "minute").unix();

    const generateRefreshToken = await database.refreshtokens.create({
      data: {
        user_id,
        expires_in: expiresIn,
      },
    });

    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };
