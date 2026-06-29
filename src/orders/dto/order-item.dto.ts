import { IsNumber, IsPositive, IsUUID, Min } from 'class-validator';

export class OrderItemDto {
  @IsUUID()
  product_id: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;

  /*
  @IsNumber()
  @IsPositive()
  price: number;
  */
}
