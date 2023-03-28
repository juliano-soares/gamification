import { AppContainer } from "@expressots/core";
import { RepositoriesModule } from "./repositories/repositories.module";
import { AppModule } from "./usecases/app/app.module";
import { UserModule } from "./usecases/user/user.module";
import { MIDDLEWARES } from "./providers/middlewares/role.user";
import { EnsureAuthenticate } from "./providers/middlewares/ensure-authenticate";
import { EnsureAdmin } from "./providers/middlewares/ensure-admin";

const appContainer = new AppContainer();

const container = appContainer.create([
  // Add your modules here
  AppModule,
  UserModule,
  RepositoriesModule,
]);

// Middleware
container
  .bind<EnsureAuthenticate>(MIDDLEWARES.EnsureAuthenticate)
  .to(EnsureAuthenticate);
container.bind<EnsureAdmin>(MIDDLEWARES.EnsureAdmin).to(EnsureAdmin);

export { container };
