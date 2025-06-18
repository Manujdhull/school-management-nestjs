import { Module } from '@nestjs/common';
import { RolesController } from './controller/roles.controller';
import { RoleService } from './services/role.service';

@Module({
  controllers: [RolesController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RolesModule {}
