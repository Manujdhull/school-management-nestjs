import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export abstract class PaginatedResource<T> {
  abstract items: T[];

  @ApiProperty({
    description:
      'starting point of count (respect to total count) for current page',
  })
  @Expose()
  offset: number;

  @ApiProperty()
  @Expose()
  totalItems: number; // total number of items across all pages

  @ApiProperty()
  @Expose()
  totalPages: number; // total pages respect to item count per page

  @ApiProperty()
  @Expose()
  itemCount: number; // per page items

  @ApiProperty()
  @Expose()
  page: number; // current page being showed
}
