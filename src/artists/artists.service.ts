import { Injectable } from '@nestjs/common';
import { Artist } from './interfaces/artist.interfaces';
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
  private artists: Artist[] = db['artist'];
  private tracks: Track[] = db['track'];
  private albums: Album[] = db['album'];
  private favs: Favorites = db['favs'];

  getArtists(res: Response) {
    return ResponseHelper.sendOk(res, this.artists);
  }

  getArtistsById(id: string, res: Response) {
    const artist = existById('artist', id);

    if (!artist) {
      return ResponseHelper.sendNotFound(res, 'Artist not found');
    }

    return ResponseHelper.sendOk(res, artist);
  }

  createArtist(body: CreateArtistDto, res: Response) {
    const { name, grammy } = body;

    const data = { id: randomUUID(), name, grammy };

    this.artists.push(data);
    return res.status(201).json(data);
  }

  updateArtist(id: string, body: UpdateArtistDto, res: Response) {
    const artist = existById('artist', id) as Artist;

    if (!artist) {
      return ResponseHelper.sendNotFound(res, 'Artist not found');
    }

    const { name, grammy } = body;

    if (name) artist.name = name;
    if (grammy !== null || grammy !== undefined) artist.grammy = grammy;

    return ResponseHelper.sendOk(res, artist);
  }

  deleteArtist(id: string, res: Response) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      return ResponseHelper.sendNotFound(res, 'Artist not found');
    }

    const trackArtistId = this.tracks.find((track) => track.artistId === id);
    const albumArtistId = this.albums.find((album) => album.artistId === id);
    this.favs.artists = this.favs.artists.filter((artist) => artist.id !== id);

    if (trackArtistId) trackArtistId.artistId = null;
    if (albumArtistId) albumArtistId.artistId = null;

    this.artists.splice(artistIndex, 1);
    return res.status(204).json({ message: 'Artist was deleted' });
  }
}
