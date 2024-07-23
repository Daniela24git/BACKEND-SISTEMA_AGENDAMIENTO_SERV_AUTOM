import { IsOptional, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { VehicleProductsProductDto } from '@v1/modules/vehicles/dto/vehicle-products-product.dto';

export class CreateVehicleDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  updated_at?: string;

  @IsOptional()
  deleted_at?: string;

  @IsOptional()
  created_at?: string;

  @IsOptional()
  plate?: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  fuel?: string;

  @IsOptional()
  mileage?: number;

  @IsOptional()
  status?: string;

  @IsOptional()
  made_in?: string;

  @IsOptional()
  warranty_up_to?: string;

  @IsOptional()
  next_review_at?: string;

  @Type(() => VehicleProductsProductDto)
  @ValidateNested({ each: true })
  vehicleProductsProduct: VehicleProductsProductDto[];

  constructor(opts?: PartialType<CreateVehicleDto>) {
    this.id = opts?.id;
    this.updated_at = opts?.updated_at;
    this.deleted_at = opts?.deleted_at;
    this.created_at = opts?.created_at;
    this.plate = opts?.plate;
    this.type = opts?.type;
    this.fuel = opts?.fuel;
    this.mileage = opts?.mileage;
    this.status = opts?.status;
    this.made_in = opts?.made_in;
    this.warranty_up_to = opts?.warranty_up_to;
    this.next_review_at = opts?.next_review_at;
  }
}
