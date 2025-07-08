import { Column, DataType } from "sequelize-typescript";
import { BaseModel } from "./base.model";

export class SectionModel extends BaseModel<SectionModel> {
  @Column(DataType.STRING)
  public name: string;
}