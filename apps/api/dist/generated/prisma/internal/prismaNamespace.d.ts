import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly Session: "Session";
    readonly Account: "Account";
    readonly Verification: "Verification";
    readonly Question: "Question";
    readonly QuestionOption: "QuestionOption";
    readonly QuestionTag: "QuestionTag";
    readonly QuestionImportBatch: "QuestionImportBatch";
    readonly ParsedQuestionReview: "ParsedQuestionReview";
    readonly TryoutCatalog: "TryoutCatalog";
    readonly TryoutGenerationRule: "TryoutGenerationRule";
    readonly TryoutRuleSection: "TryoutRuleSection";
    readonly ManualQuestionSet: "ManualQuestionSet";
    readonly ManualQuestionSetItem: "ManualQuestionSetItem";
    readonly ExamSession: "ExamSession";
    readonly ExamSessionQuestion: "ExamSessionQuestion";
    readonly ExamAnswer: "ExamAnswer";
    readonly ExamResult: "ExamResult";
    readonly ExamIntegrityLog: "ExamIntegrityLog";
    readonly AIRecommendation: "AIRecommendation";
    readonly AIRecommendationItem: "AIRecommendationItem";
    readonly SubscriptionPlan: "SubscriptionPlan";
    readonly UserSubscription: "UserSubscription";
    readonly PaymentTransaction: "PaymentTransaction";
    readonly PaymentWebhookEvent: "PaymentWebhookEvent";
    readonly PassingGradeConfig: "PassingGradeConfig";
    readonly TrialConfig: "TrialConfig";
    readonly SystemSetting: "SystemSetting";
    readonly AuditLog: "AuditLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "session" | "account" | "verification" | "question" | "questionOption" | "questionTag" | "questionImportBatch" | "parsedQuestionReview" | "tryoutCatalog" | "tryoutGenerationRule" | "tryoutRuleSection" | "manualQuestionSet" | "manualQuestionSetItem" | "examSession" | "examSessionQuestion" | "examAnswer" | "examResult" | "examIntegrityLog" | "aIRecommendation" | "aIRecommendationItem" | "subscriptionPlan" | "userSubscription" | "paymentTransaction" | "paymentWebhookEvent" | "passingGradeConfig" | "trialConfig" | "systemSetting" | "auditLog";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Session: {
            payload: Prisma.$SessionPayload<ExtArgs>;
            fields: Prisma.SessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findFirst: {
                    args: Prisma.SessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findMany: {
                    args: Prisma.SessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                create: {
                    args: Prisma.SessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                createMany: {
                    args: Prisma.SessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                delete: {
                    args: Prisma.SessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                update: {
                    args: Prisma.SessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                deleteMany: {
                    args: Prisma.SessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                upsert: {
                    args: Prisma.SessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                aggregate: {
                    args: Prisma.SessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSession>;
                };
                groupBy: {
                    args: Prisma.SessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionCountAggregateOutputType> | number;
                };
            };
        };
        Account: {
            payload: Prisma.$AccountPayload<ExtArgs>;
            fields: Prisma.AccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findFirst: {
                    args: Prisma.AccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findMany: {
                    args: Prisma.AccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                create: {
                    args: Prisma.AccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                createMany: {
                    args: Prisma.AccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                delete: {
                    args: Prisma.AccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                update: {
                    args: Prisma.AccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                deleteMany: {
                    args: Prisma.AccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                upsert: {
                    args: Prisma.AccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                aggregate: {
                    args: Prisma.AccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAccount>;
                };
                groupBy: {
                    args: Prisma.AccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountCountAggregateOutputType> | number;
                };
            };
        };
        Verification: {
            payload: Prisma.$VerificationPayload<ExtArgs>;
            fields: Prisma.VerificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VerificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                findFirst: {
                    args: Prisma.VerificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                findMany: {
                    args: Prisma.VerificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
                };
                create: {
                    args: Prisma.VerificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                createMany: {
                    args: Prisma.VerificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
                };
                delete: {
                    args: Prisma.VerificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                update: {
                    args: Prisma.VerificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                deleteMany: {
                    args: Prisma.VerificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VerificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
                };
                upsert: {
                    args: Prisma.VerificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                aggregate: {
                    args: Prisma.VerificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVerification>;
                };
                groupBy: {
                    args: Prisma.VerificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VerificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VerificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VerificationCountAggregateOutputType> | number;
                };
            };
        };
        Question: {
            payload: Prisma.$QuestionPayload<ExtArgs>;
            fields: Prisma.QuestionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QuestionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload>;
                };
                findFirst: {
                    args: Prisma.QuestionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload>;
                };
                findMany: {
                    args: Prisma.QuestionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload>[];
                };
                create: {
                    args: Prisma.QuestionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload>;
                };
                createMany: {
                    args: Prisma.QuestionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload>[];
                };
                delete: {
                    args: Prisma.QuestionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload>;
                };
                update: {
                    args: Prisma.QuestionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload>;
                };
                deleteMany: {
                    args: Prisma.QuestionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QuestionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QuestionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload>[];
                };
                upsert: {
                    args: Prisma.QuestionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionPayload>;
                };
                aggregate: {
                    args: Prisma.QuestionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQuestion>;
                };
                groupBy: {
                    args: Prisma.QuestionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuestionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QuestionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuestionCountAggregateOutputType> | number;
                };
            };
        };
        QuestionOption: {
            payload: Prisma.$QuestionOptionPayload<ExtArgs>;
            fields: Prisma.QuestionOptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QuestionOptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QuestionOptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload>;
                };
                findFirst: {
                    args: Prisma.QuestionOptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QuestionOptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload>;
                };
                findMany: {
                    args: Prisma.QuestionOptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[];
                };
                create: {
                    args: Prisma.QuestionOptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload>;
                };
                createMany: {
                    args: Prisma.QuestionOptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QuestionOptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[];
                };
                delete: {
                    args: Prisma.QuestionOptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload>;
                };
                update: {
                    args: Prisma.QuestionOptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload>;
                };
                deleteMany: {
                    args: Prisma.QuestionOptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QuestionOptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QuestionOptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[];
                };
                upsert: {
                    args: Prisma.QuestionOptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionOptionPayload>;
                };
                aggregate: {
                    args: Prisma.QuestionOptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQuestionOption>;
                };
                groupBy: {
                    args: Prisma.QuestionOptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuestionOptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QuestionOptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuestionOptionCountAggregateOutputType> | number;
                };
            };
        };
        QuestionTag: {
            payload: Prisma.$QuestionTagPayload<ExtArgs>;
            fields: Prisma.QuestionTagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QuestionTagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QuestionTagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload>;
                };
                findFirst: {
                    args: Prisma.QuestionTagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QuestionTagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload>;
                };
                findMany: {
                    args: Prisma.QuestionTagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload>[];
                };
                create: {
                    args: Prisma.QuestionTagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload>;
                };
                createMany: {
                    args: Prisma.QuestionTagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QuestionTagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload>[];
                };
                delete: {
                    args: Prisma.QuestionTagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload>;
                };
                update: {
                    args: Prisma.QuestionTagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload>;
                };
                deleteMany: {
                    args: Prisma.QuestionTagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QuestionTagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QuestionTagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload>[];
                };
                upsert: {
                    args: Prisma.QuestionTagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionTagPayload>;
                };
                aggregate: {
                    args: Prisma.QuestionTagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQuestionTag>;
                };
                groupBy: {
                    args: Prisma.QuestionTagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuestionTagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QuestionTagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuestionTagCountAggregateOutputType> | number;
                };
            };
        };
        QuestionImportBatch: {
            payload: Prisma.$QuestionImportBatchPayload<ExtArgs>;
            fields: Prisma.QuestionImportBatchFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QuestionImportBatchFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QuestionImportBatchFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload>;
                };
                findFirst: {
                    args: Prisma.QuestionImportBatchFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QuestionImportBatchFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload>;
                };
                findMany: {
                    args: Prisma.QuestionImportBatchFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload>[];
                };
                create: {
                    args: Prisma.QuestionImportBatchCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload>;
                };
                createMany: {
                    args: Prisma.QuestionImportBatchCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QuestionImportBatchCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload>[];
                };
                delete: {
                    args: Prisma.QuestionImportBatchDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload>;
                };
                update: {
                    args: Prisma.QuestionImportBatchUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload>;
                };
                deleteMany: {
                    args: Prisma.QuestionImportBatchDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QuestionImportBatchUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QuestionImportBatchUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload>[];
                };
                upsert: {
                    args: Prisma.QuestionImportBatchUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuestionImportBatchPayload>;
                };
                aggregate: {
                    args: Prisma.QuestionImportBatchAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQuestionImportBatch>;
                };
                groupBy: {
                    args: Prisma.QuestionImportBatchGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuestionImportBatchGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QuestionImportBatchCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuestionImportBatchCountAggregateOutputType> | number;
                };
            };
        };
        ParsedQuestionReview: {
            payload: Prisma.$ParsedQuestionReviewPayload<ExtArgs>;
            fields: Prisma.ParsedQuestionReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ParsedQuestionReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ParsedQuestionReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload>;
                };
                findFirst: {
                    args: Prisma.ParsedQuestionReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ParsedQuestionReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload>;
                };
                findMany: {
                    args: Prisma.ParsedQuestionReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload>[];
                };
                create: {
                    args: Prisma.ParsedQuestionReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload>;
                };
                createMany: {
                    args: Prisma.ParsedQuestionReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ParsedQuestionReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload>[];
                };
                delete: {
                    args: Prisma.ParsedQuestionReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload>;
                };
                update: {
                    args: Prisma.ParsedQuestionReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.ParsedQuestionReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ParsedQuestionReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ParsedQuestionReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload>[];
                };
                upsert: {
                    args: Prisma.ParsedQuestionReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParsedQuestionReviewPayload>;
                };
                aggregate: {
                    args: Prisma.ParsedQuestionReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateParsedQuestionReview>;
                };
                groupBy: {
                    args: Prisma.ParsedQuestionReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ParsedQuestionReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ParsedQuestionReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ParsedQuestionReviewCountAggregateOutputType> | number;
                };
            };
        };
        TryoutCatalog: {
            payload: Prisma.$TryoutCatalogPayload<ExtArgs>;
            fields: Prisma.TryoutCatalogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TryoutCatalogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TryoutCatalogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload>;
                };
                findFirst: {
                    args: Prisma.TryoutCatalogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TryoutCatalogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload>;
                };
                findMany: {
                    args: Prisma.TryoutCatalogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload>[];
                };
                create: {
                    args: Prisma.TryoutCatalogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload>;
                };
                createMany: {
                    args: Prisma.TryoutCatalogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TryoutCatalogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload>[];
                };
                delete: {
                    args: Prisma.TryoutCatalogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload>;
                };
                update: {
                    args: Prisma.TryoutCatalogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload>;
                };
                deleteMany: {
                    args: Prisma.TryoutCatalogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TryoutCatalogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TryoutCatalogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload>[];
                };
                upsert: {
                    args: Prisma.TryoutCatalogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutCatalogPayload>;
                };
                aggregate: {
                    args: Prisma.TryoutCatalogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTryoutCatalog>;
                };
                groupBy: {
                    args: Prisma.TryoutCatalogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TryoutCatalogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TryoutCatalogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TryoutCatalogCountAggregateOutputType> | number;
                };
            };
        };
        TryoutGenerationRule: {
            payload: Prisma.$TryoutGenerationRulePayload<ExtArgs>;
            fields: Prisma.TryoutGenerationRuleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TryoutGenerationRuleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TryoutGenerationRuleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload>;
                };
                findFirst: {
                    args: Prisma.TryoutGenerationRuleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TryoutGenerationRuleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload>;
                };
                findMany: {
                    args: Prisma.TryoutGenerationRuleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload>[];
                };
                create: {
                    args: Prisma.TryoutGenerationRuleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload>;
                };
                createMany: {
                    args: Prisma.TryoutGenerationRuleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TryoutGenerationRuleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload>[];
                };
                delete: {
                    args: Prisma.TryoutGenerationRuleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload>;
                };
                update: {
                    args: Prisma.TryoutGenerationRuleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload>;
                };
                deleteMany: {
                    args: Prisma.TryoutGenerationRuleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TryoutGenerationRuleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TryoutGenerationRuleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload>[];
                };
                upsert: {
                    args: Prisma.TryoutGenerationRuleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutGenerationRulePayload>;
                };
                aggregate: {
                    args: Prisma.TryoutGenerationRuleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTryoutGenerationRule>;
                };
                groupBy: {
                    args: Prisma.TryoutGenerationRuleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TryoutGenerationRuleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TryoutGenerationRuleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TryoutGenerationRuleCountAggregateOutputType> | number;
                };
            };
        };
        TryoutRuleSection: {
            payload: Prisma.$TryoutRuleSectionPayload<ExtArgs>;
            fields: Prisma.TryoutRuleSectionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TryoutRuleSectionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TryoutRuleSectionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload>;
                };
                findFirst: {
                    args: Prisma.TryoutRuleSectionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TryoutRuleSectionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload>;
                };
                findMany: {
                    args: Prisma.TryoutRuleSectionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload>[];
                };
                create: {
                    args: Prisma.TryoutRuleSectionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload>;
                };
                createMany: {
                    args: Prisma.TryoutRuleSectionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TryoutRuleSectionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload>[];
                };
                delete: {
                    args: Prisma.TryoutRuleSectionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload>;
                };
                update: {
                    args: Prisma.TryoutRuleSectionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload>;
                };
                deleteMany: {
                    args: Prisma.TryoutRuleSectionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TryoutRuleSectionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TryoutRuleSectionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload>[];
                };
                upsert: {
                    args: Prisma.TryoutRuleSectionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TryoutRuleSectionPayload>;
                };
                aggregate: {
                    args: Prisma.TryoutRuleSectionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTryoutRuleSection>;
                };
                groupBy: {
                    args: Prisma.TryoutRuleSectionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TryoutRuleSectionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TryoutRuleSectionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TryoutRuleSectionCountAggregateOutputType> | number;
                };
            };
        };
        ManualQuestionSet: {
            payload: Prisma.$ManualQuestionSetPayload<ExtArgs>;
            fields: Prisma.ManualQuestionSetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ManualQuestionSetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ManualQuestionSetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload>;
                };
                findFirst: {
                    args: Prisma.ManualQuestionSetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ManualQuestionSetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload>;
                };
                findMany: {
                    args: Prisma.ManualQuestionSetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload>[];
                };
                create: {
                    args: Prisma.ManualQuestionSetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload>;
                };
                createMany: {
                    args: Prisma.ManualQuestionSetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ManualQuestionSetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload>[];
                };
                delete: {
                    args: Prisma.ManualQuestionSetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload>;
                };
                update: {
                    args: Prisma.ManualQuestionSetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload>;
                };
                deleteMany: {
                    args: Prisma.ManualQuestionSetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ManualQuestionSetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ManualQuestionSetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload>[];
                };
                upsert: {
                    args: Prisma.ManualQuestionSetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetPayload>;
                };
                aggregate: {
                    args: Prisma.ManualQuestionSetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateManualQuestionSet>;
                };
                groupBy: {
                    args: Prisma.ManualQuestionSetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManualQuestionSetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ManualQuestionSetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManualQuestionSetCountAggregateOutputType> | number;
                };
            };
        };
        ManualQuestionSetItem: {
            payload: Prisma.$ManualQuestionSetItemPayload<ExtArgs>;
            fields: Prisma.ManualQuestionSetItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ManualQuestionSetItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ManualQuestionSetItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload>;
                };
                findFirst: {
                    args: Prisma.ManualQuestionSetItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ManualQuestionSetItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload>;
                };
                findMany: {
                    args: Prisma.ManualQuestionSetItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload>[];
                };
                create: {
                    args: Prisma.ManualQuestionSetItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload>;
                };
                createMany: {
                    args: Prisma.ManualQuestionSetItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ManualQuestionSetItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload>[];
                };
                delete: {
                    args: Prisma.ManualQuestionSetItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload>;
                };
                update: {
                    args: Prisma.ManualQuestionSetItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload>;
                };
                deleteMany: {
                    args: Prisma.ManualQuestionSetItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ManualQuestionSetItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ManualQuestionSetItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload>[];
                };
                upsert: {
                    args: Prisma.ManualQuestionSetItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManualQuestionSetItemPayload>;
                };
                aggregate: {
                    args: Prisma.ManualQuestionSetItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateManualQuestionSetItem>;
                };
                groupBy: {
                    args: Prisma.ManualQuestionSetItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManualQuestionSetItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ManualQuestionSetItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManualQuestionSetItemCountAggregateOutputType> | number;
                };
            };
        };
        ExamSession: {
            payload: Prisma.$ExamSessionPayload<ExtArgs>;
            fields: Prisma.ExamSessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExamSessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExamSessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload>;
                };
                findFirst: {
                    args: Prisma.ExamSessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExamSessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload>;
                };
                findMany: {
                    args: Prisma.ExamSessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload>[];
                };
                create: {
                    args: Prisma.ExamSessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload>;
                };
                createMany: {
                    args: Prisma.ExamSessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExamSessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload>[];
                };
                delete: {
                    args: Prisma.ExamSessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload>;
                };
                update: {
                    args: Prisma.ExamSessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload>;
                };
                deleteMany: {
                    args: Prisma.ExamSessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExamSessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExamSessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload>[];
                };
                upsert: {
                    args: Prisma.ExamSessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionPayload>;
                };
                aggregate: {
                    args: Prisma.ExamSessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExamSession>;
                };
                groupBy: {
                    args: Prisma.ExamSessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamSessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExamSessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamSessionCountAggregateOutputType> | number;
                };
            };
        };
        ExamSessionQuestion: {
            payload: Prisma.$ExamSessionQuestionPayload<ExtArgs>;
            fields: Prisma.ExamSessionQuestionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExamSessionQuestionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExamSessionQuestionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload>;
                };
                findFirst: {
                    args: Prisma.ExamSessionQuestionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExamSessionQuestionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload>;
                };
                findMany: {
                    args: Prisma.ExamSessionQuestionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload>[];
                };
                create: {
                    args: Prisma.ExamSessionQuestionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload>;
                };
                createMany: {
                    args: Prisma.ExamSessionQuestionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExamSessionQuestionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload>[];
                };
                delete: {
                    args: Prisma.ExamSessionQuestionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload>;
                };
                update: {
                    args: Prisma.ExamSessionQuestionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload>;
                };
                deleteMany: {
                    args: Prisma.ExamSessionQuestionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExamSessionQuestionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExamSessionQuestionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload>[];
                };
                upsert: {
                    args: Prisma.ExamSessionQuestionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamSessionQuestionPayload>;
                };
                aggregate: {
                    args: Prisma.ExamSessionQuestionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExamSessionQuestion>;
                };
                groupBy: {
                    args: Prisma.ExamSessionQuestionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamSessionQuestionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExamSessionQuestionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamSessionQuestionCountAggregateOutputType> | number;
                };
            };
        };
        ExamAnswer: {
            payload: Prisma.$ExamAnswerPayload<ExtArgs>;
            fields: Prisma.ExamAnswerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExamAnswerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExamAnswerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload>;
                };
                findFirst: {
                    args: Prisma.ExamAnswerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExamAnswerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload>;
                };
                findMany: {
                    args: Prisma.ExamAnswerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload>[];
                };
                create: {
                    args: Prisma.ExamAnswerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload>;
                };
                createMany: {
                    args: Prisma.ExamAnswerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExamAnswerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload>[];
                };
                delete: {
                    args: Prisma.ExamAnswerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload>;
                };
                update: {
                    args: Prisma.ExamAnswerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload>;
                };
                deleteMany: {
                    args: Prisma.ExamAnswerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExamAnswerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExamAnswerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload>[];
                };
                upsert: {
                    args: Prisma.ExamAnswerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamAnswerPayload>;
                };
                aggregate: {
                    args: Prisma.ExamAnswerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExamAnswer>;
                };
                groupBy: {
                    args: Prisma.ExamAnswerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamAnswerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExamAnswerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamAnswerCountAggregateOutputType> | number;
                };
            };
        };
        ExamResult: {
            payload: Prisma.$ExamResultPayload<ExtArgs>;
            fields: Prisma.ExamResultFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExamResultFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExamResultFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload>;
                };
                findFirst: {
                    args: Prisma.ExamResultFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExamResultFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload>;
                };
                findMany: {
                    args: Prisma.ExamResultFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload>[];
                };
                create: {
                    args: Prisma.ExamResultCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload>;
                };
                createMany: {
                    args: Prisma.ExamResultCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExamResultCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload>[];
                };
                delete: {
                    args: Prisma.ExamResultDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload>;
                };
                update: {
                    args: Prisma.ExamResultUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload>;
                };
                deleteMany: {
                    args: Prisma.ExamResultDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExamResultUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExamResultUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload>[];
                };
                upsert: {
                    args: Prisma.ExamResultUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamResultPayload>;
                };
                aggregate: {
                    args: Prisma.ExamResultAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExamResult>;
                };
                groupBy: {
                    args: Prisma.ExamResultGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamResultGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExamResultCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamResultCountAggregateOutputType> | number;
                };
            };
        };
        ExamIntegrityLog: {
            payload: Prisma.$ExamIntegrityLogPayload<ExtArgs>;
            fields: Prisma.ExamIntegrityLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExamIntegrityLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExamIntegrityLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload>;
                };
                findFirst: {
                    args: Prisma.ExamIntegrityLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExamIntegrityLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload>;
                };
                findMany: {
                    args: Prisma.ExamIntegrityLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload>[];
                };
                create: {
                    args: Prisma.ExamIntegrityLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload>;
                };
                createMany: {
                    args: Prisma.ExamIntegrityLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExamIntegrityLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload>[];
                };
                delete: {
                    args: Prisma.ExamIntegrityLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload>;
                };
                update: {
                    args: Prisma.ExamIntegrityLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload>;
                };
                deleteMany: {
                    args: Prisma.ExamIntegrityLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExamIntegrityLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExamIntegrityLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload>[];
                };
                upsert: {
                    args: Prisma.ExamIntegrityLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExamIntegrityLogPayload>;
                };
                aggregate: {
                    args: Prisma.ExamIntegrityLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExamIntegrityLog>;
                };
                groupBy: {
                    args: Prisma.ExamIntegrityLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamIntegrityLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExamIntegrityLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExamIntegrityLogCountAggregateOutputType> | number;
                };
            };
        };
        AIRecommendation: {
            payload: Prisma.$AIRecommendationPayload<ExtArgs>;
            fields: Prisma.AIRecommendationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AIRecommendationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AIRecommendationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload>;
                };
                findFirst: {
                    args: Prisma.AIRecommendationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AIRecommendationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload>;
                };
                findMany: {
                    args: Prisma.AIRecommendationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload>[];
                };
                create: {
                    args: Prisma.AIRecommendationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload>;
                };
                createMany: {
                    args: Prisma.AIRecommendationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AIRecommendationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload>[];
                };
                delete: {
                    args: Prisma.AIRecommendationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload>;
                };
                update: {
                    args: Prisma.AIRecommendationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload>;
                };
                deleteMany: {
                    args: Prisma.AIRecommendationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AIRecommendationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AIRecommendationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload>[];
                };
                upsert: {
                    args: Prisma.AIRecommendationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationPayload>;
                };
                aggregate: {
                    args: Prisma.AIRecommendationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAIRecommendation>;
                };
                groupBy: {
                    args: Prisma.AIRecommendationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AIRecommendationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AIRecommendationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AIRecommendationCountAggregateOutputType> | number;
                };
            };
        };
        AIRecommendationItem: {
            payload: Prisma.$AIRecommendationItemPayload<ExtArgs>;
            fields: Prisma.AIRecommendationItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AIRecommendationItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AIRecommendationItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload>;
                };
                findFirst: {
                    args: Prisma.AIRecommendationItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AIRecommendationItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload>;
                };
                findMany: {
                    args: Prisma.AIRecommendationItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload>[];
                };
                create: {
                    args: Prisma.AIRecommendationItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload>;
                };
                createMany: {
                    args: Prisma.AIRecommendationItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AIRecommendationItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload>[];
                };
                delete: {
                    args: Prisma.AIRecommendationItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload>;
                };
                update: {
                    args: Prisma.AIRecommendationItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload>;
                };
                deleteMany: {
                    args: Prisma.AIRecommendationItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AIRecommendationItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AIRecommendationItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload>[];
                };
                upsert: {
                    args: Prisma.AIRecommendationItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AIRecommendationItemPayload>;
                };
                aggregate: {
                    args: Prisma.AIRecommendationItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAIRecommendationItem>;
                };
                groupBy: {
                    args: Prisma.AIRecommendationItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AIRecommendationItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AIRecommendationItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AIRecommendationItemCountAggregateOutputType> | number;
                };
            };
        };
        SubscriptionPlan: {
            payload: Prisma.$SubscriptionPlanPayload<ExtArgs>;
            fields: Prisma.SubscriptionPlanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SubscriptionPlanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SubscriptionPlanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>;
                };
                findFirst: {
                    args: Prisma.SubscriptionPlanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SubscriptionPlanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>;
                };
                findMany: {
                    args: Prisma.SubscriptionPlanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>[];
                };
                create: {
                    args: Prisma.SubscriptionPlanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>;
                };
                createMany: {
                    args: Prisma.SubscriptionPlanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SubscriptionPlanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>[];
                };
                delete: {
                    args: Prisma.SubscriptionPlanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>;
                };
                update: {
                    args: Prisma.SubscriptionPlanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>;
                };
                deleteMany: {
                    args: Prisma.SubscriptionPlanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SubscriptionPlanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SubscriptionPlanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>[];
                };
                upsert: {
                    args: Prisma.SubscriptionPlanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPlanPayload>;
                };
                aggregate: {
                    args: Prisma.SubscriptionPlanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSubscriptionPlan>;
                };
                groupBy: {
                    args: Prisma.SubscriptionPlanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscriptionPlanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SubscriptionPlanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscriptionPlanCountAggregateOutputType> | number;
                };
            };
        };
        UserSubscription: {
            payload: Prisma.$UserSubscriptionPayload<ExtArgs>;
            fields: Prisma.UserSubscriptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserSubscriptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserSubscriptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload>;
                };
                findFirst: {
                    args: Prisma.UserSubscriptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserSubscriptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload>;
                };
                findMany: {
                    args: Prisma.UserSubscriptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload>[];
                };
                create: {
                    args: Prisma.UserSubscriptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload>;
                };
                createMany: {
                    args: Prisma.UserSubscriptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserSubscriptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload>[];
                };
                delete: {
                    args: Prisma.UserSubscriptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload>;
                };
                update: {
                    args: Prisma.UserSubscriptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload>;
                };
                deleteMany: {
                    args: Prisma.UserSubscriptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserSubscriptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserSubscriptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload>[];
                };
                upsert: {
                    args: Prisma.UserSubscriptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSubscriptionPayload>;
                };
                aggregate: {
                    args: Prisma.UserSubscriptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserSubscription>;
                };
                groupBy: {
                    args: Prisma.UserSubscriptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserSubscriptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserSubscriptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserSubscriptionCountAggregateOutputType> | number;
                };
            };
        };
        PaymentTransaction: {
            payload: Prisma.$PaymentTransactionPayload<ExtArgs>;
            fields: Prisma.PaymentTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                findMany: {
                    args: Prisma.PaymentTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[];
                };
                create: {
                    args: Prisma.PaymentTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                createMany: {
                    args: Prisma.PaymentTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PaymentTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[];
                };
                delete: {
                    args: Prisma.PaymentTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                update: {
                    args: Prisma.PaymentTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PaymentTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.PaymentTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePaymentTransaction>;
                };
                groupBy: {
                    args: Prisma.PaymentTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentTransactionCountAggregateOutputType> | number;
                };
            };
        };
        PaymentWebhookEvent: {
            payload: Prisma.$PaymentWebhookEventPayload<ExtArgs>;
            fields: Prisma.PaymentWebhookEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentWebhookEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentWebhookEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentWebhookEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentWebhookEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload>;
                };
                findMany: {
                    args: Prisma.PaymentWebhookEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload>[];
                };
                create: {
                    args: Prisma.PaymentWebhookEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload>;
                };
                createMany: {
                    args: Prisma.PaymentWebhookEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PaymentWebhookEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload>[];
                };
                delete: {
                    args: Prisma.PaymentWebhookEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload>;
                };
                update: {
                    args: Prisma.PaymentWebhookEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentWebhookEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentWebhookEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PaymentWebhookEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload>[];
                };
                upsert: {
                    args: Prisma.PaymentWebhookEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentWebhookEventPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentWebhookEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePaymentWebhookEvent>;
                };
                groupBy: {
                    args: Prisma.PaymentWebhookEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentWebhookEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentWebhookEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentWebhookEventCountAggregateOutputType> | number;
                };
            };
        };
        PassingGradeConfig: {
            payload: Prisma.$PassingGradeConfigPayload<ExtArgs>;
            fields: Prisma.PassingGradeConfigFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PassingGradeConfigFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PassingGradeConfigFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload>;
                };
                findFirst: {
                    args: Prisma.PassingGradeConfigFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PassingGradeConfigFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload>;
                };
                findMany: {
                    args: Prisma.PassingGradeConfigFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload>[];
                };
                create: {
                    args: Prisma.PassingGradeConfigCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload>;
                };
                createMany: {
                    args: Prisma.PassingGradeConfigCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PassingGradeConfigCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload>[];
                };
                delete: {
                    args: Prisma.PassingGradeConfigDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload>;
                };
                update: {
                    args: Prisma.PassingGradeConfigUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload>;
                };
                deleteMany: {
                    args: Prisma.PassingGradeConfigDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PassingGradeConfigUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PassingGradeConfigUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload>[];
                };
                upsert: {
                    args: Prisma.PassingGradeConfigUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PassingGradeConfigPayload>;
                };
                aggregate: {
                    args: Prisma.PassingGradeConfigAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePassingGradeConfig>;
                };
                groupBy: {
                    args: Prisma.PassingGradeConfigGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PassingGradeConfigGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PassingGradeConfigCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PassingGradeConfigCountAggregateOutputType> | number;
                };
            };
        };
        TrialConfig: {
            payload: Prisma.$TrialConfigPayload<ExtArgs>;
            fields: Prisma.TrialConfigFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TrialConfigFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TrialConfigFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload>;
                };
                findFirst: {
                    args: Prisma.TrialConfigFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TrialConfigFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload>;
                };
                findMany: {
                    args: Prisma.TrialConfigFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload>[];
                };
                create: {
                    args: Prisma.TrialConfigCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload>;
                };
                createMany: {
                    args: Prisma.TrialConfigCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TrialConfigCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload>[];
                };
                delete: {
                    args: Prisma.TrialConfigDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload>;
                };
                update: {
                    args: Prisma.TrialConfigUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload>;
                };
                deleteMany: {
                    args: Prisma.TrialConfigDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TrialConfigUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TrialConfigUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload>[];
                };
                upsert: {
                    args: Prisma.TrialConfigUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrialConfigPayload>;
                };
                aggregate: {
                    args: Prisma.TrialConfigAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTrialConfig>;
                };
                groupBy: {
                    args: Prisma.TrialConfigGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TrialConfigGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TrialConfigCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TrialConfigCountAggregateOutputType> | number;
                };
            };
        };
        SystemSetting: {
            payload: Prisma.$SystemSettingPayload<ExtArgs>;
            fields: Prisma.SystemSettingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                findFirst: {
                    args: Prisma.SystemSettingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                findMany: {
                    args: Prisma.SystemSettingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>[];
                };
                create: {
                    args: Prisma.SystemSettingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                createMany: {
                    args: Prisma.SystemSettingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SystemSettingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>[];
                };
                delete: {
                    args: Prisma.SystemSettingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                update: {
                    args: Prisma.SystemSettingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                deleteMany: {
                    args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SystemSettingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>[];
                };
                upsert: {
                    args: Prisma.SystemSettingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
                };
                aggregate: {
                    args: Prisma.SystemSettingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSystemSetting>;
                };
                groupBy: {
                    args: Prisma.SystemSettingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemSettingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SystemSettingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemSettingCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly image: "image";
    readonly phone: "phone";
    readonly role: "role";
    readonly status: "status";
    readonly emailVerified: "emailVerified";
    readonly emailVerifiedAt: "emailVerifiedAt";
    readonly passwordSetAt: "passwordSetAt";
    readonly lastLoginAt: "lastLoginAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly expiresAt: "expiresAt";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly accountId: "accountId";
    readonly providerId: "providerId";
    readonly accessToken: "accessToken";
    readonly refreshToken: "refreshToken";
    readonly accessTokenExpiresAt: "accessTokenExpiresAt";
    readonly refreshTokenExpiresAt: "refreshTokenExpiresAt";
    readonly scope: "scope";
    readonly idToken: "idToken";
    readonly password: "password";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const VerificationScalarFieldEnum: {
    readonly id: "id";
    readonly identifier: "identifier";
    readonly value: "value";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];
export declare const QuestionScalarFieldEnum: {
    readonly id: "id";
    readonly questionText: "questionText";
    readonly category: "category";
    readonly subCategory: "subCategory";
    readonly topicTag: "topicTag";
    readonly competencyArea: "competencyArea";
    readonly difficulty: "difficulty";
    readonly questionType: "questionType";
    readonly sourceType: "sourceType";
    readonly status: "status";
    readonly explanation: "explanation";
    readonly createdBy: "createdBy";
    readonly updatedBy: "updatedBy";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum];
export declare const QuestionOptionScalarFieldEnum: {
    readonly id: "id";
    readonly questionId: "questionId";
    readonly label: "label";
    readonly optionText: "optionText";
    readonly isCorrect: "isCorrect";
    readonly tkpWeight: "tkpWeight";
    readonly displayOrder: "displayOrder";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type QuestionOptionScalarFieldEnum = (typeof QuestionOptionScalarFieldEnum)[keyof typeof QuestionOptionScalarFieldEnum];
export declare const QuestionTagScalarFieldEnum: {
    readonly id: "id";
    readonly questionId: "questionId";
    readonly tag: "tag";
    readonly createdAt: "createdAt";
};
export type QuestionTagScalarFieldEnum = (typeof QuestionTagScalarFieldEnum)[keyof typeof QuestionTagScalarFieldEnum];
export declare const QuestionImportBatchScalarFieldEnum: {
    readonly id: "id";
    readonly uploadedBy: "uploadedBy";
    readonly fileName: "fileName";
    readonly fileUrl: "fileUrl";
    readonly fileSizeBytes: "fileSizeBytes";
    readonly status: "status";
    readonly totalDetected: "totalDetected";
    readonly validCount: "validCount";
    readonly invalidCount: "invalidCount";
    readonly errorMessage: "errorMessage";
    readonly createdAt: "createdAt";
    readonly completedAt: "completedAt";
};
export type QuestionImportBatchScalarFieldEnum = (typeof QuestionImportBatchScalarFieldEnum)[keyof typeof QuestionImportBatchScalarFieldEnum];
export declare const ParsedQuestionReviewScalarFieldEnum: {
    readonly id: "id";
    readonly batchId: "batchId";
    readonly questionId: "questionId";
    readonly rawAiOutput: "rawAiOutput";
    readonly questionText: "questionText";
    readonly optionsJson: "optionsJson";
    readonly detectedAnswer: "detectedAnswer";
    readonly category: "category";
    readonly subCategory: "subCategory";
    readonly topicTag: "topicTag";
    readonly difficulty: "difficulty";
    readonly confidenceScore: "confidenceScore";
    readonly status: "status";
    readonly reviewNotes: "reviewNotes";
    readonly reviewedBy: "reviewedBy";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ParsedQuestionReviewScalarFieldEnum = (typeof ParsedQuestionReviewScalarFieldEnum)[keyof typeof ParsedQuestionReviewScalarFieldEnum];
export declare const TryoutCatalogScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly tryoutType: "tryoutType";
    readonly accessType: "accessType";
    readonly status: "status";
    readonly isPublic: "isPublic";
    readonly isFeatured: "isFeatured";
    readonly sortOrder: "sortOrder";
    readonly durationMinutes: "durationMinutes";
    readonly totalQuestions: "totalQuestions";
    readonly passingGradeConfigId: "passingGradeConfigId";
    readonly showResultImmediately: "showResultImmediately";
    readonly showAnswerReview: "showAnswerReview";
    readonly createdBy: "createdBy";
    readonly approvedBy: "approvedBy";
    readonly publishedAt: "publishedAt";
    readonly archivedAt: "archivedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TryoutCatalogScalarFieldEnum = (typeof TryoutCatalogScalarFieldEnum)[keyof typeof TryoutCatalogScalarFieldEnum];
export declare const TryoutGenerationRuleScalarFieldEnum: {
    readonly id: "id";
    readonly tryoutCatalogId: "tryoutCatalogId";
    readonly randomizationMode: "randomizationMode";
    readonly questionOrderMode: "questionOrderMode";
    readonly avoidRecentQuestions: "avoidRecentQuestions";
    readonly avoidRecentExamCount: "avoidRecentExamCount";
    readonly rulesJson: "rulesJson";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TryoutGenerationRuleScalarFieldEnum = (typeof TryoutGenerationRuleScalarFieldEnum)[keyof typeof TryoutGenerationRuleScalarFieldEnum];
export declare const TryoutRuleSectionScalarFieldEnum: {
    readonly id: "id";
    readonly tryoutGenerationRuleId: "tryoutGenerationRuleId";
    readonly category: "category";
    readonly questionCount: "questionCount";
    readonly difficultyDistributionJson: "difficultyDistributionJson";
    readonly topicDistributionJson: "topicDistributionJson";
    readonly sortOrder: "sortOrder";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TryoutRuleSectionScalarFieldEnum = (typeof TryoutRuleSectionScalarFieldEnum)[keyof typeof TryoutRuleSectionScalarFieldEnum];
export declare const ManualQuestionSetScalarFieldEnum: {
    readonly id: "id";
    readonly tryoutCatalogId: "tryoutCatalogId";
    readonly name: "name";
    readonly description: "description";
    readonly status: "status";
    readonly createdBy: "createdBy";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ManualQuestionSetScalarFieldEnum = (typeof ManualQuestionSetScalarFieldEnum)[keyof typeof ManualQuestionSetScalarFieldEnum];
export declare const ManualQuestionSetItemScalarFieldEnum: {
    readonly id: "id";
    readonly manualQuestionSetId: "manualQuestionSetId";
    readonly questionId: "questionId";
    readonly questionOrder: "questionOrder";
    readonly createdAt: "createdAt";
};
export type ManualQuestionSetItemScalarFieldEnum = (typeof ManualQuestionSetItemScalarFieldEnum)[keyof typeof ManualQuestionSetItemScalarFieldEnum];
export declare const ExamSessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tryoutCatalogId: "tryoutCatalogId";
    readonly status: "status";
    readonly generationModeSnapshot: "generationModeSnapshot";
    readonly tryoutSnapshot: "tryoutSnapshot";
    readonly startedAt: "startedAt";
    readonly submittedAt: "submittedAt";
    readonly expiresAt: "expiresAt";
    readonly durationSeconds: "durationSeconds";
    readonly tabSwitchCount: "tabSwitchCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ExamSessionScalarFieldEnum = (typeof ExamSessionScalarFieldEnum)[keyof typeof ExamSessionScalarFieldEnum];
export declare const ExamSessionQuestionScalarFieldEnum: {
    readonly id: "id";
    readonly examSessionId: "examSessionId";
    readonly questionId: "questionId";
    readonly questionOrder: "questionOrder";
    readonly questionSnapshot: "questionSnapshot";
    readonly optionsSnapshot: "optionsSnapshot";
    readonly categorySnapshot: "categorySnapshot";
    readonly subCategorySnapshot: "subCategorySnapshot";
    readonly topicTagSnapshot: "topicTagSnapshot";
    readonly difficultySnapshot: "difficultySnapshot";
    readonly createdAt: "createdAt";
};
export type ExamSessionQuestionScalarFieldEnum = (typeof ExamSessionQuestionScalarFieldEnum)[keyof typeof ExamSessionQuestionScalarFieldEnum];
export declare const ExamAnswerScalarFieldEnum: {
    readonly id: "id";
    readonly examSessionId: "examSessionId";
    readonly examSessionQuestionId: "examSessionQuestionId";
    readonly selectedOptionId: "selectedOptionId";
    readonly selectedLabel: "selectedLabel";
    readonly isCorrect: "isCorrect";
    readonly scoreAwarded: "scoreAwarded";
    readonly isFlagged: "isFlagged";
    readonly answeredAt: "answeredAt";
    readonly updatedAt: "updatedAt";
};
export type ExamAnswerScalarFieldEnum = (typeof ExamAnswerScalarFieldEnum)[keyof typeof ExamAnswerScalarFieldEnum];
export declare const ExamResultScalarFieldEnum: {
    readonly id: "id";
    readonly examSessionId: "examSessionId";
    readonly userId: "userId";
    readonly passingGradeConfigId: "passingGradeConfigId";
    readonly twkScore: "twkScore";
    readonly tiuScore: "tiuScore";
    readonly tkpScore: "tkpScore";
    readonly totalScore: "totalScore";
    readonly twkPassed: "twkPassed";
    readonly tiuPassed: "tiuPassed";
    readonly tkpPassed: "tkpPassed";
    readonly totalPassed: "totalPassed";
    readonly overallPassed: "overallPassed";
    readonly breakdownJson: "breakdownJson";
    readonly generatedAt: "generatedAt";
    readonly createdAt: "createdAt";
};
export type ExamResultScalarFieldEnum = (typeof ExamResultScalarFieldEnum)[keyof typeof ExamResultScalarFieldEnum];
export declare const ExamIntegrityLogScalarFieldEnum: {
    readonly id: "id";
    readonly examSessionId: "examSessionId";
    readonly eventType: "eventType";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type ExamIntegrityLogScalarFieldEnum = (typeof ExamIntegrityLogScalarFieldEnum)[keyof typeof ExamIntegrityLogScalarFieldEnum];
export declare const AIRecommendationScalarFieldEnum: {
    readonly id: "id";
    readonly examResultId: "examResultId";
    readonly status: "status";
    readonly summary: "summary";
    readonly overallAssessment: "overallAssessment";
    readonly nextTryoutStrategy: "nextTryoutStrategy";
    readonly rawRequestPayload: "rawRequestPayload";
    readonly rawAiResponse: "rawAiResponse";
    readonly isFallback: "isFallback";
    readonly modelName: "modelName";
    readonly errorMessage: "errorMessage";
    readonly generatedAt: "generatedAt";
    readonly createdAt: "createdAt";
};
export type AIRecommendationScalarFieldEnum = (typeof AIRecommendationScalarFieldEnum)[keyof typeof AIRecommendationScalarFieldEnum];
export declare const AIRecommendationItemScalarFieldEnum: {
    readonly id: "id";
    readonly aiRecommendationId: "aiRecommendationId";
    readonly priorityOrder: "priorityOrder";
    readonly priorityLevel: "priorityLevel";
    readonly priorityScore: "priorityScore";
    readonly category: "category";
    readonly subCategory: "subCategory";
    readonly topicTag: "topicTag";
    readonly reasonCode: "reasonCode";
    readonly reasonCodes: "reasonCodes";
    readonly trend: "trend";
    readonly reason: "reason";
    readonly suggestedFocus: "suggestedFocus";
    readonly accuracy: "accuracy";
    readonly wrongAnswerRate: "wrongAnswerRate";
    readonly totalQuestions: "totalQuestions";
    readonly correctAnswers: "correctAnswers";
    readonly wrongAnswers: "wrongAnswers";
    readonly emptyAnswers: "emptyAnswers";
    readonly dominantDifficulty: "dominantDifficulty";
    readonly scoreImpact: "scoreImpact";
    readonly createdAt: "createdAt";
};
export type AIRecommendationItemScalarFieldEnum = (typeof AIRecommendationItemScalarFieldEnum)[keyof typeof AIRecommendationItemScalarFieldEnum];
export declare const SubscriptionPlanScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly durationDays: "durationDays";
    readonly price: "price";
    readonly currency: "currency";
    readonly isActive: "isActive";
    readonly isTrial: "isTrial";
    readonly trialTryoutLimit: "trialTryoutLimit";
    readonly trialDayLimit: "trialDayLimit";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SubscriptionPlanScalarFieldEnum = (typeof SubscriptionPlanScalarFieldEnum)[keyof typeof SubscriptionPlanScalarFieldEnum];
export declare const UserSubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly subscriptionPlanId: "subscriptionPlanId";
    readonly status: "status";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly tryoutLimit: "tryoutLimit";
    readonly tryoutUsed: "tryoutUsed";
    readonly isTrial: "isTrial";
    readonly activationSource: "activationSource";
    readonly activatedBy: "activatedBy";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserSubscriptionScalarFieldEnum = (typeof UserSubscriptionScalarFieldEnum)[keyof typeof UserSubscriptionScalarFieldEnum];
export declare const PaymentTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly subscriptionPlanId: "subscriptionPlanId";
    readonly userSubscriptionId: "userSubscriptionId";
    readonly idempotencyKey: "idempotencyKey";
    readonly invoiceNumber: "invoiceNumber";
    readonly gatewayProvider: "gatewayProvider";
    readonly gatewayTransactionId: "gatewayTransactionId";
    readonly amount: "amount";
    readonly currency: "currency";
    readonly paymentMethod: "paymentMethod";
    readonly status: "status";
    readonly paymentUrl: "paymentUrl";
    readonly paidAt: "paidAt";
    readonly expiredAt: "expiredAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PaymentTransactionScalarFieldEnum = (typeof PaymentTransactionScalarFieldEnum)[keyof typeof PaymentTransactionScalarFieldEnum];
export declare const PaymentWebhookEventScalarFieldEnum: {
    readonly id: "id";
    readonly paymentTransactionId: "paymentTransactionId";
    readonly gatewayEventId: "gatewayEventId";
    readonly eventType: "eventType";
    readonly payload: "payload";
    readonly signatureValid: "signatureValid";
    readonly processed: "processed";
    readonly processedAt: "processedAt";
    readonly createdAt: "createdAt";
};
export type PaymentWebhookEventScalarFieldEnum = (typeof PaymentWebhookEventScalarFieldEnum)[keyof typeof PaymentWebhookEventScalarFieldEnum];
export declare const PassingGradeConfigScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly twkMinScore: "twkMinScore";
    readonly tiuMinScore: "tiuMinScore";
    readonly tkpMinScore: "tkpMinScore";
    readonly totalMinScore: "totalMinScore";
    readonly isActive: "isActive";
    readonly effectiveFrom: "effectiveFrom";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PassingGradeConfigScalarFieldEnum = (typeof PassingGradeConfigScalarFieldEnum)[keyof typeof PassingGradeConfigScalarFieldEnum];
export declare const TrialConfigScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly freeTryoutCount: "freeTryoutCount";
    readonly trialDurationDays: "trialDurationDays";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TrialConfigScalarFieldEnum = (typeof TrialConfigScalarFieldEnum)[keyof typeof TrialConfigScalarFieldEnum];
export declare const SystemSettingScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly value: "value";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SystemSettingScalarFieldEnum = (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly actorUserId: "actorUserId";
    readonly actorRole: "actorRole";
    readonly action: "action";
    readonly module: "module";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly metadata: "metadata";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>;
export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>;
export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>;
export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumQuestionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionCategory'>;
export type ListEnumQuestionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionCategory[]'>;
export type EnumQuestionDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionDifficulty'>;
export type ListEnumQuestionDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionDifficulty[]'>;
export type EnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType'>;
export type ListEnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType[]'>;
export type EnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType'>;
export type ListEnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType[]'>;
export type EnumQuestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionStatus'>;
export type ListEnumQuestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionStatus[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumImportBatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImportBatchStatus'>;
export type ListEnumImportBatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImportBatchStatus[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type EnumParsedQuestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ParsedQuestionStatus'>;
export type ListEnumParsedQuestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ParsedQuestionStatus[]'>;
export type EnumTryoutTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TryoutType'>;
export type ListEnumTryoutTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TryoutType[]'>;
export type EnumAccessTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccessType'>;
export type ListEnumAccessTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccessType[]'>;
export type EnumTryoutStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TryoutStatus'>;
export type ListEnumTryoutStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TryoutStatus[]'>;
export type EnumRandomizationModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RandomizationMode'>;
export type ListEnumRandomizationModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RandomizationMode[]'>;
export type EnumQuestionOrderModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionOrderMode'>;
export type ListEnumQuestionOrderModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionOrderMode[]'>;
export type EnumManualQuestionSetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ManualQuestionSetStatus'>;
export type ListEnumManualQuestionSetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ManualQuestionSetStatus[]'>;
export type EnumExamSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamSessionStatus'>;
export type ListEnumExamSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamSessionStatus[]'>;
export type EnumExamIntegrityEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamIntegrityEventType'>;
export type ListEnumExamIntegrityEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamIntegrityEventType[]'>;
export type EnumAIRecommendationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIRecommendationStatus'>;
export type ListEnumAIRecommendationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIRecommendationStatus[]'>;
export type EnumPriorityLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriorityLevel'>;
export type ListEnumPriorityLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriorityLevel[]'>;
export type EnumReasonCodeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReasonCode'>;
export type ListEnumReasonCodeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReasonCode[]'>;
export type EnumTrendTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrendType'>;
export type ListEnumTrendTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrendType[]'>;
export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>;
export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>;
export type EnumActivationSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivationSource'>;
export type ListEnumActivationSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivationSource[]'>;
export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>;
export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    session?: Prisma.SessionOmit;
    account?: Prisma.AccountOmit;
    verification?: Prisma.VerificationOmit;
    question?: Prisma.QuestionOmit;
    questionOption?: Prisma.QuestionOptionOmit;
    questionTag?: Prisma.QuestionTagOmit;
    questionImportBatch?: Prisma.QuestionImportBatchOmit;
    parsedQuestionReview?: Prisma.ParsedQuestionReviewOmit;
    tryoutCatalog?: Prisma.TryoutCatalogOmit;
    tryoutGenerationRule?: Prisma.TryoutGenerationRuleOmit;
    tryoutRuleSection?: Prisma.TryoutRuleSectionOmit;
    manualQuestionSet?: Prisma.ManualQuestionSetOmit;
    manualQuestionSetItem?: Prisma.ManualQuestionSetItemOmit;
    examSession?: Prisma.ExamSessionOmit;
    examSessionQuestion?: Prisma.ExamSessionQuestionOmit;
    examAnswer?: Prisma.ExamAnswerOmit;
    examResult?: Prisma.ExamResultOmit;
    examIntegrityLog?: Prisma.ExamIntegrityLogOmit;
    aIRecommendation?: Prisma.AIRecommendationOmit;
    aIRecommendationItem?: Prisma.AIRecommendationItemOmit;
    subscriptionPlan?: Prisma.SubscriptionPlanOmit;
    userSubscription?: Prisma.UserSubscriptionOmit;
    paymentTransaction?: Prisma.PaymentTransactionOmit;
    paymentWebhookEvent?: Prisma.PaymentWebhookEventOmit;
    passingGradeConfig?: Prisma.PassingGradeConfigOmit;
    trialConfig?: Prisma.TrialConfigOmit;
    systemSetting?: Prisma.SystemSettingOmit;
    auditLog?: Prisma.AuditLogOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
