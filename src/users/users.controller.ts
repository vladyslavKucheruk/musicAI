import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-custom.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { AssignRoleDto } from 'src/roles/dto/assignRoleDto';
import { Role } from 'src/roles/role';
import { CreateUserDto } from './dto/createUserDro';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @ApiOperation({ summary: 'get all users' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiOperation({ summary: 'create user' })
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @Put(':id')
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: User })
  @ApiOperation({ summary: 'update user' })
  updateUserActivation(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/reset-password')
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: User })
  @ApiOperation({ summary: 'update user' })
  updateUserPassword(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiOperation({ summary: 'delete user' })
  deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @Post('/assign-role')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Assign role to user with admin roots' })
  assignRole(@Body() dto: AssignRoleDto) {
    return this.usersService.assignRole(dto);
  }
}
