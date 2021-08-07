"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const type_graphql_1 = require("type-graphql");
const gql_1 = require("./gql");
const dbConnection_1 = __importDefault(require("./database/dbConnection"));
require('dotenv').config();
const establishDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbConnection_1.default();
    }
    catch (error) {
        console.log(error);
    }
});
const initExpressGraphql = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cors_1.default());
    const schema = yield type_graphql_1.buildSchema({
        resolvers: gql_1.RESOLVERS,
    });
    app.use('/graphql', express_graphql_1.graphqlHTTP({
        schema: schema,
        graphiql: true,
    }));
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield establishDatabaseConnection();
    initExpressGraphql();
});
startServer();
//# sourceMappingURL=index.js.map