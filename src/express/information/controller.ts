import { Request, Response } from 'express';
import config from '../../config/index';
import {sendRecord} from '../../rabbit/rabbit';
import mock from '../../config/mocks.json';
import createParamsPromises from '../../utils/createParamsPromises';
import promiseAllWithFails from '../../utils/promiseAllWithFails';

//import { readdirSync } from 'fs';

export class InformationController {
    static async getInformation(req: Request, res: Response) {
        if (config.proxy.isMock) {
            res.json(mock);
            return;
        }
        const dataSource =req.body.dataSource?.toString();
        let resultsPromises = createParamsPromises(req,dataSource);
        
        promiseAllWithFails(resultsPromises,undefined).then((results)=>{
            let data:any =[];
            for (let res of results) {             
                if(res !== undefined && res !== [] ){
                   
                    data = res;
                    break;
                }
    
            }
            if(!config.rabbit.isMockMatchToKart){
                for (let index = 0; index < data.length; index++) {
                    sendRecord(data[index], dataSource)
                    
                }
            }
            console.log(data)
            return data;
        }).catch((err)=> {throw err});
        console.log("hey")
        res.json("ok")
        

    }

    

}

export default InformationController;
