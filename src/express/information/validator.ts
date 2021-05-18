import { Request } from 'express';

export class InformationValidator {
    static async somethingThatIsImpossibleToValidateWithSchema(_req: Request) {
        // Some validations
    }
}

export default InformationValidator;
