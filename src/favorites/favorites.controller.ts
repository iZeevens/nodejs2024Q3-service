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

  @Post('track/:id')
  trackToFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.addToFavs(id, 'tracks', res);
  }

  @Post('album/:id')
  albumToFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.addToFavs(id, 'albums', res);
  }

  @Post('artist/:id')
  artistToFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.addToFavs(id, 'artists', res);
  }

  @Delete('track/:id')
  deleteTrackFromFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.deleteFromFavs(id, 'track', res);
  }

  @Delete('album/:id')
  deleteAlbumFromFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.deleteFromFavs(id, 'album', res);
  }

  @Delete('artist/:id')
  deleteArtistFromFavs(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.favoritesService.deleteFromFavs(id, 'artist', res);
  }
}
