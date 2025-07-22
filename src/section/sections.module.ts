import { Module } from '@nestjs/common';
import { SectionService } from './services/sections.service';
import { SectionController } from './controllers/sections.controller';
import { Is } from 'sequelize-typescript';
import { IsSectionExistsValidator } from './validators/is-section-exists.validator';

@Module({
  controllers: [SectionController],
  providers: [SectionService, IsSectionExistsValidator],
})
export class SectionsModule { }
