import TracksService from './tracks.service';
import {
  Controller,
  Body,
  Param,
  Res,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { Response } from 'express';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';

@Controller('track')
export default class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll(@Res() res: Response) {
    return this.tracksService.findAll(res);
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.tracksService.findById(id, res);
  }

  @Post()
  createTrack(@Body() body: CreateTrackDto, @Res() res: Response) {
    return this.tracksService.createTrack(body, res);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Body() body: UpdateTrackDto,
    @Res() res: Response,
  ) {
    return this.tracksService.updateTrack(id, body, res);
  }

  @Delete(':id')
  deleteTrack(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.tracksService.deleteTrack(id, res);
  }
}
