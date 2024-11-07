import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import db from 'src/data/inMemoryDB';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import { User } from './interfaces/user.interface';

@Injectable()
export default class UsersService {
  private users: User[] = db['user'];

  private userWithoutPassword(user: User | User[]) {
    const responseUser = Array.isArray(user) ? [...user] : { ...user };

    if (Array.isArray(responseUser)) {
      return responseUser.filter((user) => delete user.password);
    } else {
      delete responseUser.password;
    }

    return responseUser;
  }

  getUsers(res: Response) {
    const usersResponse = this.userWithoutPassword(this.users);
    return ResponseHelper.sendOk(res, this.userWithoutPassword(usersResponse));
  }

  getUserById(id: string, res: Response) {
    const user = existById('user', id) as User;

    if (!user) {
      return ResponseHelper.sendNotFound(res, 'User not found');
    }

    return ResponseHelper.sendOk(res, this.userWithoutPassword(user));
  }

  createUser(body: CreateUserDto, res: Response) {
    const { login, password } = body;

    const date = Date.now();
    const user = {
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    } as User;

    this.users.push(user);

    return ResponseHelper.sendCreated(res, this.userWithoutPassword(user));
  }

  updateUserPassword(id: string, body: UpdatePasswordDto, res: Response) {
    const { oldPassword, newPassword } = body;
    const user = existById('user', id) as User;

    if (!user) {
      return ResponseHelper.sendNotFound(res, 'User not found');
    }

    if (user.password === oldPassword) {
      const date = Date.now();
      user.password = newPassword;
      user.version++;
      user.updatedAt = date;

      return ResponseHelper.sendOk(res, this.userWithoutPassword(user));
    } else {
      return res.status(403).json({ message: 'Old password doesn`t match' });
    }
  }

  deleteUser(id: string, res: Response) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return ResponseHelper.sendNotFound(res, 'User not found');
    }

    this.users.splice(userIndex, 1);
    return res.status(204).json({ message: 'User was deleted' });
  }
}
