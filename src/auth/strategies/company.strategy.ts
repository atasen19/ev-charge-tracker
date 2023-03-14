import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CompanyStrategy extends PassportStrategy(Strategy, 'company') {
  constructor(private configService: ConfigService) {
    super();
  }

  async authenticate(request: Request) {
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== this.configService.get('COMPANY_API_KEY'))
      this.fail('API Key');

    this.success({});
  }
}
