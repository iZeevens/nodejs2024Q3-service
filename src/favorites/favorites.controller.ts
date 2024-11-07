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

@Controller('favs')
export default class FavoritesController {
  constructor(private readonly favoritesService: FavoritesController) {}

  @Get()
  findAll(@Res() res: Response) {
    return this.favoritesService.findAll(res);
  }
}
