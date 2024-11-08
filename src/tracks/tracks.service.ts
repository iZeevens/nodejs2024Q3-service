import { Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { Favorites } from 'src/favorites/interfaces/favorite.interface';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import { db } from 'src/data/inMemoryDB';

@Injectable()
export default class TracksService {
  private tracks: Track[] = db['track'];
  private favs: Favorites = db['favs'];

  findAll(res: Response) {
    return ResponseHelper.sendOk(res, this.tracks);
  }

  findById(id: string, res: Response) {
    const track = existById('track', id);

    if (!track) {
      return ResponseHelper.sendNotFound(res, 'Track not found');
    }

    return ResponseHelper.sendOk(res, track);
  }

  createTrack(body: CreateTrackDto, res: Response) {
    const { name, artistId, albumId, duration } = body;

    const data = { id: randomUUID(), name, artistId, albumId, duration };

    this.tracks.push(data);
    return res.status(201).json(data);
  }

  updateTrack(id: string, body: UpdateTrackDto, res: Response) {
    const track = existById('track', id) as Track;

    if (!track) {
      return ResponseHelper.sendNotFound(res, 'Track not found');
    }
    const { name, artistId, albumId, duration } = body;

    if (name) track.name = name;
    if (artistId !== undefined) track.artistId = artistId;
    if (albumId !== undefined) track.albumId = albumId;
    if (duration) track.duration = duration;

    return ResponseHelper.sendOk(res, track);
  }

  deleteTrack(id: string, res: Response) {
    const track = this.tracks.findIndex((track) => track.id === id);

    if (track === -1) {
      return ResponseHelper.sendNotFound(res, 'Track not found');
    }

    const favoriteTrackId = this.favs.tracks.findIndex(
      (track) => track.id === id,
    );

    if (favoriteTrackId === -1) this.favs.tracks.splice(favoriteTrackId, 1);

    this.tracks.splice(track, 1);
    return res.status(204).json({ message: 'Track was deleted' });
  }
}
