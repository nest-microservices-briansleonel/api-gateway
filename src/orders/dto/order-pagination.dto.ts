import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderStatusEnum } from '../enums/order-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
