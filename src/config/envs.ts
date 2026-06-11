import 'dotenv/config';
import * as joi from 'joi';

interface IEnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
}

const envVarsSchema: joi.ObjectSchema<IEnvVars> = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown();

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const env: IEnvVars = value;

export const envs = {
  port: env.PORT,
  productsMsHost: env.PRODUCTS_MICROSERVICE_HOST,
  productsMsPort: env.PRODUCTS_MICROSERVICE_PORT,
};
