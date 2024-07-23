import { Table } from '@v1/modules/appointments/enum';
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
import { AppointmentVehiclesVehicleEntity } from '@v1/modules/appointments/entities/appointment-vehicles-vehicle.entity';
import { CreateAppointmentDto } from '@v1/modules/appointments/dto';

@Entity(Table.appointment, {
  name: Table.appointment,
  schema: Schema.public,
})
export class Appointment {
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

  @Factory((faker) =>
    faker.helpers
      .arrayElements([
        'EMITIDO',
        'EN PROCESO',
        'CANCELADO',
        'EXPIRADO',
        'FINALIZADO',
      ])
      .find((e) => e),
  )
  @Column('varchar', {
    name: 'status',
    length: 100,
  })
  status?: string;

  @Factory((faker) => faker.date.recent())
  @Column('timestamp', {
    name: 'scheduled_at',
  })
  scheduled_at?: Date;

  @Factory((faker) => faker.lorem.lines(2))
  @Column('varchar', {
    name: 'description',
    length: 500,
  })
  description?: string;

  @Factory((faker) => faker.date.recent())
  @Column('timestamp', {
    name: 'valid_until_at',
  })
  valid_until_at?: Date;

  @Factory((faker) => faker.lorem.lines(2))
  @Column('varchar', {
    name: 'reason',
    length: 500,
  })
  reason?: string;

  @OneToMany(() => AppointmentVehiclesVehicleEntity, (r) => r.appointment, {
    cascade: true,
  })
  appointmentVehicle?: AppointmentVehiclesVehicleEntity[];

  // @ManyToMany(() => Vehicle)
  // @JoinTable({
  //   name: Table.appointment_vehicles_vehicle,
  //   joinColumn: {
  //     name: 'appointment_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'vehicle_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // vehicles: Relation<Vehicle>[];

  constructor(props?: Partial<CreateAppointmentDto>) {
    this.status = props?.status;
    this.scheduled_at = new Date(props?.scheduled_at);
    this.description = props?.description;
    this.valid_until_at = new Date(props?.valid_until_at);
    this.reason = props?.reason;
    this.appointmentVehicle = props?.appointmentVehicle;
  }
}
