import { ApiProperty } from "@nestjs/swagger";
import { SectionResource } from "./section.resource";
import { Expose, Type } from "class-transformer";

export class SectionListResource {
  @ApiProperty({ type: SectionResource, isArray: true })
  @Expose()
  @Type(() => SectionResource)
  public section: SectionResource[];
}