import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

import { Organization } from './organization.entitiy';
import { UserType } from '../models/user.model';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organization, (organization) => organization.users)
  @JoinColumn({ referencedColumnName: 'id', name: 'organization_id' })
  organization: Organization;

  @Column({ type: 'enum', enum: UserType })
  type: UserType;

  @Column()
  costLimit: string;

  @CreateDateColumn({ readonly: true })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
