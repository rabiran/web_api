import { Router } from 'express';
import InformationController from './controller';
import InformationValidator from './validator';
import { wrapController, wrapValidator } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import { getInformationRequestSchema } from './validator.schema';

const informationRouter: Router = Router();

//featureRouter.get('/information', ValidateRequest(getInformationRequestSchema), wrapController(InformationController.getInformation));
informationRouter.get('/information/:dataSource', ValidateRequest(getInformationRequestSchema), wrapValidator(InformationValidator.somethingThatIsImpossibleToValidateWithSchema), wrapController(InformationController.getInformation));

export default informationRouter;
