import { Injectable } from '@nestjs/common';
import { Command, Option, Positional } from 'nestjs-command';
import { UserModel } from '../../../databases/models/user.model';
import { UserRepoService } from '../../../user/services/user-repo.service';
import { RoleService } from '../../../roles/services/role.service';

@Injectable()
export class CreateSuperAdminService {
  constructor(
    public userRepoService: UserRepoService,
    public roleRepoService: RoleService,
  ) { }

  @Command({
    command: 'create:superadmin <email>',
    describe: 'Creating Super Admin',
  })
  async createSuperAdminUser(
    @Positional({
      name: 'email',
      describe: 'Unique email',
      type: 'string',
    })
    email: string,

    @Positional({
      name: 'email',
      describe: 'Unique email',
      type: 'string',
    })
    password: string,

    @Option({
      name: 'firstname',
      describe: 'first name',
      type: 'string',
      default: null,
      demandOption: false,
    })
    first_name: string | null = null,

    @Option({
      name: 'lastname',
      describe: 'last name',
      type: 'string',
      default: null,
      demandOption: false,
    })
    last_name: string | null = null,
  ): Promise<UserModel> {
    return this.userRepoService
      .create(
        {
          email: email,
          first_name,
          last_name,
          password: password,
        },
      )
      .then(async (user) => {
        await this.roleRepoService.assignRoleToUser(user, 1);
        return user;
      });
  }
}
