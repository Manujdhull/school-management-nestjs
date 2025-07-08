import { Column, DataType } from "sequelize-typescript";
import { BaseModel } from "./base.model";

export class SubjectModel extends BaseModel<SubjectModel> {
  @Column(DataType.STRING)
  public name: string;
}