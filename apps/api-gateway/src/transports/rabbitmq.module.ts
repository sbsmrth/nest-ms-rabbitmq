import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: envs.rmqOrdersClientName,
        transport: Transport.RMQ,
        options: {
          urls: envs.rabbitmqUrls,
          queue: envs.rmqOrdersClientQueue,
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
