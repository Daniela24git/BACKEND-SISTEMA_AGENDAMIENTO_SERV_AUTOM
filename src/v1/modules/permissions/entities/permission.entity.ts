import { Table } from '@v1/modules/permissions/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';

@Entity(Table.permission, {
  name: Table.permission,
  schema: Schema.public,
})
export class Permission {
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
    name: 'active',
    nullable: true,
  })
  active?: boolean;

  @Column('varchar', {
    name: 'name',
    length: 100,
    unique: true,
  })
  name?: string;
}
