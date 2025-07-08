import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from 'sequelize';
import { UserModel } from '../../databases/models/user.model';
import { ReqTransaction } from '../../transaction-manager/decorators/transaction.decorator';
import { TransactionInterceptor } from '../../transaction-manager/interceptors/transaction/transaction.interceptor';
import { RegisterUserDto } from '../dto/create-registration.dto';
import { UserRepoService } from '../../user/services/user-repo.service';
import { ResourceConversionInterceptor } from '../../common/interceptors/resource-conversion/resource-conversion.interceptor';
import { ResourceMap } from '../../common/decorators/resource-map.decorator';
import { RegistrationResource } from '../resources/registration.resource';
import { RoleService } from '../../roles/services/role.service';


@ApiTags('Registration')
@Controller('registration')
export class RegistrationController {
  constructor(private userRepoService: UserRepoService, private roleRepoService: RoleService) { }

  @ApiOkResponse({ type: RegistrationResource })
  @ResourceMap(RegistrationResource)
  @UseInterceptors(TransactionInterceptor, ResourceConversionInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() userData: RegisterUserDto,
    @ReqTransaction() transaction?: Transaction,
  ): Promise<UserModel | void> {
    const role = await this.roleRepoService.findRoleWithName(userData.role);
    return this.userRepoService.create(userData).then((user) => {
      this.roleRepoService.assignRoleToUser(user, role);
    });
  }
}
