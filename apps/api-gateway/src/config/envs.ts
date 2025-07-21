import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  API_GATEWAY_PORT: number;
  RABBITMQ_URLS: string[];
  RMQ_ORDERS_CLIENT_NAME: string;
  RMQ_ORDERS_CLIENT_QUEUE: string;
}

const envsSchema = joi
  .object({
    API_GATEWAY_PORT: joi.number().required(),
    RABBITMQ_URLS: joi.array().items(joi.string()).required(),
    RMQ_ORDERS_CLIENT_NAME: joi.string().required(),
    RMQ_ORDERS_CLIENT_QUEUE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  RABBITMQ_URLS: process.env.RABBITMQ_URLS?.split(','),
}) as { error?: joi.ValidationError; value: EnvVars };

if (error) {
  console.error('Validation error for .env variables:', error.message);
}

const envVars = value;

export const envs = {
  rabbitmqUrls: envVars.RABBITMQ_URLS,
  apiGatewayPort: envVars.API_GATEWAY_PORT,
  rmqOrdersClientName: envVars.RMQ_ORDERS_CLIENT_NAME,
  rmqOrdersClientQueue: envVars.RMQ_ORDERS_CLIENT_QUEUE,
};
