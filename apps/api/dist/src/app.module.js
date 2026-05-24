var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { QuestionBankModule } from './question-bank/question-bank.module.js';
import { TryoutManagementModule } from './tryout-management/tryout-management.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
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
            PdfImportModule,
            QuestionBankModule,
            TryoutManagementModule,
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map