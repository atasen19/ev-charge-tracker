import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';
@Entity()
export class Fleet {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ referencedColumnName: 'id', name: 'organization_id' })
  organizationId: string;
}
