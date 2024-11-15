import { InjectRepository } from '@nestjs/typeorm';
import { Favorites as FavoritesEntity } from './entities/favorite.entity';
import { Artist as ArtistEntity } from 'src/artists/entities/artist.entity';
import { Album as AlbumEntity } from 'src/albums/entities/album.entity';
import { Track as TrackEntity } from 'src/tracks/entities/track.entitiy';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import ResponseHelper from 'src/helpers/responseHelper';

@Injectable()
export default class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,

    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,

    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,

    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  private async helperFindResult(type: 'artists' | 'albums' | 'tracks') {
    const favorites = await this.favoritesRepository.findOne({
      select: [type],
    });
    const ids = favorites[type];

    switch (type) {
      case 'artists':
        return await Promise.all(
          ids.map((id) => {
            this.artistsRepository.findOne({ where: { id } });
          }),
        );
      case 'albums':
        return await Promise.all(
          ids.map((id) => {
            this.albumRepository.findOne({ where: { id } });
          }),
        );
      case 'tracks':
        return await Promise.all(
          ids.map((id) => {
            this.trackRepository.findOne({ where: { id } });
          }),
        );
    }
  }

  private getRepositoryByType(type: 'tracks' | 'artists' | 'albums') {
    switch (type) {
      case 'tracks':
        return this.trackRepository;
      case 'artists':
        return this.artistsRepository;
      case 'albums':
        return this.albumRepository;
      default:
        throw new Error('Invalid type');
    }
  }

  getFavorites(res: Response) {
    const result = {
      artists: this.helperFindResult('artists'),
      albums: this.helperFindResult('albums'),
      tracks: this.helperFindResult('tracks'),
    };

    return ResponseHelper.sendOk(res, result);
  }

  async addToFavs(
    id: string,
    type: 'tracks' | 'artists' | 'albums',
    res: Response,
  ) {
    const repository = this.getRepositoryByType(type);
    const item = await repository.findOne({ where: { id } });

    if (!item) {
      return res.status(422).json({ message: `${type} not found` });
    }

    const favorites = await this.favoritesRepository.findOne({
      select: [type],
    });
    const favoristesType = favorites[type];
    if (!favoristesType.includes(id)) {
      favoristesType.push(id);
      await this.favoritesRepository.save(favorites);
    }

    return res.status(201).json(item);
  }

  // deleteFromFavs(
  //   id: string,
  //   type: 'track' | 'artist' | 'album',
  //   res: Response,
  // ) {
  //   const isExist = this.favoritesRepository.findOne({
  //     where: { [type]: { id } },
  //   });

  //   if (!isExist) {
  //     return res.status(422).json({ message: `${type} not found` });
  //   }

  //   this.favoritesRepository.delete({ [type]: { id } });
  //   return res.status(204).json(undefined);
  // }
}
