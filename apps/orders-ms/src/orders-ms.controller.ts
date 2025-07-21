import { Controller, Inject } from '@nestjs/common';
import { OrdersMsService } from './orders-ms.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { envs } from './config';

@Controller()
export class OrdersMsController {
  constructor(
    @Inject(envs.rmqPaymentClientName)
    private readonly paymentRmqClient: ClientProxy,

    @Inject(envs.rmqNotificationClientName)
    private readonly notificationRmqClient: ClientProxy,

    private readonly ordersMsService: OrdersMsService,
  ) {}

  @MessagePattern('create_order')
  create(@Payload() createOrderDto: CreateOrderDto) {
    const order = this.ordersMsService.create(createOrderDto);

    this.paymentRmqClient.emit('process-payment', order);
    this.notificationRmqClient.emit('order-created', order);
  }
}
