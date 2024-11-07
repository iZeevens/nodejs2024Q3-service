import { Injectable } from '@nestjs/common';
import { Artist } from './interfaces/artists.interfaces';
import { Response } from 'express';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import db from 'src/data/inMemoryDB';

@Injectable()
export default class ArtistsService {
  private artists: Artist[] = db['artist'];

  getArtists(res: Response) {
    return ResponseHelper.sendOk(res, this.artists);
  }

  getArtistsById(id: string, res: Response) {
    const artist = existById('artist', id);

    if (!artist) {
      return ResponseHelper.sendNotFound(res, 'Artist not found');
    }

    return ResponseHelper.sendOk(res, artist);
  }
}
