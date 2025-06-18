import { Column, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({tableName: 'user_entity_roles'})
export class UserEntityRolesModel extends BaseModel<UserEntityRolesModel>{
    @Column
    public user_id: number;

    @Column
    public role_id: number;
}