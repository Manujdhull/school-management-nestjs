import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  //todo: need to check the name is unique
  name: string;
}
