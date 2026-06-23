import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Public } from '../auth/decorators/public.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  apiData,
  apiMessage,
  apiPaginated,
  type ApiMessageResponse,
  type ApiPaginatedResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { BillingService } from './billing.service.js';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Public()
  @Get('subscription-plans')
  async listSubscriptionPlans(
    @Query('landingPage') landingPage?: string,
  ): Promise<ApiSuccessResponse<unknown[]>> {
    const showOnLandingPage = landingPage === 'true';
    return apiData(await this.billingService.listSubscriptionPlans(showOnLandingPage));
  }

  @Get('subscriptions/me')
  async getMySubscription(
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.billingService.getMySubscription(actor));
  }

  @Post('payments/checkout')
  @HttpCode(HttpStatus.CREATED)
  async createCheckout(
    @Body() body: unknown,
    @Headers('x-idempotency-key') idempotencyKey: string | undefined,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.billingService.createCheckout(actor, body, idempotencyKey),
      'Checkout berhasil dibuat',
    );
  }

  @Get('payments/referral-preview')
  async previewReferral(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.billingService.previewReferral(query));
  }

  @Get('payments/me')
  async listMyPaymentHistory(
    @Query() query: Record<string, unknown>,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.billingService.listMyPaymentHistory(actor, query);
    return apiPaginated(result.data, result.meta);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Post('admin/payments/:paymentTransactionId/approve')
  @HttpCode(HttpStatus.OK)
  async approvePaymentManually(
    @Param('paymentTransactionId') paymentTransactionId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.billingService.approvePaymentManually(paymentTransactionId, actor),
      'Pembayaran berhasil dikonfirmasi',
    );
  }

  @Get('payments/:paymentTransactionId')
  async getPaymentStatus(
    @Param('paymentTransactionId') paymentTransactionId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.billingService.getPaymentStatus(paymentTransactionId, actor));
  }

  @Public()
  @Post('webhooks/payment/:provider')
  async handlePaymentWebhook(
    @Param('provider') provider: string,
    @Body() body: unknown,
    @Headers() headers: Record<string, string | string[] | undefined>,
  ): Promise<ApiMessageResponse> {
    await this.billingService.handlePaymentWebhook(provider, body, headers);
    return apiMessage('Webhook processed');
  }
}
