import { Schema } from '@v1/shared/enum';
import { Table } from '../enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(Table.entity_from_system, {
  name: Table.entity_from_system,
  schema: Schema.public,
})
export class EntityFromSystem {
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
