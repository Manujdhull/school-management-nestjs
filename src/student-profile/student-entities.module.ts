import { Module } from '@nestjs/common';
import { StudentProfileController } from './controllers/student-profile.controller';
import { StudentProfileService } from './services/student-entities.service';

@Module({
  controllers: [StudentProfileController],
  providers: [StudentProfileService],
  exports: [StudentProfileService],
})
export class StudentEntitiesModule { }
