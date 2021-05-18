"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationProxy = void 0;
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("../../config/index"));
const errorHandler_1 = require("../../helpers/errorHandler");
class InformationProxy {
    static async getInformation(dataSource) {
        let header = {};
        if (index_1.default.proxy.is_outside) {
            header = { headers: { 'authorization': "123" }, url: index_1.default.urlSources.get(dataSource) };
        }
        console.log("hey");
        console.log(index_1.default.urlSources.get(dataSource));
        const data = await axios_1.default(header).catch((err) => {
            console.log(err);
            throw new errorHandler_1.ServerError(500, 'Cannot connect with proxy');
        });
        return data;
    }
}
exports.InformationProxy = InformationProxy;
exports.default = InformationProxy;
//# sourceMappingURL=proxy.js.map