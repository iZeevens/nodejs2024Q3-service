import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import ArtistsService from './artists.service';

@Controller('artist')
export default class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  findAll(@Res() res: Response) {
    return this.artistsService.getArtists(res);
  }
}
