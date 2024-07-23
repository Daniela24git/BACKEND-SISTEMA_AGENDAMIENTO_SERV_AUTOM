import { DataSourceToken } from '@v1/shared/enum';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { EntityFromSystem } from '@v1/modules/entity-from-system/entities';

export const Repositories: Provider[] = [
  {
    provide: EntityFromSystem,
    useFactory: (ts: DataSource) => ts.getRepository(EntityFromSystem),
    inject: [DataSourceToken.B1],
  },
];
