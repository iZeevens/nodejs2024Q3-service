import { User } from 'src/users/interfaces/user.interface';
import { Artist } from 'src/artists/interfaces/artist.interfaces';
import { Track } from 'src/tracks/interfaces/track.interface';
import { Album } from 'src/albums/interfaces/album.interface';
import { Favorites } from 'src/favorites/interfaces/favorite.interface';
interface DBTypes {
  user: User[];
  track: Track[];
  artist: Artist[];
  album: Album[];
  favs: Favorites[];
}

const db: { [K in keyof DBTypes]: DBTypes[K] } = {
  user: [],
  track: [],
  artist: [],
  album: [],
  favs: [],
};

export default db;
