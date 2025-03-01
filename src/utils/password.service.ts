import { compare, hash } from "bcryptjs";

export class PasswordService {
  private static readonly SALT = 10;

  static async hashPassword(password: string) {
    return await hash(password, this.SALT);
  }

  static async comaprePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
