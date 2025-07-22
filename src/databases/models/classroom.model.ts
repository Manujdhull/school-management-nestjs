import { Column, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { UserModel } from "./user.model";
import { F } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { ClassModel } from "./class.model";
import { SectionModel } from "./section.model";

@Table({ tableName: 'teachers' })
export class TeacherModel extends BaseModel<TeacherModel> {
  @ForeignKey(() => UserModel)
  @Column({ type: "INTEGER" })
  public declare teacher_id: number;

  @ForeignKey(() => ClassModel)
  @Column({ type: "INTEGER" })
  public declare class_id: number;

  @ForeignKey(() => SectionModel)
  @Column({ type: "INTEGER" })
  public declare section_id: number;




}