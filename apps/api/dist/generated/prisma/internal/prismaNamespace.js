import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.8.0",
    engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    Question: 'Question',
    QuestionOption: 'QuestionOption',
    QuestionTag: 'QuestionTag',
    QuestionImportBatch: 'QuestionImportBatch',
    ParsedQuestionReview: 'ParsedQuestionReview',
    TryoutCatalog: 'TryoutCatalog',
    TryoutGenerationRule: 'TryoutGenerationRule',
    TryoutRuleSection: 'TryoutRuleSection',
    ManualQuestionSet: 'ManualQuestionSet',
    ManualQuestionSetItem: 'ManualQuestionSetItem',
    ExamSession: 'ExamSession',
    ExamSessionQuestion: 'ExamSessionQuestion',
    ExamAnswer: 'ExamAnswer',
    ExamResult: 'ExamResult',
    ExamIntegrityLog: 'ExamIntegrityLog',
    AIRecommendation: 'AIRecommendation',
    AIRecommendationItem: 'AIRecommendationItem',
    SubscriptionPlan: 'SubscriptionPlan',
    UserSubscription: 'UserSubscription',
    PaymentTransaction: 'PaymentTransaction',
    PaymentWebhookEvent: 'PaymentWebhookEvent',
    PassingGradeConfig: 'PassingGradeConfig',
    TrialConfig: 'TrialConfig',
    SystemSetting: 'SystemSetting',
    AuditLog: 'AuditLog'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    image: 'image',
    phone: 'phone',
    role: 'role',
    status: 'status',
    emailVerified: 'emailVerified',
    emailVerifiedAt: 'emailVerifiedAt',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const SessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const AccountScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    accountId: 'accountId',
    providerId: 'providerId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    idToken: 'idToken',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const VerificationScalarFieldEnum = {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const QuestionScalarFieldEnum = {
    id: 'id',
    questionText: 'questionText',
    category: 'category',
    subCategory: 'subCategory',
    topicTag: 'topicTag',
    competencyArea: 'competencyArea',
    difficulty: 'difficulty',
    questionType: 'questionType',
    sourceType: 'sourceType',
    status: 'status',
    explanation: 'explanation',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const QuestionOptionScalarFieldEnum = {
    id: 'id',
    questionId: 'questionId',
    label: 'label',
    optionText: 'optionText',
    isCorrect: 'isCorrect',
    tkpWeight: 'tkpWeight',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const QuestionTagScalarFieldEnum = {
    id: 'id',
    questionId: 'questionId',
    tag: 'tag',
    createdAt: 'createdAt'
};
export const QuestionImportBatchScalarFieldEnum = {
    id: 'id',
    uploadedBy: 'uploadedBy',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    fileSizeBytes: 'fileSizeBytes',
    status: 'status',
    totalDetected: 'totalDetected',
    validCount: 'validCount',
    invalidCount: 'invalidCount',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
};
export const ParsedQuestionReviewScalarFieldEnum = {
    id: 'id',
    batchId: 'batchId',
    questionId: 'questionId',
    rawAiOutput: 'rawAiOutput',
    questionText: 'questionText',
    optionsJson: 'optionsJson',
    detectedAnswer: 'detectedAnswer',
    category: 'category',
    subCategory: 'subCategory',
    topicTag: 'topicTag',
    difficulty: 'difficulty',
    confidenceScore: 'confidenceScore',
    status: 'status',
    reviewNotes: 'reviewNotes',
    reviewedBy: 'reviewedBy',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TryoutCatalogScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    tryoutType: 'tryoutType',
    accessType: 'accessType',
    status: 'status',
    isPublic: 'isPublic',
    isFeatured: 'isFeatured',
    sortOrder: 'sortOrder',
    durationMinutes: 'durationMinutes',
    totalQuestions: 'totalQuestions',
    passingGradeConfigId: 'passingGradeConfigId',
    showResultImmediately: 'showResultImmediately',
    showAnswerReview: 'showAnswerReview',
    createdBy: 'createdBy',
    approvedBy: 'approvedBy',
    publishedAt: 'publishedAt',
    archivedAt: 'archivedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TryoutGenerationRuleScalarFieldEnum = {
    id: 'id',
    tryoutCatalogId: 'tryoutCatalogId',
    randomizationMode: 'randomizationMode',
    questionOrderMode: 'questionOrderMode',
    avoidRecentQuestions: 'avoidRecentQuestions',
    avoidRecentExamCount: 'avoidRecentExamCount',
    rulesJson: 'rulesJson',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TryoutRuleSectionScalarFieldEnum = {
    id: 'id',
    tryoutGenerationRuleId: 'tryoutGenerationRuleId',
    category: 'category',
    questionCount: 'questionCount',
    difficultyDistributionJson: 'difficultyDistributionJson',
    topicDistributionJson: 'topicDistributionJson',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ManualQuestionSetScalarFieldEnum = {
    id: 'id',
    tryoutCatalogId: 'tryoutCatalogId',
    name: 'name',
    description: 'description',
    status: 'status',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ManualQuestionSetItemScalarFieldEnum = {
    id: 'id',
    manualQuestionSetId: 'manualQuestionSetId',
    questionId: 'questionId',
    questionOrder: 'questionOrder',
    createdAt: 'createdAt'
};
export const ExamSessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tryoutCatalogId: 'tryoutCatalogId',
    status: 'status',
    generationModeSnapshot: 'generationModeSnapshot',
    tryoutSnapshot: 'tryoutSnapshot',
    startedAt: 'startedAt',
    submittedAt: 'submittedAt',
    expiresAt: 'expiresAt',
    durationSeconds: 'durationSeconds',
    tabSwitchCount: 'tabSwitchCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ExamSessionQuestionScalarFieldEnum = {
    id: 'id',
    examSessionId: 'examSessionId',
    questionId: 'questionId',
    questionOrder: 'questionOrder',
    questionSnapshot: 'questionSnapshot',
    optionsSnapshot: 'optionsSnapshot',
    categorySnapshot: 'categorySnapshot',
    subCategorySnapshot: 'subCategorySnapshot',
    topicTagSnapshot: 'topicTagSnapshot',
    difficultySnapshot: 'difficultySnapshot',
    createdAt: 'createdAt'
};
export const ExamAnswerScalarFieldEnum = {
    id: 'id',
    examSessionId: 'examSessionId',
    examSessionQuestionId: 'examSessionQuestionId',
    selectedOptionId: 'selectedOptionId',
    selectedLabel: 'selectedLabel',
    isCorrect: 'isCorrect',
    scoreAwarded: 'scoreAwarded',
    isFlagged: 'isFlagged',
    answeredAt: 'answeredAt',
    updatedAt: 'updatedAt'
};
export const ExamResultScalarFieldEnum = {
    id: 'id',
    examSessionId: 'examSessionId',
    userId: 'userId',
    passingGradeConfigId: 'passingGradeConfigId',
    twkScore: 'twkScore',
    tiuScore: 'tiuScore',
    tkpScore: 'tkpScore',
    totalScore: 'totalScore',
    twkPassed: 'twkPassed',
    tiuPassed: 'tiuPassed',
    tkpPassed: 'tkpPassed',
    totalPassed: 'totalPassed',
    overallPassed: 'overallPassed',
    breakdownJson: 'breakdownJson',
    generatedAt: 'generatedAt',
    createdAt: 'createdAt'
};
export const ExamIntegrityLogScalarFieldEnum = {
    id: 'id',
    examSessionId: 'examSessionId',
    eventType: 'eventType',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
export const AIRecommendationScalarFieldEnum = {
    id: 'id',
    examResultId: 'examResultId',
    status: 'status',
    summary: 'summary',
    overallAssessment: 'overallAssessment',
    nextTryoutStrategy: 'nextTryoutStrategy',
    rawRequestPayload: 'rawRequestPayload',
    rawAiResponse: 'rawAiResponse',
    isFallback: 'isFallback',
    modelName: 'modelName',
    errorMessage: 'errorMessage',
    generatedAt: 'generatedAt',
    createdAt: 'createdAt'
};
export const AIRecommendationItemScalarFieldEnum = {
    id: 'id',
    aiRecommendationId: 'aiRecommendationId',
    priorityOrder: 'priorityOrder',
    priorityLevel: 'priorityLevel',
    priorityScore: 'priorityScore',
    category: 'category',
    subCategory: 'subCategory',
    topicTag: 'topicTag',
    reasonCode: 'reasonCode',
    reasonCodes: 'reasonCodes',
    trend: 'trend',
    reason: 'reason',
    suggestedFocus: 'suggestedFocus',
    accuracy: 'accuracy',
    wrongAnswerRate: 'wrongAnswerRate',
    totalQuestions: 'totalQuestions',
    correctAnswers: 'correctAnswers',
    wrongAnswers: 'wrongAnswers',
    emptyAnswers: 'emptyAnswers',
    dominantDifficulty: 'dominantDifficulty',
    scoreImpact: 'scoreImpact',
    createdAt: 'createdAt'
};
export const SubscriptionPlanScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    durationDays: 'durationDays',
    price: 'price',
    currency: 'currency',
    isActive: 'isActive',
    isTrial: 'isTrial',
    trialTryoutLimit: 'trialTryoutLimit',
    trialDayLimit: 'trialDayLimit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const UserSubscriptionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    subscriptionPlanId: 'subscriptionPlanId',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate',
    tryoutLimit: 'tryoutLimit',
    tryoutUsed: 'tryoutUsed',
    isTrial: 'isTrial',
    activationSource: 'activationSource',
    activatedBy: 'activatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PaymentTransactionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    subscriptionPlanId: 'subscriptionPlanId',
    userSubscriptionId: 'userSubscriptionId',
    idempotencyKey: 'idempotencyKey',
    invoiceNumber: 'invoiceNumber',
    gatewayProvider: 'gatewayProvider',
    gatewayTransactionId: 'gatewayTransactionId',
    amount: 'amount',
    currency: 'currency',
    paymentMethod: 'paymentMethod',
    status: 'status',
    paymentUrl: 'paymentUrl',
    paidAt: 'paidAt',
    expiredAt: 'expiredAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PaymentWebhookEventScalarFieldEnum = {
    id: 'id',
    paymentTransactionId: 'paymentTransactionId',
    gatewayEventId: 'gatewayEventId',
    eventType: 'eventType',
    payload: 'payload',
    signatureValid: 'signatureValid',
    processed: 'processed',
    processedAt: 'processedAt',
    createdAt: 'createdAt'
};
export const PassingGradeConfigScalarFieldEnum = {
    id: 'id',
    name: 'name',
    twkMinScore: 'twkMinScore',
    tiuMinScore: 'tiuMinScore',
    tkpMinScore: 'tkpMinScore',
    totalMinScore: 'totalMinScore',
    isActive: 'isActive',
    effectiveFrom: 'effectiveFrom',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TrialConfigScalarFieldEnum = {
    id: 'id',
    name: 'name',
    freeTryoutCount: 'freeTryoutCount',
    trialDurationDays: 'trialDurationDays',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SystemSettingScalarFieldEnum = {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const AuditLogScalarFieldEnum = {
    id: 'id',
    actorUserId: 'actorUserId',
    actorRole: 'actorRole',
    action: 'action',
    module: 'module',
    targetType: 'targetType',
    targetId: 'targetId',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
export const JsonNullValueInput = {
    JsonNull: JsonNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map