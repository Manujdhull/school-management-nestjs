import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentProfileModel } from '../../databases/models/student.model';
import { Transaction } from 'sequelize';

@Injectable()
export class StudentProfileService {
  constructor(@InjectModel(StudentProfileModel) public studentEntityModel: typeof StudentProfileModel) { }

  /**
     * Creates a new student entity in the database
     * @param studentEntity
     * @param transaction
     */
  public createStudentProfile(studentEntity: Pick<StudentProfileModel, 'parent_id' | 'student_id' | 'roll_number' | "dob">,
    studentId: number, transaction?: Transaction): Promise<StudentProfileModel> {
    return this.studentEntityModel.build().setAttributes({ ...studentEntity, student_id: Number(studentId) }).save({ transaction });
  }


  /**
     * Retrieves all student subjects for a given student ID
     * @param student_id
     */
  public async getStudentSubjects(student_id: number) {
    this.studentEntityModel.findAll({
      where: {
        student_id: student_id,
      },
    })
  }
}
