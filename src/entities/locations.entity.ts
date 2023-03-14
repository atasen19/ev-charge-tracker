import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fleet {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column()
  name: string;
}
