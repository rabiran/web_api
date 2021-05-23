


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
        
    },
    dataSources,
    token:{
        isMockSpike: env.get('SPIKE_MOCK').required().asBool(),
        redisUrl: env.get('REDIS_URL').required().asString(),
        spikeUrl: env.get('SPIKE_URL').required().asString(),
        clientID: env.get('SPIKE_CLIENT_ID').required().asString(),
        clientSecret: env.get('SPIKE_CLIENT_SECRET').required().asString(),
        audience: env.get('AUDIENCE').required().asString(),
        clientIDAka: env.get('SPIKE_CLIENT_ID_AKA').required().asString(),
        clientSecretAka: env.get('SPIKE_CLIENT_SECRET_AKA').required().asString(),
        audeienceAka: env.get('AUDIENCE_AKA').required().asString(),

        clientIDSouf: env.get('SPIKE_CLIENT_ID_SOUF').required().asString(),
        clientSecretSouf: env.get('SPIKE_CLIENT_SECRET_SOUF').required().asString(),
        audeienceSouf: env.get('AUDIENCE_SOUF').required().asString(),

        clientIDCity: env.get('SPIKE_CLIENT_ID_CITY').required().asString(),
        clientSecretCity: env.get('SPIKE_CLIENT_SECRET_CITY').required().asString(),
        audeienceCity: env.get('AUDIENCE_CITY').required().asString(),

        clientIDEightSocks: env.get('SPIKE_CLIENT_ID_EIGHT_SOCKS').required().asString(),
        clientSecretEightSocks: env.get('SPIKE_CLIENT_SECRET_EIGHT_SOCKS').required().asString(),
        audeienceEightSocks: env.get('AUDIENCE_EIGHT_SOCKS').required().asString(),



    }
   
  
    


};

const obj:Map<string,string> = new Map();
obj.set(dataSources.aka, configEnv.proxy.aka_uri)
obj.set(dataSources.city,configEnv.proxy.city_uri)
obj.set(dataSources.sf,configEnv.proxy.souf_uri)
obj.set(dataSources.es,configEnv.proxy.eight_socks_uri)

const config= Object.assign(configEnv,{urlSources: obj})

export default config;
