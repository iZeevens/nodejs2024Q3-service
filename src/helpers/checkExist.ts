import db from 'src/data/inMemoryDB';
import { DBTypes } from 'src/data/types/dataTypes';

const existById = (type: keyof DBTypes, id: string) => {
  if (type !== 'favs') {
    const data = (db[type] as Array<{ id: string }>).find(
      (data) => data.id === id,
    );

    return data || null;
  }
};

export default existById;
