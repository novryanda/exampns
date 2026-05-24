import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TryoutRuleSectionModel = runtime.Types.Result.DefaultSelection<Prisma.$TryoutRuleSectionPayload>;
export type AggregateTryoutRuleSection = {
    _count: TryoutRuleSectionCountAggregateOutputType | null;
    _avg: TryoutRuleSectionAvgAggregateOutputType | null;
    _sum: TryoutRuleSectionSumAggregateOutputType | null;
    _min: TryoutRuleSectionMinAggregateOutputType | null;
    _max: TryoutRuleSectionMaxAggregateOutputType | null;
};
export type TryoutRuleSectionAvgAggregateOutputType = {
    questionCount: number | null;
    sortOrder: number | null;
};
export type TryoutRuleSectionSumAggregateOutputType = {
    questionCount: number | null;
    sortOrder: number | null;
};
export type TryoutRuleSectionMinAggregateOutputType = {
    id: string | null;
    tryoutGenerationRuleId: string | null;
    category: $Enums.QuestionCategory | null;
    questionCount: number | null;
    sortOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TryoutRuleSectionMaxAggregateOutputType = {
    id: string | null;
    tryoutGenerationRuleId: string | null;
    category: $Enums.QuestionCategory | null;
    questionCount: number | null;
    sortOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TryoutRuleSectionCountAggregateOutputType = {
    id: number;
    tryoutGenerationRuleId: number;
    category: number;
    questionCount: number;
    difficultyDistributionJson: number;
    topicDistributionJson: number;
    sortOrder: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TryoutRuleSectionAvgAggregateInputType = {
    questionCount?: true;
    sortOrder?: true;
};
export type TryoutRuleSectionSumAggregateInputType = {
    questionCount?: true;
    sortOrder?: true;
};
export type TryoutRuleSectionMinAggregateInputType = {
    id?: true;
    tryoutGenerationRuleId?: true;
    category?: true;
    questionCount?: true;
    sortOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TryoutRuleSectionMaxAggregateInputType = {
    id?: true;
    tryoutGenerationRuleId?: true;
    category?: true;
    questionCount?: true;
    sortOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TryoutRuleSectionCountAggregateInputType = {
    id?: true;
    tryoutGenerationRuleId?: true;
    category?: true;
    questionCount?: true;
    difficultyDistributionJson?: true;
    topicDistributionJson?: true;
    sortOrder?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TryoutRuleSectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TryoutRuleSectionWhereInput;
    orderBy?: Prisma.TryoutRuleSectionOrderByWithRelationInput | Prisma.TryoutRuleSectionOrderByWithRelationInput[];
    cursor?: Prisma.TryoutRuleSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TryoutRuleSectionCountAggregateInputType;
    _avg?: TryoutRuleSectionAvgAggregateInputType;
    _sum?: TryoutRuleSectionSumAggregateInputType;
    _min?: TryoutRuleSectionMinAggregateInputType;
    _max?: TryoutRuleSectionMaxAggregateInputType;
};
export type GetTryoutRuleSectionAggregateType<T extends TryoutRuleSectionAggregateArgs> = {
    [P in keyof T & keyof AggregateTryoutRuleSection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTryoutRuleSection[P]> : Prisma.GetScalarType<T[P], AggregateTryoutRuleSection[P]>;
};
export type TryoutRuleSectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TryoutRuleSectionWhereInput;
    orderBy?: Prisma.TryoutRuleSectionOrderByWithAggregationInput | Prisma.TryoutRuleSectionOrderByWithAggregationInput[];
    by: Prisma.TryoutRuleSectionScalarFieldEnum[] | Prisma.TryoutRuleSectionScalarFieldEnum;
    having?: Prisma.TryoutRuleSectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TryoutRuleSectionCountAggregateInputType | true;
    _avg?: TryoutRuleSectionAvgAggregateInputType;
    _sum?: TryoutRuleSectionSumAggregateInputType;
    _min?: TryoutRuleSectionMinAggregateInputType;
    _max?: TryoutRuleSectionMaxAggregateInputType;
};
export type TryoutRuleSectionGroupByOutputType = {
    id: string;
    tryoutGenerationRuleId: string;
    category: $Enums.QuestionCategory;
    questionCount: number;
    difficultyDistributionJson: runtime.JsonValue | null;
    topicDistributionJson: runtime.JsonValue | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    _count: TryoutRuleSectionCountAggregateOutputType | null;
    _avg: TryoutRuleSectionAvgAggregateOutputType | null;
    _sum: TryoutRuleSectionSumAggregateOutputType | null;
    _min: TryoutRuleSectionMinAggregateOutputType | null;
    _max: TryoutRuleSectionMaxAggregateOutputType | null;
};
export type GetTryoutRuleSectionGroupByPayload<T extends TryoutRuleSectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TryoutRuleSectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TryoutRuleSectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TryoutRuleSectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TryoutRuleSectionGroupByOutputType[P]>;
}>>;
export type TryoutRuleSectionWhereInput = {
    AND?: Prisma.TryoutRuleSectionWhereInput | Prisma.TryoutRuleSectionWhereInput[];
    OR?: Prisma.TryoutRuleSectionWhereInput[];
    NOT?: Prisma.TryoutRuleSectionWhereInput | Prisma.TryoutRuleSectionWhereInput[];
    id?: Prisma.StringFilter<"TryoutRuleSection"> | string;
    tryoutGenerationRuleId?: Prisma.StringFilter<"TryoutRuleSection"> | string;
    category?: Prisma.EnumQuestionCategoryFilter<"TryoutRuleSection"> | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFilter<"TryoutRuleSection"> | number;
    difficultyDistributionJson?: Prisma.JsonNullableFilter<"TryoutRuleSection">;
    topicDistributionJson?: Prisma.JsonNullableFilter<"TryoutRuleSection">;
    sortOrder?: Prisma.IntFilter<"TryoutRuleSection"> | number;
    createdAt?: Prisma.DateTimeFilter<"TryoutRuleSection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TryoutRuleSection"> | Date | string;
    tryoutGenerationRule?: Prisma.XOR<Prisma.TryoutGenerationRuleScalarRelationFilter, Prisma.TryoutGenerationRuleWhereInput>;
};
export type TryoutRuleSectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tryoutGenerationRuleId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    questionCount?: Prisma.SortOrder;
    difficultyDistributionJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    topicDistributionJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tryoutGenerationRule?: Prisma.TryoutGenerationRuleOrderByWithRelationInput;
};
export type TryoutRuleSectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TryoutRuleSectionWhereInput | Prisma.TryoutRuleSectionWhereInput[];
    OR?: Prisma.TryoutRuleSectionWhereInput[];
    NOT?: Prisma.TryoutRuleSectionWhereInput | Prisma.TryoutRuleSectionWhereInput[];
    tryoutGenerationRuleId?: Prisma.StringFilter<"TryoutRuleSection"> | string;
    category?: Prisma.EnumQuestionCategoryFilter<"TryoutRuleSection"> | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFilter<"TryoutRuleSection"> | number;
    difficultyDistributionJson?: Prisma.JsonNullableFilter<"TryoutRuleSection">;
    topicDistributionJson?: Prisma.JsonNullableFilter<"TryoutRuleSection">;
    sortOrder?: Prisma.IntFilter<"TryoutRuleSection"> | number;
    createdAt?: Prisma.DateTimeFilter<"TryoutRuleSection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TryoutRuleSection"> | Date | string;
    tryoutGenerationRule?: Prisma.XOR<Prisma.TryoutGenerationRuleScalarRelationFilter, Prisma.TryoutGenerationRuleWhereInput>;
}, "id">;
export type TryoutRuleSectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tryoutGenerationRuleId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    questionCount?: Prisma.SortOrder;
    difficultyDistributionJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    topicDistributionJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TryoutRuleSectionCountOrderByAggregateInput;
    _avg?: Prisma.TryoutRuleSectionAvgOrderByAggregateInput;
    _max?: Prisma.TryoutRuleSectionMaxOrderByAggregateInput;
    _min?: Prisma.TryoutRuleSectionMinOrderByAggregateInput;
    _sum?: Prisma.TryoutRuleSectionSumOrderByAggregateInput;
};
export type TryoutRuleSectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.TryoutRuleSectionScalarWhereWithAggregatesInput | Prisma.TryoutRuleSectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.TryoutRuleSectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TryoutRuleSectionScalarWhereWithAggregatesInput | Prisma.TryoutRuleSectionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TryoutRuleSection"> | string;
    tryoutGenerationRuleId?: Prisma.StringWithAggregatesFilter<"TryoutRuleSection"> | string;
    category?: Prisma.EnumQuestionCategoryWithAggregatesFilter<"TryoutRuleSection"> | $Enums.QuestionCategory;
    questionCount?: Prisma.IntWithAggregatesFilter<"TryoutRuleSection"> | number;
    difficultyDistributionJson?: Prisma.JsonNullableWithAggregatesFilter<"TryoutRuleSection">;
    topicDistributionJson?: Prisma.JsonNullableWithAggregatesFilter<"TryoutRuleSection">;
    sortOrder?: Prisma.IntWithAggregatesFilter<"TryoutRuleSection"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TryoutRuleSection"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TryoutRuleSection"> | Date | string;
};
export type TryoutRuleSectionCreateInput = {
    id?: string;
    category: $Enums.QuestionCategory;
    questionCount: number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutGenerationRule: Prisma.TryoutGenerationRuleCreateNestedOneWithoutSectionsInput;
};
export type TryoutRuleSectionUncheckedCreateInput = {
    id?: string;
    tryoutGenerationRuleId: string;
    category: $Enums.QuestionCategory;
    questionCount: number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TryoutRuleSectionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutGenerationRule?: Prisma.TryoutGenerationRuleUpdateOneRequiredWithoutSectionsNestedInput;
};
export type TryoutRuleSectionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutGenerationRuleId?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TryoutRuleSectionCreateManyInput = {
    id?: string;
    tryoutGenerationRuleId: string;
    category: $Enums.QuestionCategory;
    questionCount: number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TryoutRuleSectionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TryoutRuleSectionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutGenerationRuleId?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TryoutRuleSectionListRelationFilter = {
    every?: Prisma.TryoutRuleSectionWhereInput;
    some?: Prisma.TryoutRuleSectionWhereInput;
    none?: Prisma.TryoutRuleSectionWhereInput;
};
export type TryoutRuleSectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TryoutRuleSectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tryoutGenerationRuleId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    questionCount?: Prisma.SortOrder;
    difficultyDistributionJson?: Prisma.SortOrder;
    topicDistributionJson?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TryoutRuleSectionAvgOrderByAggregateInput = {
    questionCount?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type TryoutRuleSectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tryoutGenerationRuleId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    questionCount?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TryoutRuleSectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tryoutGenerationRuleId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    questionCount?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TryoutRuleSectionSumOrderByAggregateInput = {
    questionCount?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type TryoutRuleSectionCreateNestedManyWithoutTryoutGenerationRuleInput = {
    create?: Prisma.XOR<Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput, Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput> | Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput[] | Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput[];
    connectOrCreate?: Prisma.TryoutRuleSectionCreateOrConnectWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionCreateOrConnectWithoutTryoutGenerationRuleInput[];
    createMany?: Prisma.TryoutRuleSectionCreateManyTryoutGenerationRuleInputEnvelope;
    connect?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
};
export type TryoutRuleSectionUncheckedCreateNestedManyWithoutTryoutGenerationRuleInput = {
    create?: Prisma.XOR<Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput, Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput> | Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput[] | Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput[];
    connectOrCreate?: Prisma.TryoutRuleSectionCreateOrConnectWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionCreateOrConnectWithoutTryoutGenerationRuleInput[];
    createMany?: Prisma.TryoutRuleSectionCreateManyTryoutGenerationRuleInputEnvelope;
    connect?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
};
export type TryoutRuleSectionUpdateManyWithoutTryoutGenerationRuleNestedInput = {
    create?: Prisma.XOR<Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput, Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput> | Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput[] | Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput[];
    connectOrCreate?: Prisma.TryoutRuleSectionCreateOrConnectWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionCreateOrConnectWithoutTryoutGenerationRuleInput[];
    upsert?: Prisma.TryoutRuleSectionUpsertWithWhereUniqueWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionUpsertWithWhereUniqueWithoutTryoutGenerationRuleInput[];
    createMany?: Prisma.TryoutRuleSectionCreateManyTryoutGenerationRuleInputEnvelope;
    set?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
    disconnect?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
    delete?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
    connect?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
    update?: Prisma.TryoutRuleSectionUpdateWithWhereUniqueWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionUpdateWithWhereUniqueWithoutTryoutGenerationRuleInput[];
    updateMany?: Prisma.TryoutRuleSectionUpdateManyWithWhereWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionUpdateManyWithWhereWithoutTryoutGenerationRuleInput[];
    deleteMany?: Prisma.TryoutRuleSectionScalarWhereInput | Prisma.TryoutRuleSectionScalarWhereInput[];
};
export type TryoutRuleSectionUncheckedUpdateManyWithoutTryoutGenerationRuleNestedInput = {
    create?: Prisma.XOR<Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput, Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput> | Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput[] | Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput[];
    connectOrCreate?: Prisma.TryoutRuleSectionCreateOrConnectWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionCreateOrConnectWithoutTryoutGenerationRuleInput[];
    upsert?: Prisma.TryoutRuleSectionUpsertWithWhereUniqueWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionUpsertWithWhereUniqueWithoutTryoutGenerationRuleInput[];
    createMany?: Prisma.TryoutRuleSectionCreateManyTryoutGenerationRuleInputEnvelope;
    set?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
    disconnect?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
    delete?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
    connect?: Prisma.TryoutRuleSectionWhereUniqueInput | Prisma.TryoutRuleSectionWhereUniqueInput[];
    update?: Prisma.TryoutRuleSectionUpdateWithWhereUniqueWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionUpdateWithWhereUniqueWithoutTryoutGenerationRuleInput[];
    updateMany?: Prisma.TryoutRuleSectionUpdateManyWithWhereWithoutTryoutGenerationRuleInput | Prisma.TryoutRuleSectionUpdateManyWithWhereWithoutTryoutGenerationRuleInput[];
    deleteMany?: Prisma.TryoutRuleSectionScalarWhereInput | Prisma.TryoutRuleSectionScalarWhereInput[];
};
export type TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput = {
    id?: string;
    category: $Enums.QuestionCategory;
    questionCount: number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput = {
    id?: string;
    category: $Enums.QuestionCategory;
    questionCount: number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TryoutRuleSectionCreateOrConnectWithoutTryoutGenerationRuleInput = {
    where: Prisma.TryoutRuleSectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput, Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput>;
};
export type TryoutRuleSectionCreateManyTryoutGenerationRuleInputEnvelope = {
    data: Prisma.TryoutRuleSectionCreateManyTryoutGenerationRuleInput | Prisma.TryoutRuleSectionCreateManyTryoutGenerationRuleInput[];
    skipDuplicates?: boolean;
};
export type TryoutRuleSectionUpsertWithWhereUniqueWithoutTryoutGenerationRuleInput = {
    where: Prisma.TryoutRuleSectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.TryoutRuleSectionUpdateWithoutTryoutGenerationRuleInput, Prisma.TryoutRuleSectionUncheckedUpdateWithoutTryoutGenerationRuleInput>;
    create: Prisma.XOR<Prisma.TryoutRuleSectionCreateWithoutTryoutGenerationRuleInput, Prisma.TryoutRuleSectionUncheckedCreateWithoutTryoutGenerationRuleInput>;
};
export type TryoutRuleSectionUpdateWithWhereUniqueWithoutTryoutGenerationRuleInput = {
    where: Prisma.TryoutRuleSectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.TryoutRuleSectionUpdateWithoutTryoutGenerationRuleInput, Prisma.TryoutRuleSectionUncheckedUpdateWithoutTryoutGenerationRuleInput>;
};
export type TryoutRuleSectionUpdateManyWithWhereWithoutTryoutGenerationRuleInput = {
    where: Prisma.TryoutRuleSectionScalarWhereInput;
    data: Prisma.XOR<Prisma.TryoutRuleSectionUpdateManyMutationInput, Prisma.TryoutRuleSectionUncheckedUpdateManyWithoutTryoutGenerationRuleInput>;
};
export type TryoutRuleSectionScalarWhereInput = {
    AND?: Prisma.TryoutRuleSectionScalarWhereInput | Prisma.TryoutRuleSectionScalarWhereInput[];
    OR?: Prisma.TryoutRuleSectionScalarWhereInput[];
    NOT?: Prisma.TryoutRuleSectionScalarWhereInput | Prisma.TryoutRuleSectionScalarWhereInput[];
    id?: Prisma.StringFilter<"TryoutRuleSection"> | string;
    tryoutGenerationRuleId?: Prisma.StringFilter<"TryoutRuleSection"> | string;
    category?: Prisma.EnumQuestionCategoryFilter<"TryoutRuleSection"> | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFilter<"TryoutRuleSection"> | number;
    difficultyDistributionJson?: Prisma.JsonNullableFilter<"TryoutRuleSection">;
    topicDistributionJson?: Prisma.JsonNullableFilter<"TryoutRuleSection">;
    sortOrder?: Prisma.IntFilter<"TryoutRuleSection"> | number;
    createdAt?: Prisma.DateTimeFilter<"TryoutRuleSection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TryoutRuleSection"> | Date | string;
};
export type TryoutRuleSectionCreateManyTryoutGenerationRuleInput = {
    id?: string;
    category: $Enums.QuestionCategory;
    questionCount: number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TryoutRuleSectionUpdateWithoutTryoutGenerationRuleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TryoutRuleSectionUncheckedUpdateWithoutTryoutGenerationRuleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TryoutRuleSectionUncheckedUpdateManyWithoutTryoutGenerationRuleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    questionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    difficultyDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    topicDistributionJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TryoutRuleSectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tryoutGenerationRuleId?: boolean;
    category?: boolean;
    questionCount?: boolean;
    difficultyDistributionJson?: boolean;
    topicDistributionJson?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutGenerationRule?: boolean | Prisma.TryoutGenerationRuleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tryoutRuleSection"]>;
export type TryoutRuleSectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tryoutGenerationRuleId?: boolean;
    category?: boolean;
    questionCount?: boolean;
    difficultyDistributionJson?: boolean;
    topicDistributionJson?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutGenerationRule?: boolean | Prisma.TryoutGenerationRuleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tryoutRuleSection"]>;
export type TryoutRuleSectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tryoutGenerationRuleId?: boolean;
    category?: boolean;
    questionCount?: boolean;
    difficultyDistributionJson?: boolean;
    topicDistributionJson?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutGenerationRule?: boolean | Prisma.TryoutGenerationRuleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tryoutRuleSection"]>;
export type TryoutRuleSectionSelectScalar = {
    id?: boolean;
    tryoutGenerationRuleId?: boolean;
    category?: boolean;
    questionCount?: boolean;
    difficultyDistributionJson?: boolean;
    topicDistributionJson?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TryoutRuleSectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tryoutGenerationRuleId" | "category" | "questionCount" | "difficultyDistributionJson" | "topicDistributionJson" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["tryoutRuleSection"]>;
export type TryoutRuleSectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutGenerationRule?: boolean | Prisma.TryoutGenerationRuleDefaultArgs<ExtArgs>;
};
export type TryoutRuleSectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutGenerationRule?: boolean | Prisma.TryoutGenerationRuleDefaultArgs<ExtArgs>;
};
export type TryoutRuleSectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutGenerationRule?: boolean | Prisma.TryoutGenerationRuleDefaultArgs<ExtArgs>;
};
export type $TryoutRuleSectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TryoutRuleSection";
    objects: {
        tryoutGenerationRule: Prisma.$TryoutGenerationRulePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tryoutGenerationRuleId: string;
        category: $Enums.QuestionCategory;
        questionCount: number;
        difficultyDistributionJson: runtime.JsonValue | null;
        topicDistributionJson: runtime.JsonValue | null;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["tryoutRuleSection"]>;
    composites: {};
};
export type TryoutRuleSectionGetPayload<S extends boolean | null | undefined | TryoutRuleSectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload, S>;
export type TryoutRuleSectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TryoutRuleSectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TryoutRuleSectionCountAggregateInputType | true;
};
export interface TryoutRuleSectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TryoutRuleSection'];
        meta: {
            name: 'TryoutRuleSection';
        };
    };
    findUnique<T extends TryoutRuleSectionFindUniqueArgs>(args: Prisma.SelectSubset<T, TryoutRuleSectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TryoutRuleSectionClient<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TryoutRuleSectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TryoutRuleSectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TryoutRuleSectionClient<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TryoutRuleSectionFindFirstArgs>(args?: Prisma.SelectSubset<T, TryoutRuleSectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__TryoutRuleSectionClient<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TryoutRuleSectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TryoutRuleSectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TryoutRuleSectionClient<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TryoutRuleSectionFindManyArgs>(args?: Prisma.SelectSubset<T, TryoutRuleSectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TryoutRuleSectionCreateArgs>(args: Prisma.SelectSubset<T, TryoutRuleSectionCreateArgs<ExtArgs>>): Prisma.Prisma__TryoutRuleSectionClient<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TryoutRuleSectionCreateManyArgs>(args?: Prisma.SelectSubset<T, TryoutRuleSectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TryoutRuleSectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TryoutRuleSectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TryoutRuleSectionDeleteArgs>(args: Prisma.SelectSubset<T, TryoutRuleSectionDeleteArgs<ExtArgs>>): Prisma.Prisma__TryoutRuleSectionClient<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TryoutRuleSectionUpdateArgs>(args: Prisma.SelectSubset<T, TryoutRuleSectionUpdateArgs<ExtArgs>>): Prisma.Prisma__TryoutRuleSectionClient<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TryoutRuleSectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, TryoutRuleSectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TryoutRuleSectionUpdateManyArgs>(args: Prisma.SelectSubset<T, TryoutRuleSectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TryoutRuleSectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TryoutRuleSectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TryoutRuleSectionUpsertArgs>(args: Prisma.SelectSubset<T, TryoutRuleSectionUpsertArgs<ExtArgs>>): Prisma.Prisma__TryoutRuleSectionClient<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TryoutRuleSectionCountArgs>(args?: Prisma.Subset<T, TryoutRuleSectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TryoutRuleSectionCountAggregateOutputType> : number>;
    aggregate<T extends TryoutRuleSectionAggregateArgs>(args: Prisma.Subset<T, TryoutRuleSectionAggregateArgs>): Prisma.PrismaPromise<GetTryoutRuleSectionAggregateType<T>>;
    groupBy<T extends TryoutRuleSectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TryoutRuleSectionGroupByArgs['orderBy'];
    } : {
        orderBy?: TryoutRuleSectionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TryoutRuleSectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTryoutRuleSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TryoutRuleSectionFieldRefs;
}
export interface Prisma__TryoutRuleSectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tryoutGenerationRule<T extends Prisma.TryoutGenerationRuleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TryoutGenerationRuleDefaultArgs<ExtArgs>>): Prisma.Prisma__TryoutGenerationRuleClient<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TryoutRuleSectionFieldRefs {
    readonly id: Prisma.FieldRef<"TryoutRuleSection", 'String'>;
    readonly tryoutGenerationRuleId: Prisma.FieldRef<"TryoutRuleSection", 'String'>;
    readonly category: Prisma.FieldRef<"TryoutRuleSection", 'QuestionCategory'>;
    readonly questionCount: Prisma.FieldRef<"TryoutRuleSection", 'Int'>;
    readonly difficultyDistributionJson: Prisma.FieldRef<"TryoutRuleSection", 'Json'>;
    readonly topicDistributionJson: Prisma.FieldRef<"TryoutRuleSection", 'Json'>;
    readonly sortOrder: Prisma.FieldRef<"TryoutRuleSection", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"TryoutRuleSection", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TryoutRuleSection", 'DateTime'>;
}
export type TryoutRuleSectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
    where: Prisma.TryoutRuleSectionWhereUniqueInput;
};
export type TryoutRuleSectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
    where: Prisma.TryoutRuleSectionWhereUniqueInput;
};
export type TryoutRuleSectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
    where?: Prisma.TryoutRuleSectionWhereInput;
    orderBy?: Prisma.TryoutRuleSectionOrderByWithRelationInput | Prisma.TryoutRuleSectionOrderByWithRelationInput[];
    cursor?: Prisma.TryoutRuleSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TryoutRuleSectionScalarFieldEnum | Prisma.TryoutRuleSectionScalarFieldEnum[];
};
export type TryoutRuleSectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
    where?: Prisma.TryoutRuleSectionWhereInput;
    orderBy?: Prisma.TryoutRuleSectionOrderByWithRelationInput | Prisma.TryoutRuleSectionOrderByWithRelationInput[];
    cursor?: Prisma.TryoutRuleSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TryoutRuleSectionScalarFieldEnum | Prisma.TryoutRuleSectionScalarFieldEnum[];
};
export type TryoutRuleSectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
    where?: Prisma.TryoutRuleSectionWhereInput;
    orderBy?: Prisma.TryoutRuleSectionOrderByWithRelationInput | Prisma.TryoutRuleSectionOrderByWithRelationInput[];
    cursor?: Prisma.TryoutRuleSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TryoutRuleSectionScalarFieldEnum | Prisma.TryoutRuleSectionScalarFieldEnum[];
};
export type TryoutRuleSectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TryoutRuleSectionCreateInput, Prisma.TryoutRuleSectionUncheckedCreateInput>;
};
export type TryoutRuleSectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TryoutRuleSectionCreateManyInput | Prisma.TryoutRuleSectionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TryoutRuleSectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    data: Prisma.TryoutRuleSectionCreateManyInput | Prisma.TryoutRuleSectionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TryoutRuleSectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TryoutRuleSectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TryoutRuleSectionUpdateInput, Prisma.TryoutRuleSectionUncheckedUpdateInput>;
    where: Prisma.TryoutRuleSectionWhereUniqueInput;
};
export type TryoutRuleSectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TryoutRuleSectionUpdateManyMutationInput, Prisma.TryoutRuleSectionUncheckedUpdateManyInput>;
    where?: Prisma.TryoutRuleSectionWhereInput;
    limit?: number;
};
export type TryoutRuleSectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TryoutRuleSectionUpdateManyMutationInput, Prisma.TryoutRuleSectionUncheckedUpdateManyInput>;
    where?: Prisma.TryoutRuleSectionWhereInput;
    limit?: number;
    include?: Prisma.TryoutRuleSectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TryoutRuleSectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
    where: Prisma.TryoutRuleSectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TryoutRuleSectionCreateInput, Prisma.TryoutRuleSectionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TryoutRuleSectionUpdateInput, Prisma.TryoutRuleSectionUncheckedUpdateInput>;
};
export type TryoutRuleSectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
    where: Prisma.TryoutRuleSectionWhereUniqueInput;
};
export type TryoutRuleSectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TryoutRuleSectionWhereInput;
    limit?: number;
};
export type TryoutRuleSectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutRuleSectionSelect<ExtArgs> | null;
    omit?: Prisma.TryoutRuleSectionOmit<ExtArgs> | null;
    include?: Prisma.TryoutRuleSectionInclude<ExtArgs> | null;
};
