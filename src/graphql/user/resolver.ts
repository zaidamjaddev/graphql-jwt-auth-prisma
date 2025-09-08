import UserService, { CreateUserI, GetUserTokenI } from "../../services/user";

const queries = {
  getUserToken: async (_: unknown, payload: GetUserTokenI) => {
    return UserService.getUserToken(payload);
  },
  JwtFilter: (parent: unknown, args: unknown, context: any) => {
    return context.user;
  },
};

const mutations = {
  createUser: async (_: unknown, payload: CreateUserI) => {
    return UserService.createUser(payload);
  },
};

export const resolvers = { queries, mutations };
