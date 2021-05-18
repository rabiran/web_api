import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    proxy: {
        uri: env.get('PROXY_DATA_URI').required().asUrlString(),
        mock: env.get('PROXY_MOCK').required().asBool(),
    },
    rabbit: {
        uri: env.get('MATCH_TO_KART_RABBIT_URI').required().asUrlString(),
        retryOptions: {
            minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
            retries: env.get('RABBIT_RETRY_RETRIES').default(10).asIntPositive(),
            factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
        },
        mock: env.get('RABBIT_MOCK').required().asBool(),
        
    },
};

export default config;
