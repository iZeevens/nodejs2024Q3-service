import {
  CreateUserDto,
  Artist,
  Track,
  Album,
  Favorites,
} from 'src/data/types/dataTypes';
import ResponseHelper from 'src/helpers/responseHelper';
import { Response } from 'express';

const validation = (data: unknown, res: Response) => {
  ResponseHelper.sendBadRequest(res, 'Body isn`t object or data = null');

  return typeof data === 'object' && data !== null ? true : false;
};

const dataValidation = {
  userValidation: (
    data: CreateUserDto,
    res: Response,
  ): data is CreateUserDto => {
    if (!validation(data, res)) return false;

    const isValidLogin = 'login' in data && typeof data.login === 'string';
    const isValidPassword =
      'password' in data && typeof data.password === 'string';

    return isValidLogin && isValidPassword;
  },

  artistValidation: (data: Artist, res: Response): data is Artist => {
    if (!validation(data, res)) return false;

    const isValidName = 'name' in data && typeof data.name === 'string';
    const isValidGrammy =
      'duration' in data && typeof data.grammy === 'boolean';

    return isValidName && isValidGrammy;
  },

  trackValidation: (data: Track, res: Response): data is Track => {
    if (!validation(data, res)) return false;

    const isValidName = 'name' in data && typeof data.name === 'string';
    const isValidArtistId =
      ('artistId' in data && typeof data.artistId === 'string') ||
      data.artistId === null;
    const isValidAlbumId =
      ('albumId' in data && typeof data.albumId === 'string') ||
      data.albumId === null;
    const isValidDuration =
      'duration' in data && typeof data.duration === 'string';

    return isValidName && isValidArtistId && isValidAlbumId && isValidDuration;
  },

  albumValidation: (data: Album, res: Response): data is Album => {
    if (!validation(data, res)) return false;

    const isValidName = 'name' in data && typeof data.name === 'string';
    const isValidYear = 'year' in data && typeof data.year === 'number';
    const isValidArtistId =
      ('artistId' in data && typeof data.artistId === 'string') ||
      data.artistId === null;

    return isValidName && isValidYear && isValidArtistId;
  },

  favoriteValidation: (data: Favorites, res: Response): data is Favorites => {
    if (
      typeof data !== 'object' ||
      !Array.isArray(data.artists) ||
      !Array.isArray(data.albums) ||
      !Array.isArray(data.tracks)
    ) {
      return false;
    }

    const isValidArray = (array: any[]): boolean =>
      array.every((id) => typeof id === 'string');

    return (
      isValidArray(data.artists) &&
      isValidArray(data.albums) &&
      isValidArray(data.tracks)
    );
  },
};

export default dataValidation;
