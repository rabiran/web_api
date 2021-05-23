import  getTokenCreator from "spike-get-token";
import options from '../config/getDSToken';
import config from '../config/index';
import {dataSources} from '../config/dataSources';

let getTokenAka;
let getTokenSouf;
let getTokenCity;
let getTokenEightSocks;

export const configureSpikeRedis = () => {
    getTokenAka = getTokenCreator(options(config.token.clientIDAka,config.token.clientSecretAka,config.token.audeienceAka,"tokenAka"));

    getTokenSouf= getTokenCreator(options(config.token.clientIDSouf,config.token.clientSecretSouf,config.token.audeienceSouf,"tokenSouf"));

    getTokenCity= getTokenCreator(options(config.token.clientIDCity,config.token.clientSecretCity,config.token.audeienceCity,"tokenCity"));

    getTokenEightSocks= getTokenCreator(options(config.token.clientIDEightSocks,config.token.clientSecretEightSocks,config.token.audeienceEightSocks,"tokenEightSocks"));
}
export const getSpikeToken = async(dataSourceName:string) =>{
    switch (dataSourceName) {
        case dataSources.aka:
            return await getTokenAka();
        case dataSources.sf:
            return await getTokenSouf();
        case dataSources.city:
            return await getTokenCity();
        case dataSources.es:
            return await getTokenEightSocks();
        
    
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

export default { configureSpikeRedis , getSpikeTokenAka,getSpikeTokenSouf, getSpikeTokenCity,getSpikeTokenEightSocks }
