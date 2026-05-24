import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AIRecommendationModel = runtime.Types.Result.DefaultSelection<Prisma.$AIRecommendationPayload>;
export type AggregateAIRecommendation = {
    _count: AIRecommendationCountAggregateOutputType | null;
    _min: AIRecommendationMinAggregateOutputType | null;
    _max: AIRecommendationMaxAggregateOutputType | null;
};
export type AIRecommendationMinAggregateOutputType = {
    id: string | null;
    examResultId: string | null;
    status: $Enums.AIRecommendationStatus | null;
    summary: string | null;
    overallAssessment: string | null;
    nextTryoutStrategy: string | null;
    isFallback: boolean | null;
    modelName: string | null;
    errorMessage: string | null;
    generatedAt: Date | null;
    createdAt: Date | null;
};
export type AIRecommendationMaxAggregateOutputType = {
    id: string | null;
    examResultId: string | null;
    status: $Enums.AIRecommendationStatus | null;
    summary: string | null;
    overallAssessment: string | null;
    nextTryoutStrategy: string | null;
    isFallback: boolean | null;
    modelName: string | null;
    errorMessage: string | null;
    generatedAt: Date | null;
    createdAt: Date | null;
};
export type AIRecommendationCountAggregateOutputType = {
    id: number;
    examResultId: number;
    status: number;
    summary: number;
    overallAssessment: number;
    nextTryoutStrategy: number;
    rawRequestPayload: number;
    rawAiResponse: number;
    isFallback: number;
    modelName: number;
    errorMessage: number;
    generatedAt: number;
    createdAt: number;
    _all: number;
};
export type AIRecommendationMinAggregateInputType = {
    id?: true;
    examResultId?: true;
    status?: true;
    summary?: true;
    overallAssessment?: true;
    nextTryoutStrategy?: true;
    isFallback?: true;
    modelName?: true;
    errorMessage?: true;
    generatedAt?: true;
    createdAt?: true;
};
export type AIRecommendationMaxAggregateInputType = {
    id?: true;
    examResultId?: true;
    status?: true;
    summary?: true;
    overallAssessment?: true;
    nextTryoutStrategy?: true;
    isFallback?: true;
    modelName?: true;
    errorMessage?: true;
    generatedAt?: true;
    createdAt?: true;
};
export type AIRecommendationCountAggregateInputType = {
    id?: true;
    examResultId?: true;
    status?: true;
    summary?: true;
    overallAssessment?: true;
    nextTryoutStrategy?: true;
    rawRequestPayload?: true;
    rawAiResponse?: true;
    isFallback?: true;
    modelName?: true;
    errorMessage?: true;
    generatedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type AIRecommendationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AIRecommendationWhereInput;
    orderBy?: Prisma.AIRecommendationOrderByWithRelationInput | Prisma.AIRecommendationOrderByWithRelationInput[];
    cursor?: Prisma.AIRecommendationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AIRecommendationCountAggregateInputType;
    _min?: AIRecommendationMinAggregateInputType;
    _max?: AIRecommendationMaxAggregateInputType;
};
export type GetAIRecommendationAggregateType<T extends AIRecommendationAggregateArgs> = {
    [P in keyof T & keyof AggregateAIRecommendation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAIRecommendation[P]> : Prisma.GetScalarType<T[P], AggregateAIRecommendation[P]>;
};
export type AIRecommendationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AIRecommendationWhereInput;
    orderBy?: Prisma.AIRecommendationOrderByWithAggregationInput | Prisma.AIRecommendationOrderByWithAggregationInput[];
    by: Prisma.AIRecommendationScalarFieldEnum[] | Prisma.AIRecommendationScalarFieldEnum;
    having?: Prisma.AIRecommendationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AIRecommendationCountAggregateInputType | true;
    _min?: AIRecommendationMinAggregateInputType;
    _max?: AIRecommendationMaxAggregateInputType;
};
export type AIRecommendationGroupByOutputType = {
    id: string;
    examResultId: string;
    status: $Enums.AIRecommendationStatus;
    summary: string | null;
    overallAssessment: string | null;
    nextTryoutStrategy: string | null;
    rawRequestPayload: runtime.JsonValue | null;
    rawAiResponse: runtime.JsonValue | null;
    isFallback: boolean;
    modelName: string | null;
    errorMessage: string | null;
    generatedAt: Date | null;
    createdAt: Date;
    _count: AIRecommendationCountAggregateOutputType | null;
    _min: AIRecommendationMinAggregateOutputType | null;
    _max: AIRecommendationMaxAggregateOutputType | null;
};
export type GetAIRecommendationGroupByPayload<T extends AIRecommendationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AIRecommendationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AIRecommendationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AIRecommendationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AIRecommendationGroupByOutputType[P]>;
}>>;
export type AIRecommendationWhereInput = {
    AND?: Prisma.AIRecommendationWhereInput | Prisma.AIRecommendationWhereInput[];
    OR?: Prisma.AIRecommendationWhereInput[];
    NOT?: Prisma.AIRecommendationWhereInput | Prisma.AIRecommendationWhereInput[];
    id?: Prisma.StringFilter<"AIRecommendation"> | string;
    examResultId?: Prisma.StringFilter<"AIRecommendation"> | string;
    status?: Prisma.EnumAIRecommendationStatusFilter<"AIRecommendation"> | $Enums.AIRecommendationStatus;
    summary?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    overallAssessment?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    nextTryoutStrategy?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    rawRequestPayload?: Prisma.JsonNullableFilter<"AIRecommendation">;
    rawAiResponse?: Prisma.JsonNullableFilter<"AIRecommendation">;
    isFallback?: Prisma.BoolFilter<"AIRecommendation"> | boolean;
    modelName?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    errorMessage?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    generatedAt?: Prisma.DateTimeNullableFilter<"AIRecommendation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"AIRecommendation"> | Date | string;
    examResult?: Prisma.XOR<Prisma.ExamResultScalarRelationFilter, Prisma.ExamResultWhereInput>;
    items?: Prisma.AIRecommendationItemListRelationFilter;
};
export type AIRecommendationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    examResultId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    overallAssessment?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextTryoutStrategy?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawRequestPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawAiResponse?: Prisma.SortOrderInput | Prisma.SortOrder;
    isFallback?: Prisma.SortOrder;
    modelName?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    generatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    examResult?: Prisma.ExamResultOrderByWithRelationInput;
    items?: Prisma.AIRecommendationItemOrderByRelationAggregateInput;
};
export type AIRecommendationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AIRecommendationWhereInput | Prisma.AIRecommendationWhereInput[];
    OR?: Prisma.AIRecommendationWhereInput[];
    NOT?: Prisma.AIRecommendationWhereInput | Prisma.AIRecommendationWhereInput[];
    examResultId?: Prisma.StringFilter<"AIRecommendation"> | string;
    status?: Prisma.EnumAIRecommendationStatusFilter<"AIRecommendation"> | $Enums.AIRecommendationStatus;
    summary?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    overallAssessment?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    nextTryoutStrategy?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    rawRequestPayload?: Prisma.JsonNullableFilter<"AIRecommendation">;
    rawAiResponse?: Prisma.JsonNullableFilter<"AIRecommendation">;
    isFallback?: Prisma.BoolFilter<"AIRecommendation"> | boolean;
    modelName?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    errorMessage?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    generatedAt?: Prisma.DateTimeNullableFilter<"AIRecommendation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"AIRecommendation"> | Date | string;
    examResult?: Prisma.XOR<Prisma.ExamResultScalarRelationFilter, Prisma.ExamResultWhereInput>;
    items?: Prisma.AIRecommendationItemListRelationFilter;
}, "id">;
export type AIRecommendationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    examResultId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    overallAssessment?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextTryoutStrategy?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawRequestPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawAiResponse?: Prisma.SortOrderInput | Prisma.SortOrder;
    isFallback?: Prisma.SortOrder;
    modelName?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    generatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AIRecommendationCountOrderByAggregateInput;
    _max?: Prisma.AIRecommendationMaxOrderByAggregateInput;
    _min?: Prisma.AIRecommendationMinOrderByAggregateInput;
};
export type AIRecommendationScalarWhereWithAggregatesInput = {
    AND?: Prisma.AIRecommendationScalarWhereWithAggregatesInput | Prisma.AIRecommendationScalarWhereWithAggregatesInput[];
    OR?: Prisma.AIRecommendationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AIRecommendationScalarWhereWithAggregatesInput | Prisma.AIRecommendationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AIRecommendation"> | string;
    examResultId?: Prisma.StringWithAggregatesFilter<"AIRecommendation"> | string;
    status?: Prisma.EnumAIRecommendationStatusWithAggregatesFilter<"AIRecommendation"> | $Enums.AIRecommendationStatus;
    summary?: Prisma.StringNullableWithAggregatesFilter<"AIRecommendation"> | string | null;
    overallAssessment?: Prisma.StringNullableWithAggregatesFilter<"AIRecommendation"> | string | null;
    nextTryoutStrategy?: Prisma.StringNullableWithAggregatesFilter<"AIRecommendation"> | string | null;
    rawRequestPayload?: Prisma.JsonNullableWithAggregatesFilter<"AIRecommendation">;
    rawAiResponse?: Prisma.JsonNullableWithAggregatesFilter<"AIRecommendation">;
    isFallback?: Prisma.BoolWithAggregatesFilter<"AIRecommendation"> | boolean;
    modelName?: Prisma.StringNullableWithAggregatesFilter<"AIRecommendation"> | string | null;
    errorMessage?: Prisma.StringNullableWithAggregatesFilter<"AIRecommendation"> | string | null;
    generatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"AIRecommendation"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AIRecommendation"> | Date | string;
};
export type AIRecommendationCreateInput = {
    id?: string;
    status: $Enums.AIRecommendationStatus;
    summary?: string | null;
    overallAssessment?: string | null;
    nextTryoutStrategy?: string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: boolean;
    modelName?: string | null;
    errorMessage?: string | null;
    generatedAt?: Date | string | null;
    createdAt?: Date | string;
    examResult: Prisma.ExamResultCreateNestedOneWithoutAiRecommendationsInput;
    items?: Prisma.AIRecommendationItemCreateNestedManyWithoutAiRecommendationInput;
};
export type AIRecommendationUncheckedCreateInput = {
    id?: string;
    examResultId: string;
    status: $Enums.AIRecommendationStatus;
    summary?: string | null;
    overallAssessment?: string | null;
    nextTryoutStrategy?: string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: boolean;
    modelName?: string | null;
    errorMessage?: string | null;
    generatedAt?: Date | string | null;
    createdAt?: Date | string;
    items?: Prisma.AIRecommendationItemUncheckedCreateNestedManyWithoutAiRecommendationInput;
};
export type AIRecommendationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAIRecommendationStatusFieldUpdateOperationsInput | $Enums.AIRecommendationStatus;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    overallAssessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextTryoutStrategy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    modelName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examResult?: Prisma.ExamResultUpdateOneRequiredWithoutAiRecommendationsNestedInput;
    items?: Prisma.AIRecommendationItemUpdateManyWithoutAiRecommendationNestedInput;
};
export type AIRecommendationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examResultId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAIRecommendationStatusFieldUpdateOperationsInput | $Enums.AIRecommendationStatus;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    overallAssessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextTryoutStrategy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    modelName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.AIRecommendationItemUncheckedUpdateManyWithoutAiRecommendationNestedInput;
};
export type AIRecommendationCreateManyInput = {
    id?: string;
    examResultId: string;
    status: $Enums.AIRecommendationStatus;
    summary?: string | null;
    overallAssessment?: string | null;
    nextTryoutStrategy?: string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: boolean;
    modelName?: string | null;
    errorMessage?: string | null;
    generatedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AIRecommendationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAIRecommendationStatusFieldUpdateOperationsInput | $Enums.AIRecommendationStatus;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    overallAssessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextTryoutStrategy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    modelName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AIRecommendationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examResultId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAIRecommendationStatusFieldUpdateOperationsInput | $Enums.AIRecommendationStatus;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    overallAssessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextTryoutStrategy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    modelName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AIRecommendationListRelationFilter = {
    every?: Prisma.AIRecommendationWhereInput;
    some?: Prisma.AIRecommendationWhereInput;
    none?: Prisma.AIRecommendationWhereInput;
};
export type AIRecommendationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AIRecommendationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examResultId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    overallAssessment?: Prisma.SortOrder;
    nextTryoutStrategy?: Prisma.SortOrder;
    rawRequestPayload?: Prisma.SortOrder;
    rawAiResponse?: Prisma.SortOrder;
    isFallback?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AIRecommendationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examResultId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    overallAssessment?: Prisma.SortOrder;
    nextTryoutStrategy?: Prisma.SortOrder;
    isFallback?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AIRecommendationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examResultId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    overallAssessment?: Prisma.SortOrder;
    nextTryoutStrategy?: Prisma.SortOrder;
    isFallback?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AIRecommendationScalarRelationFilter = {
    is?: Prisma.AIRecommendationWhereInput;
    isNot?: Prisma.AIRecommendationWhereInput;
};
export type AIRecommendationCreateNestedManyWithoutExamResultInput = {
    create?: Prisma.XOR<Prisma.AIRecommendationCreateWithoutExamResultInput, Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput> | Prisma.AIRecommendationCreateWithoutExamResultInput[] | Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput[];
    connectOrCreate?: Prisma.AIRecommendationCreateOrConnectWithoutExamResultInput | Prisma.AIRecommendationCreateOrConnectWithoutExamResultInput[];
    createMany?: Prisma.AIRecommendationCreateManyExamResultInputEnvelope;
    connect?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
};
export type AIRecommendationUncheckedCreateNestedManyWithoutExamResultInput = {
    create?: Prisma.XOR<Prisma.AIRecommendationCreateWithoutExamResultInput, Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput> | Prisma.AIRecommendationCreateWithoutExamResultInput[] | Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput[];
    connectOrCreate?: Prisma.AIRecommendationCreateOrConnectWithoutExamResultInput | Prisma.AIRecommendationCreateOrConnectWithoutExamResultInput[];
    createMany?: Prisma.AIRecommendationCreateManyExamResultInputEnvelope;
    connect?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
};
export type AIRecommendationUpdateManyWithoutExamResultNestedInput = {
    create?: Prisma.XOR<Prisma.AIRecommendationCreateWithoutExamResultInput, Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput> | Prisma.AIRecommendationCreateWithoutExamResultInput[] | Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput[];
    connectOrCreate?: Prisma.AIRecommendationCreateOrConnectWithoutExamResultInput | Prisma.AIRecommendationCreateOrConnectWithoutExamResultInput[];
    upsert?: Prisma.AIRecommendationUpsertWithWhereUniqueWithoutExamResultInput | Prisma.AIRecommendationUpsertWithWhereUniqueWithoutExamResultInput[];
    createMany?: Prisma.AIRecommendationCreateManyExamResultInputEnvelope;
    set?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
    disconnect?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
    delete?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
    connect?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
    update?: Prisma.AIRecommendationUpdateWithWhereUniqueWithoutExamResultInput | Prisma.AIRecommendationUpdateWithWhereUniqueWithoutExamResultInput[];
    updateMany?: Prisma.AIRecommendationUpdateManyWithWhereWithoutExamResultInput | Prisma.AIRecommendationUpdateManyWithWhereWithoutExamResultInput[];
    deleteMany?: Prisma.AIRecommendationScalarWhereInput | Prisma.AIRecommendationScalarWhereInput[];
};
export type AIRecommendationUncheckedUpdateManyWithoutExamResultNestedInput = {
    create?: Prisma.XOR<Prisma.AIRecommendationCreateWithoutExamResultInput, Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput> | Prisma.AIRecommendationCreateWithoutExamResultInput[] | Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput[];
    connectOrCreate?: Prisma.AIRecommendationCreateOrConnectWithoutExamResultInput | Prisma.AIRecommendationCreateOrConnectWithoutExamResultInput[];
    upsert?: Prisma.AIRecommendationUpsertWithWhereUniqueWithoutExamResultInput | Prisma.AIRecommendationUpsertWithWhereUniqueWithoutExamResultInput[];
    createMany?: Prisma.AIRecommendationCreateManyExamResultInputEnvelope;
    set?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
    disconnect?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
    delete?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
    connect?: Prisma.AIRecommendationWhereUniqueInput | Prisma.AIRecommendationWhereUniqueInput[];
    update?: Prisma.AIRecommendationUpdateWithWhereUniqueWithoutExamResultInput | Prisma.AIRecommendationUpdateWithWhereUniqueWithoutExamResultInput[];
    updateMany?: Prisma.AIRecommendationUpdateManyWithWhereWithoutExamResultInput | Prisma.AIRecommendationUpdateManyWithWhereWithoutExamResultInput[];
    deleteMany?: Prisma.AIRecommendationScalarWhereInput | Prisma.AIRecommendationScalarWhereInput[];
};
export type EnumAIRecommendationStatusFieldUpdateOperationsInput = {
    set?: $Enums.AIRecommendationStatus;
};
export type AIRecommendationCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.AIRecommendationCreateWithoutItemsInput, Prisma.AIRecommendationUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.AIRecommendationCreateOrConnectWithoutItemsInput;
    connect?: Prisma.AIRecommendationWhereUniqueInput;
};
export type AIRecommendationUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.AIRecommendationCreateWithoutItemsInput, Prisma.AIRecommendationUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.AIRecommendationCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.AIRecommendationUpsertWithoutItemsInput;
    connect?: Prisma.AIRecommendationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AIRecommendationUpdateToOneWithWhereWithoutItemsInput, Prisma.AIRecommendationUpdateWithoutItemsInput>, Prisma.AIRecommendationUncheckedUpdateWithoutItemsInput>;
};
export type AIRecommendationCreateWithoutExamResultInput = {
    id?: string;
    status: $Enums.AIRecommendationStatus;
    summary?: string | null;
    overallAssessment?: string | null;
    nextTryoutStrategy?: string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: boolean;
    modelName?: string | null;
    errorMessage?: string | null;
    generatedAt?: Date | string | null;
    createdAt?: Date | string;
    items?: Prisma.AIRecommendationItemCreateNestedManyWithoutAiRecommendationInput;
};
export type AIRecommendationUncheckedCreateWithoutExamResultInput = {
    id?: string;
    status: $Enums.AIRecommendationStatus;
    summary?: string | null;
    overallAssessment?: string | null;
    nextTryoutStrategy?: string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: boolean;
    modelName?: string | null;
    errorMessage?: string | null;
    generatedAt?: Date | string | null;
    createdAt?: Date | string;
    items?: Prisma.AIRecommendationItemUncheckedCreateNestedManyWithoutAiRecommendationInput;
};
export type AIRecommendationCreateOrConnectWithoutExamResultInput = {
    where: Prisma.AIRecommendationWhereUniqueInput;
    create: Prisma.XOR<Prisma.AIRecommendationCreateWithoutExamResultInput, Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput>;
};
export type AIRecommendationCreateManyExamResultInputEnvelope = {
    data: Prisma.AIRecommendationCreateManyExamResultInput | Prisma.AIRecommendationCreateManyExamResultInput[];
    skipDuplicates?: boolean;
};
export type AIRecommendationUpsertWithWhereUniqueWithoutExamResultInput = {
    where: Prisma.AIRecommendationWhereUniqueInput;
    update: Prisma.XOR<Prisma.AIRecommendationUpdateWithoutExamResultInput, Prisma.AIRecommendationUncheckedUpdateWithoutExamResultInput>;
    create: Prisma.XOR<Prisma.AIRecommendationCreateWithoutExamResultInput, Prisma.AIRecommendationUncheckedCreateWithoutExamResultInput>;
};
export type AIRecommendationUpdateWithWhereUniqueWithoutExamResultInput = {
    where: Prisma.AIRecommendationWhereUniqueInput;
    data: Prisma.XOR<Prisma.AIRecommendationUpdateWithoutExamResultInput, Prisma.AIRecommendationUncheckedUpdateWithoutExamResultInput>;
};
export type AIRecommendationUpdateManyWithWhereWithoutExamResultInput = {
    where: Prisma.AIRecommendationScalarWhereInput;
    data: Prisma.XOR<Prisma.AIRecommendationUpdateManyMutationInput, Prisma.AIRecommendationUncheckedUpdateManyWithoutExamResultInput>;
};
export type AIRecommendationScalarWhereInput = {
    AND?: Prisma.AIRecommendationScalarWhereInput | Prisma.AIRecommendationScalarWhereInput[];
    OR?: Prisma.AIRecommendationScalarWhereInput[];
    NOT?: Prisma.AIRecommendationScalarWhereInput | Prisma.AIRecommendationScalarWhereInput[];
    id?: Prisma.StringFilter<"AIRecommendation"> | string;
    examResultId?: Prisma.StringFilter<"AIRecommendation"> | string;
    status?: Prisma.EnumAIRecommendationStatusFilter<"AIRecommendation"> | $Enums.AIRecommendationStatus;
    summary?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    overallAssessment?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    nextTryoutStrategy?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    rawRequestPayload?: Prisma.JsonNullableFilter<"AIRecommendation">;
    rawAiResponse?: Prisma.JsonNullableFilter<"AIRecommendation">;
    isFallback?: Prisma.BoolFilter<"AIRecommendation"> | boolean;
    modelName?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    errorMessage?: Prisma.StringNullableFilter<"AIRecommendation"> | string | null;
    generatedAt?: Prisma.DateTimeNullableFilter<"AIRecommendation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"AIRecommendation"> | Date | string;
};
export type AIRecommendationCreateWithoutItemsInput = {
    id?: string;
    status: $Enums.AIRecommendationStatus;
    summary?: string | null;
    overallAssessment?: string | null;
    nextTryoutStrategy?: string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: boolean;
    modelName?: string | null;
    errorMessage?: string | null;
    generatedAt?: Date | string | null;
    createdAt?: Date | string;
    examResult: Prisma.ExamResultCreateNestedOneWithoutAiRecommendationsInput;
};
export type AIRecommendationUncheckedCreateWithoutItemsInput = {
    id?: string;
    examResultId: string;
    status: $Enums.AIRecommendationStatus;
    summary?: string | null;
    overallAssessment?: string | null;
    nextTryoutStrategy?: string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: boolean;
    modelName?: string | null;
    errorMessage?: string | null;
    generatedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AIRecommendationCreateOrConnectWithoutItemsInput = {
    where: Prisma.AIRecommendationWhereUniqueInput;
    create: Prisma.XOR<Prisma.AIRecommendationCreateWithoutItemsInput, Prisma.AIRecommendationUncheckedCreateWithoutItemsInput>;
};
export type AIRecommendationUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.AIRecommendationUpdateWithoutItemsInput, Prisma.AIRecommendationUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.AIRecommendationCreateWithoutItemsInput, Prisma.AIRecommendationUncheckedCreateWithoutItemsInput>;
    where?: Prisma.AIRecommendationWhereInput;
};
export type AIRecommendationUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.AIRecommendationWhereInput;
    data: Prisma.XOR<Prisma.AIRecommendationUpdateWithoutItemsInput, Prisma.AIRecommendationUncheckedUpdateWithoutItemsInput>;
};
export type AIRecommendationUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAIRecommendationStatusFieldUpdateOperationsInput | $Enums.AIRecommendationStatus;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    overallAssessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextTryoutStrategy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    modelName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examResult?: Prisma.ExamResultUpdateOneRequiredWithoutAiRecommendationsNestedInput;
};
export type AIRecommendationUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examResultId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAIRecommendationStatusFieldUpdateOperationsInput | $Enums.AIRecommendationStatus;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    overallAssessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextTryoutStrategy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    modelName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AIRecommendationCreateManyExamResultInput = {
    id?: string;
    status: $Enums.AIRecommendationStatus;
    summary?: string | null;
    overallAssessment?: string | null;
    nextTryoutStrategy?: string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: boolean;
    modelName?: string | null;
    errorMessage?: string | null;
    generatedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AIRecommendationUpdateWithoutExamResultInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAIRecommendationStatusFieldUpdateOperationsInput | $Enums.AIRecommendationStatus;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    overallAssessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextTryoutStrategy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    modelName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.AIRecommendationItemUpdateManyWithoutAiRecommendationNestedInput;
};
export type AIRecommendationUncheckedUpdateWithoutExamResultInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAIRecommendationStatusFieldUpdateOperationsInput | $Enums.AIRecommendationStatus;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    overallAssessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextTryoutStrategy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    modelName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.AIRecommendationItemUncheckedUpdateManyWithoutAiRecommendationNestedInput;
};
export type AIRecommendationUncheckedUpdateManyWithoutExamResultInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAIRecommendationStatusFieldUpdateOperationsInput | $Enums.AIRecommendationStatus;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    overallAssessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextTryoutStrategy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rawRequestPayload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rawAiResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isFallback?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    modelName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AIRecommendationCountOutputType = {
    items: number;
};
export type AIRecommendationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | AIRecommendationCountOutputTypeCountItemsArgs;
};
export type AIRecommendationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationCountOutputTypeSelect<ExtArgs> | null;
};
export type AIRecommendationCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AIRecommendationItemWhereInput;
};
export type AIRecommendationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examResultId?: boolean;
    status?: boolean;
    summary?: boolean;
    overallAssessment?: boolean;
    nextTryoutStrategy?: boolean;
    rawRequestPayload?: boolean;
    rawAiResponse?: boolean;
    isFallback?: boolean;
    modelName?: boolean;
    errorMessage?: boolean;
    generatedAt?: boolean;
    createdAt?: boolean;
    examResult?: boolean | Prisma.ExamResultDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.AIRecommendation$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.AIRecommendationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aIRecommendation"]>;
export type AIRecommendationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examResultId?: boolean;
    status?: boolean;
    summary?: boolean;
    overallAssessment?: boolean;
    nextTryoutStrategy?: boolean;
    rawRequestPayload?: boolean;
    rawAiResponse?: boolean;
    isFallback?: boolean;
    modelName?: boolean;
    errorMessage?: boolean;
    generatedAt?: boolean;
    createdAt?: boolean;
    examResult?: boolean | Prisma.ExamResultDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aIRecommendation"]>;
export type AIRecommendationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examResultId?: boolean;
    status?: boolean;
    summary?: boolean;
    overallAssessment?: boolean;
    nextTryoutStrategy?: boolean;
    rawRequestPayload?: boolean;
    rawAiResponse?: boolean;
    isFallback?: boolean;
    modelName?: boolean;
    errorMessage?: boolean;
    generatedAt?: boolean;
    createdAt?: boolean;
    examResult?: boolean | Prisma.ExamResultDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aIRecommendation"]>;
export type AIRecommendationSelectScalar = {
    id?: boolean;
    examResultId?: boolean;
    status?: boolean;
    summary?: boolean;
    overallAssessment?: boolean;
    nextTryoutStrategy?: boolean;
    rawRequestPayload?: boolean;
    rawAiResponse?: boolean;
    isFallback?: boolean;
    modelName?: boolean;
    errorMessage?: boolean;
    generatedAt?: boolean;
    createdAt?: boolean;
};
export type AIRecommendationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "examResultId" | "status" | "summary" | "overallAssessment" | "nextTryoutStrategy" | "rawRequestPayload" | "rawAiResponse" | "isFallback" | "modelName" | "errorMessage" | "generatedAt" | "createdAt", ExtArgs["result"]["aIRecommendation"]>;
export type AIRecommendationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examResult?: boolean | Prisma.ExamResultDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.AIRecommendation$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.AIRecommendationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AIRecommendationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examResult?: boolean | Prisma.ExamResultDefaultArgs<ExtArgs>;
};
export type AIRecommendationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examResult?: boolean | Prisma.ExamResultDefaultArgs<ExtArgs>;
};
export type $AIRecommendationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AIRecommendation";
    objects: {
        examResult: Prisma.$ExamResultPayload<ExtArgs>;
        items: Prisma.$AIRecommendationItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        examResultId: string;
        status: $Enums.AIRecommendationStatus;
        summary: string | null;
        overallAssessment: string | null;
        nextTryoutStrategy: string | null;
        rawRequestPayload: runtime.JsonValue | null;
        rawAiResponse: runtime.JsonValue | null;
        isFallback: boolean;
        modelName: string | null;
        errorMessage: string | null;
        generatedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["aIRecommendation"]>;
    composites: {};
};
export type AIRecommendationGetPayload<S extends boolean | null | undefined | AIRecommendationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload, S>;
export type AIRecommendationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AIRecommendationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AIRecommendationCountAggregateInputType | true;
};
export interface AIRecommendationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AIRecommendation'];
        meta: {
            name: 'AIRecommendation';
        };
    };
    findUnique<T extends AIRecommendationFindUniqueArgs>(args: Prisma.SelectSubset<T, AIRecommendationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AIRecommendationClient<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AIRecommendationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AIRecommendationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AIRecommendationClient<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AIRecommendationFindFirstArgs>(args?: Prisma.SelectSubset<T, AIRecommendationFindFirstArgs<ExtArgs>>): Prisma.Prisma__AIRecommendationClient<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AIRecommendationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AIRecommendationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AIRecommendationClient<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AIRecommendationFindManyArgs>(args?: Prisma.SelectSubset<T, AIRecommendationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AIRecommendationCreateArgs>(args: Prisma.SelectSubset<T, AIRecommendationCreateArgs<ExtArgs>>): Prisma.Prisma__AIRecommendationClient<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AIRecommendationCreateManyArgs>(args?: Prisma.SelectSubset<T, AIRecommendationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AIRecommendationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AIRecommendationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AIRecommendationDeleteArgs>(args: Prisma.SelectSubset<T, AIRecommendationDeleteArgs<ExtArgs>>): Prisma.Prisma__AIRecommendationClient<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AIRecommendationUpdateArgs>(args: Prisma.SelectSubset<T, AIRecommendationUpdateArgs<ExtArgs>>): Prisma.Prisma__AIRecommendationClient<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AIRecommendationDeleteManyArgs>(args?: Prisma.SelectSubset<T, AIRecommendationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AIRecommendationUpdateManyArgs>(args: Prisma.SelectSubset<T, AIRecommendationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AIRecommendationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AIRecommendationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AIRecommendationUpsertArgs>(args: Prisma.SelectSubset<T, AIRecommendationUpsertArgs<ExtArgs>>): Prisma.Prisma__AIRecommendationClient<runtime.Types.Result.GetResult<Prisma.$AIRecommendationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AIRecommendationCountArgs>(args?: Prisma.Subset<T, AIRecommendationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AIRecommendationCountAggregateOutputType> : number>;
    aggregate<T extends AIRecommendationAggregateArgs>(args: Prisma.Subset<T, AIRecommendationAggregateArgs>): Prisma.PrismaPromise<GetAIRecommendationAggregateType<T>>;
    groupBy<T extends AIRecommendationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AIRecommendationGroupByArgs['orderBy'];
    } : {
        orderBy?: AIRecommendationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AIRecommendationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIRecommendationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AIRecommendationFieldRefs;
}
export interface Prisma__AIRecommendationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    examResult<T extends Prisma.ExamResultDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamResultDefaultArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.AIRecommendation$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AIRecommendation$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AIRecommendationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AIRecommendationFieldRefs {
    readonly id: Prisma.FieldRef<"AIRecommendation", 'String'>;
    readonly examResultId: Prisma.FieldRef<"AIRecommendation", 'String'>;
    readonly status: Prisma.FieldRef<"AIRecommendation", 'AIRecommendationStatus'>;
    readonly summary: Prisma.FieldRef<"AIRecommendation", 'String'>;
    readonly overallAssessment: Prisma.FieldRef<"AIRecommendation", 'String'>;
    readonly nextTryoutStrategy: Prisma.FieldRef<"AIRecommendation", 'String'>;
    readonly rawRequestPayload: Prisma.FieldRef<"AIRecommendation", 'Json'>;
    readonly rawAiResponse: Prisma.FieldRef<"AIRecommendation", 'Json'>;
    readonly isFallback: Prisma.FieldRef<"AIRecommendation", 'Boolean'>;
    readonly modelName: Prisma.FieldRef<"AIRecommendation", 'String'>;
    readonly errorMessage: Prisma.FieldRef<"AIRecommendation", 'String'>;
    readonly generatedAt: Prisma.FieldRef<"AIRecommendation", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"AIRecommendation", 'DateTime'>;
}
export type AIRecommendationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
    where: Prisma.AIRecommendationWhereUniqueInput;
};
export type AIRecommendationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
    where: Prisma.AIRecommendationWhereUniqueInput;
};
export type AIRecommendationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
    where?: Prisma.AIRecommendationWhereInput;
    orderBy?: Prisma.AIRecommendationOrderByWithRelationInput | Prisma.AIRecommendationOrderByWithRelationInput[];
    cursor?: Prisma.AIRecommendationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AIRecommendationScalarFieldEnum | Prisma.AIRecommendationScalarFieldEnum[];
};
export type AIRecommendationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
    where?: Prisma.AIRecommendationWhereInput;
    orderBy?: Prisma.AIRecommendationOrderByWithRelationInput | Prisma.AIRecommendationOrderByWithRelationInput[];
    cursor?: Prisma.AIRecommendationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AIRecommendationScalarFieldEnum | Prisma.AIRecommendationScalarFieldEnum[];
};
export type AIRecommendationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
    where?: Prisma.AIRecommendationWhereInput;
    orderBy?: Prisma.AIRecommendationOrderByWithRelationInput | Prisma.AIRecommendationOrderByWithRelationInput[];
    cursor?: Prisma.AIRecommendationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AIRecommendationScalarFieldEnum | Prisma.AIRecommendationScalarFieldEnum[];
};
export type AIRecommendationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AIRecommendationCreateInput, Prisma.AIRecommendationUncheckedCreateInput>;
};
export type AIRecommendationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AIRecommendationCreateManyInput | Prisma.AIRecommendationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AIRecommendationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    data: Prisma.AIRecommendationCreateManyInput | Prisma.AIRecommendationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AIRecommendationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AIRecommendationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AIRecommendationUpdateInput, Prisma.AIRecommendationUncheckedUpdateInput>;
    where: Prisma.AIRecommendationWhereUniqueInput;
};
export type AIRecommendationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AIRecommendationUpdateManyMutationInput, Prisma.AIRecommendationUncheckedUpdateManyInput>;
    where?: Prisma.AIRecommendationWhereInput;
    limit?: number;
};
export type AIRecommendationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AIRecommendationUpdateManyMutationInput, Prisma.AIRecommendationUncheckedUpdateManyInput>;
    where?: Prisma.AIRecommendationWhereInput;
    limit?: number;
    include?: Prisma.AIRecommendationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AIRecommendationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
    where: Prisma.AIRecommendationWhereUniqueInput;
    create: Prisma.XOR<Prisma.AIRecommendationCreateInput, Prisma.AIRecommendationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AIRecommendationUpdateInput, Prisma.AIRecommendationUncheckedUpdateInput>;
};
export type AIRecommendationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
    where: Prisma.AIRecommendationWhereUniqueInput;
};
export type AIRecommendationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AIRecommendationWhereInput;
    limit?: number;
};
export type AIRecommendation$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationItemSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationItemOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationItemInclude<ExtArgs> | null;
    where?: Prisma.AIRecommendationItemWhereInput;
    orderBy?: Prisma.AIRecommendationItemOrderByWithRelationInput | Prisma.AIRecommendationItemOrderByWithRelationInput[];
    cursor?: Prisma.AIRecommendationItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AIRecommendationItemScalarFieldEnum | Prisma.AIRecommendationItemScalarFieldEnum[];
};
export type AIRecommendationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AIRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.AIRecommendationOmit<ExtArgs> | null;
    include?: Prisma.AIRecommendationInclude<ExtArgs> | null;
};
