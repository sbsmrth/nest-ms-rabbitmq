import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { RabbitMqModule } from './transports/rabbitmq.module';

@Module({
  imports: [OrdersModule, RabbitMqModule],
})
export class ApiGatewayModule {}
