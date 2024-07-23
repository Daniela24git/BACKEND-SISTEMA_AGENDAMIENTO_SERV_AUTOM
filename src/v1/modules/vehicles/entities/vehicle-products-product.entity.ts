import { Table } from '@v1/modules/vehicles/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Vehicle } from '@v1/modules/vehicles/entities/vehicle.entity';
import { Product } from '@v1/modules/products/entities';

@Entity(Table.vehicle_products_product, {
  name: Table.vehicle_products_product,
  schema: Schema.public,
})
export class VehicleProductsProductEntity {
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

  @Column('boolean', {
    name: 'repair',
    comment:
      'indica si este producto/servicio se debe reparar, child_id será el nuevo producto en el vehículo',
  })
  repair?: boolean;

  @ManyToOne(() => Vehicle, (v) => v.vehicleProductsProduct, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'vehicle_id',
  })
  vehicle?: Relation<Vehicle>;

  @ManyToOne(() => Product, (v) => v.vehicleProductsProduct, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'product_id',
  })
  product?: Product;

  @OneToOne(() => VehicleProductsProductEntity, {
    cascade: true,
  })
  @JoinColumn({
    name: 'child_id',
  })
  child?: VehicleProductsProductEntity;

  constructor(opts: Partial<VehicleProductsProductEntity>) {
    this.id = opts?.id;
    this.updated_at = opts?.updated_at;
    this.deleted_at = opts?.deleted_at;
    this.created_at = opts?.created_at;
    this.repair = opts?.repair;
    this.vehicle = opts?.vehicle;
    this.product = opts?.product;
    this.child = opts?.child;
  }
}
