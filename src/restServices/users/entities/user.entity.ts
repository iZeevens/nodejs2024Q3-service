import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.getTime(),
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.getTime(),
    },
  })
  updatedAt: Date;
}
