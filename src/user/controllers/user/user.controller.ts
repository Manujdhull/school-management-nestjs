import { Controller, Get, Param, ParseIntPipe, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserRepoService } from "../../services/user-repo.service";
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "../../../auth/guards/access-token/access-token.guard";
import { ResourceConversionInterceptor } from "../../../common/interceptors/resource-conversion/resource-conversion.interceptor";
import { TransactionInterceptor } from "../../../transaction-manager/interceptors/transaction/transaction.interceptor";
import { AuthUser } from "../../../auth/decorators/auth-user.decorator";
import { UserModel } from "../../../databases/models/user.model";
import { ReqTransaction } from "../../../transaction-manager/decorators/transaction.decorator";
import { Transaction } from "sequelize";
import { SequelizePagination } from "../../../interfaces/sequelize-pagination.interface";
import { UserResource } from "../../resources/user.resource";
import { UsersPaginatedResource } from "../../resources/user-paginate.resource";
import { log } from "node:console";
import { ResourceMap } from "../../../common/decorators/resource-map.decorator";

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
@UseInterceptors(TransactionInterceptor, ResourceConversionInterceptor)
@ApiTags('User Management')
@Controller('users')
export class UserController {
  constructor(private readonly userRepoService: UserRepoService) { }

  @ApiOkResponse({ type: UserResource })
  @Get('current')
  public async show(@AuthUser() user: UserModel) {
    return user;
  }

  @ApiOkResponse({ type: UsersPaginatedResource })
  @ResourceMap(UsersPaginatedResource)
  @ApiQuery({ name: 'role_id', required: false, type: Number })
  @ApiQuery({ name: 'offset', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'all', type: Boolean, required: false })
  @ApiQuery({ name: 'email', type: String, required: false })
  @Get()
  public async index(@Query('offset') offset: number = 15,
    @Query('page') page: number = 1,
    @Query('all') isAll: boolean = false,
    @Query('role_id') role: number = undefined,
    @Query('email') email: string | undefined = undefined,
  ): Promise<SequelizePagination<UserModel>> {
    if (isAll) {
      offset = (
        await this.userRepoService.listUserByRole(
          { role, email },
          { offset: 1, page: 1 },
        )
      ).totalItems;
      page = 1;
    }
    return this.userRepoService.listUserByRole(
      { role, email },
      { offset, page },
    );
  }
}
