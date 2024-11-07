import { Controller } from '@nestjs/common';
import { Response } from 'express';

@Controller('track')
export default class TracksController {
  constructor(private readonly TracksService: TracksController) {}
}
