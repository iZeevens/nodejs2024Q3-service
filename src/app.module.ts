import { Module } from '@nestjs/common';
import UsersController from './users/users.controller';
import UsersService from './users/users.service';
import ArtistsController from './artists/artists.controller';
import ArtistsService from './artists/artists.service';

@Module({
  imports: [],
  controllers: [UsersController, ArtistsController],
  providers: [UsersService, ArtistsService],
})
export class AppModule {}
