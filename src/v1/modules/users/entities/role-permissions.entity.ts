import { Table } from '@v1/modules/users/enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Permission } from '@v1/modules/permissions/entities';
import { EntityFromSystem } from '@v1/modules/entity-from-system/entities';
import { Role } from '@v1/modules/roles/entities';

@Entity(Table.role_permission, {
  name: Table.role_permission,
  schema: Schema.public,
  comment: 'los permisos que va a tener cada rol.',
})
export class RolePermission {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('int', {
    name: 'role_id',
  })
  @JoinColumn({
    name: 'role_id',
  })
  role_id?: number;

  @Column('int', {
    name: 'permission_id',
  })
  @JoinColumn({
    name: 'permission_id',
  })
  permission_id?: number;

  @Column('int', {
    name: 'entity_from_system_id',
  })
  @JoinColumn({
    name: 'entity_from_system_id',
  })
  entity_from_system_id?: number;

  @ManyToOne(() => Role)
  @JoinColumn({
    name: 'role_id',
  })
  role?: Role;

  @ManyToOne(() => Permission)
  @JoinColumn({
    name: 'permission_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'permission_id',
  })
  permission?: Permission;

  @ManyToOne(() => EntityFromSystem)
  @JoinColumn({
    name: 'entity_from_system_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'entity_from_system_id',
  })
  entity_from_system?: EntityFromSystem;
}
