import { Inject, Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Appointment } from '@v1/modules/appointments/entities';

@Injectable()
export class AppointmentsSeeder implements Seeder {
  constructor(
    @Inject(Appointment) private readonly repos: Repository<Appointment>,
  ) {}

  async seed(): Promise<any> {
    const appointments = DataFactory.createForClass(Appointment)
      .generate(100)
      .map((e) => e as DeepPartial<any>);
    return this.repos.save(appointments);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
