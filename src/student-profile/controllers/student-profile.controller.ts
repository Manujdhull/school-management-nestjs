import { Body, Controller, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { StudentProfileService } from '../services/student-entities.service';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateStudentProfileDto } from '../dtos/create-student-entity.dto';
import { ReqTransaction } from '../../transaction-manager/decorators/transaction.decorator';
import { Transaction } from 'sequelize';
import { StudentProfileModel } from '../../databases/models/student.model';
import { ResourceConversionInterceptor } from '../../common/interceptors/resource-conversion/resource-conversion.interceptor';
import { TransactionInterceptor } from '../../transaction-manager/interceptors/transaction/transaction.interceptor';
import { AccessTokenGuard } from '../../auth/guards/access-token/access-token.guard';
import { ParseToNumberPipe } from '../../common/pipes/parse-to-number/parse-to-number.pipe';

@ApiHeader({
  name: 'accept',
  allowEmptyValue: false,
  required: true,
  schema: {
    type: 'string',
    enum: ['application/json'],
  },
})
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@UseInterceptors(ResourceConversionInterceptor, TransactionInterceptor)
@ApiTags('Student Profile Management')
@Controller('student/:student-id')
export class StudentProfileController {
  constructor(public studentProfileService: StudentProfileService) { }

  @ApiOkResponse({ type: StudentProfileModel })
  @ApiBody({ type: CreateStudentProfileDto })
  @ApiParam({ name: 'student-id', type: 'number' })
  @Post()
  public createStudentProfile(@Body() createStudentEntityDto: CreateStudentProfileDto, @Param('student-id', ParseIntPipe) student_id: number, @ReqTransaction() transaction?: Transaction): Promise<StudentProfileModel> {
    return this.studentProfileService.createStudentProfile(createStudentEntityDto, Number(student_id), transaction);
  }
}
