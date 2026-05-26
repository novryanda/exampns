var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { AdminTryoutDraftsController } from './admin-tryout-drafts.controller.js';
import { ManualQuestionSetController } from './manual-question-set.controller.js';
import { TryoutCatalogController } from './tryout-catalog.controller.js';
import { TryoutManagementService } from './tryout-management.service.js';
let TryoutManagementModule = class TryoutManagementModule {
};
TryoutManagementModule = __decorate([
    Module({
        imports: [CommonModule],
        controllers: [
            AdminTryoutDraftsController,
            TryoutCatalogController,
            ManualQuestionSetController,
        ],
        providers: [TryoutManagementService],
    })
], TryoutManagementModule);
export { TryoutManagementModule };
//# sourceMappingURL=tryout-management.module.js.map