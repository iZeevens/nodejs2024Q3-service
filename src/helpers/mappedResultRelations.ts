import { Artist as ArtistEntity } from 'src/artists/entities/artist.entity';
import { Album as AlbumEntity } from 'src/albums/entities/album.entity';
import { Track as TrackEntity } from 'src/tracks/entities/track.entitiy';

function mappedResultRelations(
  result: ArtistEntity[] | AlbumEntity[] | TrackEntity[] | [],
  type: 'artists' | 'albums' | 'tracks',
) {
  if (result.length === 0) return;

  if (type === 'albums') {
    return result.map((item) => ({
      ...item,
      artistId: item.artistId || null,
    }));
  } else if (type === 'tracks') {
    return result.map((item) => ({
      ...item,
      artistId: item.artistId || null,
      albumId: item.albumId || null,
    }));
  }

  return result;
}

export { mappedResultRelations };
