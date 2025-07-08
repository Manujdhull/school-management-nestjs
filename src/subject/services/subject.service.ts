import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubjectModel } from '../../databases/models/subject.model';
import { Transaction } from 'sequelize';

@Injectable()
export class SubjectService {
  constructor(@InjectModel(SubjectModel) public subjectModel: typeof SubjectModel) { }

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
  findOne(id: number): Promise<SubjectModel | null> {
    return this.subjectModel.findByPk(id, { rejectOnEmpty: true });
  }
}
