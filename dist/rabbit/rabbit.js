"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRecord = exports.connectRabbit = void 0;
const menashmq_1 = __importDefault(require("menashmq"));
const index_1 = __importDefault(require("../config/index"));
const connectRabbit = async () => {
    if (index_1.default.rabbit.isMockKiddy && index_1.default.rabbit.isMockMatchToKart) {
        return;
    }
    console.log('Connecting to Rabbit...');
    await menashmq_1.default.connect(index_1.default.rabbit.uri, index_1.default.rabbit.retryOptions);
    console.log('Rabbit connected');
    await menashmq_1.default.declareQueue(index_1.default.rabbit.beforeMatchQName);
    await menashmq_1.default.declareQueue(index_1.default.rabbit.afterMatchQName);
    await menashmq_1.default.declareQueue(index_1.default.rabbit.kiddyQName);
    if (index_1.default.rabbit.isMockMatchToKart) {
        return;
    }
    await menashmq_1.default.queue(index_1.default.rabbit.afterMatchQName).activateConsumer(async (msg) => {
        let record = msg.getContent();
        if (!index_1.default.rabbit.isMockKiddy) {
            await menashmq_1.default.send(index_1.default.rabbit.kiddyQName, JSON.stringify(record));
        }
        msg.ack();
    }, { noAck: false });
};
exports.connectRabbit = connectRabbit;
const sendRecord = async (record, dataSource) => {
    await menashmq_1.default.send(index_1.default.rabbit.beforeMatchQName, { record: record, dataSource: dataSource });
};
exports.sendRecord = sendRecord;
exports.default = { connectRabbit: exports.connectRabbit, sendRecord: exports.sendRecord };
//# sourceMappingURL=rabbit.js.map