import jwt from 'jsonwebtoken';
import util from 'util';
import fs from 'fs';
import path from 'path';
import { HttpError } from '../../helpers/errorHandler'
import config from '../../config/index';

const averify = util.promisify(jwt.verify);

export const isAuth = async (req, _, next) => {

    if(config.token.isMockSpike) return next();
    
    const token = req.header('Authorization');
    const key = fs.readFileSync(path.join(__dirname, '../../config/key.pem'));
    
    try {
        const payload = await averify(token, key.toString()).catch(_ => { throw new HttpError(401, 'Unauthorized'); });
        if(payload.aud !== config.token.audience)
            throw new HttpError(401, 'Unauthorized');
        
        return next();
    }
    catch(err) {
        return next(err);
    }
}


export default { isAuth }