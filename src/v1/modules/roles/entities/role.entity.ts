import { Table } from '@v1/modules/roles/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { RolePermission } from '@v1/modules/users/entities';

@Entity(Table.role, {
  name: Table.role,
  schema: Schema.public,
})
export class Role {
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
  })
  name?: string;

  @OneToMany(() => RolePermission, (photo) => photo.permission)
  role_permissions: Relation<RolePermission>[];
}
