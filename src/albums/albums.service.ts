import { Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { CreateAlbum } from './dto/albums.dto';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import db from 'src/data/inMemoryDB';

@Injectable()
export default class AlbumsService {
  private albums: Album[] = db['album'];

  findAll(res: Response) {
    return ResponseHelper.sendOk(res, this.albums);
  }

  findById(id: string, res: Response) {
    const album = existById('artist', id);

    if (!album) {
      return ResponseHelper.sendNotFound(res, 'Album not found');
    }

    return ResponseHelper.sendOk(res, album);
  }

  createAlbum(body: CreateAlbum, res: Response) {
    const { name, year, artistId } = body;

    const data = { id: randomUUID(), name, year, artistId };

    this.albums.push(data);
    return res.status(201).json(data);
  }
}
