"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require("bcryptjs");
const JWT_SECRET = "#sertoeir%&ioe";
class UserService {
    static async getUserByEmail(email) {
        return await db_1.prismaClient.user.findUnique({ where: { email } });
    }
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
    static async createUser(payload) {
        const { username, email, password } = payload;
        const hashedPassword = await this.hashPassword(password);
        const user = await db_1.prismaClient.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        return user;
    }
    static async getUserToken(payload) {
        const { email, password } = payload;
        const user = await this.getUserByEmail(email);
        if (!user)
            throw new Error("User not found!");
        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword)
            throw new Error("Invalid Credentials");
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        return token;
    }
}
exports.default = UserService;
//# sourceMappingURL=user.js.map