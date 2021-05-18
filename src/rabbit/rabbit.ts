import menash, { ConsumerMessage } from 'menashmq';
import config from '../config/index';

export const connectRabbit = async () => {
    if (config.rabbit.mock) {
        return;
    }
    console.log('Connecting to Rabbit...');

    await menash.connect(config.rabbit.uri, config.rabbit.retryOptions);

    console.log('Rabbit connected');

    await menash.declareQueue('beforematch');
    await menash.declareQueue('aftermatch');
    // await menash.declareTopology({
    //     queues: [{ name: 'feature-queue', options: { durable: true } }],
    //     exchanges: [{ name: 'feature-exchange', type: 'fanout', options: { durable: true } }],
    //     bindings: [{ source: 'feature-exchange', destination: 'feature-queue' }],
    //     consumers: [{ queueName: 'feature-queue', onMessage: featureConsumeFunction }],
    // });
    await menash.queue('aftermatch').activateConsumer(
        async (msg: ConsumerMessage) => {
            let record: any = msg.getContent();

            await menash.send('menash-queue', JSON.stringify(record));

            msg.ack();
        },
        { noAck: false },
    );
};
export const sendRecord = async (record: any, dataSource: string) => {
    await menash.send('aftermatch', { record: record, dataSource: dataSource });
};

export default { connectRabbit, sendRecord };
