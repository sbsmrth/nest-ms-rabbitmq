import { IsString } from 'class-validator';

export class ProcessPaymentDto {
  @IsString()
  orderId: string;

  @IsString()
  paymentMethod: string;

  @IsString()
  amount: string;

  @IsString()
  currency: string;
}
