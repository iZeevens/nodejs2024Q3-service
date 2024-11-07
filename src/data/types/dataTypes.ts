import { User } from 'src/users/interfaces/user.interface';
import { Artist } from 'src/artists/interfaces/artist.interfaces';
import { Track } from 'src/tracks/dto/tracks.dto';

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
