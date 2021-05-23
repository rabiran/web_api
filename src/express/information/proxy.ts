import axios from 'axios';

import config from '../../config/index';
import { ServerError } from '../../helpers/errorHandler';
import {getSpikeToken} from '../../spike/spike'

export class InformationProxy {
    static async getInformation(dataSource: any,parameter:string, value:any) {
        let header:any={url:config.urlSources.get(dataSource)+"/"+parameter+"/"+value}

        if(config.proxy.is_outside){
             header = {headers: {'authorization': "123"} , url:config.urlSources.get(dataSource)+"/"+parameter+"/"+value }
        }
        
        const persons: any = await axios(header).catch((_) => {
            throw new ServerError(500, 'Cannot connect with proxy');
        });
        if(persons === undefined || persons.data === undefined){
            return [];
        }
        return persons.data;
    }
}

export default InformationProxy;
