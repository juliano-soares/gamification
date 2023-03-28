import { CreateModule } from "@expressots/core";
import { UserRepository } from "./user.repository";

const RepositoriesModule = CreateModule([UserRepository]);

export { RepositoriesModule };
