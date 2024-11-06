import {
  CreateUserDto,
  Artist,
  Track,
  Album,
  Favorites,
} from 'src/data/types/dataTypes';
import ResponseHelper from 'src/helpers/responseHelper';
import { Response } from 'express';

const isString = (value: unknown): boolean => typeof value === 'string';
const isBoolean = (value: unknown): boolean => typeof value === 'boolean';
const isNumber = (value: unknown): boolean => typeof value === 'number';

const sendError = (res: Response, message: string) => {
  ResponseHelper.sendBadRequest(res, message);
};

const validateObject = (data: unknown, res: Response): boolean => {
  if (typeof data !== 'object' || data === null) {
    sendError(res, 'Body isn`t an object or data is null');
    return false;
  }
  return true;
};

const dataValidation = {
  userValidation: (
    data: CreateUserDto,
    res: Response,
  ): data is CreateUserDto => {
    if (!validateObject(data, res)) return false;

    const isValidLogin = 'login' in data && isString(data.login);
    const isValidPassword = 'password' in data && isString(data.password);

    if (!isValidLogin) sendError(res, 'Login isn`t valid');
    if (!isValidPassword) sendError(res, 'Password isn`t valid');

    return isValidLogin && isValidPassword;
  },

  artistValidation: (data: Artist, res: Response): data is Artist => {
    if (!!validateObject(data, res)) return false;

    const isValidName = 'name' in data && isString(data.name);
    const isValidGrammy = 'grammy' in data && isBoolean(data.grammy);

    if (!isValidName) sendError(res, 'Name isn`t valid');
    if (!isValidGrammy) sendError(res, 'Grammy isn`t valid');

    return isValidName && isValidGrammy;
  },

  trackValidation: (data: Track, res: Response): data is Track => {
    if (!!validateObject(data, res)) return false;

    const isValidName = 'name' in data && isString(data.name);
    const isValidArtistId =
      'artistId' in data && (isString(data.artistId) || data.artistId === null);
    const isValidAlbumId =
      'albumId' in data && (isString(data.artistId) || data.albumId === null);
    const isValidDuration = 'duration' in data && isString(data.duration);

    if (!isValidName) sendError(res, 'Name isn`t valid');
    if (!isValidArtistId) sendError(res, 'ArtistId isn`t valid');
    if (!isValidAlbumId) sendError(res, 'AlbumId isn`t valid');
    if (!isValidDuration) sendError(res, 'Duration isn`t valid');

    return isValidName && isValidArtistId && isValidAlbumId && isValidDuration;
  },

  albumValidation: (data: Album, res: Response): data is Album => {
    if (!validateObject(data, res)) return false;

    const isValidName = 'name' in data && isString(data.name);
    const isValidYear = 'year' in data && isNumber(data.year);
    const isValidArtistId =
      'artistId' in data && (isString(data.artistId) || data.artistId === null);

    if (!isValidName) sendError(res, 'Name isn`t valid');
    if (!isValidYear) sendError(res, 'Year isn`t valid');
    if (!isValidArtistId) sendError(res, 'ArtistId isn`t valid');

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

    if (!isValidArray) ResponseHelper.sendBadRequest(res, 'Array isn`t valid');

    if (
      !isValidArray(data.artists) ||
      !isValidArray(data.albums) ||
      !isValidArray(data.tracks)
    ) {
      sendError(res, 'Array isn`t valid');
      return false;
    }

    return true;
  },
};

export default dataValidation;
