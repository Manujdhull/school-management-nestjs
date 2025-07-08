import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { UserResource } from "./user.resource";
import { PaginatedResource } from "../../common/resources/paginated.resource";

export class UsersPaginatedResource extends PaginatedResource<UserResource> {
  @ApiProperty({ type: UserResource, isArray: true })
  @Expose()
  @Type(() => UserResource)
  public items: UserResource[];
}