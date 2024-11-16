import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Favorites } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entitiy';
import { Album } from 'src/albums/entities/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @ManyToOne(() => Favorites, (favorites) => favorites.tracks, {
    onDelete: 'CASCADE',
  })
  favorites: Favorites;

  @ManyToOne(() => Track, (track) => track.artistId, {
    onDelete: 'SET NULL',
  })
  tracks;

  @OneToMany(() => Album, (album) => album.artist, {
    onDelete: 'SET NULL',
  })
  artist;
}
