import { Global, Module } from '@nestjs/common';
import { EntityFromSystemService } from './services/entity-from-system.service';
import { EntityFromSystemController } from './controllers/entity-from-system.controller';
import { Repositories } from '@v1/modules/entity-from-system/providers/repositories';

@Global()
@Module({
  controllers: [EntityFromSystemController],
  providers: [...Repositories, EntityFromSystemService],
  exports: [...Repositories, EntityFromSystemService],
})
export class EntityFromSystemModule {}
