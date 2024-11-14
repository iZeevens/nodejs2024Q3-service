import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist as ArtistEntity } from './entities/artist.entity';
import { Artist } from './interfaces/artist.interfaces';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists.dto';
import { randomUUID } from 'crypto';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import { db } from 'src/data/inMemoryDB';
import { Track } from 'src/tracks/interfaces/track.interface';
import { Album } from 'src/albums/interfaces/album.interface';
import { Favorites } from 'src/favorites/interfaces/favorite.interface';

@Injectable()
export default class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<Artist>,
  ) {}

  private tracks: Track[] = db['track'];
  private albums: Album[] = db['album'];
  private favs: Favorites = db['favs'];

  async getArtists(res: Response) {
    return ResponseHelper.sendOk(res, await this.artistsRepository.find());
  }

  async getArtistsById(id: string, res: Response) {
    const artist = await this.artistsRepository.findOne({ where: { id } });

    if (!artist) {
      return ResponseHelper.sendNotFound(res, 'Artist not found');
    }

    return ResponseHelper.sendOk(res, artist);
  }

  async createArtist(body: CreateArtistDto, res: Response) {
    const { name, grammy } = body;

    const artist = this.artistsRepository.create({
      id: randomUUID(),
      name,
      grammy,
    });

    const savedArtist = await this.artistsRepository.save(artist);
    return res.status(201).json(savedArtist);
  }

  async updateArtist(id: string, body: UpdateArtistDto, res: Response) {
    const artist = await this.artistsRepository.findOne({ where: { id } });

    if (!artist) {
      return ResponseHelper.sendNotFound(res, 'Artist not found');
    }

    const { name, grammy } = body;

    if (name) artist.name = name;
    if (grammy !== null || grammy !== undefined) artist.grammy = grammy;

    const updateArtistArtist = await this.artistsRepository.save(artist);
    return ResponseHelper.sendOk(res, updateArtistArtist);
  }

  async deleteArtist(id: string, res: Response) {
    const artist = await this.artistsRepository.findOne({ where: { id } });

    if (!artist) {
      return ResponseHelper.sendNotFound(res, 'Artist not found');
    }

    // Change that
    const trackArtistId = this.tracks.find((track) => track.artistId === id);
    const albumArtistId = this.albums.find((album) => album.artistId === id);
    this.favs.artists = this.favs.artists.filter((artistId) => artistId !== id);

    if (trackArtistId) trackArtistId.artistId = null;
    if (albumArtistId) albumArtistId.artistId = null;
    //

    this.artistsRepository.delete(id);
    return res.status(204).json({ message: 'Artist was deleted' });
  }
}
