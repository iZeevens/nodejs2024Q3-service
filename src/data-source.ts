import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './restServices/users/entities/user.entity';
import { Artist } from './restServices/artists/entities/artist.entity';
import { Track } from './restServices/tracks/entities/track.entitiy';
import { Album } from './restServices/albums/entities/album.entity';
import { Favorites } from './restServices/favorites/entities/favorite.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const dbSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Track, Album, Favorites],
  migrations: ['./dist/migrations/*.js'],
  migrationsTableName: 'migration_table',
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dbSource);
export default dataSource;
