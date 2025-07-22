import { ApiProperty } from "@nestjs/swagger";
import { IsClassExists } from "../../classes/validators/is-class-exists.validator";
import { IsSectionExists } from "../../section/validators/is-section-exists.validator";
import { T } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudentProfileDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public student_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public parent_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public roll_number: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  public dob: Date;
}