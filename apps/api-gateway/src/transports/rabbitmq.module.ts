import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, RABBITMQ_SERVICE } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: envs.rabbitmqUrls,
          queue: envs.queue,
          queueOptions: {
            durable: true, // Keep the queue after rabbitmq restarts
          },
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: envs.rabbitmqUrls,
          queue: envs.queue,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
})
export class RabbitMqModule {}
