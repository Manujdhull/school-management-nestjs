import { Module } from '@nestjs/common';
import { SectionService } from './services/sections.service';
import { SectionController } from './controllers/sections.controller';

@Module({
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionsModule { }
