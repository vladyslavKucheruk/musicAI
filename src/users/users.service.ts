import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './models/user.model';
import { CreateUserDto } from './dto/createUserDro';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    return user;
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
    const users = await this.userRepository.findAll();
    return users;
  }
}
