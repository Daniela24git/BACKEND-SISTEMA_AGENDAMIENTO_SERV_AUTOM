import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EntityFromSystemService } from '../services/entity-from-system.service';
import { CreateEntityFromSystemDto } from '../dto/create-entity-from-system.dto';
import { UpdateEntityFromSystemDto } from '../dto/update-entity-from-system.dto';

@Controller('entities')
export class EntityFromSystemController {
  constructor(private readonly entitiesService: EntityFromSystemService) {}

  @Post()
  create(@Body() createEntityDto: CreateEntityFromSystemDto) {
    return this.entitiesService.create(createEntityDto);
  }

  @Get()
  findAll() {
    return this.entitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityFromSystemDto,
  ) {
    return this.entitiesService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entitiesService.remove(+id);
  }
}
