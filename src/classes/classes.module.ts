import { Module } from '@nestjs/common';
import { ClassesController } from './controller/classes.controller';
import { ClassesService } from './services/classes.service';
import { IsClassExistsValidator } from './validators/is-class-exists.validator';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, IsClassExistsValidator],
})
export class ClassesModule { }
