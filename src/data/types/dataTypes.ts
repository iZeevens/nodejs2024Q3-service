import { User } from 'src/users/interfaces/user.interface';
import { Artist } from 'src/artists/interfaces/artist.interfaces';
import { Track } from 'src/tracks/interfaces/track.interface';
import { Album } from 'src/albums/interfaces/album.interface';
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
