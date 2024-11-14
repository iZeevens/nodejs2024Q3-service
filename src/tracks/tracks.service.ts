import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track as TrackEntity } from './entities/track.entitiy';
import { Repository } from 'typeorm';
import { Favorites } from 'src/favorites/interfaces/favorite.interface';
import { Response } from 'express';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';
import ResponseHelper from 'src/helpers/responseHelper';
import { db } from 'src/data/inMemoryDB';

@Injectable()
export default class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  private favs: Favorites = db['favs'];

  async findAll(res: Response) {
    return ResponseHelper.sendOk(res, await this.tracksRepository.find());
  }

  async findById(id: string, res: Response) {
    const track = await this.tracksRepository.findOne({ where: { id } });

    if (!track) {
      return ResponseHelper.sendNotFound(res, 'Track not found');
    }

    return ResponseHelper.sendOk(res, track);
  }

  async createTrack(body: CreateTrackDto, res: Response) {
    const { name, artistId, albumId, duration } = body;

    const track = this.tracksRepository.create({
      name,
      artistId,
      albumId,
      duration,
    });
    const savedTrack = await this.tracksRepository.save(track);

    return res.status(201).json(savedTrack);
  }

  async updateTrack(id: string, body: UpdateTrackDto, res: Response) {
    const track = await this.tracksRepository.findOne({ where: { id } });

    if (!track) {
      return ResponseHelper.sendNotFound(res, 'Track not found');
    }
    const { name, artistId, albumId, duration } = body;

    if (name) track.name = name;
    if (artistId !== undefined) track.artistId = artistId;
    if (albumId !== undefined) track.albumId = albumId;
    if (duration) track.duration = duration;

    const updatedTrack = await this.tracksRepository.save(track);

    return ResponseHelper.sendOk(res, updatedTrack);
  }

  async deleteTrack(id: string, res: Response) {
    const track = await this.tracksRepository.findOne({ where: { id } });

    if (!track) {
      return ResponseHelper.sendNotFound(res, 'Track not found');
    }

    // Change that
    this.favs.tracks = this.favs.tracks.filter((trackId) => trackId !== id);
    //

    await this.tracksRepository.delete(id);
    return res.status(204).json({ message: 'Track was deleted' });
  }
}
