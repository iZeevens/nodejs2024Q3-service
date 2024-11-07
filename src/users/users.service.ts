import { Injectable } from '@nestjs/common';
import ResponseHelper from 'src/helpers/responseHelper';
import db from 'src/data/inMemoryDB';
import { CreateUserDto } from './dto/user.dto';
import { Response } from 'express';

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
  }
}
