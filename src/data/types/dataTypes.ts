import { User } from 'src/users/interfaces/user.interface';
import { Artist } from 'src/artists/interfaces/artists.interfaces';

interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
interface DBTypes {
  user: User[];
  track: Track[];
  artist: Artist[];
  album: Album[];
  favs: Favorites[];
}

export { Artist, Track, Album, Favorites, DBTypes };
