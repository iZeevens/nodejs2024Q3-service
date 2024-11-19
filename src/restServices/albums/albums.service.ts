import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album as AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { CreateAlbum, UpdateAlbum } from './dto/albums.dto';
import { Response } from 'express';
import ResponseHelper from 'src/helpers/responseHelper';
@Injectable()
export default class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async findAll(res: Response) {
    const result = await this.albumsRepository.find();

    return ResponseHelper.sendOk(res, result);
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

    await this.albumsRepository.delete(id);
    return res.status(204).json({ message: 'Album was deleted' });
  }
}
