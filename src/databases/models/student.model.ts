import { Column, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { UserModel } from "./user.model";

@Table({ tableName: 'students' })
export class StudentProfileModel extends BaseModel<StudentProfileModel> {
  @ForeignKey(() => UserModel)
  @Column({ type: "INTEGER" })
  public student_id: number;

  @ForeignKey(() => UserModel)
  @Column({ type: "INTEGER" })
  public parent_id: number;

  @Column({ type: "STRING" })
  public roll_number: string;

  @Column({ type: "DATE" })
  public dob: Date | null;
}