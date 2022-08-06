import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET || 'secret', signOptions: { expiresIn: '24h' } }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
