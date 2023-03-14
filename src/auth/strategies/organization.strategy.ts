import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrganizationStrategy extends PassportStrategy(
  Strategy,
  'organization',
) {
  constructor(private configService: ConfigService) {
    super();
  }

  async authenticate(request: Request) {
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== this.configService.get('ORGANİZATION_API_KEY'))
      this.fail('API Key');

    this.success({});
  }
}
