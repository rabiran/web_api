"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRecord = exports.connectRabbit = void 0;
const menashmq_1 = __importDefault(require("menashmq"));
const index_1 = __importDefault(require("../config/index"));
const connectRabbit = async () => {
    if (index_1.default.rabbit.mock) {
        await menashmq_1.default.connect(index_1.default.rabbit.uri, index_1.default.rabbit.retryOptions);
        console.log('Rabbit connected');
        await menashmq_1.default.declareQueue('beforematch');
        await menashmq_1.default.declareQueue('aftermatch');
        await menashmq_1.default.send('aftermatch', { record: 'hey', dataSource: 'hey2' });
        await menashmq_1.default.queue('aftermatch').activateConsumer(async (msg) => {
            let record = msg.getContent();
            console.log(record);
            await menashmq_1.default.send('beforematch', JSON.stringify(record));
            msg.ack();
        }, { noAck: false });
        await menashmq_1.default.queue('beforematch').activateConsumer(async (msg) => {
            let record = msg.getContent();
            console.log('reading' + record);
            msg.ack();
        }, { noAck: false });
        return;
    }
    console.log('Connecting to Rabbit...');
    await menashmq_1.default.connect(index_1.default.rabbit.uri, index_1.default.rabbit.retryOptions);
    console.log('Rabbit connected');
    await menashmq_1.default.declareQueue('beforematch');
    await menashmq_1.default.declareQueue('aftermatch');
    await menashmq_1.default.queue('aftermatch').activateConsumer(async (msg) => {
        let record = msg.getContent();
        await menashmq_1.default.send('menash-queue', JSON.stringify(record));
        msg.ack();
    }, { noAck: false });
};
exports.connectRabbit = connectRabbit;
const sendRecord = async (record, dataSource) => {
    await menashmq_1.default.send('aftermatch', { record: record, dataSource: dataSource });
};
exports.sendRecord = sendRecord;
exports.default = { connectRabbit: exports.connectRabbit, sendRecord: exports.sendRecord };
//# sourceMappingURL=rabbit.js.map