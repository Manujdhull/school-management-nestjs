import { BelongsTo, BelongsToMany, Column, DataType, DefaultScope, HasMany, Scopes, Table, Unique } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { UserRolesModel } from './user-roles.model';
import { RoleModel, RoleTypeNames } from './role.model';
import { FindOptions, Sequelize } from 'sequelize';
import { filter } from 'rxjs';
import { Op } from 'sequelize';

export interface UserListingFilters {
  role?: number;
  email?: string;
}

@DefaultScope(() => ({
  include: [
    {
      model: UserRolesModel,
      required: true,
    },
  ],
}))
@Scopes(() => ({
  withRoles: (filters: UserListingFilters): FindOptions<UserModel> => {
    const query: FindOptions<UserModel> = {};
    if (filters.role) {
      query.where = {
        "$user_roles.role_id$": filters.role,
      }
    }
    if (filters.email && filters.email.length > 0) {
      query.where = {
        email: { [Op.like]: `%${filters.email}%` },
      }
    }
    return query;
  },
  // withEmail: (filters: UserListingFilters): FindOptions<UserModel> => {
  //   const query: FindOptions<UserModel> = {};
  //   if (!!filters.email && filters.email.length > 0) {
  //     query.where = {
  //       email: { [Op.like]: `%${filters.email}%` },
  //     }
  //   }
  //   return query;
  // },
}))
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

  @HasMany(() => UserRolesModel)
  public user_roles: UserRolesModel[];

  @BelongsToMany(() => RoleModel, () => UserRolesModel)
  public roles: RoleModel[];

  public toJSON(): any {
    const content = super.toJSON();
    delete content.password;
    return content;
  }
}
