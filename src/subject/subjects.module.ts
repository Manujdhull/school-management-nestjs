import { Module } from '@nestjs/common';
import { SubjectService } from './services/subject.service';
import { SubjectController } from './controllers/subject.controller';
import { IsSubjectExistsValidator } from './validators/is-subject-exists.validator';
import { StudentProfileService } from '../student-profile/services/student-entities.service';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, IsSubjectExistsValidator, StudentProfileService],
})
export class SubjectsModule { }
