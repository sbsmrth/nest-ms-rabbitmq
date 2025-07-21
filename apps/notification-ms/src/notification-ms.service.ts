import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class NotificationMsService {
  orderCreated(orderDto: OrderDto) {
    console.log(
      '[NotificationService] Received order created event: ',
      orderDto,
    );
  }

  paymentSucceeded(orderDto: OrderDto) {
    console.log(
      '[NotificationService] Received payment succeeded event: ',
      orderDto,
    );
  }
}
