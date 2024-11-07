import { Injectable } from '@nestjs/common';
import { Artist } from './interfaces/artists.interfaces';
import { Response } from 'express';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists.dto';
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

  createArtist(body: CreateArtistDto, res: Response) {
    const { name, grammy } = body;

    const data = { id: randomUUID(), name, grammy };

    this.artists.push(data);
    return ResponseHelper.sendOk(res, data);
  }

  updateArtist(id: string, body: UpdateArtistDto, res: Response) {
    const artist = existById('artist', id) as Artist;

    if (!artist) {
      return ResponseHelper.sendNotFound(res, 'Artist not found');
    }

    const { name, grammy } = body;

    if (name) artist.name = name;
    if (grammy) artist.grammy = grammy;

    return ResponseHelper.sendOk(res, artist);
  }

  deleteArtist(id: string, res: Response) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      return ResponseHelper.sendNotFound(res, 'Artist not found');
    }

    this.artists.splice(artistIndex, 1);
    return res.status(204).json({ message: 'Artist was deleted' });
  }
}
