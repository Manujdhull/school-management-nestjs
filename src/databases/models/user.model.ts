import { Column, DataType, Table, Unique } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { IsOptional } from 'class-validator';

@Table({ tableName: 'users' })
export class UserModel extends BaseModel<UserModel> {
  @Unique
  @Column
  public email: string;

  @Column
  public first_name: string;

  @Column(DataType.STRING)
  public last_name: string | null;

  @Column(DataType.DATE)
  public verified_at: Date | null;

  @Column(DataType.STRING)
  public password: string | null;

  @Column(DataType.DATE)
  public deleted_at: Date | null;

  public toJSON(): any {
    const content = super.toJSON();
    delete content.password;
    return content;
  }
}
