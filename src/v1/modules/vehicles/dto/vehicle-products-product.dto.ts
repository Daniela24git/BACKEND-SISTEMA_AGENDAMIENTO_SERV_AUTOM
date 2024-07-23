import { IsOptional } from 'class-validator';
import { CreateProductDto } from '@v1/modules/products/dto';
import { CreateVehicleDto } from '@v1/modules/vehicles/dto/create-vehicle.dto';

export class VehicleProductsProductDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  updated_at?: string;

  @IsOptional()
  deleted_at?: string;

  @IsOptional()
  created_at?: string;

  @IsOptional()
  child_id?: number;

  @IsOptional()
  repair?: boolean;

  @IsOptional()
  vehicle_id?: string;

  @IsOptional()
  product_id?: string;

  @IsOptional()
  vehicle?: CreateVehicleDto;

  @IsOptional()
  product?: CreateProductDto;

  constructor(opts: Partial<VehicleProductsProductDto>) {
    this.id = opts?.id;
    this.updated_at = opts?.updated_at;
    this.deleted_at = opts?.deleted_at;
    this.created_at = opts?.created_at;
    this.child_id = opts?.child_id;
    this.repair = opts?.repair;
    this.vehicle_id = opts?.vehicle_id;
    this.product_id = opts?.product_id;
    this.vehicle = opts?.vehicle;
    this.product = opts?.product;
  }
}
