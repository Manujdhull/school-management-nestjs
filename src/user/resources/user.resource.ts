import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { BaseResource } from '../../common/resources/base.resource';

export class UserResource extends BaseResource {
  @Expose()
  @ApiProperty()
  public email: string;

  @Expose()
  @ApiProperty()
  public first_name: string;

  @Expose()
  @ApiProperty()
  public last_name: string | null;
}
