import {
  Controller,
  ParseUUIDPipe,
  Get,
  Res,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateAlbum } from './dto/albums.dto';
import AlbumsService from './albums.service';

@Controller('album')
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

  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Body() body: CreateAlbum,
    @Res() res: Response,
  ) {
    return this.albumsService.updateAlbum(id, body, res);
  }

  @Delete(':id')
  deleteAlbum(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.albumsService.deleteAlbum(id, res);
  }
}
