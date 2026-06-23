import { Test, TestingModule } from '@nestjs/testing';
import { CertificateTemplateService } from './certificate-template.service';

describe('CertificateTemplateService', () => {
  let service: CertificateTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificateTemplateService],
    }).compile();

    service = module.get<CertificateTemplateService>(CertificateTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
