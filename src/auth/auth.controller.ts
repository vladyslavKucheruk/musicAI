import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/createUserDro';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  signIn(@Body() dto: CreateUserDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  @ApiResponse({ status: HttpStatus.CREATED })
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }
}
