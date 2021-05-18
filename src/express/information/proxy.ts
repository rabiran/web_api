import axios from 'axios';

import config from '../../config/index';
import { ServerError } from '../../helpers/errorHandler';

export class InformationProxy {
    static async getInformation(dataSource: any) {
        let header={}
        if(config.proxy.is_outside){
             header = {headers: {'authorization': "123"} , url:config.urlSources.get(dataSource) }
        }
        console.log("hey");   
        console.log(config.urlSources.get(dataSource));
        
        const data: any = await axios(header).catch((err) => {
            console.log(err);
            throw new ServerError(500, 'Cannot connect with proxy');
        });
        return data;
    }

    // static async createFolder(req: Request, res: Response) {
    //     res.json(await InformationProxy.createFolder(req.body));
    // }
}

export default InformationProxy;
