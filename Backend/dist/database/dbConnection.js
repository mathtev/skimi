"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const models = __importStar(require("../models"));
require('dotenv').config();
const commonConfig = {
    type: 'postgres',
    entities: Object.values(models),
    synchronize: true,
};
const connectionOptions = process.env.NODE_ENV === 'production'
    ? Object.assign(Object.assign({ url: process.env.DATABASE_URL }, commonConfig), { extra: {
            max: 5,
        } }) : Object.assign({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT), username: process.env.DB_USERNAME, password: String(process.env.DB_PASSWORD), database: process.env.DB_DATABASE }, commonConfig);
const createDatabaseConnection = () => {
    console.log('qqqqqqq', commonConfig);
    return typeorm_1.createConnection(connectionOptions);
};
exports.default = createDatabaseConnection;
//# sourceMappingURL=dbConnection.js.map