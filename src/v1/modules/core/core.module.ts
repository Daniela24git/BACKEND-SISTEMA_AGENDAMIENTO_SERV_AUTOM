import { Module } from '@nestjs/common';
import { CoreService } from './services/core.service';
import { CoreController } from '@v1/modules/core/controllers';

@Module({
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
