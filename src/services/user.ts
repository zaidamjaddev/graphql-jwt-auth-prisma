import { prismaClient } from "../lib/db";
import jwt from "jsonwebtoken";
const bcrypt = require("bcryptjs");

export interface CreateUserI {
  username: string;
  email: string;
  password: string;
}

export interface GetUserTokenI {
  email: string;
  password: string;
}
const JWT_SECRET = "#sertoeir%&ioe";

class UserService {
  private static async getUserByEmail(email: string) {
    return await prismaClient.user.findUnique({ where: { email } });
  }

  private static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  public static async createUser(payload: CreateUserI) {
    const { username, email, password } = payload;
    const hashedPassword = await this.hashPassword(password);
    const user = await prismaClient.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return user;
  }

  public static async getUserToken(payload: GetUserTokenI) {
    const { email, password } = payload;
    const user = await this.getUserByEmail(email);

    if (!user) throw new Error("User not found!");

    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) throw new Error("Invalid Credentials");

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    return token;
  }
}

export default UserService;
