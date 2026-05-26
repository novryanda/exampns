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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { apiData, apiMessage, apiPaginated, } from '../common/api-response.js';
import { TryoutManagementService } from './tryout-management.service.js';
let TryoutCatalogController = class TryoutCatalogController {
    tryoutManagementService;
    constructor(tryoutManagementService) {
        this.tryoutManagementService = tryoutManagementService;
    }
    async listCatalogs(query) {
        const result = await this.tryoutManagementService.listTryoutCatalogs(query);
        return apiPaginated(result.data, result.meta);
    }
    async createCatalog(body, actor) {
        return apiData(await this.tryoutManagementService.createTryoutCatalog(body, actor), 'Tryout catalog berhasil dibuat');
    }
    async getCatalogDetail(tryoutCatalogId) {
        return apiData(await this.tryoutManagementService.getTryoutCatalogDetail(tryoutCatalogId));
    }
    async updateCatalog(tryoutCatalogId, body, actor) {
        await this.tryoutManagementService.updateTryoutCatalog(tryoutCatalogId, body, actor);
        return apiMessage('Tryout catalog berhasil diperbarui');
    }
    async duplicateCatalog(tryoutCatalogId, actor) {
        const duplicated = await this.tryoutManagementService.duplicateTryoutCatalog(tryoutCatalogId, actor);
        return apiData({ id: duplicated.id }, 'Tryout catalog berhasil diduplikasi');
    }
    async publishCatalog(tryoutCatalogId, actor) {
        await this.tryoutManagementService.publishTryoutCatalog(tryoutCatalogId, actor);
        return apiMessage('Tryout catalog berhasil dipublish');
    }
    async archiveCatalog(tryoutCatalogId, actor) {
        await this.tryoutManagementService.archiveTryoutCatalog(tryoutCatalogId, actor);
        return apiMessage('Tryout catalog berhasil diarsipkan');
    }
    async getGenerationRule(tryoutCatalogId) {
        return apiData(await this.tryoutManagementService.getGenerationRule(tryoutCatalogId));
    }
    async upsertGenerationRule(tryoutCatalogId, body) {
        await this.tryoutManagementService.upsertGenerationRule(tryoutCatalogId, body);
        return apiMessage('Tryout generation rule berhasil disimpan');
    }
    async runAvailabilityCheck(tryoutCatalogId) {
        return apiData(await this.tryoutManagementService.runAvailabilityCheck(tryoutCatalogId));
    }
};
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "listCatalogs", null);
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "createCatalog", null);
__decorate([
    Get(':tryoutCatalogId'),
    __param(0, Param('tryoutCatalogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "getCatalogDetail", null);
__decorate([
    Patch(':tryoutCatalogId'),
    __param(0, Param('tryoutCatalogId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "updateCatalog", null);
__decorate([
    Post(':tryoutCatalogId/duplicate'),
    __param(0, Param('tryoutCatalogId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "duplicateCatalog", null);
__decorate([
    Post(':tryoutCatalogId/publish'),
    __param(0, Param('tryoutCatalogId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "publishCatalog", null);
__decorate([
    Post(':tryoutCatalogId/archive'),
    __param(0, Param('tryoutCatalogId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "archiveCatalog", null);
__decorate([
    Get(':tryoutCatalogId/generation-rule'),
    __param(0, Param('tryoutCatalogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "getGenerationRule", null);
__decorate([
    Post(':tryoutCatalogId/generation-rule'),
    __param(0, Param('tryoutCatalogId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "upsertGenerationRule", null);
__decorate([
    Get(':tryoutCatalogId/availability-check'),
    __param(0, Param('tryoutCatalogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TryoutCatalogController.prototype, "runAvailabilityCheck", null);
TryoutCatalogController = __decorate([
    Roles('SUPER_ADMIN'),
    Controller('super-admin/tryout-catalogs'),
    __metadata("design:paramtypes", [TryoutManagementService])
], TryoutCatalogController);
export { TryoutCatalogController };
//# sourceMappingURL=tryout-catalog.controller.js.map