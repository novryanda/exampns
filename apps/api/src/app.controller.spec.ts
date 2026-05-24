import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should expose service metadata', () => {
      expect(appController.getHealth()).toMatchObject({
        success: true,
        data: {
          service: 'ExamCPNS API',
          authBasePath: '/api/auth',
          apiBasePath: '/api/v1',
          version: 'v1',
        },
      });
    });
  });
});
