import { Column, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { RoleModel } from "./role.model";
import { UserModel } from "./user.model";

@Table({ tableName: 'user_roles' })
export class UserRolesModel extends BaseModel<UserRolesModel> {
    @ForeignKey(() => UserModel)
    @Column
    public user_id: number;

    @ForeignKey(() => RoleModel)
    @Column
    public role_id: number;
}