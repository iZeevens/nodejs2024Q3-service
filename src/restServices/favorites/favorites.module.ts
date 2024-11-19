import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entities/favorite.entity';
import { Artist } from 'src/restServices/artists/entities/artist.entity';
import { Album } from 'src/restServices/albums/entities/album.entity';
import { Track } from 'src/restServices/tracks/entities/track.entitiy';
import FavoritesController from './favorites.controller';
import FavoritesService from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites, Artist, Album, Track])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
