import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
