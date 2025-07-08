import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseResource } from "../../common/resources/base.resource";

export class RoleResource extends BaseResource {
  @ApiProperty()
  @Expose()
  public name: string;
}