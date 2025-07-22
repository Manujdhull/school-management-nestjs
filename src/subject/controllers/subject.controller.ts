import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SubjectService } from '../services/subject.service';
import { CreateSubjectDto } from '../dto/create-subject.dto';
import { AccessTokenGuard } from '../../auth/guards/access-token/access-token.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthUser } from '../../auth/decorators/auth-user.decorator';
import { UserModel } from '../../databases/models/user.model';
import { SubjectModel } from '../../databases/models/subject.model';

// @ApiBearerAuth()
// @UseGuards(AccessTokenGuard)
@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectsService: SubjectService) { }

  @ApiOkResponse({ type: "ok" })
  @Post()
  public create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @ApiOkResponse({ type: SubjectModel, isArray: true })
  @Get()
  public findAll(@AuthUser() user: UserModel) {
    console.log("hello ditto", user);
    return this.subjectsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }
}
