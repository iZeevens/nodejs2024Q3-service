import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist as ArtistEntity } from './entities/artist.entity';
import { Album as AlbumEntity } from 'src/albums/entities/album.entity';
import { Track as TrackEntity } from 'src/tracks/entities/track.entitiy';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists.dto';
import ResponseHelper from 'src/helpers/responseHelper';

@Injectable()
export default class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,

    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,

    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

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
    // this.favs.artists = this.favs.artists.filter((artistId) => artistId !== id);
    //

    this.artistsRepository.delete(id);
    return res.status(204).json({ message: 'Artist was deleted' });
  }
}
