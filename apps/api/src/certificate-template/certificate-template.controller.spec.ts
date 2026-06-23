import { Test, TestingModule } from '@nestjs/testing';
import { CertificateTemplateController } from './certificate-template.controller';

describe('CertificateTemplateController', () => {
  let controller: CertificateTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificateTemplateController],
    }).compile();

    controller = module.get<CertificateTemplateController>(CertificateTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
