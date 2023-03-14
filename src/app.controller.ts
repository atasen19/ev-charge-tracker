import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import * as DTO from './dto';
import { EVService } from './services/ev.service';
import { v4 as UUIDv4 } from 'uuid';
import { Session } from './entities/sessions.entity';
import { OrganizationGuard } from './auth/guards/organization.guard';
import { User } from './entities/users.entity';
import { CompanyGuard } from './auth/guards/company.guard';
import { Organization } from './entities/organization.entitiy';

@Controller()
export class AppController {
  constructor(private readonly service: EVService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('organization')
  async createOrganization(
    @Body() { name }: DTO.CreateOrganizationRequestDTO,
  ): Promise<DTO.CreateOrganizationResponseDTO> {
    return this.service.createOrganization(name);
  }

  @Post('user')
  @UseGuards(OrganizationGuard)
  async createUser(
    @Body() { organizationId, costLimit }: DTO.CreateUserRequestDTO,
  ): Promise<DTO.CreateUserResponseDTO> {
    return this.service.createUser(organizationId, {
      id: UUIDv4(),
      costLimit,
    });
  }

  @Get('sessions')
  async getChargingSessions(
    @Body() { organizationId },
  ): Promise<[Session[], number]> {
    return this.service.getChargingSessions(organizationId);
  }

  @Post('user/limits')
  @UseGuards(CompanyGuard)
  async setUserLimit(@Body() { userId, costLimit }): Promise<User> {
    return this.service.setUserLimit(userId, costLimit);
  }

  @Post('user/limits')
  @UseGuards(CompanyGuard)
  async setOrganizationLimit(
    @Body() { organizationId, costLimit },
  ): Promise<Organization> {
    return this.service.setOrganizationLimit(organizationId, costLimit);
  }
}
