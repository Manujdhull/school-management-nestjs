import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from '../../databases/models/role.model';
import { Transaction } from 'sequelize';
import { UserRolesModel } from '../../databases/models/user-roles.model';
import { UserModel } from '../../databases/models/user.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel) public roleModel: typeof RoleModel,
    @InjectModel(UserRolesModel) public userRoleModel: typeof UserRolesModel
  ) { }

  public findOrFail(id: number, transaction?: Transaction): Promise<RoleModel> {
    return this.roleModel.findByPk(id, { rejectOnEmpty: true, transaction });
  }

  /**
   * find the role or create the role
   * @param role 
   * @param transaction 
   * @returns 
   */
  public create(
    role: Pick<RoleModel, 'name'>,
    transaction?: Transaction,
  ): Promise<RoleModel> {
    return this.roleModel
      .findOrCreate({
        where: { name: role.name },
        defaults: role,
        transaction,
      })
      .then(([model]) => model);
  }

  /**
   * finding the role by id
   * @param id 
   * @param transaction 
   */
  public findById(id: number, transaction?: Transaction): Promise<RoleModel> {
    return this.roleModel.findByPk(id, { transaction });
  }

  public assignRoleToUser(
    user: Pick<UserModel, 'id'>,
    role: Pick<RoleModel, 'id'> | number,
    transaction?: Transaction,
  ): Promise<UserRolesModel> {
    const role_id = typeof role === 'number' ? role : role.id;
    return this.roleModel
      .findByPk(role_id, { transaction })
      .then((role) =>
        this.userRoleModel.findOrCreate({
          where: {
            user_id: user.id,
            role_id: role.id,
          },
          transaction,
        }).then(([model]) => model),
      );
  }

  /**
   * find the role with name
   * @param name 
   */
  public findRoleWithName(name: string): Promise<RoleModel> {
    return this.roleModel.findOne({
      where: { name },
    });
  }

  public findAll(): Promise<RoleModel[]> {
    return this.roleModel.findAll();
  }
}
