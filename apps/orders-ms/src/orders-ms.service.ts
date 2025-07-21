import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersMsService {
  create(createOrderDto: CreateOrderDto) {
    console.log('[OrderService] Received new order: ', createOrderDto);
    console.log('[OrderService] ... Processing order ...');

    const orderId = Math.floor(Math.random() * 10000);
    const paymentMethod = 'Credit Card';
    const amount = '100.00';
    const currency = 'USD';

    return {
      orderId: orderId.toString(),
      paymentMethod,
      amount,
      currency,
    };
  }
}
