import { Favorites } from './interfaces/favorite.interface';
import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import { db } from 'src/data/inMemoryDB';

@Injectable()
export default class FavoritesService {
  private favorites: Favorites = db['favs'];

  getFavorites(res: Response) {
    return ResponseHelper.sendOk(res, this.favorites);
  }

  addToFavs(id: string, type: 'track' | 'artist' | 'album', res: Response) {
    const isExist = existById(type, id);

    if (!isExist) {
      return res.status(422).json({ message: `${type} not found` });
    }

    this.favorites[type + 's'].push(id);
    return res.status(201).json(isExist);
  }

  deleteFromFavs(
    id: string,
    type: 'track' | 'artist' | 'album',
    res: Response,
  ) {
    const isExist = db[type].findIndex((item) => item.id === id);

    if (isExist === -1) {
      return res.status(422).json({ message: `${type} not found` });
    }

    delete this.favorites[type + 's'][isExist];
    return res.status(204).json(isExist);
  }
}
