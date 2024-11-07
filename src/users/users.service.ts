import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/user.dto';
import db from 'src/data/inMemoryDB';
import ResponseHelper from 'src/helpers/responseHelper';
import User from './interfaces/user.interface';

@Injectable()
export default class UsersService {
  getUsers(res: Response) {
    const users = db['user'];
    ResponseHelper.sendOk(res, users);

    return users;
  }

  getUserById(id: string, res: Response) {
    const user = db.user.find((user) => user.id === id);
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
}
