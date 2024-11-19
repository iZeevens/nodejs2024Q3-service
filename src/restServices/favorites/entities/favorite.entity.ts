import { Entity, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { Artist } from 'src/restServices/artists/entities/artist.entity';
import { Album } from 'src/restServices/albums/entities/album.entity';
import { Track } from 'src/restServices/tracks/entities/track.entitiy';

@Entity()
export class Favorites {
  @PrimaryColumn({ default: 'singleton' })
  id: string;

  @OneToMany(() => Artist, (artist) => artist.favorites)
  @JoinColumn({ name: 'artists' })
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.favorites)
  @JoinColumn({ name: 'albums' })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.favorites)
  @JoinColumn({ name: 'tracks' })
  tracks: Track[];
}
