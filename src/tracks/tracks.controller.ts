import { Controller, Body, Param, Res, Get, Post, Put } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { Response } from 'express';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';

@Controller('track')
export default class TracksController {
  constructor(private readonly TracksService: TracksController) {}

  @Get()
  findAll(@Res() res: Response) {
    return this.TracksService.findAll(res);
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.TracksService.findById(id, res);
  }

  @Post()
  createTrack(@Body() body: CreateTrackDto, @Res() res: Response) {
    return this.TracksService.createTrack(body, res);
  }

  @Put()
  updateTrack(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Body() body: UpdateTrackDto,
    @Res() res: Response,
  ) {
    return this.TracksService.updateTrack(id, body, res);
  }
}
