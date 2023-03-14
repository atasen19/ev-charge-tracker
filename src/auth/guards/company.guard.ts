import { Injectable } from '@nestjs/common';
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';

@Injectable()
export class CompanyGuard extends BaseAuthGuard('company') {}
