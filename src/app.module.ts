import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbSource } from './data-source';
import { UsersModule } from './restServices/users/users.module';
import { ArtistsModule } from './restServices/artists/artists.module';
import { TracksModule } from './restServices/tracks/tracks.module';
import { AlbumsModule } from './restServices/albums/albums.module';
import { FavoritesModule } from './restServices/favorites/favorites.module';
import { LoggerModule } from './common/logging/logging.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { RequestLoggerMiddleware } from './common/logging/requestLoggerMiddleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    LoggerModule,
    AuthModule,
    TypeOrmModule.forRoot(dbSource),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
