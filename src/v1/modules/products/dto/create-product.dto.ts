import { IsOptional } from 'class-validator';
import { VehicleProductsProductDto } from '@v1/modules/vehicles/dto';

export class CreateProductDto {
  @IsOptional()
  vehicleProductsProduct?: VehicleProductsProductDto;
}
