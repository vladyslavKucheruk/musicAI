import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from 'src/users/dto/createUserDro';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async signIn(dto: CreateUserDto) {
    const user = await this.validateUser(dto.email, dto.password);
    console.log(user);
    return this.generateToken(user);
  }

  async signUp(dto: CreateUserDto) {
    const candidate = await this.userService.findOne(dto.email);

    if (candidate) {
      throw new HttpException('This user is already in the system', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({ ...dto, password: hashPassword });

    return this.generateToken(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    console.log(user);
    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (user && isPasswordsEqual) {
      const { password: _, ...rest } = user;
      return rest;
    }

    throw new HttpException('Incorrent email or password', HttpStatus.BAD_REQUEST);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, roles: user.roles };
    return { access_token: this.jwtService.sign(payload) };
  }
}
