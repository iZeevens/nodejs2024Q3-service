import { Controller, Body, Param, Res } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { Response } from 'express';
import { CreateTrackDto } from './dto/tracks.dto';

@Controller('track')
export default class TracksController {
  constructor(private readonly TracksService: TracksController) {}

  findAll(@Res() res: Response) {
    return this.TracksService.findAll(res);
  }

  findById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 }))
    id: string,
    @Res() res: Response,
  ) {
    return this.TracksService.findById(id, res);
  }

  createTrack(@Body() body: CreateTrackDto, @Res() res: Response) {
    return this.TracksService.createTrack(body, res);
  }
}
