import {
  Param,
  Res,
  Get,
  Post,
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

  @Post(':id')
  trackToFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.addToFavs(id, 'track', res);
  }

  @Post(':id')
  albumToFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.addToFavs(id, 'album', res);
  }

  @Post(':id')
  artistToFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.addToFavs(id, 'artist', res);
  }

  @Delete(':id')
  deleteTrackFromFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.deleteFromFavs(id, 'track', res);
  }

  @Delete(':id')
  deleteAlbumFromFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.deleteFromFavs(id, 'album', res);
  }

  @Delete(':id')
  deleteArtistFromFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.deleteFromFavs(id, 'artist', res);
  }
}
