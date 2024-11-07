import { Favorites } from './interfaces/favorite.interface';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import db from 'src/data/inMemoryDB';

@Injectable()
export default class FavoritesService {
  private favorites: Favorites[] = db['favs'];

  getFavorites(res: Response) {
    return ResponseHelper.sendOk(res, this.favorites);
  }

  getFavoritesById(id: string, res: Response) {
    const favs = existById('favs', id);

    if (!favs) {
      return ResponseHelper.sendNotFound(res, 'Favs not found');
    }

    return ResponseHelper.sendOk(res, favs);
  }
}
