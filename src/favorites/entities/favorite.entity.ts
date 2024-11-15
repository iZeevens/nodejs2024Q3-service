import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryColumn({ default: 'singleton' })
  id: string;

  @Column('uuid', { array: true, default: [] })
  artists: string[];

  @Column('uuid', { array: true, default: [] })
  albums: string[];

  @Column('uuid', { array: true, default: [] })
  tracks: string[];
}
