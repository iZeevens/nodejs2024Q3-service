import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';
import { Response } from 'express';
import { CreateUserDto, UpdatePasswordDto } from './dto/users.dto';
import ResponseHelper from 'src/helpers/responseHelper';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  private userWithoutPassword(user: UserEntity | UserEntity[]) {
    const responseUser = Array.isArray(user) ? [...user] : { ...user };

    if (Array.isArray(responseUser)) {
      return responseUser.filter((user) => delete user.password);
    } else {
      delete responseUser.password;
    }

    return responseUser;
  }

  async getUsers(res: Response) {
    const users = await this.usersRepository.find();
    return ResponseHelper.sendOk(res, this.userWithoutPassword(users));
  }

  async getUserById(id: string, res: Response) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      return ResponseHelper.sendNotFound(res, 'User not found');
    }

    return ResponseHelper.sendOk(res, this.userWithoutPassword(user));
  }

  async createUser(body: CreateUserDto, res: Response) {
    const { login, password } = body;

    const user = this.usersRepository.create({
      login,
      password,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedUser = await this.usersRepository.save(user);

    return ResponseHelper.sendCreated(res, this.userWithoutPassword(savedUser));
  }

  async updateUserPassword(id: string, body: UpdatePasswordDto, res: Response) {
    const { oldPassword, newPassword } = body;
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      return ResponseHelper.sendNotFound(res, 'User not found');
    }

    if (user.password === oldPassword) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = new Date();

      const updatedUser = await this.usersRepository.save(user);
      return ResponseHelper.sendOk(res, this.userWithoutPassword(updatedUser));
    } else {
      return res.status(403).json({ message: 'Old password doesn`t match' });
    }
  }

  async deleteUser(id: string, res: Response) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      return ResponseHelper.sendNotFound(res, 'User not found');
    }

    await this.usersRepository.delete(id);
    return res.status(204).json({ message: 'User was deleted' });
  }
}
