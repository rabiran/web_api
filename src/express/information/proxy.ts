import axios from 'axios';

import config from '../../config/index';
import { ServerError } from '../../helpers/errorHandler';

export class InformationProxy {
    static async getInformation(dataSource: any) {
        const data: any = await axios.get(`${config.proxy.uri}"/api/dataSource/${encodeURI(dataSource)}`).catch((err) => {
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
