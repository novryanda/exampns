import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get account(): Prisma.AccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get verification(): Prisma.VerificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get question(): Prisma.QuestionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get questionOption(): Prisma.QuestionOptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get questionTag(): Prisma.QuestionTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get questionImportBatch(): Prisma.QuestionImportBatchDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get parsedQuestionReview(): Prisma.ParsedQuestionReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tryoutCatalog(): Prisma.TryoutCatalogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tryoutGenerationRule(): Prisma.TryoutGenerationRuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tryoutRuleSection(): Prisma.TryoutRuleSectionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get manualQuestionSet(): Prisma.ManualQuestionSetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get manualQuestionSetItem(): Prisma.ManualQuestionSetItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get examSession(): Prisma.ExamSessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get examSessionQuestion(): Prisma.ExamSessionQuestionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get examAnswer(): Prisma.ExamAnswerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get examResult(): Prisma.ExamResultDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get examIntegrityLog(): Prisma.ExamIntegrityLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get aIRecommendation(): Prisma.AIRecommendationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get aIRecommendationItem(): Prisma.AIRecommendationItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get subscriptionPlan(): Prisma.SubscriptionPlanDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userSubscription(): Prisma.UserSubscriptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get paymentTransaction(): Prisma.PaymentTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get paymentWebhookEvent(): Prisma.PaymentWebhookEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get passingGradeConfig(): Prisma.PassingGradeConfigDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get trialConfig(): Prisma.TrialConfigDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get systemSetting(): Prisma.SystemSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
