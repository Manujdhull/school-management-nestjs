import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from '../../databases/models/role.model';
import { Transaction } from 'sequelize';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel) public roleModel: typeof RoleModel
  ){}

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
    role: Pick<RoleModel, 'role_name' | 'display_name'>,
    transaction?: Transaction,
  ): Promise<RoleModel> {
    return this.roleModel
      .findOrCreate({
        where: { role_name: role.role_name, display_name: role.display_name },
        defaults: role,
        transaction,
      })
      .then(([model]) => model);
  }
}
