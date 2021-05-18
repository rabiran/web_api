import { Request, Response } from 'express';
import { InformationProxy } from './proxy';
import config from '../../config/index';
import {sendRecord} from '../../rabbit/rabbit';
import mock from '../../config/mocks.json';
//import { readdirSync } from 'fs';

export class InformationController {
    static async getInformation(req: Request, res: Response) {
        if (config.proxy.isMock) {
            res.json(mock);
            return;
        }
        const dataSource =req.params.dataSource?.toString();
        let {data} = await InformationProxy.getInformation(dataSource);
       console.log(data);
        if(config.rabbit.isMockMatchToKart){
            res.json(data);
            return;
        }
        for (let index = 0; index < data.length; index++) {
            sendRecord(data[index], dataSource)
            
        }
        res.json(data);
    }

}

export default InformationController;
