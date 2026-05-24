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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { apiData, apiMessage, apiPaginated, } from '../common/api-response.js';
import { OperationsService } from './operations.service.js';
let SuperAdminController = class SuperAdminController {
    operationsService;
    constructor(operationsService) {
        this.operationsService = operationsService;
    }
    async createAdmin(body, actor) {
        return apiData(await this.operationsService.createAdmin(body, actor), 'Akun admin berhasil dibuat');
    }
    async listAdmins() {
        return apiData(await this.operationsService.listAdmins());
    }
    async deactivateAdmin(adminId, body, actor) {
        await this.operationsService.deactivateAdmin(adminId, body, actor);
        return apiMessage('Admin berhasil dinonaktifkan');
    }
    async createSubscriptionPlan(body, actor) {
        return apiData(await this.operationsService.createSubscriptionPlan(body, actor), 'Subscription plan berhasil dibuat');
    }
    async updateSubscriptionPlan(planId, body, actor) {
        await this.operationsService.updateSubscriptionPlan(planId, body, actor);
        return apiMessage('Subscription plan berhasil diperbarui');
    }
    async getPassingGrade() {
        return apiData(await this.operationsService.getPassingGrade());
    }
    async updatePassingGrade(body, actor) {
        await this.operationsService.updatePassingGrade(body, actor);
        return apiMessage('Passing grade berhasil diperbarui. Perubahan berlaku untuk ujian baru.');
    }
    async getTrialConfig() {
        return apiData(await this.operationsService.getTrialConfig());
    }
    async getAiRecommendationSettings() {
        return apiData(await this.operationsService.getAiRecommendationSettings());
    }
    async updateTrialConfig(body, actor) {
        await this.operationsService.updateTrialConfig(body, actor);
        return apiMessage('Konfigurasi trial berhasil diperbarui');
    }
    async updateAiRecommendationSettings(body, actor) {
        await this.operationsService.updateAiRecommendationSettings(body, actor);
        return apiMessage('Konfigurasi AI recommendation berhasil diperbarui');
    }
    async manualSubscriptionActivation(body, actor) {
        return apiData(await this.operationsService.manualSubscriptionActivation(body, actor), 'Subscription berhasil diaktifkan secara manual');
    }
    async getAuditLogs(query) {
        const result = await this.operationsService.getAuditLogs(query);
        return apiPaginated(result.data, result.meta);
    }
};
__decorate([
    Post('admins'),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "createAdmin", null);
__decorate([
    Get('admins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "listAdmins", null);
__decorate([
    Patch('admins/:adminId/deactivate'),
    __param(0, Param('adminId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "deactivateAdmin", null);
__decorate([
    Post('subscription-plans'),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "createSubscriptionPlan", null);
__decorate([
    Patch('subscription-plans/:planId'),
    __param(0, Param('planId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "updateSubscriptionPlan", null);
__decorate([
    Get('passing-grade'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "getPassingGrade", null);
__decorate([
    Put('passing-grade'),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "updatePassingGrade", null);
__decorate([
    Get('trial-config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "getTrialConfig", null);
__decorate([
    Get('ai-recommendation-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "getAiRecommendationSettings", null);
__decorate([
    Put('trial-config'),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "updateTrialConfig", null);
__decorate([
    Put('ai-recommendation-settings'),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "updateAiRecommendationSettings", null);
__decorate([
    Post('subscriptions/manual-activation'),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "manualSubscriptionActivation", null);
__decorate([
    Get('audit-logs'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "getAuditLogs", null);
SuperAdminController = __decorate([
    Roles('SUPER_ADMIN'),
    Controller('super-admin'),
    __metadata("design:paramtypes", [OperationsService])
], SuperAdminController);
export { SuperAdminController };
//# sourceMappingURL=super-admin.controller.js.map