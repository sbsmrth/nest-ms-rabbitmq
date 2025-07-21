import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  RABBITMQ_URLS: string[];
  RMQ_NOTIFICATION_CLIENT_NAME: string;
  RMQ_NOTIFICATION_CLIENT_QUEUE: string;
}

const envsSchema = joi
  .object({
    RABBITMQ_URLS: joi.array().items(joi.string()).required(),
    RMQ_NOTIFICATION_CLIENT_NAME: joi.string().required(),
    RMQ_NOTIFICATION_CLIENT_QUEUE: joi.string().required(),
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
  rmqNotificationClientName: envVars.RMQ_NOTIFICATION_CLIENT_NAME,
  rmqNotificationClientQueue: envVars.RMQ_NOTIFICATION_CLIENT_QUEUE,
};
