import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { CreateClassDto } from '../dto/create-class.dto';
import { ClassesService } from '../services/classes.service';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResourceConversionInterceptor } from '../../common/interceptors/resource-conversion/resource-conversion.interceptor';
import { TransactionInterceptor } from '../../transaction-manager/interceptors/transaction/transaction.interceptor';
import { ClassResource } from '../resources/class.resource';
import { ResourceMap } from '../../common/decorators/resource-map.decorator';
import { ClassListResource } from '../resources/class-list.resource';
import { ReqTransaction } from '../../transaction-manager/decorators/transaction.decorator';
import { Transaction } from 'sequelize';

@ApiHeader({
  name: 'accept',
  allowEmptyValue: false,
  required: true,
  schema: {
    type: 'string',
    enum: ['application/json'],
  },
})
@ApiTags('classes Management')
@UseInterceptors(TransactionInterceptor, ResourceConversionInterceptor)
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @ApiOkResponse({ type: ClassResource })
  @ResourceMap(ClassResource)
  @Post()
  public create(@Body() createClassDto: CreateClassDto, @ReqTransaction() transaction?: Transaction): Promise<ClassResource> {
    console.log(createClassDto, 'OOOO');

    return this.classesService.create(createClassDto, transaction);
  }

  @ApiOkResponse({ type: ClassListResource })
  @ResourceMap(ClassListResource)
  @Get()
  public async findAll(): Promise<ClassListResource> {
    return { class: await this.classesService.findAll() };
  }

  @ApiOkResponse({ type: ClassResource })
  @ResourceMap(ClassResource)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<ClassResource> {
    return this.classesService.findOne(+id);
  }
}
