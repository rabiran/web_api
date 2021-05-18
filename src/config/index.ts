


import {dataSources} from "./dataSources"
import './dotenv'

import * as env from 'env-var';

export const configEnv = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    proxy: {
        is_outside: env.get('IS_OUTSIDE').default('false').asBool(),
        souf_uri: env.get('SOUF_URI').required().asUrlString(),
        aka_uri: env.get('AKA_URI').required().asUrlString(),
        eight_socks_uri: env.get('EIGHT_SOCKS_URI').required().asUrlString(),
        city_uri: env.get('CITY_URI').required().asUrlString(),
        isMock: env.get('PROXY_MOCK').required().asBool(),
    },
    rabbit: {

        uri: env.get('MATCH_TO_KART_RABBIT_URI').required().asString(),
        afterMatchQName: env.get('AFTER_MATCH_QUEUE_NAME').required().asString(),
        beforeMatchQName: env.get('BEFORE_MATCH_QUEUE_NAME').required().asString(),
        kiddyQName: env.get('KIDDY_QUEUE_NAME').required().asString(),
        retryOptions: {
            minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
            retries: env.get('RABBIT_RETRY_RETRIES').default(10).asIntPositive(),
            factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
        },
        isMockMatchToKart: env.get('RABBIT_MOCK_MATCH_TO_KART').required().asBool(),
        isMockKiddy: env.get('RABBIT_MOCK_KIDDY').required().asBool(),
        //isMockDataSources: env.get('RABBIT_MOCK_DATASOURCES').required().asBool(),
        //isAllMock: env.get('RABBIT_MOCK_ALL_MOCK').required().asBool(),
        
    },
   dataSources,
  
    


};

const obj:Map<string,string> = new Map();
obj.set(dataSources.aka, configEnv.proxy.aka_uri)
obj.set(dataSources.city,configEnv.proxy.city_uri)
obj.set(dataSources.sf,configEnv.proxy.souf_uri)
obj.set(dataSources.es,configEnv.proxy.eight_socks_uri)
//config['urlSources'] = obj;

const config= Object.assign(configEnv,{urlSources: obj})

export default config;
