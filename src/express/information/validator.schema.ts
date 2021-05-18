import * as Joi from 'joi';

// GET /api/forlders?name=test1
export const getInformationRequestSchema = Joi.object({
    query: {},
    body: {},
    params: { dataSource: Joi.string().required() },
});
