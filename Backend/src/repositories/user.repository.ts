import { provide } from "inversify-binding-decorators";
import { database } from "../providers/database/prismaClient";
import { ICreateUserRequestDTO } from "../usecases/user/create/create-user.dto";
import { Role } from "../providers/middlewares/role.user";
import { Users } from "../entities/user";

@provide(UserRepository)
class UserRepository {
  async create(user: ICreateUserRequestDTO): Promise<Users> {
    const userResponse: Users = await database.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        username: user.username,
        role: Role.User,
      },
    });
    return userResponse;
  }

  // TODO: Verifie how implement this method
  async update(user: Users): Promise<Users> {
    const userResponse: Users = await database.users.update({
      where: {
        id: user.id,
      },
      data: {
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
        gender: user.gender,
        qrcode: user.qrcode,
        linkedin: user.linkedin,
        github: user.github,
        updated_at: new Date(),
      },
    });
    return userResponse;
  }

  async updatePassword(user_id: string, newPassword: string): Promise<Users> {
    const userResponse: Users = await database.users.update({
      where: {
        id: user_id,
      },
      data: {
        password: newPassword,
      },
    });
    return userResponse;
  }

  async delete(id: string): Promise<Users> {
    const userResponse: Users = await database.users.delete({
      where: {
        id: id,
      },
    });
    return userResponse;
  }

  async findByEmail(email: string): Promise<Users[] | null> {
    const user: Users[] | null = await database.users.findMany({
      where: {
        email: {
          contains: email,
          mode: "insensitive",
        },
      },
    });
    return user;
  }

  async findByUsername(username: string): Promise<Users[] | null> {
    const users: Users[] = await database.users.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
    });
    return users;
  }

  async findById(id: string): Promise<Users | null> {
    const user: Users | null = await database.users.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  }

  async findAll(): Promise<Users[]> {
    const users: Users[] = await database.users.findMany();
    return users;
  }

  async findAllByRole(role: Role): Promise<Users[]> {
    const users: Users[] = await database.users.findMany({
      where: {
        role: role,
      },
    });
    return users;
  }

  async findByNames(name: string): Promise<Users[]> {
    const users: Users[] = await database.users.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    return users;
  }

  async searchUsers(search: string): Promise<Users[]> {
    const users: Users[] = await database.users.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return users;
  }

  async updateLastLogin(id: string) {
    const userResponse: Users = await database.users.update({
      where: {
        id: id,
      },
      data: {
        last_login: new Date(),
      },
    });
    return userResponse;
  }

  async updatePasswordTokens(id: string, token: string, expires: Date) {
    const userResponse: Users = await database.users.update({
      where: {
        id: id,
      },
      data: {
        password_reset_token: token,
        password_reset_expires_in: expires,
      },
    });
    return userResponse;
  }

  async updateEmailVerificationToken(id: string) {
    const users: Users = await database.users.update({
      where: {
        id: id,
      },
      data: {
        verified: true,
      },
    });
    return users;
  }
}

export { UserRepository };
