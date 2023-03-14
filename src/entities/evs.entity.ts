import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Organization } from './organization.entitiy';
import { User } from './users.entity';
import { Fleet } from './fleets.entity';

@Entity()
export class EVs {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @ManyToOne(() => Fleet, (fleet) => fleet.id)
  @JoinColumn({ referencedColumnName: 'id', name: 'fleet_id' })
  fleetId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ referencedColumnName: 'id', name: 'owner_id' })
  ownerId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ referencedColumnName: 'id', name: 'current_user_id' })
  currentUserId: string;

  @ManyToOne(() => Organization, (organization) => organization.id)
  @JoinColumn({ referencedColumnName: 'id', name: 'organization_id' })
  organization: string;

  @Column()
  costLimit: string;
}
