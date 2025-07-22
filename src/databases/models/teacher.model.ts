import { Column, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { UserModel } from "./user.model";

@Table({ tableName: 'teachers' })
export class TeacherModel extends BaseModel<TeacherModel> {
  @ForeignKey(() => UserModel)
  @Column({ type: "INTEGER" })
  public declare teacher_id: number;

  @Column({ type: "STRING" })
  public phone_number: string;

  @Column({ type: "DATE" })
  public dob: Date | null;

  @Column({ type: "ENUM", values: ["male", "female", "other"] })
  public gender: string;

  @Column({ type: "STRING" })
  public address: string;

  @Column({ type: "STRING" })
  public city: string;

  @Column({ type: "STRING" })
  public state: string;

  @Column({ type: "STRING" })
  public pincode: string;

  @Column({ type: "DATE" })
  public deleted_at: Date | null;
}