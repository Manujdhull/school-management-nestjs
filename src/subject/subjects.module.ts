import { Module } from '@nestjs/common';
import { SubjectService } from './services/subject.service';
import { SubjectController } from './controllers/subject.controller';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectsModule { }
