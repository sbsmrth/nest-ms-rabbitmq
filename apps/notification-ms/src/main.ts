import { NestFactory } from '@nestjs/core';
import { NotificationMsModule } from './notification-ms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationMsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: envs.rabbitmqUrls,
        queue: envs.rmqNotificationClientQueue,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
