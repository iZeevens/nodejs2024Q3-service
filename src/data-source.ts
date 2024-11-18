import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Artist } from './artists/entities/artist.entity';
import { Track } from './tracks/entities/track.entitiy';
import { Album } from './albums/entities/album.entity';
import { Favorites } from './favorites/entities/favorite.entity';
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
