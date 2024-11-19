import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entitiy';
import TracksController from './tracks.controller';
import TracksService from './tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
