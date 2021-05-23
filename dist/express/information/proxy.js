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
    static async getInformation(dataSource, parameter, value) {
        let header = { url: index_1.default.urlSources.get(dataSource) + "/" + parameter + "/" + value };
        if (index_1.default.proxy.is_outside) {
            header = { headers: { 'authorization': "123" }, url: index_1.default.urlSources.get(dataSource) + "/" + parameter + "/" + value };
        }
        const persons = await axios_1.default(header).catch((_) => {
            throw new errorHandler_1.ServerError(500, 'Cannot connect with proxy');
        });
        if (persons === undefined || persons.data === undefined) {
            return [];
        }
        return persons.data;
    }
}
exports.InformationProxy = InformationProxy;
exports.default = InformationProxy;
//# sourceMappingURL=proxy.js.map