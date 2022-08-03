import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserDto } from './dto/createUserDro';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @ApiOperation({ summary: 'get all users' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiOperation({ summary: 'create user' })
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: User })
  @ApiOperation({ summary: 'update user' })
  updateUserActivation(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Put(':id/reset-password')
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: User })
  @ApiOperation({ summary: 'update user' })
  updateUserPassword(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiOperation({ summary: 'delete user' })
  deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
