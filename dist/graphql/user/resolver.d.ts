import { CreateUserI, GetUserTokenI } from "../../services/user";
export declare const resolvers: {
    queries: {
        getUserToken: (_: unknown, payload: GetUserTokenI) => Promise<string>;
        JwtFilter: (parent: unknown, args: unknown, context: any) => any;
    };
    mutations: {
        createUser: (_: unknown, payload: CreateUserI) => Promise<{
            id: string;
            email: string;
            username: string;
            password: string;
        }>;
    };
};
//# sourceMappingURL=resolver.d.ts.map