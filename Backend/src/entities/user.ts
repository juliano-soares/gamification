import { v4 as uuidv4 } from "uuid";

class Users {
  public id: string;
  public username: string;
  public name: string;
  public email: string;
  public password: string;
  public verified: boolean;

  public role?: string | null;

  public phone?: string | null;
  public avatar?: string | null;
  public bio?: string | null;
  public location?: string | null;
  public gender?: string | null;
  public qrcode?: string | null;
  public linkedin?: string | null;
  public github?: string | null;
  public password_reset_token?: string | null;
  public password_reset_expires_in?: Date | null;

  public created_at: Date;
  public updated_at: Date;
  public last_login: Date | null;

  constructor(usename: string, name: string, email: string, password: string) {
    this.id = uuidv4();
    this.username = usename;
    this.name = name;
    this.email = email;
    this.password = password;
    this.verified = false;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.last_login = new Date();
  }
}

export { Users };
