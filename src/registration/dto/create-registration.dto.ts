import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
import { IsUniqueEmail } from '../../user/validators/unique-email.validator';
import { VerifyClientCredentials } from '../../user/validators/verify-client-credentials.validator';
  
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
    @MinLength(2)
    @IsString()
    public password: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    @VerifyClientCredentials('client_secret')
    public client_id: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    public client_secret: string;
  
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
  }
  