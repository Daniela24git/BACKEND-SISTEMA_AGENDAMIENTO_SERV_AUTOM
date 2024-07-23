import { Inject, Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Vehicle } from '@v1/modules/vehicles/entities';

@Injectable()
export class VehiclesSeeder implements Seeder {
  constructor(@Inject(Vehicle) private readonly repos: Repository<Vehicle>) {}

  async seed(): Promise<any> {
    const vehicles = DataFactory.createForClass(Vehicle)
      .generate(100)
      .map((e) => e as DeepPartial<any>);
    return this.repos.save(vehicles);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
