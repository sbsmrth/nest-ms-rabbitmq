import { NestFactory } from '@nestjs/core';
import { OrdersMsModule } from './orders-ms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('OrdersMsMain');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersMsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: envs.rabbitmqUrls,
        queue: envs.rmqOrdersClientQueue,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
  logger.log('Orders Microservice is running');
}
bootstrap();
