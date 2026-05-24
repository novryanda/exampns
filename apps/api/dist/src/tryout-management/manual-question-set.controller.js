var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { apiData, apiMessage, } from '../common/api-response.js';
import { TryoutManagementService } from './tryout-management.service.js';
let ManualQuestionSetController = class ManualQuestionSetController {
    tryoutManagementService;
    constructor(tryoutManagementService) {
        this.tryoutManagementService = tryoutManagementService;
    }
    async listManualQuestionSets(tryoutCatalogId) {
        return apiData(await this.tryoutManagementService.listManualQuestionSets(tryoutCatalogId));
    }
    async createManualQuestionSet(tryoutCatalogId, body, actor) {
        return apiData(await this.tryoutManagementService.createManualQuestionSet(tryoutCatalogId, body, actor), 'Manual question set berhasil dibuat');
    }
    async getManualQuestionSet(tryoutCatalogId, manualQuestionSetId) {
        return apiData(await this.tryoutManagementService.getManualQuestionSet(tryoutCatalogId, manualQuestionSetId));
    }
    async updateManualQuestionSet(tryoutCatalogId, manualQuestionSetId, body, actor) {
        await this.tryoutManagementService.updateManualQuestionSet(tryoutCatalogId, manualQuestionSetId, body, actor);
        return apiMessage('Manual question set berhasil diperbarui');
    }
    async archiveManualQuestionSet(tryoutCatalogId, manualQuestionSetId) {
        await this.tryoutManagementService.archiveManualQuestionSet(tryoutCatalogId, manualQuestionSetId);
        return apiMessage('Manual question set berhasil diarsipkan');
    }
};
__decorate([
    Get(),
    __param(0, Param('tryoutCatalogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ManualQuestionSetController.prototype, "listManualQuestionSets", null);
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    __param(0, Param('tryoutCatalogId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ManualQuestionSetController.prototype, "createManualQuestionSet", null);
__decorate([
    Get(':manualQuestionSetId'),
    __param(0, Param('tryoutCatalogId')),
    __param(1, Param('manualQuestionSetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ManualQuestionSetController.prototype, "getManualQuestionSet", null);
__decorate([
    Patch(':manualQuestionSetId'),
    __param(0, Param('tryoutCatalogId')),
    __param(1, Param('manualQuestionSetId')),
    __param(2, Body()),
    __param(3, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ManualQuestionSetController.prototype, "updateManualQuestionSet", null);
__decorate([
    Delete(':manualQuestionSetId'),
    __param(0, Param('tryoutCatalogId')),
    __param(1, Param('manualQuestionSetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ManualQuestionSetController.prototype, "archiveManualQuestionSet", null);
ManualQuestionSetController = __decorate([
    Roles('ADMIN', 'SUPER_ADMIN'),
    Controller('admin/tryout-catalogs/:tryoutCatalogId/manual-question-sets'),
    __metadata("design:paramtypes", [TryoutManagementService])
], ManualQuestionSetController);
export { ManualQuestionSetController };
//# sourceMappingURL=manual-question-set.controller.js.map