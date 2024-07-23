import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoleDto } from '@v1/modules/users/dto/role.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  id: number;

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
