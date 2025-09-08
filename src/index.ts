import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { User } from "./graphql/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "./lib/db";

interface JWtPayload {
  id: string;
}

const JWT_SECRET = "#sertoeir%&ioe";
async function init() {
  const server = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
      type Query{
        ${User.queries}
        hello:String
      }

      type Mutation{
         ${User.mutations}
        
      }    
    `,
    resolvers: {
      Query: {
        hello: () => "Hi from graphql server",
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
    context: async ({ req }) => {
      const authHeaders = req.headers.authorization;
      const token = authHeaders?.startsWith("Bearer ")
        ? authHeaders.split(" ")[1]
        : null;

      if (!token) return { user: null };

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const user = await prismaClient.user.findUnique({
          where: { id: decoded.id },
        });

        return { user };
      } catch (error) {
        return { user: null };
      }
    },
  });

  console.log(` Server ready at: ${url}`);
}

init();
