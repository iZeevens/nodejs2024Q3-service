import {
  Controller,
  ParseUUIDPipe,
  Get,
  Res,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateAlbum } from './dto/albums.dto';
import AlbumsService from './albums.service';

@Controller()
export default class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAllAlbums(@Res() res: Response) {
    return this.albumsService.findAll(res);
  }

  @Get(':id')
  getAlbumById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.albumsService.findById(id, res);
  }

  @Post()
  createAlbum(@Body() body: CreateAlbum, @Res() res: Response) {
    return this.albumsService.createAlbum(body, res);
  }
}
