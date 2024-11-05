import {
  CreateUserDto,
  Artist,
  Track,
  Album,
  Favorites,
} from 'src/data/types/dataTypes';

const validation = (data: unknown) =>
  typeof data === 'object' || data === null ? false : true;

const dataValidation = {
  userValidation: (data: CreateUserDto): data is CreateUserDto => {
    if (!validation(data)) return false;

    const isValidLogin = 'login' in data && typeof data.login === 'string';
    const isValidPassword =
      'password' in data && typeof data.password === 'string';

    return isValidLogin && isValidPassword;
  },

  artistValidation: (data: Artist): data is Artist => {
    if (!validation(data)) return false;

    const isValidName = 'name' in data && typeof data.name === 'string';
    const isValidGrammy =
      'duration' in data && typeof data.duration === 'boolean';

    return isValidName && isValidGrammy;
  },

  trackValidation: (data: Track): data is Track => {
    if (!validation(data)) return false;

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

  albumValidation: (data: Album): data is Album => {
    if (!validation(data)) return false;

    const isValidName = 'name' in data && typeof data.name === 'string';
    const isValidYear = 'year' in data && typeof data.year === 'number';
    const isValidArtistId =
      ('artistId' in data && typeof data.artistId === 'string') ||
      data.artistId === null;

    return isValidName && isValidYear && isValidArtistId;
  },

  favoriteValidation: (data: Favorites): data is Favorites => {
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
