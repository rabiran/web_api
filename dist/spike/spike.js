"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpikeTokenEightSocks = exports.getSpikeTokenCity = exports.getSpikeTokenSouf = exports.getSpikeTokenAka = exports.getSpikeToken = exports.configureSpikeRedis = void 0;
const spike_get_token_1 = __importDefault(require("spike-get-token"));
const getDSToken_1 = __importDefault(require("../config/getDSToken"));
const index_1 = __importDefault(require("../config/index"));
const dataSources_1 = require("../config/dataSources");
let getTokenAka;
let getTokenSouf;
let getTokenCity;
let getTokenEightSocks;
const configureSpikeRedis = () => {
    getTokenAka = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientIDAka, index_1.default.token.clientSecretAka, index_1.default.token.audeienceAka, "tokenAka"));
    getTokenSouf = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientIDSouf, index_1.default.token.clientSecretSouf, index_1.default.token.audeienceSouf, "tokenSouf"));
    getTokenCity = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientIDCity, index_1.default.token.clientSecretCity, index_1.default.token.audeienceCity, "tokenCity"));
    getTokenEightSocks = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientIDEightSocks, index_1.default.token.clientSecretEightSocks, index_1.default.token.audeienceEightSocks, "tokenEightSocks"));
};
exports.configureSpikeRedis = configureSpikeRedis;
const getSpikeToken = async (dataSourceName) => {
    switch (dataSourceName) {
        case dataSources_1.dataSources.aka:
            return await getTokenAka();
        case dataSources_1.dataSources.sf:
            return await getTokenSouf();
        case dataSources_1.dataSources.city:
            return await getTokenCity();
        case dataSources_1.dataSources.es:
            return await getTokenEightSocks();
        default:
            return null;
    }
};
exports.getSpikeToken = getSpikeToken;
const getSpikeTokenAka = async () => {
    return await getTokenAka();
};
exports.getSpikeTokenAka = getSpikeTokenAka;
const getSpikeTokenSouf = async () => {
    return await getTokenSouf();
};
exports.getSpikeTokenSouf = getSpikeTokenSouf;
const getSpikeTokenCity = async () => {
    return await getTokenCity();
};
exports.getSpikeTokenCity = getSpikeTokenCity;
const getSpikeTokenEightSocks = async () => {
    return await getTokenEightSocks();
};
exports.getSpikeTokenEightSocks = getSpikeTokenEightSocks;
exports.default = { configureSpikeRedis: exports.configureSpikeRedis, getSpikeTokenAka: exports.getSpikeTokenAka, getSpikeTokenSouf: exports.getSpikeTokenSouf, getSpikeTokenCity: exports.getSpikeTokenCity, getSpikeTokenEightSocks: exports.getSpikeTokenEightSocks };
//# sourceMappingURL=spike.js.map