import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from 'src/users/models/user.model';
import { Role } from './models/role.model';
import { UserRole } from './models/userRole.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRole]), JwtModule],
  exports: [RolesService],
})
export class RolesModule {}
