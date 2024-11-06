import { Injectable } from '@nestjs/common';
import { DBTypes } from 'src/data/types/dataTypes';
import db from 'src/data/inMemoryDB';

@Injectable()
export default class getService {
  getAll<T extends keyof DBTypes>(entityType: T): DBTypes[T] {
    return db[entityType];
  }
}
