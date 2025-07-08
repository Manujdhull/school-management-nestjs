import { Column, DataType } from "sequelize-typescript";
import { BaseModel } from "./base.model";

export class ClassModel extends BaseModel<ClassModel> {
  @Column(DataType.STRING)
  public name: string;
}