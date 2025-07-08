import { ApiProperty } from "@nestjs/swagger";
import { BaseResource } from "../../common/resources/base.resource";
import { Expose, Type } from "class-transformer";
import { RoleResource } from "../../roles/resources/role.resource";

export class RegistrationResource extends BaseResource {
    @ApiProperty()
    @Expose()
    public email: string;

    @ApiProperty()
    @Expose()
    public first_name: string;

    @ApiProperty()
    @Expose()
    public last_name: string;

    @ApiProperty({ type: RoleResource, isArray: true })
    @Expose()
    @Type(() => RoleResource)
    public role: RoleResource[];

    @ApiProperty({ nullable: true, type: Date })
    @Expose()
    public verified_at: Date | null;

    @ApiProperty({ nullable: true, type: Date })
    @Expose()
    public deleted_at: Date | null;
}