import { Column, HasMany, Table, Unique } from 'sequelize-typescript';
import { BaseModel } from './base.model';

export enum RoleTypeNames {
  SuperAdmin = 'super_admin',
  Admin = 'admin',
  Participant = 'participant',
  Viewer = 'viewer',
}

export const RoleTypes: Record<
  RoleTypeNames,
  { id: number; name: RoleTypeNames; display_name: string }
> = {
  [RoleTypeNames.SuperAdmin]: {
    id: 1,
    name: RoleTypeNames.SuperAdmin,
    display_name: 'Super Admin',
  },
  [RoleTypeNames.Admin]: {
    id: 2,
    name: RoleTypeNames.Admin,
    display_name: 'Admin',
  },
  [RoleTypeNames.Participant]: {
    id: 3,
    name: RoleTypeNames.Participant,
    display_name: 'Participant',
  },
  [RoleTypeNames.Viewer]: {
    id: 4,
    name: RoleTypeNames.Viewer,
    display_name: 'Viewer',
  },
};

@Table({ tableName: 'roles' })
export class RoleModel extends BaseModel<RoleModel> {
  @Unique
  @Column
  public role_name: RoleTypeNames;

  @Column
  public display_name: string;
}
