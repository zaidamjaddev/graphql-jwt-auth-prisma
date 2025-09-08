export interface CreateUserI {
    username: string;
    email: string;
    password: string;
}
export interface GetUserTokenI {
    email: string;
    password: string;
}
declare class UserService {
    private static getUserByEmail;
    private static hashPassword;
    static createUser(payload: CreateUserI): Promise<{
        id: string;
        email: string;
        username: string;
        password: string;
    }>;
    static getUserToken(payload: GetUserTokenI): Promise<string>;
}
export default UserService;
//# sourceMappingURL=user.d.ts.map