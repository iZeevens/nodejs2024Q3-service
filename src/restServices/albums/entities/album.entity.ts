import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Favorites } from 'src/restServices/favorites/entities/favorite.entity';
import { Track } from 'src/restServices/tracks/entities/track.entitiy';
import { Artist } from 'src/restServices/artists/entities/artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  year: number;

  @Column({
    nullable: true,
  })
  artistId: string | null;

  @ManyToOne(() => Favorites, (favorites) => favorites.tracks, {
    onDelete: 'CASCADE',
  })
  favorites: Favorites;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  artist;

  @OneToMany(() => Track, (track) => track.albumId, {
    onDelete: 'SET NULL',
  })
  tracks;
}
