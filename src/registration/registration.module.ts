import { Module } from '@nestjs/common';
import { RegistrationController } from './controller/registration.controller';
import { UserRepoService } from '../user/services/user-repo.service';
import { IsRoleExistsValidator } from './validators/is-role-exists.validator';
import { RoleService } from '../roles/services/role.service';
import { RolesModule } from '../roles/roles.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [RolesModule, UserModule],
  controllers: [RegistrationController],
  providers: [IsRoleExistsValidator],
})
export class RegistrationModule { }
