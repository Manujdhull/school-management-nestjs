import { Column, Table, Unique } from 'sequelize-typescript';
import { BaseModel } from './base.model';

export enum RoleTypeNames {
  Principle = 'principle',
  Teacher = 'teacher',
  Student = 'student',
  Parent = 'parent',
}

export const RoleTypes: Record<
  RoleTypeNames,
  { id: number; name: RoleTypeNames}
> = {
  [RoleTypeNames.Principle]: {
    id: 1,
    name: RoleTypeNames.Principle,
  },
  [RoleTypeNames.Teacher]: {
    id: 2,
    name: RoleTypeNames.Teacher,
  },
  [RoleTypeNames.Student]: {
    id: 3,
    name: RoleTypeNames.Student,
  },
  [RoleTypeNames.Parent]: {
    id: 4,
    name: RoleTypeNames.Parent,
  },
};

@Table({ tableName: 'roles' })
export class RoleModel extends BaseModel<RoleModel> {
  @Unique
  @Column
  public name: RoleTypeNames;
}
