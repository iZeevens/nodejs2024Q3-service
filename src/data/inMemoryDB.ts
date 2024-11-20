import { User } from 'src/restServices/users/interfaces/user.interface';
import { Artist } from 'src/restServices/artists/interfaces/artist.interfaces';
import { Track } from 'src/restServices/tracks/interfaces/track.interface';
import { Album } from 'src/restServices/albums/interfaces/album.interface';
import { Favorites } from 'src/restServices/favorites/interfaces/favorite.interface';
interface DBTypes {
  user: User[];
  track: Track[];
  artist: Artist[];
  album: Album[];
  favs: Favorites;
}

const db: { [K in keyof DBTypes]: DBTypes[K] } = {
  user: [],
  track: [],
  artist: [],
  album: [],
  favs: { artists: [], albums: [], tracks: [] },
};

export { db, DBTypes };
