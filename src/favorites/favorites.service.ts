import { InjectRepository } from '@nestjs/typeorm';
import { Favorites as FavoritesEntity } from './entities/favorite.entity';
import { Artist as ArtistEntity } from 'src/artists/entities/artist.entity';
import { Album as AlbumEntity } from 'src/albums/entities/album.entity';
import { Track as TrackEntity } from 'src/tracks/entities/track.entitiy';
import { mappedResultRelations } from 'src/helpers/mappedResultRelations';
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

  async findAll(res: Response) {
    const favorites = await this.favoritesRepository.findOne({
      where: {},
      select: ['tracks', 'albums', 'artists'],
    });

    if (!favorites) {
      return ResponseHelper.sendOk(res, {
        tracks: [],
        albums: [],
        artists: [],
      });
    }

    const [tracks, albums, artists] = await Promise.all([
      this.trackRepository.find({
        where: { id: In(favorites.tracks || []) },
        relations: ['artistId', 'albumId'],
      }),
      this.albumRepository.find({
        where: { id: In(favorites.albums || []) },
        relations: ['artistId'],
      }),
      this.artistsRepository.find({
        where: { id: In(favorites.artists || []) },
      }),
    ]);

    const tracksResult = mappedResultRelations(tracks, 'tracks');
    const albumsResult = mappedResultRelations(albums, 'albums');
    const artistsResult = mappedResultRelations(artists, 'artists');

    const result = {
      tracks: tracksResult,
      albums: albumsResult,
      artists: artistsResult,
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

  async deleteFromFavs(
    id: string,
    type: 'tracks' | 'artists' | 'albums',
    res: Response,
  ) {
    const favorites = await this.favoritesRepository.findOne({ where: {} });

    if (!favorites) {
      return res.status(422).json({ message: `${type} not found` });
    }

    favorites[type] = favorites[type].filter((favId) => favId !== id);

    await this.favoritesRepository.save(favorites);
    return res.status(204).json(undefined);
  }
}
