import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Organization } from './organization.entitiy';
import { User } from './users.entity';

@Entity('users')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organization, (organization) => organization.users)
  @JoinColumn({ referencedColumnName: 'id', name: 'organization_id' })
  organization: Organization;

  @OneToMany(() => User, (user) => user.organization)
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: User;

  @Column()
  cost: string;

  @Column()
  location: string;

  @Column({ type: 'jsonb', nullable: false, default: [] })
  history: string[];

  @CreateDateColumn({ readonly: true })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
