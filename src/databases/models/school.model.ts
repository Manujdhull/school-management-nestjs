import { Column, Table, Unique } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({tableName: 'schools'})
export class SchoolModel extends BaseModel<SchoolModel>{
    @Column
    public name: string;

    @Column
    public location: string;

    @Column
    public contact_us: string;

    @Column
    public logo: string;
}