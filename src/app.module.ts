import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/role.model';
import { UserRole } from './roles/models/userRole.model';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TracksModule } from './tracks/tracks.module';
import { Track } from './tracks/models/track.model';
import { Comment } from './tracks/models/comment.model';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'static'),
    }),
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_ADMIN_NAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB_NAME,
      models: [User, Role, UserRole, Track, Comment],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    TracksModule,
    FilesModule,
  ],
  controllers: [AuthController],
  providers: [FilesService],
})
export class App {}
