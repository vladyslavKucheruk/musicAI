import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-custom.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { CreateRoleDto } from './dto/createRoleDto';
import { Role as RoleModel } from './models/role.model';
import { Role } from './role';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':value')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Get role by value' })
  getByValue(@Param('value') value: string) {
    return this.roleService.getByValue(value);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: RoleModel })
  @ApiOperation({ summary: 'Create new role for users' })
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }
}
