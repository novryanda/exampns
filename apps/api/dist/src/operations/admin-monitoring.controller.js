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
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { apiData, apiPaginated, } from '../common/api-response.js';
import { OperationsService } from './operations.service.js';
let AdminMonitoringController = class AdminMonitoringController {
    operationsService;
    constructor(operationsService) {
        this.operationsService = operationsService;
    }
    async getDashboardSummary(actor) {
        return apiData(await this.operationsService.getAdminDashboardSummary(actor));
    }
    async listUsers(query) {
        const result = await this.operationsService.listUsersForMonitoring(query);
        return apiPaginated(result.data, result.meta);
    }
    async getUserDetail(userId) {
        return apiData(await this.operationsService.getUserDetailForAdmin(userId));
    }
    async listTransactions(query) {
        const result = await this.operationsService.listTransactionsForMonitoring(query);
        return apiPaginated(result.data, result.meta);
    }
    async getMyAuditLogs(actor, query) {
        const result = await this.operationsService.getAdminSelfAuditLogs(actor, query);
        return apiPaginated(result.data, result.meta);
    }
};
__decorate([
    Get('dashboard/summary'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminMonitoringController.prototype, "getDashboardSummary", null);
__decorate([
    Roles('SUPER_ADMIN'),
    Get('users'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminMonitoringController.prototype, "listUsers", null);
__decorate([
    Roles('SUPER_ADMIN'),
    Get('users/:userId'),
    __param(0, Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminMonitoringController.prototype, "getUserDetail", null);
__decorate([
    Roles('SUPER_ADMIN'),
    Get('transactions'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminMonitoringController.prototype, "listTransactions", null);
__decorate([
    Get('audit-logs/me'),
    __param(0, CurrentUser()),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminMonitoringController.prototype, "getMyAuditLogs", null);
AdminMonitoringController = __decorate([
    Roles('ADMIN', 'SUPER_ADMIN'),
    Controller('admin'),
    __metadata("design:paramtypes", [OperationsService])
], AdminMonitoringController);
export { AdminMonitoringController };
//# sourceMappingURL=admin-monitoring.controller.js.map