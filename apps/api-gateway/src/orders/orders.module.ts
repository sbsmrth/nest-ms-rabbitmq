import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { RabbitMqModule } from '../transports/rabbitmq.module';

@Module({
  controllers: [OrdersController],
  imports: [RabbitMqModule],
})
export class OrdersModule {}
