import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { DBTypes, User, Track, Artist, Album } from 'src/data/types/dataTypes';
import db from 'src/data/inMemoryDB';
import dataValidation from 'src/helpers/validations/dataValidation';
import ResponseHelper from 'src/helpers/responseHelper';

@Injectable()
export default class postSerivce {
  private createPostData<T extends keyof DBTypes>(
    entityType: T,
    data: DBTypes[T][number],
  ): DBTypes[T][number] {
    if (entityType === 'user') {
      const date = Date.now();
      return {
        id: randomUUID(),
        ...(data as User),
        version: 1,
        createdAt: date,
        updatedAt: date,
      };
    }

    return {
      id: randomUUID(),
      ...data,
    };
  }

  private validateAndPost<T extends keyof DBTypes>(
    entityType: T,
    data: DBTypes[T][number],
    res: Response,
    validator: (data: DBTypes[T][number], res: Response) => boolean,
  ) {
    if (validator(data, res)) {
      const postData = this.createPostData(entityType, data);
      db[entityType as string].push(postData);
      return ResponseHelper.sendCreated(res, postData);
    }
  }

  postCommon<T extends keyof DBTypes>(
    entityType: T,
    data: DBTypes[T][number],
    res: Response,
  ) {
    if ('id' in data) {
      delete data.id;
    }

    switch (entityType) {
      case 'user':
        return this.validateAndPost(
          'user',
          data as User,
          res,
          dataValidation.userValidation,
        );
      case 'artist':
        return this.validateAndPost(
          'artist',
          data as Artist,
          res,
          dataValidation.artistValidation,
        );
      case 'track':
        return this.validateAndPost(
          'track',
          data as Track,
          res,
          dataValidation.trackValidation,
        );
      case 'album':
        return this.validateAndPost(
          'album',
          data as Album,
          res,
          dataValidation.albumValidation,
        );
    }
  }
}
