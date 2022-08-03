import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateRoleDto } from './dto/createRoleDto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getByValue(value);
  }

  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }
}
