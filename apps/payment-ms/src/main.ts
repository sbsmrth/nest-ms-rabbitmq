import { NestFactory } from '@nestjs/core';
import { PaymentMsModule } from './payment-ms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('PaymentMsMain');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentMsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: envs.rabbitmqUrls,
        queue: envs.rmqPaymentClientQueue,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();

  logger.log('Payment Microservice is running');
}
bootstrap();
