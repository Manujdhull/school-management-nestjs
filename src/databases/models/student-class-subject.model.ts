import { Column, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { UserModel } from "./user.model";
import { ClassModel } from "./class.model";
import { SubjectModel } from "./subject.model";
import { SectionModel } from "./section.model";

@Table({ tableName: 'student_class_subjects' })
export class StudentClassSubjectModel extends BaseModel<StudentClassSubjectModel> {
  @ForeignKey(() => UserModel)
  @Column({ type: "INTEGER" })
  public studentId: number;

  @ForeignKey(() => ClassModel)
  @Column({ type: "INTEGER" })
  public classId: number;

  @ForeignKey(() => SubjectModel)
  @Column({ type: "INTEGER" })
  public subjectId: number;

  @ForeignKey(() => SectionModel)
  @Column({ type: "INTEGER" })
  public sectionId: number;
}