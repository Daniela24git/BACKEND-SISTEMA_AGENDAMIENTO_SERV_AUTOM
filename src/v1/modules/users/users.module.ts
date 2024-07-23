import { Global, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from '@v1/modules/users/controllers';
import { Repositories } from '@v1/modules/users/providers/repositories';

@Global()
@Module({
  controllers: [UsersController],
  providers: [...Repositories, UsersService],
  exports: [...Repositories],
})
export class UsersModule {}
