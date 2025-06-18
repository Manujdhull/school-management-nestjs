import { Injectable } from '@nestjs/common';
import { Seeder } from '../seeder';
import { TransactionProviderService } from '../../../transaction-manager/services/transaction-provider/transaction-provider.service';
import { RoleModel, RoleTypes } from '../../../databases/models/role.model';
import { RoleService } from '../../../roles/services/role.service';

@Injectable()
export class RolesService extends Seeder {
  constructor(
    private readonly transactionProvider: TransactionProviderService,
    private readonly rolesService: RoleService,
  ) {
    super();
  }

  public seed(): Promise<boolean> {
    return this.transactionProvider
      .create()
      .then((transaction) =>
        Promise.all(
          this.roles().map((role) => this.rolesService.create(role, transaction)),
        ).then(() => transaction.commit()),
      )
      .then(() => true);
  }

  private roles(): Pick<RoleModel, 'role_name' | 'display_name'>[] {
    return Object.values(RoleTypes).map<
      Pick<RoleModel, 'id' | 'role_name' | 'display_name'>
    >((roleType) => ({
      id: roleType.id,
      role_name: roleType.name,
      display_name: roleType.display_name,
    }));
  }
}
