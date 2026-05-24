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
import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Param, Post, Query, } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Public } from '../auth/decorators/public.decorator.js';
import { apiData, apiMessage, apiPaginated, } from '../common/api-response.js';
import { BillingService } from './billing.service.js';
let BillingController = class BillingController {
    billingService;
    constructor(billingService) {
        this.billingService = billingService;
    }
    async listSubscriptionPlans() {
        return apiData(await this.billingService.listSubscriptionPlans());
    }
    async getMySubscription(actor) {
        return apiData(await this.billingService.getMySubscription(actor));
    }
    async createCheckout(body, idempotencyKey, actor) {
        return apiData(await this.billingService.createCheckout(actor, body, idempotencyKey), 'Checkout berhasil dibuat');
    }
    async getPaymentStatus(paymentTransactionId, actor) {
        return apiData(await this.billingService.getPaymentStatus(paymentTransactionId, actor));
    }
    async listMyPaymentHistory(query, actor) {
        const result = await this.billingService.listMyPaymentHistory(actor, query);
        return apiPaginated(result.data, result.meta);
    }
    async handlePaymentWebhook(provider, body, headers) {
        await this.billingService.handlePaymentWebhook(provider, body, headers);
        return apiMessage('Webhook processed');
    }
};
__decorate([
    Public(),
    Get('subscription-plans'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "listSubscriptionPlans", null);
__decorate([
    Get('subscriptions/me'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "getMySubscription", null);
__decorate([
    Post('payments/checkout'),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __param(1, Headers('x-idempotency-key')),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "createCheckout", null);
__decorate([
    Get('payments/:paymentTransactionId'),
    __param(0, Param('paymentTransactionId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "getPaymentStatus", null);
__decorate([
    Get('payments/me'),
    __param(0, Query()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "listMyPaymentHistory", null);
__decorate([
    Public(),
    Post('webhooks/payment/:provider'),
    __param(0, Param('provider')),
    __param(1, Body()),
    __param(2, Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "handlePaymentWebhook", null);
BillingController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [BillingService])
], BillingController);
export { BillingController };
//# sourceMappingURL=billing.controller.js.map