import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  RABBITMQ_URLS: string[];
  QUEUE: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    QUEUE: joi.string().required(),
    RABBITMQ_URLS: joi.array().items(joi.string()).required(),
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
  // port: envVars.PORT,
  rabbitmqUrls: envVars.RABBITMQ_URLS,
  queue: envVars.QUEUE,
  port: envVars.PORT,
};
