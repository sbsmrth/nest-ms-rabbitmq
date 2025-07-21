import { Module } from '@nestjs/common';
import { PaymentMsController } from './payment-ms.controller';
import { PaymentMsService } from './payment-ms.service';
import { RabbitMqModule } from './transports/rabbitmq.module';

@Module({
  imports: [RabbitMqModule],
  controllers: [PaymentMsController],
  providers: [PaymentMsService],
})
export class PaymentMsModule {}
