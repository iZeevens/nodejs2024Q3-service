import { Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import db from 'src/data/inMemoryDB';

@Injectable()
export default class TracksService {
  private tracks: Track[] = db['track'];

  findAll(res: Response) {
    return ResponseHelper.sendOk(res, this.tracks);
  }

  findById(id: string, res: Response) {
    const track = existById('track', id);

    if (!track) {
      return ResponseHelper.sendNotFound(res, 'Track not found');
    }
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
    if (artistId) track.artistId = artistId;
    if (albumId) track.albumId = albumId;
    if (duration) track.duration = duration;

    return ResponseHelper.sendOk(res, track);
  }
}
