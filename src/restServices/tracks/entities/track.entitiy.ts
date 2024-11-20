import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Favorites } from 'src/restServices/favorites/entities/favorite.entity';
import { Artist } from 'src/restServices/artists/entities/artist.entity';
import { Album } from 'src/restServices/albums/entities/album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  artistId: string | null;

  @Column({
    nullable: true,
  })
  albumId: string | null;

  @Column('int')
  duration: number;

  @ManyToOne(() => Favorites, (favorites) => favorites.tracks, {
    onDelete: 'CASCADE',
  })
  favorites: Favorites;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  album;
}
