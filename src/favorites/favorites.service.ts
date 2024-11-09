import { Favorites, FavoritesResponse } from './interfaces/favorite.interface';
import { Artist } from 'src/artists/interfaces/artist.interfaces';
import { Track } from 'src/tracks/interfaces/track.interface';
import { Album } from 'src/albums/interfaces/album.interface';
import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import { db } from 'src/data/inMemoryDB';

@Injectable()
export default class FavoritesService {
  private favorites: Favorites = db['favs'];

  private helperFindResult(type: 'artist' | 'album' | 'track') {
    return this.favorites[`${type}s`].map((itemId) =>
      (db[type] as (Artist | Track | Album)[]).find(
        (item) => item.id === itemId,
      ),
    );
  }

  getFavorites(res: Response) {
    const result = {
      artists: this.helperFindResult('artist'),
      albums: this.helperFindResult('album'),
      tracks: this.helperFindResult('track'),
    } as FavoritesResponse;

    return ResponseHelper.sendOk(res, result);
  }

  addToFavs(id: string, type: 'track' | 'artist' | 'album', res: Response) {
    const isExist = existById(type, id);

    if (!isExist) {
      return res.status(422).json({ message: `${type} not found` });
    }

    this.favorites[`${type}s`].push(id);
    return res.status(201).json(isExist);
  }

  deleteFromFavs(
    id: string,
    type: 'track' | 'artist' | 'album',
    res: Response,
  ) {
    const isExist = this.favorites[`${type}s`].findIndex(
      (itemId) => itemId === id,
    );

    if (isExist === -1) {
      return res.status(422).json({ message: `${type} not found` });
    }

    this.favorites[`${type}s`].splice(isExist, 1);
    return res.status(204).json(undefined);
  }
}
