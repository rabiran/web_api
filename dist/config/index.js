"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configEnv = void 0;
const dataSources_1 = require("./dataSources");
require("./dotenv");
const env = __importStar(require("env-var"));
exports.configEnv = {
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
    dataSources: dataSources_1.dataSources,
};
const obj = new Map();
obj.set(dataSources_1.dataSources.aka, exports.configEnv.proxy.aka_uri);
obj.set(dataSources_1.dataSources.city, exports.configEnv.proxy.city_uri);
obj.set(dataSources_1.dataSources.sf, exports.configEnv.proxy.souf_uri);
obj.set(dataSources_1.dataSources.es, exports.configEnv.proxy.eight_socks_uri);
const config = Object.assign(exports.configEnv, { urlSources: obj });
exports.default = config;
//# sourceMappingURL=index.js.map