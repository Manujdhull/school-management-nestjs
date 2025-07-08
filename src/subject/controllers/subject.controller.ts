import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SubjectService } from '../services/subject.service';
import { CreateSubjectDto } from '../dto/create-subject.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectsService: SubjectService) { }

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }
}
