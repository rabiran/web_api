import  getTokenCreator from "spike-get-token";
import options from '../config/getDSToken';
import config from '../config/index';
import {dataSources} from '../config/dataSources';

let getTokenAka;
let getTokenSouf;
let getTokenCity;
let getTokenEightSocks;
let getTokenADNN;
let getTokenADS;

export const configureSpikeRedis = () => {
    getTokenAka = getTokenCreator(options(config.token.clientIDAka,config.token.clientSecretAka,config.token.audeienceAka,"tokenAka"));

    getTokenSouf= getTokenCreator(options(config.token.clientIDSouf,config.token.clientSecretSouf,config.token.audeienceSouf,"tokenSouf"));

    getTokenCity= getTokenCreator(options(config.token.clientIDCity,config.token.clientSecretCity,config.token.audeienceCity,"tokenCity"));

    getTokenEightSocks = getTokenCreator(options(config.token.clientIDEightSocks,config.token.clientSecretEightSocks,config.token.audeienceEightSocks,"tokenEightSocks"));

    getTokenADS= getTokenCreator(options(config.token.clientIDADS,config.token.clientSecretADS,config.token.audeienceADS,"tokenADS"));

    getTokenADNN= getTokenCreator(options(config.token.clientIDADnn,config.token.clientSecretADnn,config.token.audeienceADnn,"tokenADnn"));


}
export const getSpikeToken = async(dataSourceName:string) =>{
    switch (dataSourceName) {
        case dataSources.aka:
            return await getSpikeTokenAka();
        case dataSources.sf:
            return await getSpikeTokenSouf();
        case dataSources.city:
            return await getSpikeTokenCity();
        case dataSources.es:
            return await getSpikeTokenEightSocks();
        case dataSources.ads:
            return await getSpikeTokenADS();
        case dataSources.adNN:
            return await getSpikeTokenADnn(); 
    
        default:
            return null;
    }
}

export const getSpikeTokenAka = async () => {
    return await getTokenAka();
}
export const getSpikeTokenSouf = async () => {
    return await getTokenSouf();
}
export const getSpikeTokenCity = async () => {
    return await getTokenCity();
}

export const getSpikeTokenEightSocks = async () => {
    return await getTokenEightSocks();
}
export const getSpikeTokenADS = async () => {
    return await getTokenADS();
}
export const getSpikeTokenADnn= async () => {
    return await getTokenADNN();
}

export default { configureSpikeRedis ,getSpikeToken, getSpikeTokenAka,getSpikeTokenSouf, getSpikeTokenCity,getSpikeTokenEightSocks }
