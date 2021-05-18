import { Request, Response } from 'express';
import { InformationProxy } from './proxy';
import config from '../../config/index';

import mock from '../../config/mocks.json';
//import { readdirSync } from 'fs';

export class InformationController {
    static async getInformation(req: Request, res: Response) {
        if (config.proxy.mock) {
            res.json(mock);
            return;
        }
        const data = await InformationProxy.getInformation(req.query.dataSource?.toString());
        res.json(data);
    }

    // static async createFolder(req: Request, res: Response) {
    //     res.json(await InformationProxy.createFolder(req.body));
    // }
}

export default InformationController;
