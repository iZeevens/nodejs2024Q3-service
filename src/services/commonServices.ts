import { Injectable } from '@nestjs/common';
import db from 'src/data/inMemoryDB';

@Injectable()
export default class CommonService {
  getAll(entityType: string): object {
    return db[entityType];
  }
}
