import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album as AlbumEntity } from './entities/album.entity';
// import { Track } from 'src/tracks/interfaces/track.interface';
// import { Favorites } from 'src/favorites/interfaces/favorite.interface';
import { Repository } from 'typeorm';
import { CreateAlbum, UpdateAlbum } from './dto/albums.dto';
import { Response } from 'express';
import ResponseHelper from 'src/helpers/responseHelper';
// import { db } from 'src/data/inMemoryDB';

@Injectable()
export default class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  // private tracks: Track[] = db['track'];
  // private favs: Favorites = db['favs'];

  async findAll(res: Response) {
    const result = await this.albumsRepository.find({
      relations: ['artistId'],
    });

    const mappedResult = result.map((album) => ({
      ...album,
      artistId: album.artistId?.id || null,
    }));

    return ResponseHelper.sendOk(res, mappedResult);
  }

  async findById(id: string, res: Response) {
    const album = await this.albumsRepository.findOne({ where: { id } });

    if (!album) {
      return ResponseHelper.sendNotFound(res, 'Album not found');
    }

    return ResponseHelper.sendOk(res, album);
  }

  async createAlbum(body: CreateAlbum, res: Response) {
    const { name, year, artistId } = body;

    const album = this.albumsRepository.create({ name, year, artistId });

    const savedAlbum = await this.albumsRepository.save(album);
    return res.status(201).json(savedAlbum);
  }

  async updateAlbum(id: string, body: UpdateAlbum, res: Response) {
    const album = await this.albumsRepository.findOne({ where: { id } });

    if (!album) {
      return ResponseHelper.sendNotFound(res, 'Album not found');
    }

    const { name, year, artistId } = body;

    if (name) album.name = name;
    if (year) album.year = year;
    if (artistId !== undefined) album.artistId = artistId;
    const updatedAlbum = await this.albumsRepository.save(album);

    return ResponseHelper.sendOk(res, updatedAlbum);
  }

  async deleteAlbum(id: string, res: Response) {
    const album = await this.albumsRepository.findOne({ where: { id } });

    if (!album) {
      return ResponseHelper.sendNotFound(res, 'Album not found');
    }

    // Change that
    // this.tracks.forEach((track) => {
    //   if (track.albumId === id) {
    //     track.albumId = null;
    //   }
    // });
    // this.favs.albums = this.favs.albums.filter((albumId) => albumId !== id);
    //

    await this.albumsRepository.delete(id);
    return res.status(204).json({ message: 'Album was deleted' });
  }
}
