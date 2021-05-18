"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationController = void 0;
const proxy_1 = require("./proxy");
const index_1 = __importDefault(require("../../config/index"));
const mocks_json_1 = __importDefault(require("../../config/mocks.json"));
class InformationController {
    static async getInformation(req, res) {
        var _a;
        if (index_1.default.proxy.mock) {
            res.json(mocks_json_1.default);
            return;
        }
        const data = await proxy_1.InformationProxy.getInformation((_a = req.query.dataSource) === null || _a === void 0 ? void 0 : _a.toString());
        res.json(data);
    }
}
exports.InformationController = InformationController;
exports.default = InformationController;
//# sourceMappingURL=controller.js.map