import { Module } from '@nestjs/common';
import { UserRepoService } from './services/user-repo.service';
import { UniqueEmailValidator } from './validators/unique-email.validator';
import { VerifyClientCredentialsValidator } from './validators/verify-client-credentials.validator';
import { RoleService } from '../roles/services/role.service';
import { RolesModule } from '../roles/roles.module';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [RolesModule],
  providers: [UserRepoService, UniqueEmailValidator, VerifyClientCredentialsValidator],
  controllers: [UserController],
  exports: [UserRepoService],
})
export class UserModule { }
