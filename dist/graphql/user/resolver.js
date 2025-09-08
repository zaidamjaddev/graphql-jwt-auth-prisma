"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = __importDefault(require("../../services/user"));
const queries = {
    getUserToken: async (_, payload) => {
        return user_1.default.getUserToken(payload);
    },
    JwtFilter: (parent, args, context) => {
        return context.user;
    },
};
const mutations = {
    createUser: async (_, payload) => {
        return user_1.default.createUser(payload);
    },
};
exports.resolvers = { queries, mutations };
//# sourceMappingURL=resolver.js.map