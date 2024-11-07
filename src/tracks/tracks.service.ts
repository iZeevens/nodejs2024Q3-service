import { Injectable } from '@nestjs/common';
import { Track } from './dto/tracks.dto';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import existById from 'src/helpers/checkExist';
import ResponseHelper from 'src/helpers/responseHelper';
import db from 'src/data/inMemoryDB';

@Injectable()
export default class TracksService {
  private tracks: Track[] = db['track'];
}
