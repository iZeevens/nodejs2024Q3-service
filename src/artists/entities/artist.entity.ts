import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Favorites } from 'src/favorites/entities/favorite.entity';

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
}
