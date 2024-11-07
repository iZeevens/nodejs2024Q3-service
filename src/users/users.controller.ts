import { Controller, Get, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import UsersService from './users.service';

@Controller('user')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Res() res: Response) {
    return this.usersService.getUsers(res);
  }

  findById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res()
    res: Response,
  ) {
    return this.usersService.getUserById(res, id);
  }
}
