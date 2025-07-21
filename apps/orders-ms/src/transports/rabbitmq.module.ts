import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: envs.rmqNotificationClientName,
        transport: Transport.RMQ,
        options: {
          urls: envs.rabbitmqUrls,
          queue: envs.rmqNotificationClientQueue,
          queueOptions: {
            durable: true, // Keep the queue after rabbitmq restarts
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: envs.rmqPaymentClientName,
        transport: Transport.RMQ,
        options: {
          urls: envs.rabbitmqUrls,
          queue: envs.rmqPaymentClientQueue,
          queueOptions: {
            durable: true, // Keep the queue after rabbitmq restarts
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMqModule {}
