import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import {
  CreateUserDto,
  DBTypes,
  User,
  Track,
  Artist,
  Album,
} from 'src/data/types/dataTypes';
import db from 'src/data/inMemoryDB';
import dataValidation from 'src/validations/dataValidation';
import ResponseHelper from 'src/helpers/responseHelper';

@Injectable()
export default class CommonService {
  getAll<T extends keyof DBTypes>(entityType: T): DBTypes[T] {
    return db[entityType];
  }

  postCommon<T extends keyof DBTypes>(
    entityType: T,
    data: DBTypes[T][number],
    res: Response,
  ) {
    if ('id' in data) {
      delete data.id;
    }

    if (
      entityType === 'user' &&
      dataValidation.userValidation(data as CreateUserDto, res)
    ) {
      const date = Date.now();
      const postData = {
        id: randomUUID(),
        ...data,
        version: 1,
        createdAt: date,
        updatedAt: date,
      } as User;

      db['user'].push(postData as User);

      return ResponseHelper.sendCreated(res, postData);
    } else if (
      entityType === 'artist' &&
      dataValidation.artistValidation(data as Artist, res)
    ) {
      const postData = {
        id: randomUUID(),
        ...data,
      } as Artist;

      db['artist'].push(postData);

      return ResponseHelper.sendCreated(res, postData);
    } else if (
      entityType === 'track' &&
      dataValidation.trackValidation(data as Track, res)
    ) {
      const postData = {
        id: randomUUID(),
        ...data,
      } as Track;
      db['track'].push(postData);

      return ResponseHelper.sendCreated(res, postData);
    } else if (
      entityType === 'album' &&
      dataValidation.albumValidation(data as Album, res)
    ) {
      const postData = {
        id: randomUUID(),
        ...data,
      } as Album;
      db['album'].push(postData);

      return ResponseHelper.sendCreated(res, postData);
    }
  }
}
