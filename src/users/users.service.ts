import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './models/user.model';
import { CreateUserDto } from './dto/createUserDro';
import { UpdateUserDto } from './dto/updateUserDto';
import { RolesService } from 'src/roles/roles.service';
import { AssignRoleDto } from 'src/roles/dto/assignRoleDto';
import { Role } from 'src/roles/role';
import { DeactivateUserDto } from './dto/deactivateUserDto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getByValue(Role.USER);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async assignRole(dto: AssignRoleDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getByValue(dto.value);

    if (user && role) {
      await user.$add('roles', role.id);
      return user;
    }

    throw new HttpException('Role or user not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    const updatedUser = await user.update(dto);
    return updatedUser;
  }

  async delete(id: number): Promise<number> {
    const userId = await this.userRepository.destroy({ where: { id } });
    return userId;
  }

  async findAll(): Promise<Array<User>> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }

  async deactivate(dto: DeactivateUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);

    if (user) {
      user.isActivate = false;
      await user.save();
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
