import { Controller, Get, Post, Body, Param, UseInterceptors, Res } from '@nestjs/common';
import { ApiHeader, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMap } from '../../common/decorators/resource-map.decorator';
import { ResourceConversionInterceptor } from '../../common/interceptors/resource-conversion/resource-conversion.interceptor';
import { TransactionInterceptor } from '../../transaction-manager/interceptors/transaction/transaction.interceptor';
import { CreateSectionDto } from '../dto/create-section.dto';
import { SectionListResource } from '../resources/section-list.resource';
import { SectionResource } from '../resources/section.resource';
import { SectionService } from '../services/sections.service';

@ApiHeader({
  name: 'accept',
  allowEmptyValue: false,
  required: true,
  schema: {
    type: 'string',
    enum: ['application/json'],
  },
})
@ApiTags('sections Management')
@UseInterceptors(TransactionInterceptor, ResourceConversionInterceptor)
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionsService: SectionService) { }

  @ApiOkResponse({ type: SectionResource })
  @ResourceMap(SectionResource)
  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionsService.create(createSectionDto);
  }

  @ApiOkResponse({ type: SectionListResource })
  @ResourceMap(SectionListResource)
  @Get()
  public async findAll(): Promise<SectionListResource> {
    return { section: await this.sectionsService.findAll() };
  }

  @ResourceMap(SectionResource)
  @ApiOkResponse({ type: SectionResource })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<SectionResource> {
    return this.sectionsService.findOne(+id);
  }
}
