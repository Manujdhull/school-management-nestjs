import { ApiProperty } from "@nestjs/swagger";
import { BaseResource } from "../../common/resources/base.resource";
import { Expose } from "class-transformer";

export class SectionResource extends BaseResource {
  @ApiProperty({ type: String })
  @Expose()
  public name: string;
}