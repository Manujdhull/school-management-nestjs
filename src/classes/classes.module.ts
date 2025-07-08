import { Module } from '@nestjs/common';
import { ClassesController } from './controller/classes.controller';
import { ClassesService } from './services/classes.service';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule { }
