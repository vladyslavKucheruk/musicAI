import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { AssignRoleDto } from 'src/roles/dto/assignRoleDto';
import { Role } from 'src/roles/role';
import { CreateUserDto } from './dto/createUserDro';
import { DeactivateUserDto } from './dto/deactivateUserDto';
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
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @ApiOperation({ summary: 'get all users' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiOperation({ summary: 'create user' })
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: User })
  @ApiOperation({ summary: 'update user' })
  updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiOperation({ summary: 'Delete user' })
  deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Post('/assign-role')
  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Assign role to user with admin roots' })
  assignRole(@Body() dto: AssignRoleDto) {
    return this.usersService.assignRole(dto);
  }

  @Post('/deactivate-user')
  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Deactivate user' })
  deactivate(@Body() dto: DeactivateUserDto) {
    return this.usersService.deactivate(dto);
  }
}
