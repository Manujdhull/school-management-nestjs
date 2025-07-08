import { ApiProperty } from "@nestjs/swagger";
import { BaseResource } from "../../common/resources/base.resource";
import { Expose } from "class-transformer";

export class ClassResource extends BaseResource {
  @ApiProperty()
  @Expose()
  public name: string;
}