import { db, DBTypes } from 'src/data/inMemoryDB';

const existById = (type: keyof DBTypes, id: string) => {
  if (type !== 'favs') {
    const data = (db[type] as Array<{ id: string }>).find(
      (data) => data.id === id,
    );

    return data || null;
  }
};

export default existById;
