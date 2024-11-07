import { Controller, Body, Post, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { ParseUUIDPipe } from '@nestjs/common';
import { createArtistDto } from './dto/artists.dto';
import ArtistsService from './artists.service';

@Controller('artist')
export default class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  findAll(@Res() res: Response) {
    return this.artistsService.getArtists(res);
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.artistsService.getArtistsById(id, res);
  }

  @Post()
  createArtist(@Body() body: createArtistDto, @Res() res: Response) {
    return this.artistsService.createArtist(res, body);
  }
}
