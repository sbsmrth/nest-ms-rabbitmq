import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { envs } from '../config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(envs.rmqNotificationClientName)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    this.client.emit('create_order', createOrderDto);

    // return { message: 'Order creation request sent' };
  }
}
