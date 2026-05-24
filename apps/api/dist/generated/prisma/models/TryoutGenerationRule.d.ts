import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TryoutGenerationRuleModel = runtime.Types.Result.DefaultSelection<Prisma.$TryoutGenerationRulePayload>;
export type AggregateTryoutGenerationRule = {
    _count: TryoutGenerationRuleCountAggregateOutputType | null;
    _avg: TryoutGenerationRuleAvgAggregateOutputType | null;
    _sum: TryoutGenerationRuleSumAggregateOutputType | null;
    _min: TryoutGenerationRuleMinAggregateOutputType | null;
    _max: TryoutGenerationRuleMaxAggregateOutputType | null;
};
export type TryoutGenerationRuleAvgAggregateOutputType = {
    avoidRecentExamCount: number | null;
};
export type TryoutGenerationRuleSumAggregateOutputType = {
    avoidRecentExamCount: number | null;
};
export type TryoutGenerationRuleMinAggregateOutputType = {
    id: string | null;
    tryoutCatalogId: string | null;
    randomizationMode: $Enums.RandomizationMode | null;
    questionOrderMode: $Enums.QuestionOrderMode | null;
    avoidRecentQuestions: boolean | null;
    avoidRecentExamCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TryoutGenerationRuleMaxAggregateOutputType = {
    id: string | null;
    tryoutCatalogId: string | null;
    randomizationMode: $Enums.RandomizationMode | null;
    questionOrderMode: $Enums.QuestionOrderMode | null;
    avoidRecentQuestions: boolean | null;
    avoidRecentExamCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TryoutGenerationRuleCountAggregateOutputType = {
    id: number;
    tryoutCatalogId: number;
    randomizationMode: number;
    questionOrderMode: number;
    avoidRecentQuestions: number;
    avoidRecentExamCount: number;
    rulesJson: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TryoutGenerationRuleAvgAggregateInputType = {
    avoidRecentExamCount?: true;
};
export type TryoutGenerationRuleSumAggregateInputType = {
    avoidRecentExamCount?: true;
};
export type TryoutGenerationRuleMinAggregateInputType = {
    id?: true;
    tryoutCatalogId?: true;
    randomizationMode?: true;
    questionOrderMode?: true;
    avoidRecentQuestions?: true;
    avoidRecentExamCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TryoutGenerationRuleMaxAggregateInputType = {
    id?: true;
    tryoutCatalogId?: true;
    randomizationMode?: true;
    questionOrderMode?: true;
    avoidRecentQuestions?: true;
    avoidRecentExamCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TryoutGenerationRuleCountAggregateInputType = {
    id?: true;
    tryoutCatalogId?: true;
    randomizationMode?: true;
    questionOrderMode?: true;
    avoidRecentQuestions?: true;
    avoidRecentExamCount?: true;
    rulesJson?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TryoutGenerationRuleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TryoutGenerationRuleWhereInput;
    orderBy?: Prisma.TryoutGenerationRuleOrderByWithRelationInput | Prisma.TryoutGenerationRuleOrderByWithRelationInput[];
    cursor?: Prisma.TryoutGenerationRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TryoutGenerationRuleCountAggregateInputType;
    _avg?: TryoutGenerationRuleAvgAggregateInputType;
    _sum?: TryoutGenerationRuleSumAggregateInputType;
    _min?: TryoutGenerationRuleMinAggregateInputType;
    _max?: TryoutGenerationRuleMaxAggregateInputType;
};
export type GetTryoutGenerationRuleAggregateType<T extends TryoutGenerationRuleAggregateArgs> = {
    [P in keyof T & keyof AggregateTryoutGenerationRule]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTryoutGenerationRule[P]> : Prisma.GetScalarType<T[P], AggregateTryoutGenerationRule[P]>;
};
export type TryoutGenerationRuleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TryoutGenerationRuleWhereInput;
    orderBy?: Prisma.TryoutGenerationRuleOrderByWithAggregationInput | Prisma.TryoutGenerationRuleOrderByWithAggregationInput[];
    by: Prisma.TryoutGenerationRuleScalarFieldEnum[] | Prisma.TryoutGenerationRuleScalarFieldEnum;
    having?: Prisma.TryoutGenerationRuleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TryoutGenerationRuleCountAggregateInputType | true;
    _avg?: TryoutGenerationRuleAvgAggregateInputType;
    _sum?: TryoutGenerationRuleSumAggregateInputType;
    _min?: TryoutGenerationRuleMinAggregateInputType;
    _max?: TryoutGenerationRuleMaxAggregateInputType;
};
export type TryoutGenerationRuleGroupByOutputType = {
    id: string;
    tryoutCatalogId: string;
    randomizationMode: $Enums.RandomizationMode;
    questionOrderMode: $Enums.QuestionOrderMode;
    avoidRecentQuestions: boolean;
    avoidRecentExamCount: number;
    rulesJson: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: TryoutGenerationRuleCountAggregateOutputType | null;
    _avg: TryoutGenerationRuleAvgAggregateOutputType | null;
    _sum: TryoutGenerationRuleSumAggregateOutputType | null;
    _min: TryoutGenerationRuleMinAggregateOutputType | null;
    _max: TryoutGenerationRuleMaxAggregateOutputType | null;
};
export type GetTryoutGenerationRuleGroupByPayload<T extends TryoutGenerationRuleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TryoutGenerationRuleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TryoutGenerationRuleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TryoutGenerationRuleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TryoutGenerationRuleGroupByOutputType[P]>;
}>>;
export type TryoutGenerationRuleWhereInput = {
    AND?: Prisma.TryoutGenerationRuleWhereInput | Prisma.TryoutGenerationRuleWhereInput[];
    OR?: Prisma.TryoutGenerationRuleWhereInput[];
    NOT?: Prisma.TryoutGenerationRuleWhereInput | Prisma.TryoutGenerationRuleWhereInput[];
    id?: Prisma.StringFilter<"TryoutGenerationRule"> | string;
    tryoutCatalogId?: Prisma.StringFilter<"TryoutGenerationRule"> | string;
    randomizationMode?: Prisma.EnumRandomizationModeFilter<"TryoutGenerationRule"> | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFilter<"TryoutGenerationRule"> | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFilter<"TryoutGenerationRule"> | boolean;
    avoidRecentExamCount?: Prisma.IntFilter<"TryoutGenerationRule"> | number;
    rulesJson?: Prisma.JsonNullableFilter<"TryoutGenerationRule">;
    createdAt?: Prisma.DateTimeFilter<"TryoutGenerationRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TryoutGenerationRule"> | Date | string;
    tryoutCatalog?: Prisma.XOR<Prisma.TryoutCatalogScalarRelationFilter, Prisma.TryoutCatalogWhereInput>;
    sections?: Prisma.TryoutRuleSectionListRelationFilter;
};
export type TryoutGenerationRuleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    randomizationMode?: Prisma.SortOrder;
    questionOrderMode?: Prisma.SortOrder;
    avoidRecentQuestions?: Prisma.SortOrder;
    avoidRecentExamCount?: Prisma.SortOrder;
    rulesJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tryoutCatalog?: Prisma.TryoutCatalogOrderByWithRelationInput;
    sections?: Prisma.TryoutRuleSectionOrderByRelationAggregateInput;
};
export type TryoutGenerationRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tryoutCatalogId?: string;
    AND?: Prisma.TryoutGenerationRuleWhereInput | Prisma.TryoutGenerationRuleWhereInput[];
    OR?: Prisma.TryoutGenerationRuleWhereInput[];
    NOT?: Prisma.TryoutGenerationRuleWhereInput | Prisma.TryoutGenerationRuleWhereInput[];
    randomizationMode?: Prisma.EnumRandomizationModeFilter<"TryoutGenerationRule"> | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFilter<"TryoutGenerationRule"> | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFilter<"TryoutGenerationRule"> | boolean;
    avoidRecentExamCount?: Prisma.IntFilter<"TryoutGenerationRule"> | number;
    rulesJson?: Prisma.JsonNullableFilter<"TryoutGenerationRule">;
    createdAt?: Prisma.DateTimeFilter<"TryoutGenerationRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TryoutGenerationRule"> | Date | string;
    tryoutCatalog?: Prisma.XOR<Prisma.TryoutCatalogScalarRelationFilter, Prisma.TryoutCatalogWhereInput>;
    sections?: Prisma.TryoutRuleSectionListRelationFilter;
}, "id" | "tryoutCatalogId">;
export type TryoutGenerationRuleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    randomizationMode?: Prisma.SortOrder;
    questionOrderMode?: Prisma.SortOrder;
    avoidRecentQuestions?: Prisma.SortOrder;
    avoidRecentExamCount?: Prisma.SortOrder;
    rulesJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TryoutGenerationRuleCountOrderByAggregateInput;
    _avg?: Prisma.TryoutGenerationRuleAvgOrderByAggregateInput;
    _max?: Prisma.TryoutGenerationRuleMaxOrderByAggregateInput;
    _min?: Prisma.TryoutGenerationRuleMinOrderByAggregateInput;
    _sum?: Prisma.TryoutGenerationRuleSumOrderByAggregateInput;
};
export type TryoutGenerationRuleScalarWhereWithAggregatesInput = {
    AND?: Prisma.TryoutGenerationRuleScalarWhereWithAggregatesInput | Prisma.TryoutGenerationRuleScalarWhereWithAggregatesInput[];
    OR?: Prisma.TryoutGenerationRuleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TryoutGenerationRuleScalarWhereWithAggregatesInput | Prisma.TryoutGenerationRuleScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TryoutGenerationRule"> | string;
    tryoutCatalogId?: Prisma.StringWithAggregatesFilter<"TryoutGenerationRule"> | string;
    randomizationMode?: Prisma.EnumRandomizationModeWithAggregatesFilter<"TryoutGenerationRule"> | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeWithAggregatesFilter<"TryoutGenerationRule"> | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolWithAggregatesFilter<"TryoutGenerationRule"> | boolean;
    avoidRecentExamCount?: Prisma.IntWithAggregatesFilter<"TryoutGenerationRule"> | number;
    rulesJson?: Prisma.JsonNullableWithAggregatesFilter<"TryoutGenerationRule">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TryoutGenerationRule"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TryoutGenerationRule"> | Date | string;
};
export type TryoutGenerationRuleCreateInput = {
    id?: string;
    randomizationMode: $Enums.RandomizationMode;
    questionOrderMode: $Enums.QuestionOrderMode;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutGenerationRuleInput;
    sections?: Prisma.TryoutRuleSectionCreateNestedManyWithoutTryoutGenerationRuleInput;
};
export type TryoutGenerationRuleUncheckedCreateInput = {
    id?: string;
    tryoutCatalogId: string;
    randomizationMode: $Enums.RandomizationMode;
    questionOrderMode: $Enums.QuestionOrderMode;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sections?: Prisma.TryoutRuleSectionUncheckedCreateNestedManyWithoutTryoutGenerationRuleInput;
};
export type TryoutGenerationRuleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    randomizationMode?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFieldUpdateOperationsInput | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    avoidRecentExamCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutGenerationRuleNestedInput;
    sections?: Prisma.TryoutRuleSectionUpdateManyWithoutTryoutGenerationRuleNestedInput;
};
export type TryoutGenerationRuleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    randomizationMode?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFieldUpdateOperationsInput | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    avoidRecentExamCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sections?: Prisma.TryoutRuleSectionUncheckedUpdateManyWithoutTryoutGenerationRuleNestedInput;
};
export type TryoutGenerationRuleCreateManyInput = {
    id?: string;
    tryoutCatalogId: string;
    randomizationMode: $Enums.RandomizationMode;
    questionOrderMode: $Enums.QuestionOrderMode;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TryoutGenerationRuleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    randomizationMode?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFieldUpdateOperationsInput | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    avoidRecentExamCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TryoutGenerationRuleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    randomizationMode?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFieldUpdateOperationsInput | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    avoidRecentExamCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TryoutGenerationRuleNullableScalarRelationFilter = {
    is?: Prisma.TryoutGenerationRuleWhereInput | null;
    isNot?: Prisma.TryoutGenerationRuleWhereInput | null;
};
export type TryoutGenerationRuleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    randomizationMode?: Prisma.SortOrder;
    questionOrderMode?: Prisma.SortOrder;
    avoidRecentQuestions?: Prisma.SortOrder;
    avoidRecentExamCount?: Prisma.SortOrder;
    rulesJson?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TryoutGenerationRuleAvgOrderByAggregateInput = {
    avoidRecentExamCount?: Prisma.SortOrder;
};
export type TryoutGenerationRuleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    randomizationMode?: Prisma.SortOrder;
    questionOrderMode?: Prisma.SortOrder;
    avoidRecentQuestions?: Prisma.SortOrder;
    avoidRecentExamCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TryoutGenerationRuleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    randomizationMode?: Prisma.SortOrder;
    questionOrderMode?: Prisma.SortOrder;
    avoidRecentQuestions?: Prisma.SortOrder;
    avoidRecentExamCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TryoutGenerationRuleSumOrderByAggregateInput = {
    avoidRecentExamCount?: Prisma.SortOrder;
};
export type TryoutGenerationRuleScalarRelationFilter = {
    is?: Prisma.TryoutGenerationRuleWhereInput;
    isNot?: Prisma.TryoutGenerationRuleWhereInput;
};
export type TryoutGenerationRuleCreateNestedOneWithoutTryoutCatalogInput = {
    create?: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutTryoutCatalogInput>;
    connectOrCreate?: Prisma.TryoutGenerationRuleCreateOrConnectWithoutTryoutCatalogInput;
    connect?: Prisma.TryoutGenerationRuleWhereUniqueInput;
};
export type TryoutGenerationRuleUncheckedCreateNestedOneWithoutTryoutCatalogInput = {
    create?: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutTryoutCatalogInput>;
    connectOrCreate?: Prisma.TryoutGenerationRuleCreateOrConnectWithoutTryoutCatalogInput;
    connect?: Prisma.TryoutGenerationRuleWhereUniqueInput;
};
export type TryoutGenerationRuleUpdateOneWithoutTryoutCatalogNestedInput = {
    create?: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutTryoutCatalogInput>;
    connectOrCreate?: Prisma.TryoutGenerationRuleCreateOrConnectWithoutTryoutCatalogInput;
    upsert?: Prisma.TryoutGenerationRuleUpsertWithoutTryoutCatalogInput;
    disconnect?: Prisma.TryoutGenerationRuleWhereInput | boolean;
    delete?: Prisma.TryoutGenerationRuleWhereInput | boolean;
    connect?: Prisma.TryoutGenerationRuleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TryoutGenerationRuleUpdateToOneWithWhereWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUpdateWithoutTryoutCatalogInput>, Prisma.TryoutGenerationRuleUncheckedUpdateWithoutTryoutCatalogInput>;
};
export type TryoutGenerationRuleUncheckedUpdateOneWithoutTryoutCatalogNestedInput = {
    create?: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutTryoutCatalogInput>;
    connectOrCreate?: Prisma.TryoutGenerationRuleCreateOrConnectWithoutTryoutCatalogInput;
    upsert?: Prisma.TryoutGenerationRuleUpsertWithoutTryoutCatalogInput;
    disconnect?: Prisma.TryoutGenerationRuleWhereInput | boolean;
    delete?: Prisma.TryoutGenerationRuleWhereInput | boolean;
    connect?: Prisma.TryoutGenerationRuleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TryoutGenerationRuleUpdateToOneWithWhereWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUpdateWithoutTryoutCatalogInput>, Prisma.TryoutGenerationRuleUncheckedUpdateWithoutTryoutCatalogInput>;
};
export type EnumRandomizationModeFieldUpdateOperationsInput = {
    set?: $Enums.RandomizationMode;
};
export type EnumQuestionOrderModeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionOrderMode;
};
export type TryoutGenerationRuleCreateNestedOneWithoutSectionsInput = {
    create?: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutSectionsInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutSectionsInput>;
    connectOrCreate?: Prisma.TryoutGenerationRuleCreateOrConnectWithoutSectionsInput;
    connect?: Prisma.TryoutGenerationRuleWhereUniqueInput;
};
export type TryoutGenerationRuleUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutSectionsInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutSectionsInput>;
    connectOrCreate?: Prisma.TryoutGenerationRuleCreateOrConnectWithoutSectionsInput;
    upsert?: Prisma.TryoutGenerationRuleUpsertWithoutSectionsInput;
    connect?: Prisma.TryoutGenerationRuleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TryoutGenerationRuleUpdateToOneWithWhereWithoutSectionsInput, Prisma.TryoutGenerationRuleUpdateWithoutSectionsInput>, Prisma.TryoutGenerationRuleUncheckedUpdateWithoutSectionsInput>;
};
export type TryoutGenerationRuleCreateWithoutTryoutCatalogInput = {
    id?: string;
    randomizationMode: $Enums.RandomizationMode;
    questionOrderMode: $Enums.QuestionOrderMode;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sections?: Prisma.TryoutRuleSectionCreateNestedManyWithoutTryoutGenerationRuleInput;
};
export type TryoutGenerationRuleUncheckedCreateWithoutTryoutCatalogInput = {
    id?: string;
    randomizationMode: $Enums.RandomizationMode;
    questionOrderMode: $Enums.QuestionOrderMode;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sections?: Prisma.TryoutRuleSectionUncheckedCreateNestedManyWithoutTryoutGenerationRuleInput;
};
export type TryoutGenerationRuleCreateOrConnectWithoutTryoutCatalogInput = {
    where: Prisma.TryoutGenerationRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutTryoutCatalogInput>;
};
export type TryoutGenerationRuleUpsertWithoutTryoutCatalogInput = {
    update: Prisma.XOR<Prisma.TryoutGenerationRuleUpdateWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUncheckedUpdateWithoutTryoutCatalogInput>;
    create: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutTryoutCatalogInput>;
    where?: Prisma.TryoutGenerationRuleWhereInput;
};
export type TryoutGenerationRuleUpdateToOneWithWhereWithoutTryoutCatalogInput = {
    where?: Prisma.TryoutGenerationRuleWhereInput;
    data: Prisma.XOR<Prisma.TryoutGenerationRuleUpdateWithoutTryoutCatalogInput, Prisma.TryoutGenerationRuleUncheckedUpdateWithoutTryoutCatalogInput>;
};
export type TryoutGenerationRuleUpdateWithoutTryoutCatalogInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    randomizationMode?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFieldUpdateOperationsInput | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    avoidRecentExamCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sections?: Prisma.TryoutRuleSectionUpdateManyWithoutTryoutGenerationRuleNestedInput;
};
export type TryoutGenerationRuleUncheckedUpdateWithoutTryoutCatalogInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    randomizationMode?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFieldUpdateOperationsInput | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    avoidRecentExamCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sections?: Prisma.TryoutRuleSectionUncheckedUpdateManyWithoutTryoutGenerationRuleNestedInput;
};
export type TryoutGenerationRuleCreateWithoutSectionsInput = {
    id?: string;
    randomizationMode: $Enums.RandomizationMode;
    questionOrderMode: $Enums.QuestionOrderMode;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutGenerationRuleInput;
};
export type TryoutGenerationRuleUncheckedCreateWithoutSectionsInput = {
    id?: string;
    tryoutCatalogId: string;
    randomizationMode: $Enums.RandomizationMode;
    questionOrderMode: $Enums.QuestionOrderMode;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TryoutGenerationRuleCreateOrConnectWithoutSectionsInput = {
    where: Prisma.TryoutGenerationRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutSectionsInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutSectionsInput>;
};
export type TryoutGenerationRuleUpsertWithoutSectionsInput = {
    update: Prisma.XOR<Prisma.TryoutGenerationRuleUpdateWithoutSectionsInput, Prisma.TryoutGenerationRuleUncheckedUpdateWithoutSectionsInput>;
    create: Prisma.XOR<Prisma.TryoutGenerationRuleCreateWithoutSectionsInput, Prisma.TryoutGenerationRuleUncheckedCreateWithoutSectionsInput>;
    where?: Prisma.TryoutGenerationRuleWhereInput;
};
export type TryoutGenerationRuleUpdateToOneWithWhereWithoutSectionsInput = {
    where?: Prisma.TryoutGenerationRuleWhereInput;
    data: Prisma.XOR<Prisma.TryoutGenerationRuleUpdateWithoutSectionsInput, Prisma.TryoutGenerationRuleUncheckedUpdateWithoutSectionsInput>;
};
export type TryoutGenerationRuleUpdateWithoutSectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    randomizationMode?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFieldUpdateOperationsInput | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    avoidRecentExamCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutGenerationRuleNestedInput;
};
export type TryoutGenerationRuleUncheckedUpdateWithoutSectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    randomizationMode?: Prisma.EnumRandomizationModeFieldUpdateOperationsInput | $Enums.RandomizationMode;
    questionOrderMode?: Prisma.EnumQuestionOrderModeFieldUpdateOperationsInput | $Enums.QuestionOrderMode;
    avoidRecentQuestions?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    avoidRecentExamCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rulesJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TryoutGenerationRuleCountOutputType = {
    sections: number;
};
export type TryoutGenerationRuleCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sections?: boolean | TryoutGenerationRuleCountOutputTypeCountSectionsArgs;
};
export type TryoutGenerationRuleCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleCountOutputTypeSelect<ExtArgs> | null;
};
export type TryoutGenerationRuleCountOutputTypeCountSectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TryoutRuleSectionWhereInput;
};
export type TryoutGenerationRuleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tryoutCatalogId?: boolean;
    randomizationMode?: boolean;
    questionOrderMode?: boolean;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: boolean;
    rulesJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    sections?: boolean | Prisma.TryoutGenerationRule$sectionsArgs<ExtArgs>;
    _count?: boolean | Prisma.TryoutGenerationRuleCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tryoutGenerationRule"]>;
export type TryoutGenerationRuleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tryoutCatalogId?: boolean;
    randomizationMode?: boolean;
    questionOrderMode?: boolean;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: boolean;
    rulesJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tryoutGenerationRule"]>;
export type TryoutGenerationRuleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tryoutCatalogId?: boolean;
    randomizationMode?: boolean;
    questionOrderMode?: boolean;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: boolean;
    rulesJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tryoutGenerationRule"]>;
export type TryoutGenerationRuleSelectScalar = {
    id?: boolean;
    tryoutCatalogId?: boolean;
    randomizationMode?: boolean;
    questionOrderMode?: boolean;
    avoidRecentQuestions?: boolean;
    avoidRecentExamCount?: boolean;
    rulesJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TryoutGenerationRuleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tryoutCatalogId" | "randomizationMode" | "questionOrderMode" | "avoidRecentQuestions" | "avoidRecentExamCount" | "rulesJson" | "createdAt" | "updatedAt", ExtArgs["result"]["tryoutGenerationRule"]>;
export type TryoutGenerationRuleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    sections?: boolean | Prisma.TryoutGenerationRule$sectionsArgs<ExtArgs>;
    _count?: boolean | Prisma.TryoutGenerationRuleCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TryoutGenerationRuleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
};
export type TryoutGenerationRuleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
};
export type $TryoutGenerationRulePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TryoutGenerationRule";
    objects: {
        tryoutCatalog: Prisma.$TryoutCatalogPayload<ExtArgs>;
        sections: Prisma.$TryoutRuleSectionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tryoutCatalogId: string;
        randomizationMode: $Enums.RandomizationMode;
        questionOrderMode: $Enums.QuestionOrderMode;
        avoidRecentQuestions: boolean;
        avoidRecentExamCount: number;
        rulesJson: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["tryoutGenerationRule"]>;
    composites: {};
};
export type TryoutGenerationRuleGetPayload<S extends boolean | null | undefined | TryoutGenerationRuleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload, S>;
export type TryoutGenerationRuleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TryoutGenerationRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TryoutGenerationRuleCountAggregateInputType | true;
};
export interface TryoutGenerationRuleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TryoutGenerationRule'];
        meta: {
            name: 'TryoutGenerationRule';
        };
    };
    findUnique<T extends TryoutGenerationRuleFindUniqueArgs>(args: Prisma.SelectSubset<T, TryoutGenerationRuleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TryoutGenerationRuleClient<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TryoutGenerationRuleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TryoutGenerationRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TryoutGenerationRuleClient<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TryoutGenerationRuleFindFirstArgs>(args?: Prisma.SelectSubset<T, TryoutGenerationRuleFindFirstArgs<ExtArgs>>): Prisma.Prisma__TryoutGenerationRuleClient<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TryoutGenerationRuleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TryoutGenerationRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TryoutGenerationRuleClient<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TryoutGenerationRuleFindManyArgs>(args?: Prisma.SelectSubset<T, TryoutGenerationRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TryoutGenerationRuleCreateArgs>(args: Prisma.SelectSubset<T, TryoutGenerationRuleCreateArgs<ExtArgs>>): Prisma.Prisma__TryoutGenerationRuleClient<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TryoutGenerationRuleCreateManyArgs>(args?: Prisma.SelectSubset<T, TryoutGenerationRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TryoutGenerationRuleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TryoutGenerationRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TryoutGenerationRuleDeleteArgs>(args: Prisma.SelectSubset<T, TryoutGenerationRuleDeleteArgs<ExtArgs>>): Prisma.Prisma__TryoutGenerationRuleClient<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TryoutGenerationRuleUpdateArgs>(args: Prisma.SelectSubset<T, TryoutGenerationRuleUpdateArgs<ExtArgs>>): Prisma.Prisma__TryoutGenerationRuleClient<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TryoutGenerationRuleDeleteManyArgs>(args?: Prisma.SelectSubset<T, TryoutGenerationRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TryoutGenerationRuleUpdateManyArgs>(args: Prisma.SelectSubset<T, TryoutGenerationRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TryoutGenerationRuleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TryoutGenerationRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TryoutGenerationRuleUpsertArgs>(args: Prisma.SelectSubset<T, TryoutGenerationRuleUpsertArgs<ExtArgs>>): Prisma.Prisma__TryoutGenerationRuleClient<runtime.Types.Result.GetResult<Prisma.$TryoutGenerationRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TryoutGenerationRuleCountArgs>(args?: Prisma.Subset<T, TryoutGenerationRuleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TryoutGenerationRuleCountAggregateOutputType> : number>;
    aggregate<T extends TryoutGenerationRuleAggregateArgs>(args: Prisma.Subset<T, TryoutGenerationRuleAggregateArgs>): Prisma.PrismaPromise<GetTryoutGenerationRuleAggregateType<T>>;
    groupBy<T extends TryoutGenerationRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TryoutGenerationRuleGroupByArgs['orderBy'];
    } : {
        orderBy?: TryoutGenerationRuleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TryoutGenerationRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTryoutGenerationRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TryoutGenerationRuleFieldRefs;
}
export interface Prisma__TryoutGenerationRuleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tryoutCatalog<T extends Prisma.TryoutCatalogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TryoutCatalogDefaultArgs<ExtArgs>>): Prisma.Prisma__TryoutCatalogClient<runtime.Types.Result.GetResult<Prisma.$TryoutCatalogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sections<T extends Prisma.TryoutGenerationRule$sectionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TryoutGenerationRule$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TryoutRuleSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TryoutGenerationRuleFieldRefs {
    readonly id: Prisma.FieldRef<"TryoutGenerationRule", 'String'>;
    readonly tryoutCatalogId: Prisma.FieldRef<"TryoutGenerationRule", 'String'>;
    readonly randomizationMode: Prisma.FieldRef<"TryoutGenerationRule", 'RandomizationMode'>;
    readonly questionOrderMode: Prisma.FieldRef<"TryoutGenerationRule", 'QuestionOrderMode'>;
    readonly avoidRecentQuestions: Prisma.FieldRef<"TryoutGenerationRule", 'Boolean'>;
    readonly avoidRecentExamCount: Prisma.FieldRef<"TryoutGenerationRule", 'Int'>;
    readonly rulesJson: Prisma.FieldRef<"TryoutGenerationRule", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"TryoutGenerationRule", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TryoutGenerationRule", 'DateTime'>;
}
export type TryoutGenerationRuleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
    where: Prisma.TryoutGenerationRuleWhereUniqueInput;
};
export type TryoutGenerationRuleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
    where: Prisma.TryoutGenerationRuleWhereUniqueInput;
};
export type TryoutGenerationRuleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
    where?: Prisma.TryoutGenerationRuleWhereInput;
    orderBy?: Prisma.TryoutGenerationRuleOrderByWithRelationInput | Prisma.TryoutGenerationRuleOrderByWithRelationInput[];
    cursor?: Prisma.TryoutGenerationRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TryoutGenerationRuleScalarFieldEnum | Prisma.TryoutGenerationRuleScalarFieldEnum[];
};
export type TryoutGenerationRuleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
    where?: Prisma.TryoutGenerationRuleWhereInput;
    orderBy?: Prisma.TryoutGenerationRuleOrderByWithRelationInput | Prisma.TryoutGenerationRuleOrderByWithRelationInput[];
    cursor?: Prisma.TryoutGenerationRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TryoutGenerationRuleScalarFieldEnum | Prisma.TryoutGenerationRuleScalarFieldEnum[];
};
export type TryoutGenerationRuleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
    where?: Prisma.TryoutGenerationRuleWhereInput;
    orderBy?: Prisma.TryoutGenerationRuleOrderByWithRelationInput | Prisma.TryoutGenerationRuleOrderByWithRelationInput[];
    cursor?: Prisma.TryoutGenerationRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TryoutGenerationRuleScalarFieldEnum | Prisma.TryoutGenerationRuleScalarFieldEnum[];
};
export type TryoutGenerationRuleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TryoutGenerationRuleCreateInput, Prisma.TryoutGenerationRuleUncheckedCreateInput>;
};
export type TryoutGenerationRuleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TryoutGenerationRuleCreateManyInput | Prisma.TryoutGenerationRuleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TryoutGenerationRuleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    data: Prisma.TryoutGenerationRuleCreateManyInput | Prisma.TryoutGenerationRuleCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TryoutGenerationRuleIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TryoutGenerationRuleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TryoutGenerationRuleUpdateInput, Prisma.TryoutGenerationRuleUncheckedUpdateInput>;
    where: Prisma.TryoutGenerationRuleWhereUniqueInput;
};
export type TryoutGenerationRuleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TryoutGenerationRuleUpdateManyMutationInput, Prisma.TryoutGenerationRuleUncheckedUpdateManyInput>;
    where?: Prisma.TryoutGenerationRuleWhereInput;
    limit?: number;
};
export type TryoutGenerationRuleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TryoutGenerationRuleUpdateManyMutationInput, Prisma.TryoutGenerationRuleUncheckedUpdateManyInput>;
    where?: Prisma.TryoutGenerationRuleWhereInput;
    limit?: number;
    include?: Prisma.TryoutGenerationRuleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TryoutGenerationRuleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
    where: Prisma.TryoutGenerationRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.TryoutGenerationRuleCreateInput, Prisma.TryoutGenerationRuleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TryoutGenerationRuleUpdateInput, Prisma.TryoutGenerationRuleUncheckedUpdateInput>;
};
export type TryoutGenerationRuleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
    where: Prisma.TryoutGenerationRuleWhereUniqueInput;
};
export type TryoutGenerationRuleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TryoutGenerationRuleWhereInput;
    limit?: number;
};
export type TryoutGenerationRule$sectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TryoutGenerationRuleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutGenerationRuleSelect<ExtArgs> | null;
    omit?: Prisma.TryoutGenerationRuleOmit<ExtArgs> | null;
    include?: Prisma.TryoutGenerationRuleInclude<ExtArgs> | null;
};
