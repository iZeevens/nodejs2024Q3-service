import { Injectable } from '@nestjs/common';
import db from 'src/data/inMemoryDB';
import { DBTypes } from 'src/data/types/dataTypes';

@Injectable()
export default class CommonService {
  getAll<T extends keyof DBTypes>(entityType: T): DBTypes[T] {
    return db[entityType];
  }
}
