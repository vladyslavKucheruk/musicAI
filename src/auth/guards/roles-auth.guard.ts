import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/models/user.model';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.getAllAndOverride<Array<string>>('roles', [context.getHandler(), context.getClass()]);

      if (!roles) return true;

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const tokenType = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (tokenType !== 'Bearer' || !token) throw new UnauthorizedException();

      const user: User = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      req.user = user;

      return user.roles.some((role) => roles.includes(role.value));
    } catch (e) {
      throw new HttpException('Not enough rights', HttpStatus.BAD_REQUEST);
    }
  }
}
