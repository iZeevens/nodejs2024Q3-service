import {
  Controller,
  Body,
  Post,
  Get,
  Res,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists.dto';
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
  createArtist(@Body() body: CreateArtistDto, @Res() res: Response) {
    return this.artistsService.createArtist(body, res);
  }

  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Body() body: UpdateArtistDto,
    @Res() res: Response,
  ) {
    return this.artistsService.updateArtist(id, body, res);
  }

  @Delete(':id')
  deleteArtist(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.artistsService.deleteArtist(id, res);
  }
}
