import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from '../services/role.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RoleService) {}
}
