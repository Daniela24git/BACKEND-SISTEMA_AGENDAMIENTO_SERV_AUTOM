import { Table } from '@v1/modules/vehicles/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Factory } from 'nestjs-seeder';
import { PartialType } from '@nestjs/swagger';
import { AppointmentVehiclesVehicleEntity } from '@v1/modules/appointments/entities';
import { VehicleProductsProductEntity } from '@v1/modules/vehicles/entities/vehicle-products-product.entity';

@Entity(Table.vehicle, {
  name: Table.vehicle,
  schema: Schema.public,
})
export class Vehicle {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: 'updated_at',
  })
  updated_at?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    comment: 'deleted_at',
  })
  deleted_at?: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: 'created_at',
  })
  created_at?: Date;

  @Factory((faker) => faker.vehicle.vin())
  @Column('varchar', {
    name: 'plate',
    length: 255,
  })
  plate?: string;

  @Factory((faker) => faker.vehicle.type())
  @Column('varchar', {
    name: 'type',
    length: 255,
  })
  type?: string;

  @Factory((faker) => faker.vehicle.fuel())
  @Column('varchar', {
    name: 'fuel',
    length: 255,
  })
  fuel?: string;

  @Factory((faker) => faker.commerce.price())
  @Column('decimal', {
    name: 'mileage',
  })
  mileage?: number;

  @Factory((faker) =>
    faker.helpers.arrayElements(['EN DESUSO', 'PARA USO']).find((e) => e),
  )
  @Column('varchar', {
    name: 'status',
    length: 255,
  })
  status?: string;

  @Factory((faker) => faker.location.county())
  @Column('varchar', {
    name: 'made_in',
    length: 255,
  })
  made_in?: string;

  @Factory((faker) => faker.date.recent())
  @Column('timestamp', {
    name: 'warranty_up_to',
  })
  warranty_up_to?: Date;

  @Factory((faker) => faker.date.recent())
  @Column('timestamp', {
    name: 'next_review_at',
  })
  next_review_at?: Date;

  @OneToMany(() => AppointmentVehiclesVehicleEntity, (r) => r.vehicle, {
    cascade: true,
  })
  appointmentVehicle?: AppointmentVehiclesVehicleEntity[];

  @OneToMany(() => VehicleProductsProductEntity, (p) => p.vehicle, {
    cascade: true,
  })
  vehicleProductsProduct?: VehicleProductsProductEntity[];

  constructor(opts?: PartialType<Vehicle>) {
    this.id = opts?.id;
    this.updated_at = opts?.updated_at;
    this.deleted_at = opts?.deleted_at;
    this.created_at = opts?.created_at;
    this.plate = opts?.plate;
    this.type = opts?.type;
    this.fuel = opts?.fuel;
    this.mileage = parseFloat(opts?.mileage);
    this.status = opts?.status;
    this.made_in = opts?.made_in;
    this.warranty_up_to = opts?.warranty_up_to;
    this.next_review_at = opts?.next_review_at;
    this.appointmentVehicle = opts?.appointmentVehicle;
    this.vehicleProductsProduct = opts?.vehicleProductsProduct;
  }
}
