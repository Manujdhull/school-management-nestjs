import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResourceConversionInterceptor } from '../../common/interceptors/resource-conversion/resource-conversion.interceptor';
import { ResourceMap } from '../../common/decorators/resource-map.decorator';
import { RoleListResource } from '../resources/role-list.resource';

@ApiTags('Role Management')
@Controller('roles')
@UseInterceptors(ResourceConversionInterceptor)
export class RolesController {
  constructor(private readonly rolesService: RoleService) { }

  @ApiOkResponse({ type: RoleListResource, isArray: true })
  @ResourceMap(RoleListResource)
  @Get()
  public async fetch(): Promise<RoleListResource> {
    return { role: await this.rolesService.findAll() };
  }
}
