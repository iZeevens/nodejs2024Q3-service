import { Favorites, FavoritesResponse } from './interfaces/favorite.interface';
import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import { db } from 'src/data/inMemoryDB';

@Injectable()
export default class FavoritesService {
  private favorites: Favorites = db['favs'];

  getFavorites(res: Response) {
    const result = {
      artists: this.favorites.artists.map(
        (artistId) =>
          db['artist'].find((artist) => artist.id === artistId) || null,
      ),
      albums: this.favorites.albums.map(
        (albumId) => db['album'].find((album) => album.id === albumId) || null,
      ),
      tracks: this.favorites.tracks.map(
        (trackId) => db['track'].find((track) => track.id === trackId) || null,
      ),
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
