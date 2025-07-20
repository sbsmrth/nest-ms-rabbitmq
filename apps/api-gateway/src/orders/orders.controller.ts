import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { RABBITMQ_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(RABBITMQ_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    this.client.send('create_order', createOrderDto);

    return { message: 'Order creation request sent' };
  }
}
