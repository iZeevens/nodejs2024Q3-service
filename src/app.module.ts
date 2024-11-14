import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      password: 'root',
      username: 'root',
      entities: [User],
      database: 'pgWithNest',
      synchronize: true,
    }),
    UsersModule,
    // ArtistsModule,
    // TracksModule,
    // AlbumsModule,
    // FavoritesModule,
  ],
})
export class AppModule {}
