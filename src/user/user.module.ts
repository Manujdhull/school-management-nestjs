import { Module } from '@nestjs/common';
import { UserRepoService } from './services/user-repo.service';
import { UniqueEmailValidator } from './validators/unique-email.validator';
import { VerifyClientCredentialsValidator } from './validators/verify-client-credentials.validator';

@Module({
  imports: [],
  providers: [UserRepoService, UniqueEmailValidator, VerifyClientCredentialsValidator],
  exports: [UserRepoService],
})
export class UserModule {}
