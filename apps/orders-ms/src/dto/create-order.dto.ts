import { IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  items: string[];
}
