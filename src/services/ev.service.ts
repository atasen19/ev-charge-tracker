import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as UUIDv4 } from 'uuid';

import { Organization } from '../entities/organization.entitiy';
import { User } from '../entities/users.entity';
import { Session } from '../entities/sessions.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EVService {
  constructor(
    @InjectRepository(Organization)
    private repository: Repository<Organization>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  public async createOrganization(name: string): Promise<Organization> {
    const organization = this.repository.create({
      id: UUIDv4(),
      name,
    });

    return this.repository.save(organization);
  }

  public async createUser(organizationId: string, params: Partial<User>) {
    let user = this.userRepository.create({
      organization: { id: organizationId },
      ...params,
    });

    user = await this.userRepository.save(user);

    return user;
  }

  async getOrganization(organizationId: string): Promise<Organization> {
    return this.repository.findOneOrFail({
      where: { id: organizationId, deletedAt: null },
      select: ['id', 'name', 'createdAt', 'updatedAt'],
    });
  }

  async setUserLimit(userId: string, newLimit: string): Promise<User> {
    return this.userRepository.save({ id: userId, costLimit: newLimit });
  }

  async setOrganizationLimit(
    organizationId: string,
    newLimit: string,
  ): Promise<Organization> {
    return this.repository.save({ id: organizationId, costLimit: newLimit });
  }

  async startChargingSession(
    userId: string,
    location: string,
  ): Promise<Session> {
    const startingTime = new Date();
    return this.sessionRepository.create({
      user: { id: userId },
      history: [
        `Charging session is started ${startingTime} location ${location}`,
      ],
      location,
      createdAt: new Date(),
    });
  }

  async finishChargingSession(userId: string): Promise<Session> {
    const cost = 'calculate somehow';
    const finishingTime = new Date();
    return this.sessionRepository.save({
      user: { id: userId },
      history: [`Charging session is started ${finishingTime} location`],
      cost,
      updatedAt: new Date(),
    });
  }

  async getChargingSessions(
    organizationId: string,
  ): Promise<[Session[], number]> {
    return await this.sessionRepository.findAndCount({
      where: {
        organization: { id: organizationId },
      },
    });
  }
}
