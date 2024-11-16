import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryColumn({ default: 'singleton' })
  id: string;

  @Column('uuid', { array: true, default: [] })
  artists: string[];

  @Column('uuid', { array: true, default: [] })
  albums: string[];

  @Column('uuid', { array: true, default: [] })
  tracks: string[];
}

// import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
// import { Artist } from 'src/artists/entities/artist.entity';
// import { Album } from 'src/albums/entities/album.entity';
// import { Track } from 'src/tracks/entities/track.entitiy';

// @Entity()
// export class Favorites {
//   @PrimaryColumn({ default: 'singleton' })
//   id: string;

//   @OneToMany(() => Artist, (artist) => artist.id)
//   artists: Artist[];

//   @OneToMany(() => Album, (album) => album.id)
//   albums: Album[];

//   @OneToMany(() => Track, (track) => track.id)
//   tracks: Track[];
// }
