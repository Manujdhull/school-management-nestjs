import { ApiProperty } from "@nestjs/swagger";
import { RoleResource } from "./role.resource";
import { Expose, Type } from "class-transformer";

export class RoleListResource {
  @ApiProperty({ type: RoleResource, isArray: true })
  @Expose()
  @Type(() => RoleResource)
  public role: RoleResource[];
}