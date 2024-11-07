import db from 'src/data/inMemoryDB';
import { DBTypes } from 'src/data/types/dataTypes';
import User from 'src/users/interfaces/user.interface';

const existById = (type: keyof DBTypes, id: string) => {
  if (type !== 'favs') {
    const user = (db[type] as Array<{ id: string }>).find(
      (data) => data.id === id,
    );

    return (user as User) || null;
  }
};

export default existById;
