import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SectionModel } from '../../databases/models/section.model';
import { Transaction } from 'sequelize';

@Injectable()
export class SectionService {
  constructor(@InjectModel(SectionModel) public sectionModel: typeof SectionModel) { }

  /**
   * create the section
   * @param sectionName 
   * @param transaction 
   * @returns 
   */
  public create(sectionName: Pick<SectionModel, 'name'>, transaction?: Transaction) {
    return this.sectionModel.build().setAttributes({ name: sectionName.name }).save({ transaction });
  }

  /**
   * fetching all the sections
   */
  public findAll(): Promise<SectionModel[]> {
    return this.sectionModel.findAll();
  }

  /**
   * fetching section with the id
   * @param id 
   */
  public findOne(id: number): Promise<SectionModel | null> {
    return this.sectionModel.findByPk(id, { rejectOnEmpty: true });
  }
}
