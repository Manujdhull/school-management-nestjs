import { Module } from '@nestjs/common';
import { RegistrationController } from './controller/registration.controller';
import { UserRepoService } from '../user/services/user-repo.service';

@Module({
  controllers: [RegistrationController],
  providers: [UserRepoService],
})
export class RegistrationModule {}
