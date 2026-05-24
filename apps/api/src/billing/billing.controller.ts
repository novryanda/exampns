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
  async listSubscriptionPlans(): Promise<ApiSuccessResponse<unknown[]>> {
    return apiData(await this.billingService.listSubscriptionPlans());
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

  @Get('payments/:paymentTransactionId')
  async getPaymentStatus(
    @Param('paymentTransactionId') paymentTransactionId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.billingService.getPaymentStatus(paymentTransactionId, actor));
  }

  @Get('payments/me')
  async listMyPaymentHistory(
    @Query() query: Record<string, unknown>,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.billingService.listMyPaymentHistory(actor, query);
    return apiPaginated(result.data, result.meta);
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
