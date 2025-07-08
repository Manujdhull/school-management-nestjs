import { Column, DataType, Table, Unique } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ tableName: 'sections' })
export class SectionModel extends BaseModel<SectionModel> {
  @Unique
  @Column(DataType.STRING)
  public name: string;
}