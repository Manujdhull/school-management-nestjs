import { Column, DataType, Table, Unique } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ tableName: 'classes' })
export class ClassModel extends BaseModel<ClassModel> {
  @Unique
  @Column(DataType.STRING)
  public name: string;
}