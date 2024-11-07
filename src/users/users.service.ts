import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import db from 'src/data/inMemoryDB';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import User from './interfaces/user.interface';

@Injectable()
export default class UsersService {
  getUsers(res: Response) {
    const users = db['user'];
    return ResponseHelper.sendOk(res, users);
  }

  getUserById(id: string, res: Response) {
    const user = existById('user', id);

    if (!user) {
      return ResponseHelper.sendNotFound(res, 'User not found');
    }

    return ResponseHelper.sendOk(res, user);
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

    db['user'].push(user);
    return ResponseHelper.sendCreated(res, user);
  }

  updateUserPassword(id: string, body: UpdatePasswordDto, res: Response) {
    const { oldPassword, newPassword } = body;
    const user = existById('user', id);

    if (!user) {
      return ResponseHelper.sendNotFound(res, 'User not found');
    }

    if (user.password === oldPassword) {
      const date = Date.now();
      user.password = newPassword;
      user.version++;
      user.updatedAt = date;

      return ResponseHelper.sendOk(res, user);
    } else {
      return res.status(203).json({ message: 'Old password doesn`t match' });
    }
  }
}
