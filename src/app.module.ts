import { Module } from '@nestjs/common';
import UsersController from './users/users.controller';
import UsersService from './users/users.service';
import ArtistsController from './artists/artists.controller';
import ArtistsService from './artists/artists.service';
import TracksController from './tracks/tracks.controller';
import TracksService from './tracks/tracks.service';
import AlbumsController from './albums/albums.controller';
import AlbumsService from './albums/albums.service';
import FavoritesController from './favorites/favorites.controller';
import FavoritesService from './favorites/favorites.service';

@Module({
  imports: [],
  controllers: [
    UsersController,
    ArtistsController,
    TracksController,
    AlbumsController,
    FavoritesController,
  ],
  providers: [
    UsersService,
    ArtistsService,
    TracksService,
    AlbumsService,
    FavoritesService,
  ],
})
export class AppModule {}
