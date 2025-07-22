import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubjectModel } from '../../databases/models/subject.model';
import { Transaction } from 'sequelize';
import { StudentProfileService } from '../../student-profile/services/student-entities.service';
import { UserModel } from '../../databases/models/user.model';

@Injectable()
export class SubjectService {
  constructor(@InjectModel(SubjectModel) public subjectModel: typeof SubjectModel, public studentProfile: StudentProfileService) { }

  /**
     * create the subject
     * @param subjectName 
     * @param transaction 
     * @returns 
     */
  public create(subjectName: Pick<SubjectModel, 'name'>, transaction?: Transaction) {
    return this.subjectModel.build().setAttributes({ name: subjectName.name }).save({ transaction });
  }

  /**
   * fetching all the subjects
   */
  public findAll(): Promise<SubjectModel[]> {
    return this.subjectModel.findAll();
  }

  /**
   * fetching subject with the id
   * @param id 
   */
  public findOne(id: number): Promise<SubjectModel | null> {
    return this.subjectModel.findByPk(id, { rejectOnEmpty: true });
  }

  /**
     * Retrieves the subjects associated with a specific user
     * @param user
     */
  public userSubjects(user: UserModel) {
    return this.studentProfile.getStudentSubjects(user.id);
  }
}
