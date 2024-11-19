import { Artist } from 'src/restServices/artists/interfaces/artist.interfaces';
import { Album } from 'src/restServices/albums/interfaces/album.interface';
import { Track } from 'src/restServices/tracks/interfaces/track.interface';

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
