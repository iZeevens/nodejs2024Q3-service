import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import db from 'src/data/inMemoryDB';
import {
  CreateUserDto,
  DBTypes,
  User,
  Track,
  Artist,
  Album,
} from 'src/data/types/dataTypes';
import dataValidation from 'src/validations/dataValidation';

@Injectable()
export default class CommonService {
  getAll<T extends keyof DBTypes>(entityType: T): DBTypes[T] {
    return db[entityType];
  }

  postCommon<T extends keyof DBTypes>(entityType: T, data: DBTypes[T][number]) {
    if ('id' in data) {
      delete data.id;
    }

    if (
      entityType === 'user' &&
      dataValidation.userValidation(data as CreateUserDto)
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
    } else if (
      entityType === 'artist' &&
      dataValidation.artistValidation(data as Artist)
    ) {
      const postData = {
        id: randomUUID(),
        ...data,
      } as Artist;

      db['artist'].push(postData);
    } else if (
      entityType === 'track' &&
      dataValidation.trackValidation(data as Track)
    ) {
      const postData = {
        id: randomUUID(),
        ...data,
      } as Track;
      db['track'].push(postData);
    } else if (
      entityType === 'album' &&
      dataValidation.albumValidation(data as Album)
    ) {
      const postData = {
        id: randomUUID(),
        ...data,
      } as Album;
      db['album'].push(postData);
    }
  }
}
