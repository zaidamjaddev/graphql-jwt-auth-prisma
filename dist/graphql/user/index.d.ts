export declare const User: {
    queries: string;
    mutations: string;
    typeDefs: string;
    resolvers: {
        queries: {
            getUserToken: (_: unknown, payload: import("../../services/user").GetUserTokenI) => Promise<string>;
            JwtFilter: (parent: unknown, args: unknown, context: any) => any;
        };
        mutations: {
            createUser: (_: unknown, payload: import("../../services/user").CreateUserI) => Promise<{
                id: string;
                email: string;
                username: string;
                password: string;
            }>;
        };
    };
};
//# sourceMappingURL=index.d.ts.map