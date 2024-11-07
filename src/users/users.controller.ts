import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { Response } from 'express';
import UsersService from './users.service';

@Controller('user')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Res() res: Response) {
    return this.usersService.getUsers(res);
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res()
    res: Response,
  ) {
    return this.usersService.getUserById(id, res);
  }

  @Post()
  createUser(@Body() body: CreateUserDto, @Res() res: Response) {
    return this.usersService.createUser(body, res);
  }
}
