import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

import { Role } from 'src/roles/models/role.model';
import { UserRole } from 'src/roles/models/userRole.model';
import { RolesModule } from 'src/roles/roles.module';
import { User } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Comment } from 'src/tracks/models/comment.model';
import { Track } from 'src/tracks/models/track.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User, Role, UserRole, Track, Comment]), RolesModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
