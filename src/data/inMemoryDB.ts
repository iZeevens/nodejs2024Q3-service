import { DBTypes } from './types/dataTypes';

const db: { [K in keyof DBTypes]: DBTypes[K] } = {
  user: [],
  track: [],
  artist: [],
  album: [],
  favs: [],
};

export default db;
