import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthGuard } from './auth/auth.guard.js';
import { AuthModule } from './auth/auth.module.js';
import { BillingModule } from './billing/billing.module.js';
import { BootstrapModule } from './bootstrap/bootstrap.module.js';
import { CommonModule } from './common/common.module.js';
import { MeModule } from './me/me.module.js';
import { ExamEngineModule } from './exam-engine/exam-engine.module.js';
import { OperationsModule } from './operations/operations.module.js';
import { PdfImportModule } from './pdf-import/pdf-import.module.js';
import { PartnerModule } from './partner/partner.module.js';
import { QuestionBankModule } from './question-bank/question-bank.module.js';
import { PublicSampleModule } from './public-sample/public-sample.module.js';
import { QuestionMetadataModule } from './question-metadata/question-metadata.module.js';
import { TryoutManagementModule } from './tryout-management/tryout-management.module.js';
import { LearningMaterialModule } from './learning-material/learning-material.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    AuthModule,
    BillingModule,
    MeModule,
    ExamEngineModule,
    OperationsModule,
    PartnerModule,
    PdfImportModule,
    QuestionBankModule,
    QuestionMetadataModule,
    PublicSampleModule,
    TryoutManagementModule,
    LearningMaterialModule,
    BootstrapModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
