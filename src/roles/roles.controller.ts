import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-custom.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { AssignRoleDto } from './dto/assignRoleDto';
import { CreateRoleDto } from './dto/createRoleDto';
import { Role } from './models/role.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':value')
  @ApiResponse({ status: HttpStatus.OK })
  getByValue(@Param('value') value: string) {
    return this.roleService.getByValue(value);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }
}
