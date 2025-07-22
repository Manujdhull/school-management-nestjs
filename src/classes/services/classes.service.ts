import { Injectable } from '@nestjs/common';
import { CreateClassDto } from '../dto/create-class.dto';
import { ClassModel } from '../../databases/models/class.model';
import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ClassesService {
  constructor(@InjectModel(ClassModel) public classModel: typeof ClassModel) { }

  /**
   * create the class
   * @param className 
   * @param transaction 
   * @returns 
   */
  public create(className: Pick<ClassModel, 'name'>, transaction?: Transaction) {
    return this.classModel.build().setAttributes({ name: className.name }).save({ transaction });
  }

  /**
   * fetching all the classes
   */
  public findAll(): Promise<ClassModel[]> {
    return this.classModel.findAll();
  }

  /**
   * fetching classs with the id
   * @param id 
   */
  public findOne(id: number): Promise<ClassModel | null> {
    return this.classModel.findByPk(id, { rejectOnEmpty: true });
  }
}
