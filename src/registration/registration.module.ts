import { Module } from '@nestjs/common';
import { RegistrationController } from './controller/registration.controller';
import { IsRoleExistsValidator } from './validators/is-role-exists.validator';
import { RolesModule } from '../roles/roles.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [RolesModule, UserModule],
  controllers: [RegistrationController],
  providers: [IsRoleExistsValidator],
})
export class RegistrationModule { }
