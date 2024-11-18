import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Artist } from './artists/entities/artist.entity';
import { Track } from './tracks/entities/track.entitiy';
import { Album } from './albums/entities/album.entity';
import { Favorites } from './favorites/entities/favorite.entity';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [User, Artist, Track, Album, Favorites],
      database: process.env.POSTGRES_DB,
      synchronize: true,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    }),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
