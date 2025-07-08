import { Column, DataType, Table, Unique } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ tableName: 'subjects' })
export class SubjectModel extends BaseModel<SubjectModel> {
  @Unique
  @Column(DataType.STRING)
  public name: string;
}