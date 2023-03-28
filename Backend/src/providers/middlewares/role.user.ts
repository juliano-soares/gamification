const enum Role {
  Admin = "admin",
  User = "user",
  Speaker = "speaker",
  Organizer = "organizer",
  Receptionist = "receptionist",
}

const MIDDLEWARES = {
  EnsureAuthenticate: Symbol.for("EnsureAuthenticate"),
  EnsureAdmin: Symbol.for("EnsureAdmin"),
};

export { Role, MIDDLEWARES };
