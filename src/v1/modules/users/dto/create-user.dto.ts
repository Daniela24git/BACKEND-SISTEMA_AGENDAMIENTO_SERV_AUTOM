import { IsString, ValidateNested } from 'class-validator';
import { RoleDto } from '@v1/modules/users/dto/role.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  address: string;

  @IsString()
  birth_date: string;

  @IsString()
  email: string;

  @IsString()
  identification: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @Type(() => RoleDto)
  @ValidateNested({ each: true })
  roles: RoleDto[];

  @IsString()
  status: string;
}
