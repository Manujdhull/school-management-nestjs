import { ApiProperty } from "@nestjs/swagger";
import { ClassResource } from "./class.resource";
import { Expose, Type } from "class-transformer";

export class ClassListResource {
  @ApiProperty({ type: ClassResource, isArray: true })
  @Type(() => ClassResource)
  @Expose()
  public class: ClassResource[];
}