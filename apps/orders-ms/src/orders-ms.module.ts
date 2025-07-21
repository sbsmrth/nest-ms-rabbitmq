import { Module } from '@nestjs/common';
import { OrdersMsController } from './orders-ms.controller';
import { OrdersMsService } from './orders-ms.service';
import { RabbitMqModule } from './transports/rabbitmq.module';

@Module({
  imports: [RabbitMqModule],
  controllers: [OrdersMsController],
  providers: [OrdersMsService],
})
export class OrdersMsModule {}
