import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUniqueEmail } from '../../user/validators/unique-email.validator';
import { RoleTypeNames } from '../../databases/models/role.model';
import { Type } from 'class-transformer';
import { IsRoleExists } from '../validators/is-role-exists.validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail({ require_tld: false })
  @MinLength(2)
  @IsUniqueEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  public password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'first_name should not be empty' })
  @IsString({ message: 'first_name must be a string' })
  @MinLength(2, {
    message: 'first_name must be longer than or equal to 2 characters',
  })
  @MaxLength(255, {
    message: 'first_name must be shorter than or equal to 255 characters',
  })
  public first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  public last_name: string;

  @ApiProperty({ enum: RoleTypeNames })
  @IsNotEmpty()
  @IsEnum(RoleTypeNames)
  // @IsRoleExists()
  public role: RoleTypeNames;
}
