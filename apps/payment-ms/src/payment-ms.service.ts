import { Injectable } from '@nestjs/common';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Injectable()
export class PaymentMsService {
  processPayment(orderDto: ProcessPaymentDto) {
    console.log('[PaymentService] Processing payment... ', orderDto);
  }
}
