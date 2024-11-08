import { Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { Favorites } from 'src/favorites/interfaces/favorite.interface';
import { CreateAlbum, UpdateAlbum } from './dto/albums.dto';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import { db } from 'src/data/inMemoryDB';

@Injectable()
export default class AlbumsService {
  private albums: Album[] = db['album'];
  private tracks: Track[] = db['track'];
  private favs: Favorites = db['favs'];

  findAll(res: Response) {
    return ResponseHelper.sendOk(res, this.albums);
  }

  findById(id: string, res: Response) {
    const album = existById('album', id);

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

  updateAlbum(id: string, body: UpdateAlbum, res: Response) {
    const album = existById('album', id) as Album;

    if (!album) {
      return ResponseHelper.sendNotFound(res, 'Album not found');
    }

    const { name, year, artistId } = body;

    if (name) album.name = name;
    if (year) album.year = year;
    if (artistId !== undefined) album.artistId = artistId;

    return ResponseHelper.sendOk(res, album);
  }

  deleteAlbum(id: string, res: Response) {
    const album = this.albums.findIndex((album) => album.id === id);

    if (album === -1) {
      return ResponseHelper.sendNotFound(res, 'Album not found');
    }

    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    const favoriteAlbumId = this.favs.albums.findIndex(
      (album) => album.id === id,
    );

    if (favoriteAlbumId === -1) this.favs.albums.splice(favoriteAlbumId, 1);

    this.albums.splice(album, 1);
    return res.status(204).json({ message: 'Album was deleted' });
  }
}
