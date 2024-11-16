import { InjectRepository } from '@nestjs/typeorm';
import { Favorites as FavoritesEntity } from './entities/favorite.entity';
import { Artist as ArtistEntity } from 'src/artists/entities/artist.entity';
import { Album as AlbumEntity } from 'src/albums/entities/album.entity';
import { Track as TrackEntity } from 'src/tracks/entities/track.entitiy';
import { In, Repository } from 'typeorm';
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

  private async helperFindResult<
    T extends TrackEntity | AlbumEntity | ArtistEntity,
  >(type: 'artists' | 'albums' | 'tracks'): Promise<T[]> {
    const favorites = await this.favoritesRepository.findOne({
      where: {},
      select: [type],
    });

    const ids = favorites?.[type] || [];
    const repository = this.getRepositoryByType(type);

    return repository.find({
      where: {
        id: In(ids),
      },
    }) as Promise<T[]>;
  }

  async getFavorites(res: Response) {
    const artists = await this.helperFindResult<ArtistEntity>('artists');
    const albums = await this.helperFindResult<AlbumEntity>('albums');
    const tracks = await this.helperFindResult<TrackEntity>('tracks');

    const result = { artists, albums, tracks };

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

    let favorites = await this.favoritesRepository.findOne({ where: {} });

    if (!favorites) {
      favorites = this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.favoritesRepository.save(favorites);
    }

    const favoritesType = favorites[type];
    if (!favoritesType.includes(id)) {
      favoritesType.push(id);
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
