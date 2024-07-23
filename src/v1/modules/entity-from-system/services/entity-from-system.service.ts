import { Injectable } from '@nestjs/common';
import { CreateEntityFromSystemDto } from '../dto/create-entity-from-system.dto';
import { UpdateEntityFromSystemDto } from '../dto/update-entity-from-system.dto';

@Injectable()
export class EntityFromSystemService {
  create(createEntityDto: CreateEntityFromSystemDto) {
    return 'This action adds a new entity';
  }

  findAll() {
    return `This action returns all entities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entity`;
  }

  update(id: number, updateEntityDto: UpdateEntityFromSystemDto) {
    return `This action updates a #${id} entity`;
  }

  remove(id: number) {
    return `This action removes a #${id} entity`;
  }
}
