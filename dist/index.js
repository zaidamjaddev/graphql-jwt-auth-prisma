"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const user_1 = require("./graphql/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./lib/db");
const JWT_SECRET = "#sertoeir%&ioe";
async function init() {
    const server = new server_1.ApolloServer({
        typeDefs: `
      ${user_1.User.typeDefs}
      type Query{
        ${user_1.User.queries}
        hello:String
      }

      type Mutation{
         ${user_1.User.mutations}
        
      }    
    `,
        resolvers: {
            Query: {
                hello: () => "Hi from graphql server",
                ...user_1.User.resolvers.queries,
            },
            Mutation: {
                ...user_1.User.resolvers.mutations,
            },
        },
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 3000 },
        context: async ({ req }) => {
            const authHeaders = req.headers.authorization;
            const token = authHeaders?.startsWith("Bearer ")
                ? authHeaders.split(" ")[1]
                : null;
            if (!token)
                return { user: null };
            try {
                const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                const user = await db_1.prismaClient.user.findUnique({
                    where: { id: decoded.id },
                });
                return { user };
            }
            catch (error) {
                return { user: null };
            }
        },
    });
    console.log(` Server ready at: ${url}`);
}
init();
//# sourceMappingURL=index.js.map