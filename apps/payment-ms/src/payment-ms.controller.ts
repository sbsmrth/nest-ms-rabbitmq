import { Controller, Inject } from '@nestjs/common';
import { PaymentMsService } from './payment-ms.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { envs } from './config';

@Controller()
export class PaymentMsController {
  constructor(
    @Inject(envs.rmqNotificationClientName)
    private readonly notificationRmqClient: ClientProxy,
    private readonly paymentMsService: PaymentMsService,
  ) {}

  @MessagePattern('process-payment')
  processPayment(@Payload() orderDto: ProcessPaymentDto) {
    this.paymentMsService.processPayment(orderDto);

    this.notificationRmqClient.emit('payment-succeeded', orderDto);
  }
}
