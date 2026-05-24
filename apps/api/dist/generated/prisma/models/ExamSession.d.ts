import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExamSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$ExamSessionPayload>;
export type AggregateExamSession = {
    _count: ExamSessionCountAggregateOutputType | null;
    _avg: ExamSessionAvgAggregateOutputType | null;
    _sum: ExamSessionSumAggregateOutputType | null;
    _min: ExamSessionMinAggregateOutputType | null;
    _max: ExamSessionMaxAggregateOutputType | null;
};
export type ExamSessionAvgAggregateOutputType = {
    durationSeconds: number | null;
    tabSwitchCount: number | null;
};
export type ExamSessionSumAggregateOutputType = {
    durationSeconds: number | null;
    tabSwitchCount: number | null;
};
export type ExamSessionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tryoutCatalogId: string | null;
    status: $Enums.ExamSessionStatus | null;
    generationModeSnapshot: $Enums.RandomizationMode | null;
    startedAt: Date | null;
    submittedAt: Date | null;
    expiresAt: Date | null;
    durationSeconds: number | null;
    tabSwitchCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ExamSessionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tryoutCatalogId: string | null;
    status: $Enums.ExamSessionStatus | null;
    generationModeSnapshot: $Enums.RandomizationMode | null;
    startedAt: Date | null;
    submittedAt: Date | null;
    expiresAt: Date | null;
    durationSeconds: number | null;
    tabSwitchCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ExamSessionCountAggregateOutputType = {
    id: number;
    userId: number;
    tryoutCatalogId: number;
    status: number;
    generationModeSnapshot: number;
    tryoutSnapshot: number;
    startedAt: number;
    submittedAt: number;
    expiresAt: number;
    durationSeconds: number;
    tabSwitchCount: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ExamSessionAvgAggregateInputType = {
    durationSeconds?: true;
    tabSwitchCount?: true;
};
export type ExamSessionSumAggregateInputType = {
    durationSeconds?: true;
    tabSwitchCount?: true;
};
export type ExamSessionMinAggregateInputType = {
    id?: true;
    userId?: true;
    tryoutCatalogId?: true;
    status?: true;
    generationModeSnapshot?: true;
    startedAt?: true;
    submittedAt?: true;
    expiresAt?: true;
    durationSeconds?: true;
    tabSwitchCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ExamSessionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    tryoutCatalogId?: true;
    status?: true;
    generationModeSnapshot?: true;
    startedAt?: true;
    submittedAt?: true;
    expiresAt?: true;
    durationSeconds?: true;
    tabSwitchCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ExamSessionCountAggregateInputType = {
    id?: true;
    userId?: true;
    tryoutCatalogId?: true;
    status?: true;
    generationModeSnapshot?: true;
    tryoutSnapshot?: true;
    startedAt?: true;
    submittedAt?: true;
    expiresAt?: true;
    durationSeconds?: true;
    tabSwitchCount?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ExamSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamSessionWhereInput;
    orderBy?: Prisma.ExamSessionOrderByWithRelationInput | Prisma.ExamSessionOrderByWithRelationInput[];
    cursor?: Prisma.ExamSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExamSessionCountAggregateInputType;
    _avg?: ExamSessionAvgAggregateInputType;
    _sum?: ExamSessionSumAggregateInputType;
    _min?: ExamSessionMinAggregateInputType;
    _max?: ExamSessionMaxAggregateInputType;
};
export type GetExamSessionAggregateType<T extends ExamSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateExamSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExamSession[P]> : Prisma.GetScalarType<T[P], AggregateExamSession[P]>;
};
export type ExamSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamSessionWhereInput;
    orderBy?: Prisma.ExamSessionOrderByWithAggregationInput | Prisma.ExamSessionOrderByWithAggregationInput[];
    by: Prisma.ExamSessionScalarFieldEnum[] | Prisma.ExamSessionScalarFieldEnum;
    having?: Prisma.ExamSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExamSessionCountAggregateInputType | true;
    _avg?: ExamSessionAvgAggregateInputType;
    _sum?: ExamSessionSumAggregateInputType;
    _min?: ExamSessionMinAggregateInputType;
    _max?: ExamSessionMaxAggregateInputType;
};
export type ExamSessionGroupByOutputType = {
    id: string;
    userId: string;
    tryoutCatalogId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: runtime.JsonValue;
    startedAt: Date;
    submittedAt: Date | null;
    expiresAt: Date;
    durationSeconds: number | null;
    tabSwitchCount: number;
    createdAt: Date;
    updatedAt: Date;
    _count: ExamSessionCountAggregateOutputType | null;
    _avg: ExamSessionAvgAggregateOutputType | null;
    _sum: ExamSessionSumAggregateOutputType | null;
    _min: ExamSessionMinAggregateOutputType | null;
    _max: ExamSessionMaxAggregateOutputType | null;
};
export type GetExamSessionGroupByPayload<T extends ExamSessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExamSessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExamSessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExamSessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExamSessionGroupByOutputType[P]>;
}>>;
export type ExamSessionWhereInput = {
    AND?: Prisma.ExamSessionWhereInput | Prisma.ExamSessionWhereInput[];
    OR?: Prisma.ExamSessionWhereInput[];
    NOT?: Prisma.ExamSessionWhereInput | Prisma.ExamSessionWhereInput[];
    id?: Prisma.StringFilter<"ExamSession"> | string;
    userId?: Prisma.StringFilter<"ExamSession"> | string;
    tryoutCatalogId?: Prisma.StringFilter<"ExamSession"> | string;
    status?: Prisma.EnumExamSessionStatusFilter<"ExamSession"> | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFilter<"ExamSession"> | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonFilter<"ExamSession">;
    startedAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    submittedAt?: Prisma.DateTimeNullableFilter<"ExamSession"> | Date | string | null;
    expiresAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    durationSeconds?: Prisma.IntNullableFilter<"ExamSession"> | number | null;
    tabSwitchCount?: Prisma.IntFilter<"ExamSession"> | number;
    createdAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    tryoutCatalog?: Prisma.XOR<Prisma.TryoutCatalogScalarRelationFilter, Prisma.TryoutCatalogWhereInput>;
    questions?: Prisma.ExamSessionQuestionListRelationFilter;
    answers?: Prisma.ExamAnswerListRelationFilter;
    result?: Prisma.XOR<Prisma.ExamResultNullableScalarRelationFilter, Prisma.ExamResultWhereInput> | null;
    integrityLogs?: Prisma.ExamIntegrityLogListRelationFilter;
};
export type ExamSessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generationModeSnapshot?: Prisma.SortOrder;
    tryoutSnapshot?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrderInput | Prisma.SortOrder;
    tabSwitchCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    tryoutCatalog?: Prisma.TryoutCatalogOrderByWithRelationInput;
    questions?: Prisma.ExamSessionQuestionOrderByRelationAggregateInput;
    answers?: Prisma.ExamAnswerOrderByRelationAggregateInput;
    result?: Prisma.ExamResultOrderByWithRelationInput;
    integrityLogs?: Prisma.ExamIntegrityLogOrderByRelationAggregateInput;
};
export type ExamSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ExamSessionWhereInput | Prisma.ExamSessionWhereInput[];
    OR?: Prisma.ExamSessionWhereInput[];
    NOT?: Prisma.ExamSessionWhereInput | Prisma.ExamSessionWhereInput[];
    userId?: Prisma.StringFilter<"ExamSession"> | string;
    tryoutCatalogId?: Prisma.StringFilter<"ExamSession"> | string;
    status?: Prisma.EnumExamSessionStatusFilter<"ExamSession"> | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFilter<"ExamSession"> | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonFilter<"ExamSession">;
    startedAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    submittedAt?: Prisma.DateTimeNullableFilter<"ExamSession"> | Date | string | null;
    expiresAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    durationSeconds?: Prisma.IntNullableFilter<"ExamSession"> | number | null;
    tabSwitchCount?: Prisma.IntFilter<"ExamSession"> | number;
    createdAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    tryoutCatalog?: Prisma.XOR<Prisma.TryoutCatalogScalarRelationFilter, Prisma.TryoutCatalogWhereInput>;
    questions?: Prisma.ExamSessionQuestionListRelationFilter;
    answers?: Prisma.ExamAnswerListRelationFilter;
    result?: Prisma.XOR<Prisma.ExamResultNullableScalarRelationFilter, Prisma.ExamResultWhereInput> | null;
    integrityLogs?: Prisma.ExamIntegrityLogListRelationFilter;
}, "id">;
export type ExamSessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generationModeSnapshot?: Prisma.SortOrder;
    tryoutSnapshot?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrderInput | Prisma.SortOrder;
    tabSwitchCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ExamSessionCountOrderByAggregateInput;
    _avg?: Prisma.ExamSessionAvgOrderByAggregateInput;
    _max?: Prisma.ExamSessionMaxOrderByAggregateInput;
    _min?: Prisma.ExamSessionMinOrderByAggregateInput;
    _sum?: Prisma.ExamSessionSumOrderByAggregateInput;
};
export type ExamSessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExamSessionScalarWhereWithAggregatesInput | Prisma.ExamSessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExamSessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExamSessionScalarWhereWithAggregatesInput | Prisma.ExamSessionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ExamSession"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ExamSession"> | string;
    tryoutCatalogId?: Prisma.StringWithAggregatesFilter<"ExamSession"> | string;
    status?: Prisma.EnumExamSessionStatusWithAggregatesFilter<"ExamSession"> | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeWithAggregatesFilter<"ExamSession"> | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonWithAggregatesFilter<"ExamSession">;
    startedAt?: Prisma.DateTimeWithAggregatesFilter<"ExamSession"> | Date | string;
    submittedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ExamSession"> | Date | string | null;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"ExamSession"> | Date | string;
    durationSeconds?: Prisma.IntNullableWithAggregatesFilter<"ExamSession"> | number | null;
    tabSwitchCount?: Prisma.IntWithAggregatesFilter<"ExamSession"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ExamSession"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ExamSession"> | Date | string;
};
export type ExamSessionCreateInput = {
    id?: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExamSessionsInput;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutExamSessionsInput;
    questions?: Prisma.ExamSessionQuestionCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionUncheckedCreateInput = {
    id?: string;
    userId: string;
    tryoutCatalogId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultUncheckedCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExamSessionsNestedInput;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutExamSessionsNestedInput;
    questions?: Prisma.ExamSessionQuestionUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUncheckedUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionCreateManyInput = {
    id?: string;
    userId: string;
    tryoutCatalogId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ExamSessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamSessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamSessionListRelationFilter = {
    every?: Prisma.ExamSessionWhereInput;
    some?: Prisma.ExamSessionWhereInput;
    none?: Prisma.ExamSessionWhereInput;
};
export type ExamSessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExamSessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generationModeSnapshot?: Prisma.SortOrder;
    tryoutSnapshot?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
    tabSwitchCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ExamSessionAvgOrderByAggregateInput = {
    durationSeconds?: Prisma.SortOrder;
    tabSwitchCount?: Prisma.SortOrder;
};
export type ExamSessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generationModeSnapshot?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
    tabSwitchCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ExamSessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generationModeSnapshot?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
    tabSwitchCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ExamSessionSumOrderByAggregateInput = {
    durationSeconds?: Prisma.SortOrder;
    tabSwitchCount?: Prisma.SortOrder;
};
export type ExamSessionScalarRelationFilter = {
    is?: Prisma.ExamSessionWhereInput;
    isNot?: Prisma.ExamSessionWhereInput;
};
export type ExamSessionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutUserInput, Prisma.ExamSessionUncheckedCreateWithoutUserInput> | Prisma.ExamSessionCreateWithoutUserInput[] | Prisma.ExamSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutUserInput | Prisma.ExamSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExamSessionCreateManyUserInputEnvelope;
    connect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
};
export type ExamSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutUserInput, Prisma.ExamSessionUncheckedCreateWithoutUserInput> | Prisma.ExamSessionCreateWithoutUserInput[] | Prisma.ExamSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutUserInput | Prisma.ExamSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExamSessionCreateManyUserInputEnvelope;
    connect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
};
export type ExamSessionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutUserInput, Prisma.ExamSessionUncheckedCreateWithoutUserInput> | Prisma.ExamSessionCreateWithoutUserInput[] | Prisma.ExamSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutUserInput | Prisma.ExamSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExamSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.ExamSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExamSessionCreateManyUserInputEnvelope;
    set?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    disconnect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    delete?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    connect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    update?: Prisma.ExamSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.ExamSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExamSessionUpdateManyWithWhereWithoutUserInput | Prisma.ExamSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExamSessionScalarWhereInput | Prisma.ExamSessionScalarWhereInput[];
};
export type ExamSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutUserInput, Prisma.ExamSessionUncheckedCreateWithoutUserInput> | Prisma.ExamSessionCreateWithoutUserInput[] | Prisma.ExamSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutUserInput | Prisma.ExamSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExamSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.ExamSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExamSessionCreateManyUserInputEnvelope;
    set?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    disconnect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    delete?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    connect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    update?: Prisma.ExamSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.ExamSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExamSessionUpdateManyWithWhereWithoutUserInput | Prisma.ExamSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExamSessionScalarWhereInput | Prisma.ExamSessionScalarWhereInput[];
};
export type ExamSessionCreateNestedManyWithoutTryoutCatalogInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutTryoutCatalogInput, Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput> | Prisma.ExamSessionCreateWithoutTryoutCatalogInput[] | Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput[];
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutTryoutCatalogInput | Prisma.ExamSessionCreateOrConnectWithoutTryoutCatalogInput[];
    createMany?: Prisma.ExamSessionCreateManyTryoutCatalogInputEnvelope;
    connect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
};
export type ExamSessionUncheckedCreateNestedManyWithoutTryoutCatalogInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutTryoutCatalogInput, Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput> | Prisma.ExamSessionCreateWithoutTryoutCatalogInput[] | Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput[];
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutTryoutCatalogInput | Prisma.ExamSessionCreateOrConnectWithoutTryoutCatalogInput[];
    createMany?: Prisma.ExamSessionCreateManyTryoutCatalogInputEnvelope;
    connect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
};
export type ExamSessionUpdateManyWithoutTryoutCatalogNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutTryoutCatalogInput, Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput> | Prisma.ExamSessionCreateWithoutTryoutCatalogInput[] | Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput[];
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutTryoutCatalogInput | Prisma.ExamSessionCreateOrConnectWithoutTryoutCatalogInput[];
    upsert?: Prisma.ExamSessionUpsertWithWhereUniqueWithoutTryoutCatalogInput | Prisma.ExamSessionUpsertWithWhereUniqueWithoutTryoutCatalogInput[];
    createMany?: Prisma.ExamSessionCreateManyTryoutCatalogInputEnvelope;
    set?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    disconnect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    delete?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    connect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    update?: Prisma.ExamSessionUpdateWithWhereUniqueWithoutTryoutCatalogInput | Prisma.ExamSessionUpdateWithWhereUniqueWithoutTryoutCatalogInput[];
    updateMany?: Prisma.ExamSessionUpdateManyWithWhereWithoutTryoutCatalogInput | Prisma.ExamSessionUpdateManyWithWhereWithoutTryoutCatalogInput[];
    deleteMany?: Prisma.ExamSessionScalarWhereInput | Prisma.ExamSessionScalarWhereInput[];
};
export type ExamSessionUncheckedUpdateManyWithoutTryoutCatalogNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutTryoutCatalogInput, Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput> | Prisma.ExamSessionCreateWithoutTryoutCatalogInput[] | Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput[];
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutTryoutCatalogInput | Prisma.ExamSessionCreateOrConnectWithoutTryoutCatalogInput[];
    upsert?: Prisma.ExamSessionUpsertWithWhereUniqueWithoutTryoutCatalogInput | Prisma.ExamSessionUpsertWithWhereUniqueWithoutTryoutCatalogInput[];
    createMany?: Prisma.ExamSessionCreateManyTryoutCatalogInputEnvelope;
    set?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    disconnect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    delete?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    connect?: Prisma.ExamSessionWhereUniqueInput | Prisma.ExamSessionWhereUniqueInput[];
    update?: Prisma.ExamSessionUpdateWithWhereUniqueWithoutTryoutCatalogInput | Prisma.ExamSessionUpdateWithWhereUniqueWithoutTryoutCatalogInput[];
    updateMany?: Prisma.ExamSessionUpdateManyWithWhereWithoutTryoutCatalogInput | Prisma.ExamSessionUpdateManyWithWhereWithoutTryoutCatalogInput[];
    deleteMany?: Prisma.ExamSessionScalarWhereInput | Prisma.ExamSessionScalarWhereInput[];
};
export type EnumExamSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExamSessionStatus;
};
export type ExamSessionCreateNestedOneWithoutQuestionsInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutQuestionsInput, Prisma.ExamSessionUncheckedCreateWithoutQuestionsInput>;
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutQuestionsInput;
    connect?: Prisma.ExamSessionWhereUniqueInput;
};
export type ExamSessionUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutQuestionsInput, Prisma.ExamSessionUncheckedCreateWithoutQuestionsInput>;
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutQuestionsInput;
    upsert?: Prisma.ExamSessionUpsertWithoutQuestionsInput;
    connect?: Prisma.ExamSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExamSessionUpdateToOneWithWhereWithoutQuestionsInput, Prisma.ExamSessionUpdateWithoutQuestionsInput>, Prisma.ExamSessionUncheckedUpdateWithoutQuestionsInput>;
};
export type ExamSessionCreateNestedOneWithoutAnswersInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutAnswersInput, Prisma.ExamSessionUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutAnswersInput;
    connect?: Prisma.ExamSessionWhereUniqueInput;
};
export type ExamSessionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutAnswersInput, Prisma.ExamSessionUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutAnswersInput;
    upsert?: Prisma.ExamSessionUpsertWithoutAnswersInput;
    connect?: Prisma.ExamSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExamSessionUpdateToOneWithWhereWithoutAnswersInput, Prisma.ExamSessionUpdateWithoutAnswersInput>, Prisma.ExamSessionUncheckedUpdateWithoutAnswersInput>;
};
export type ExamSessionCreateNestedOneWithoutResultInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutResultInput, Prisma.ExamSessionUncheckedCreateWithoutResultInput>;
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutResultInput;
    connect?: Prisma.ExamSessionWhereUniqueInput;
};
export type ExamSessionUpdateOneRequiredWithoutResultNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutResultInput, Prisma.ExamSessionUncheckedCreateWithoutResultInput>;
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutResultInput;
    upsert?: Prisma.ExamSessionUpsertWithoutResultInput;
    connect?: Prisma.ExamSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExamSessionUpdateToOneWithWhereWithoutResultInput, Prisma.ExamSessionUpdateWithoutResultInput>, Prisma.ExamSessionUncheckedUpdateWithoutResultInput>;
};
export type ExamSessionCreateNestedOneWithoutIntegrityLogsInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutIntegrityLogsInput, Prisma.ExamSessionUncheckedCreateWithoutIntegrityLogsInput>;
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutIntegrityLogsInput;
    connect?: Prisma.ExamSessionWhereUniqueInput;
};
export type ExamSessionUpdateOneRequiredWithoutIntegrityLogsNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionCreateWithoutIntegrityLogsInput, Prisma.ExamSessionUncheckedCreateWithoutIntegrityLogsInput>;
    connectOrCreate?: Prisma.ExamSessionCreateOrConnectWithoutIntegrityLogsInput;
    upsert?: Prisma.ExamSessionUpsertWithoutIntegrityLogsInput;
    connect?: Prisma.ExamSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExamSessionUpdateToOneWithWhereWithoutIntegrityLogsInput, Prisma.ExamSessionUpdateWithoutIntegrityLogsInput>, Prisma.ExamSessionUncheckedUpdateWithoutIntegrityLogsInput>;
};
export type ExamSessionCreateWithoutUserInput = {
    id?: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutExamSessionsInput;
    questions?: Prisma.ExamSessionQuestionCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionUncheckedCreateWithoutUserInput = {
    id?: string;
    tryoutCatalogId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultUncheckedCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionCreateOrConnectWithoutUserInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutUserInput, Prisma.ExamSessionUncheckedCreateWithoutUserInput>;
};
export type ExamSessionCreateManyUserInputEnvelope = {
    data: Prisma.ExamSessionCreateManyUserInput | Prisma.ExamSessionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ExamSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamSessionUpdateWithoutUserInput, Prisma.ExamSessionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutUserInput, Prisma.ExamSessionUncheckedCreateWithoutUserInput>;
};
export type ExamSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamSessionUpdateWithoutUserInput, Prisma.ExamSessionUncheckedUpdateWithoutUserInput>;
};
export type ExamSessionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ExamSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamSessionUpdateManyMutationInput, Prisma.ExamSessionUncheckedUpdateManyWithoutUserInput>;
};
export type ExamSessionScalarWhereInput = {
    AND?: Prisma.ExamSessionScalarWhereInput | Prisma.ExamSessionScalarWhereInput[];
    OR?: Prisma.ExamSessionScalarWhereInput[];
    NOT?: Prisma.ExamSessionScalarWhereInput | Prisma.ExamSessionScalarWhereInput[];
    id?: Prisma.StringFilter<"ExamSession"> | string;
    userId?: Prisma.StringFilter<"ExamSession"> | string;
    tryoutCatalogId?: Prisma.StringFilter<"ExamSession"> | string;
    status?: Prisma.EnumExamSessionStatusFilter<"ExamSession"> | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFilter<"ExamSession"> | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonFilter<"ExamSession">;
    startedAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    submittedAt?: Prisma.DateTimeNullableFilter<"ExamSession"> | Date | string | null;
    expiresAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    durationSeconds?: Prisma.IntNullableFilter<"ExamSession"> | number | null;
    tabSwitchCount?: Prisma.IntFilter<"ExamSession"> | number;
    createdAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ExamSession"> | Date | string;
};
export type ExamSessionCreateWithoutTryoutCatalogInput = {
    id?: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExamSessionsInput;
    questions?: Prisma.ExamSessionQuestionCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionUncheckedCreateWithoutTryoutCatalogInput = {
    id?: string;
    userId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultUncheckedCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionCreateOrConnectWithoutTryoutCatalogInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutTryoutCatalogInput, Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput>;
};
export type ExamSessionCreateManyTryoutCatalogInputEnvelope = {
    data: Prisma.ExamSessionCreateManyTryoutCatalogInput | Prisma.ExamSessionCreateManyTryoutCatalogInput[];
    skipDuplicates?: boolean;
};
export type ExamSessionUpsertWithWhereUniqueWithoutTryoutCatalogInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamSessionUpdateWithoutTryoutCatalogInput, Prisma.ExamSessionUncheckedUpdateWithoutTryoutCatalogInput>;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutTryoutCatalogInput, Prisma.ExamSessionUncheckedCreateWithoutTryoutCatalogInput>;
};
export type ExamSessionUpdateWithWhereUniqueWithoutTryoutCatalogInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamSessionUpdateWithoutTryoutCatalogInput, Prisma.ExamSessionUncheckedUpdateWithoutTryoutCatalogInput>;
};
export type ExamSessionUpdateManyWithWhereWithoutTryoutCatalogInput = {
    where: Prisma.ExamSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamSessionUpdateManyMutationInput, Prisma.ExamSessionUncheckedUpdateManyWithoutTryoutCatalogInput>;
};
export type ExamSessionCreateWithoutQuestionsInput = {
    id?: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExamSessionsInput;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutExamSessionsInput;
    answers?: Prisma.ExamAnswerCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionUncheckedCreateWithoutQuestionsInput = {
    id?: string;
    userId: string;
    tryoutCatalogId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    answers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultUncheckedCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionCreateOrConnectWithoutQuestionsInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutQuestionsInput, Prisma.ExamSessionUncheckedCreateWithoutQuestionsInput>;
};
export type ExamSessionUpsertWithoutQuestionsInput = {
    update: Prisma.XOR<Prisma.ExamSessionUpdateWithoutQuestionsInput, Prisma.ExamSessionUncheckedUpdateWithoutQuestionsInput>;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutQuestionsInput, Prisma.ExamSessionUncheckedCreateWithoutQuestionsInput>;
    where?: Prisma.ExamSessionWhereInput;
};
export type ExamSessionUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: Prisma.ExamSessionWhereInput;
    data: Prisma.XOR<Prisma.ExamSessionUpdateWithoutQuestionsInput, Prisma.ExamSessionUncheckedUpdateWithoutQuestionsInput>;
};
export type ExamSessionUpdateWithoutQuestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExamSessionsNestedInput;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutExamSessionsNestedInput;
    answers?: Prisma.ExamAnswerUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionUncheckedUpdateWithoutQuestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUncheckedUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionCreateWithoutAnswersInput = {
    id?: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExamSessionsInput;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutExamSessionsInput;
    questions?: Prisma.ExamSessionQuestionCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionUncheckedCreateWithoutAnswersInput = {
    id?: string;
    userId: string;
    tryoutCatalogId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultUncheckedCreateNestedOneWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionCreateOrConnectWithoutAnswersInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutAnswersInput, Prisma.ExamSessionUncheckedCreateWithoutAnswersInput>;
};
export type ExamSessionUpsertWithoutAnswersInput = {
    update: Prisma.XOR<Prisma.ExamSessionUpdateWithoutAnswersInput, Prisma.ExamSessionUncheckedUpdateWithoutAnswersInput>;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutAnswersInput, Prisma.ExamSessionUncheckedCreateWithoutAnswersInput>;
    where?: Prisma.ExamSessionWhereInput;
};
export type ExamSessionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: Prisma.ExamSessionWhereInput;
    data: Prisma.XOR<Prisma.ExamSessionUpdateWithoutAnswersInput, Prisma.ExamSessionUncheckedUpdateWithoutAnswersInput>;
};
export type ExamSessionUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExamSessionsNestedInput;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutExamSessionsNestedInput;
    questions?: Prisma.ExamSessionQuestionUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionUncheckedUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUncheckedUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionCreateWithoutResultInput = {
    id?: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExamSessionsInput;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutExamSessionsInput;
    questions?: Prisma.ExamSessionQuestionCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerCreateNestedManyWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionUncheckedCreateWithoutResultInput = {
    id?: string;
    userId: string;
    tryoutCatalogId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutExamSessionInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedCreateNestedManyWithoutExamSessionInput;
};
export type ExamSessionCreateOrConnectWithoutResultInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutResultInput, Prisma.ExamSessionUncheckedCreateWithoutResultInput>;
};
export type ExamSessionUpsertWithoutResultInput = {
    update: Prisma.XOR<Prisma.ExamSessionUpdateWithoutResultInput, Prisma.ExamSessionUncheckedUpdateWithoutResultInput>;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutResultInput, Prisma.ExamSessionUncheckedCreateWithoutResultInput>;
    where?: Prisma.ExamSessionWhereInput;
};
export type ExamSessionUpdateToOneWithWhereWithoutResultInput = {
    where?: Prisma.ExamSessionWhereInput;
    data: Prisma.XOR<Prisma.ExamSessionUpdateWithoutResultInput, Prisma.ExamSessionUncheckedUpdateWithoutResultInput>;
};
export type ExamSessionUpdateWithoutResultInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExamSessionsNestedInput;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutExamSessionsNestedInput;
    questions?: Prisma.ExamSessionQuestionUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUpdateManyWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionUncheckedUpdateWithoutResultInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionCreateWithoutIntegrityLogsInput = {
    id?: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExamSessionsInput;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutExamSessionsInput;
    questions?: Prisma.ExamSessionQuestionCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultCreateNestedOneWithoutExamSessionInput;
};
export type ExamSessionUncheckedCreateWithoutIntegrityLogsInput = {
    id?: string;
    userId: string;
    tryoutCatalogId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedCreateNestedManyWithoutExamSessionInput;
    answers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutExamSessionInput;
    result?: Prisma.ExamResultUncheckedCreateNestedOneWithoutExamSessionInput;
};
export type ExamSessionCreateOrConnectWithoutIntegrityLogsInput = {
    where: Prisma.ExamSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutIntegrityLogsInput, Prisma.ExamSessionUncheckedCreateWithoutIntegrityLogsInput>;
};
export type ExamSessionUpsertWithoutIntegrityLogsInput = {
    update: Prisma.XOR<Prisma.ExamSessionUpdateWithoutIntegrityLogsInput, Prisma.ExamSessionUncheckedUpdateWithoutIntegrityLogsInput>;
    create: Prisma.XOR<Prisma.ExamSessionCreateWithoutIntegrityLogsInput, Prisma.ExamSessionUncheckedCreateWithoutIntegrityLogsInput>;
    where?: Prisma.ExamSessionWhereInput;
};
export type ExamSessionUpdateToOneWithWhereWithoutIntegrityLogsInput = {
    where?: Prisma.ExamSessionWhereInput;
    data: Prisma.XOR<Prisma.ExamSessionUpdateWithoutIntegrityLogsInput, Prisma.ExamSessionUncheckedUpdateWithoutIntegrityLogsInput>;
};
export type ExamSessionUpdateWithoutIntegrityLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExamSessionsNestedInput;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutExamSessionsNestedInput;
    questions?: Prisma.ExamSessionQuestionUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUpdateOneWithoutExamSessionNestedInput;
};
export type ExamSessionUncheckedUpdateWithoutIntegrityLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUncheckedUpdateOneWithoutExamSessionNestedInput;
};
export type ExamSessionCreateManyUserInput = {
    id?: string;
    tryoutCatalogId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ExamSessionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutExamSessionsNestedInput;
    questions?: Prisma.ExamSessionQuestionUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUncheckedUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamSessionCreateManyTryoutCatalogInput = {
    id?: string;
    userId: string;
    status: $Enums.ExamSessionStatus;
    generationModeSnapshot: $Enums.RandomizationMode;
    tryoutSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    expiresAt: Date | string;
    durationSeconds?: number | null;
    tabSwitchCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ExamSessionUpdateWithoutTryoutCatalogInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExamSessionsNestedInput;
    questions?: Prisma.ExamSessionQuestionUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionUncheckedUpdateWithoutTryoutCatalogInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.ExamSessionQuestionUncheckedUpdateManyWithoutExamSessionNestedInput;
    answers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionNestedInput;
    result?: Prisma.ExamResultUncheckedUpdateOneWithoutExamSessionNestedInput;
    integrityLogs?: Prisma.ExamIntegrityLogUncheckedUpdateManyWithoutExamSessionNestedInput;
};
export type ExamSessionUncheckedUpdateManyWithoutTryoutCatalogInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumExamSessionStatusFieldUpdateOperationsInput | $Enums.ExamSessionStatus;
    generationModeSnapshot?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    tryoutSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tabSwitchCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamSessionCountOutputType = {
    questions: number;
    answers: number;
    integrityLogs: number;
};
export type ExamSessionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    questions?: boolean | ExamSessionCountOutputTypeCountQuestionsArgs;
    answers?: boolean | ExamSessionCountOutputTypeCountAnswersArgs;
    integrityLogs?: boolean | ExamSessionCountOutputTypeCountIntegrityLogsArgs;
};
export type ExamSessionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionCountOutputTypeSelect<ExtArgs> | null;
};
export type ExamSessionCountOutputTypeCountQuestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamSessionQuestionWhereInput;
};
export type ExamSessionCountOutputTypeCountAnswersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamAnswerWhereInput;
};
export type ExamSessionCountOutputTypeCountIntegrityLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamIntegrityLogWhereInput;
};
export type ExamSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tryoutCatalogId?: boolean;
    status?: boolean;
    generationModeSnapshot?: boolean;
    tryoutSnapshot?: boolean;
    startedAt?: boolean;
    submittedAt?: boolean;
    expiresAt?: boolean;
    durationSeconds?: boolean;
    tabSwitchCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    questions?: boolean | Prisma.ExamSession$questionsArgs<ExtArgs>;
    answers?: boolean | Prisma.ExamSession$answersArgs<ExtArgs>;
    result?: boolean | Prisma.ExamSession$resultArgs<ExtArgs>;
    integrityLogs?: boolean | Prisma.ExamSession$integrityLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ExamSessionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examSession"]>;
export type ExamSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tryoutCatalogId?: boolean;
    status?: boolean;
    generationModeSnapshot?: boolean;
    tryoutSnapshot?: boolean;
    startedAt?: boolean;
    submittedAt?: boolean;
    expiresAt?: boolean;
    durationSeconds?: boolean;
    tabSwitchCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examSession"]>;
export type ExamSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tryoutCatalogId?: boolean;
    status?: boolean;
    generationModeSnapshot?: boolean;
    tryoutSnapshot?: boolean;
    startedAt?: boolean;
    submittedAt?: boolean;
    expiresAt?: boolean;
    durationSeconds?: boolean;
    tabSwitchCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examSession"]>;
export type ExamSessionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    tryoutCatalogId?: boolean;
    status?: boolean;
    generationModeSnapshot?: boolean;
    tryoutSnapshot?: boolean;
    startedAt?: boolean;
    submittedAt?: boolean;
    expiresAt?: boolean;
    durationSeconds?: boolean;
    tabSwitchCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ExamSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "tryoutCatalogId" | "status" | "generationModeSnapshot" | "tryoutSnapshot" | "startedAt" | "submittedAt" | "expiresAt" | "durationSeconds" | "tabSwitchCount" | "createdAt" | "updatedAt", ExtArgs["result"]["examSession"]>;
export type ExamSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    questions?: boolean | Prisma.ExamSession$questionsArgs<ExtArgs>;
    answers?: boolean | Prisma.ExamSession$answersArgs<ExtArgs>;
    result?: boolean | Prisma.ExamSession$resultArgs<ExtArgs>;
    integrityLogs?: boolean | Prisma.ExamSession$integrityLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ExamSessionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ExamSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
};
export type ExamSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
};
export type $ExamSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ExamSession";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        tryoutCatalog: Prisma.$TryoutCatalogPayload<ExtArgs>;
        questions: Prisma.$ExamSessionQuestionPayload<ExtArgs>[];
        answers: Prisma.$ExamAnswerPayload<ExtArgs>[];
        result: Prisma.$ExamResultPayload<ExtArgs> | null;
        integrityLogs: Prisma.$ExamIntegrityLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        tryoutCatalogId: string;
        status: $Enums.ExamSessionStatus;
        generationModeSnapshot: $Enums.RandomizationMode;
        tryoutSnapshot: runtime.JsonValue;
        startedAt: Date;
        submittedAt: Date | null;
        expiresAt: Date;
        durationSeconds: number | null;
        tabSwitchCount: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["examSession"]>;
    composites: {};
};
export type ExamSessionGetPayload<S extends boolean | null | undefined | ExamSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload, S>;
export type ExamSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExamSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExamSessionCountAggregateInputType | true;
};
export interface ExamSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ExamSession'];
        meta: {
            name: 'ExamSession';
        };
    };
    findUnique<T extends ExamSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, ExamSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExamSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExamSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExamSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, ExamSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExamSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExamSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExamSessionFindManyArgs>(args?: Prisma.SelectSubset<T, ExamSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExamSessionCreateArgs>(args: Prisma.SelectSubset<T, ExamSessionCreateArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExamSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, ExamSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExamSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExamSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExamSessionDeleteArgs>(args: Prisma.SelectSubset<T, ExamSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExamSessionUpdateArgs>(args: Prisma.SelectSubset<T, ExamSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExamSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExamSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExamSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, ExamSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExamSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExamSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExamSessionUpsertArgs>(args: Prisma.SelectSubset<T, ExamSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExamSessionCountArgs>(args?: Prisma.Subset<T, ExamSessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExamSessionCountAggregateOutputType> : number>;
    aggregate<T extends ExamSessionAggregateArgs>(args: Prisma.Subset<T, ExamSessionAggregateArgs>): Prisma.PrismaPromise<GetExamSessionAggregateType<T>>;
    groupBy<T extends ExamSessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExamSessionGroupByArgs['orderBy'];
    } : {
        orderBy?: ExamSessionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExamSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExamSessionFieldRefs;
}
export interface Prisma__ExamSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tryoutCatalog<T extends Prisma.TryoutCatalogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TryoutCatalogDefaultArgs<ExtArgs>>): Prisma.Prisma__TryoutCatalogClient<runtime.Types.Result.GetResult<Prisma.$TryoutCatalogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    questions<T extends Prisma.ExamSession$questionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamSession$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    answers<T extends Prisma.ExamSession$answersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamSession$answersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    result<T extends Prisma.ExamSession$resultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamSession$resultArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    integrityLogs<T extends Prisma.ExamSession$integrityLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamSession$integrityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExamSessionFieldRefs {
    readonly id: Prisma.FieldRef<"ExamSession", 'String'>;
    readonly userId: Prisma.FieldRef<"ExamSession", 'String'>;
    readonly tryoutCatalogId: Prisma.FieldRef<"ExamSession", 'String'>;
    readonly status: Prisma.FieldRef<"ExamSession", 'ExamSessionStatus'>;
    readonly generationModeSnapshot: Prisma.FieldRef<"ExamSession", 'RandomizationMode'>;
    readonly tryoutSnapshot: Prisma.FieldRef<"ExamSession", 'Json'>;
    readonly startedAt: Prisma.FieldRef<"ExamSession", 'DateTime'>;
    readonly submittedAt: Prisma.FieldRef<"ExamSession", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"ExamSession", 'DateTime'>;
    readonly durationSeconds: Prisma.FieldRef<"ExamSession", 'Int'>;
    readonly tabSwitchCount: Prisma.FieldRef<"ExamSession", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"ExamSession", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ExamSession", 'DateTime'>;
}
export type ExamSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
    where: Prisma.ExamSessionWhereUniqueInput;
};
export type ExamSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
    where: Prisma.ExamSessionWhereUniqueInput;
};
export type ExamSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
    where?: Prisma.ExamSessionWhereInput;
    orderBy?: Prisma.ExamSessionOrderByWithRelationInput | Prisma.ExamSessionOrderByWithRelationInput[];
    cursor?: Prisma.ExamSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamSessionScalarFieldEnum | Prisma.ExamSessionScalarFieldEnum[];
};
export type ExamSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
    where?: Prisma.ExamSessionWhereInput;
    orderBy?: Prisma.ExamSessionOrderByWithRelationInput | Prisma.ExamSessionOrderByWithRelationInput[];
    cursor?: Prisma.ExamSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamSessionScalarFieldEnum | Prisma.ExamSessionScalarFieldEnum[];
};
export type ExamSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
    where?: Prisma.ExamSessionWhereInput;
    orderBy?: Prisma.ExamSessionOrderByWithRelationInput | Prisma.ExamSessionOrderByWithRelationInput[];
    cursor?: Prisma.ExamSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamSessionScalarFieldEnum | Prisma.ExamSessionScalarFieldEnum[];
};
export type ExamSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamSessionCreateInput, Prisma.ExamSessionUncheckedCreateInput>;
};
export type ExamSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExamSessionCreateManyInput | Prisma.ExamSessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExamSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    data: Prisma.ExamSessionCreateManyInput | Prisma.ExamSessionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ExamSessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ExamSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamSessionUpdateInput, Prisma.ExamSessionUncheckedUpdateInput>;
    where: Prisma.ExamSessionWhereUniqueInput;
};
export type ExamSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExamSessionUpdateManyMutationInput, Prisma.ExamSessionUncheckedUpdateManyInput>;
    where?: Prisma.ExamSessionWhereInput;
    limit?: number;
};
export type ExamSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamSessionUpdateManyMutationInput, Prisma.ExamSessionUncheckedUpdateManyInput>;
    where?: Prisma.ExamSessionWhereInput;
    limit?: number;
    include?: Prisma.ExamSessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ExamSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
    where: Prisma.ExamSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionCreateInput, Prisma.ExamSessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExamSessionUpdateInput, Prisma.ExamSessionUncheckedUpdateInput>;
};
export type ExamSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
    where: Prisma.ExamSessionWhereUniqueInput;
};
export type ExamSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamSessionWhereInput;
    limit?: number;
};
export type ExamSession$questionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionQuestionInclude<ExtArgs> | null;
    where?: Prisma.ExamSessionQuestionWhereInput;
    orderBy?: Prisma.ExamSessionQuestionOrderByWithRelationInput | Prisma.ExamSessionQuestionOrderByWithRelationInput[];
    cursor?: Prisma.ExamSessionQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamSessionQuestionScalarFieldEnum | Prisma.ExamSessionQuestionScalarFieldEnum[];
};
export type ExamSession$answersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    include?: Prisma.ExamAnswerInclude<ExtArgs> | null;
    where?: Prisma.ExamAnswerWhereInput;
    orderBy?: Prisma.ExamAnswerOrderByWithRelationInput | Prisma.ExamAnswerOrderByWithRelationInput[];
    cursor?: Prisma.ExamAnswerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamAnswerScalarFieldEnum | Prisma.ExamAnswerScalarFieldEnum[];
};
export type ExamSession$resultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    where?: Prisma.ExamResultWhereInput;
};
export type ExamSession$integrityLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    where?: Prisma.ExamIntegrityLogWhereInput;
    orderBy?: Prisma.ExamIntegrityLogOrderByWithRelationInput | Prisma.ExamIntegrityLogOrderByWithRelationInput[];
    cursor?: Prisma.ExamIntegrityLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamIntegrityLogScalarFieldEnum | Prisma.ExamIntegrityLogScalarFieldEnum[];
};
export type ExamSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionInclude<ExtArgs> | null;
};
