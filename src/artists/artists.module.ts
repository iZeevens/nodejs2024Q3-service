import { Module } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';
import ArtistsController from './artists.controller';
import ArtistsService from './artists.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
