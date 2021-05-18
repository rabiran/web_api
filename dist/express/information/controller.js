"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationController = void 0;
const proxy_1 = require("./proxy");
const index_1 = __importDefault(require("../../config/index"));
const rabbit_1 = require("../../rabbit/rabbit");
const mocks_json_1 = __importDefault(require("../../config/mocks.json"));
class InformationController {
    static async getInformation(req, res) {
        var _a;
        if (index_1.default.proxy.isMock) {
            res.json(mocks_json_1.default);
            return;
        }
        const dataSource = (_a = req.params.dataSource) === null || _a === void 0 ? void 0 : _a.toString();
        let { data } = await proxy_1.InformationProxy.getInformation(dataSource);
        console.log(data);
        if (index_1.default.rabbit.isMockMatchToKart) {
            res.json(data);
            return;
        }
        for (let index = 0; index < data.length; index++) {
            rabbit_1.sendRecord(data[index], dataSource);
        }
        res.json(data);
    }
}
exports.InformationController = InformationController;
exports.default = InformationController;
//# sourceMappingURL=controller.js.map