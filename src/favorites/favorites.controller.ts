import {
  Body,
  Param,
  Res,
  Get,
  Post,
  Put,
  Delete,
  ParseUUIDPipe,
  Controller,
} from '@nestjs/common';
import { Response } from 'express';
import FavoritesService from './favorites.service';

@Controller('favs')
export default class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@Res() res: Response) {
    return this.favoritesService.getFavorites(res);
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.getFavoritesById(id, res);
  }
}
