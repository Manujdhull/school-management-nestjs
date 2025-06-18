import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseResource {
  @ApiProperty()
  @Expose()
  public id: number;

  @ApiProperty({ type: Date })
  @Expose()
  public created_at: Date;

  @ApiProperty({ type: Date })
  @Expose()
  public updated_at: Date;
}
