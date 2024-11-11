import { Artist } from 'src/artists/interfaces/artist.interfaces';
import { Album } from 'src/albums/interfaces/album.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export { Favorites, FavoritesResponse };
