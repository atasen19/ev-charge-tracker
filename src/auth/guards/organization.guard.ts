import { Injectable } from '@nestjs/common';
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';

@Injectable()
export class OrganizationGuard extends BaseAuthGuard('organization') {}
