import { Injectable } from '@nestjs/common';

export interface HealthPayload {
  service: string;
  version: string;
  authBasePath: string;
  apiBasePath: string;
  timestamp: string;
}

@Injectable()
export class AppService {
  getHealth(): HealthPayload {
    return {
      service: 'ExamCPNS API',
      version: 'v1',
      authBasePath: '/api/auth',
      apiBasePath: '/api/v1',
      timestamp: new Date().toISOString(),
    };
  }
}
