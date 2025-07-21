import { Controller } from '@nestjs/common';
import { NotificationMsService } from './notification-ms.service';
import { MessagePattern } from '@nestjs/microservices';
import { OrderDto } from './dto/order.dto';

@Controller()
export class NotificationMsController {
  constructor(private readonly notificationMsService: NotificationMsService) {}

  @MessagePattern('order-created')
  orderCreated(orderDto: OrderDto) {
    return this.notificationMsService.orderCreated(orderDto);
  }

  @MessagePattern('payment-succeeded')
  paymentSucceeded(orderDto: OrderDto) {
    return this.notificationMsService.paymentSucceeded(orderDto);
  }
}
