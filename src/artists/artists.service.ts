import { Injectable } from '@nestjs/common';
import { Artist } from './interfaces/artists.interfaces';
import { Response } from 'express';
import { createArtistDto } from './dto/artists.dto';
import { randomUUID } from 'crypto';
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

  createArtist(res: Response, body: createArtistDto) {
    const { name, grammy } = body;

    const data = { id: randomUUID(), name, grammy };

    this.artists.push(data);
    return ResponseHelper.sendOk(res, data);
  }
}
