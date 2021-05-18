import menash, { ConsumerMessage } from 'menashmq';
import config from '../config/index';

export const connectRabbit = async () => {
    if (config.rabbit.isMockKiddy && config.rabbit.isMockMatchToKart) {
        return;
    }
    console.log('Connecting to Rabbit...');

    await menash.connect(config.rabbit.uri, config.rabbit.retryOptions);

    console.log('Rabbit connected');

    await menash.declareQueue(config.rabbit.beforeMatchQName);
    await menash.declareQueue(config.rabbit.afterMatchQName);
    await menash.declareQueue(config.rabbit.kiddyQName);
    // await menash.declareTopology({
    //     queues: [{ name: 'feature-queue', options: { durable: true } }],
    //     exchanges: [{ name: 'feature-exchange', type: 'fanout', options: { durable: true } }],
    //     bindings: [{ source: 'feature-exchange', destination: 'feature-queue' }],
    //     consumers: [{ queueName: 'feature-queue', onMessage: featureConsumeFunction }],
    // });
    if(config.rabbit.isMockMatchToKart){
        return;
    }

    await menash.queue(config.rabbit.afterMatchQName).activateConsumer(
        async (msg: ConsumerMessage) => {
            let record: any = msg.getContent();

            if(!config.rabbit.isMockKiddy){
                await menash.send(config.rabbit.kiddyQName, JSON.stringify(record));
            }
            

            msg.ack();
        },
        { noAck: false },
    );
};
export const sendRecord = async (record: any, dataSource: any) => {
    await menash.send(config.rabbit.beforeMatchQName, { record: record, dataSource: dataSource });
};

export default { connectRabbit, sendRecord };
