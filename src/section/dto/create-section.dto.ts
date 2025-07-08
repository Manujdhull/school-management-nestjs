import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSectionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
