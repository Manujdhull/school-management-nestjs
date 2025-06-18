import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class SuccessResource{
    @ApiProperty()
    @Expose()
    public status = 'ok'
}