import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ManualQuestionSetItemModel = runtime.Types.Result.DefaultSelection<Prisma.$ManualQuestionSetItemPayload>;
export type AggregateManualQuestionSetItem = {
    _count: ManualQuestionSetItemCountAggregateOutputType | null;
    _avg: ManualQuestionSetItemAvgAggregateOutputType | null;
    _sum: ManualQuestionSetItemSumAggregateOutputType | null;
    _min: ManualQuestionSetItemMinAggregateOutputType | null;
    _max: ManualQuestionSetItemMaxAggregateOutputType | null;
};
export type ManualQuestionSetItemAvgAggregateOutputType = {
    questionOrder: number | null;
};
export type ManualQuestionSetItemSumAggregateOutputType = {
    questionOrder: number | null;
};
export type ManualQuestionSetItemMinAggregateOutputType = {
    id: string | null;
    manualQuestionSetId: string | null;
    questionId: string | null;
    questionOrder: number | null;
    createdAt: Date | null;
};
export type ManualQuestionSetItemMaxAggregateOutputType = {
    id: string | null;
    manualQuestionSetId: string | null;
    questionId: string | null;
    questionOrder: number | null;
    createdAt: Date | null;
};
export type ManualQuestionSetItemCountAggregateOutputType = {
    id: number;
    manualQuestionSetId: number;
    questionId: number;
    questionOrder: number;
    createdAt: number;
    _all: number;
};
export type ManualQuestionSetItemAvgAggregateInputType = {
    questionOrder?: true;
};
export type ManualQuestionSetItemSumAggregateInputType = {
    questionOrder?: true;
};
export type ManualQuestionSetItemMinAggregateInputType = {
    id?: true;
    manualQuestionSetId?: true;
    questionId?: true;
    questionOrder?: true;
    createdAt?: true;
};
export type ManualQuestionSetItemMaxAggregateInputType = {
    id?: true;
    manualQuestionSetId?: true;
    questionId?: true;
    questionOrder?: true;
    createdAt?: true;
};
export type ManualQuestionSetItemCountAggregateInputType = {
    id?: true;
    manualQuestionSetId?: true;
    questionId?: true;
    questionOrder?: true;
    createdAt?: true;
    _all?: true;
};
export type ManualQuestionSetItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManualQuestionSetItemWhereInput;
    orderBy?: Prisma.ManualQuestionSetItemOrderByWithRelationInput | Prisma.ManualQuestionSetItemOrderByWithRelationInput[];
    cursor?: Prisma.ManualQuestionSetItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ManualQuestionSetItemCountAggregateInputType;
    _avg?: ManualQuestionSetItemAvgAggregateInputType;
    _sum?: ManualQuestionSetItemSumAggregateInputType;
    _min?: ManualQuestionSetItemMinAggregateInputType;
    _max?: ManualQuestionSetItemMaxAggregateInputType;
};
export type GetManualQuestionSetItemAggregateType<T extends ManualQuestionSetItemAggregateArgs> = {
    [P in keyof T & keyof AggregateManualQuestionSetItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateManualQuestionSetItem[P]> : Prisma.GetScalarType<T[P], AggregateManualQuestionSetItem[P]>;
};
export type ManualQuestionSetItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManualQuestionSetItemWhereInput;
    orderBy?: Prisma.ManualQuestionSetItemOrderByWithAggregationInput | Prisma.ManualQuestionSetItemOrderByWithAggregationInput[];
    by: Prisma.ManualQuestionSetItemScalarFieldEnum[] | Prisma.ManualQuestionSetItemScalarFieldEnum;
    having?: Prisma.ManualQuestionSetItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ManualQuestionSetItemCountAggregateInputType | true;
    _avg?: ManualQuestionSetItemAvgAggregateInputType;
    _sum?: ManualQuestionSetItemSumAggregateInputType;
    _min?: ManualQuestionSetItemMinAggregateInputType;
    _max?: ManualQuestionSetItemMaxAggregateInputType;
};
export type ManualQuestionSetItemGroupByOutputType = {
    id: string;
    manualQuestionSetId: string;
    questionId: string;
    questionOrder: number;
    createdAt: Date;
    _count: ManualQuestionSetItemCountAggregateOutputType | null;
    _avg: ManualQuestionSetItemAvgAggregateOutputType | null;
    _sum: ManualQuestionSetItemSumAggregateOutputType | null;
    _min: ManualQuestionSetItemMinAggregateOutputType | null;
    _max: ManualQuestionSetItemMaxAggregateOutputType | null;
};
export type GetManualQuestionSetItemGroupByPayload<T extends ManualQuestionSetItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ManualQuestionSetItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ManualQuestionSetItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ManualQuestionSetItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ManualQuestionSetItemGroupByOutputType[P]>;
}>>;
export type ManualQuestionSetItemWhereInput = {
    AND?: Prisma.ManualQuestionSetItemWhereInput | Prisma.ManualQuestionSetItemWhereInput[];
    OR?: Prisma.ManualQuestionSetItemWhereInput[];
    NOT?: Prisma.ManualQuestionSetItemWhereInput | Prisma.ManualQuestionSetItemWhereInput[];
    id?: Prisma.StringFilter<"ManualQuestionSetItem"> | string;
    manualQuestionSetId?: Prisma.StringFilter<"ManualQuestionSetItem"> | string;
    questionId?: Prisma.StringFilter<"ManualQuestionSetItem"> | string;
    questionOrder?: Prisma.IntFilter<"ManualQuestionSetItem"> | number;
    createdAt?: Prisma.DateTimeFilter<"ManualQuestionSetItem"> | Date | string;
    manualQuestionSet?: Prisma.XOR<Prisma.ManualQuestionSetScalarRelationFilter, Prisma.ManualQuestionSetWhereInput>;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
};
export type ManualQuestionSetItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    manualQuestionSetId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    manualQuestionSet?: Prisma.ManualQuestionSetOrderByWithRelationInput;
    question?: Prisma.QuestionOrderByWithRelationInput;
};
export type ManualQuestionSetItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    manualQuestionSetId_questionOrder?: Prisma.ManualQuestionSetItemManualQuestionSetIdQuestionOrderCompoundUniqueInput;
    manualQuestionSetId_questionId?: Prisma.ManualQuestionSetItemManualQuestionSetIdQuestionIdCompoundUniqueInput;
    AND?: Prisma.ManualQuestionSetItemWhereInput | Prisma.ManualQuestionSetItemWhereInput[];
    OR?: Prisma.ManualQuestionSetItemWhereInput[];
    NOT?: Prisma.ManualQuestionSetItemWhereInput | Prisma.ManualQuestionSetItemWhereInput[];
    manualQuestionSetId?: Prisma.StringFilter<"ManualQuestionSetItem"> | string;
    questionId?: Prisma.StringFilter<"ManualQuestionSetItem"> | string;
    questionOrder?: Prisma.IntFilter<"ManualQuestionSetItem"> | number;
    createdAt?: Prisma.DateTimeFilter<"ManualQuestionSetItem"> | Date | string;
    manualQuestionSet?: Prisma.XOR<Prisma.ManualQuestionSetScalarRelationFilter, Prisma.ManualQuestionSetWhereInput>;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
}, "id" | "manualQuestionSetId_questionOrder" | "manualQuestionSetId_questionId">;
export type ManualQuestionSetItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    manualQuestionSetId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ManualQuestionSetItemCountOrderByAggregateInput;
    _avg?: Prisma.ManualQuestionSetItemAvgOrderByAggregateInput;
    _max?: Prisma.ManualQuestionSetItemMaxOrderByAggregateInput;
    _min?: Prisma.ManualQuestionSetItemMinOrderByAggregateInput;
    _sum?: Prisma.ManualQuestionSetItemSumOrderByAggregateInput;
};
export type ManualQuestionSetItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.ManualQuestionSetItemScalarWhereWithAggregatesInput | Prisma.ManualQuestionSetItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.ManualQuestionSetItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ManualQuestionSetItemScalarWhereWithAggregatesInput | Prisma.ManualQuestionSetItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ManualQuestionSetItem"> | string;
    manualQuestionSetId?: Prisma.StringWithAggregatesFilter<"ManualQuestionSetItem"> | string;
    questionId?: Prisma.StringWithAggregatesFilter<"ManualQuestionSetItem"> | string;
    questionOrder?: Prisma.IntWithAggregatesFilter<"ManualQuestionSetItem"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ManualQuestionSetItem"> | Date | string;
};
export type ManualQuestionSetItemCreateInput = {
    id?: string;
    questionOrder: number;
    createdAt?: Date | string;
    manualQuestionSet: Prisma.ManualQuestionSetCreateNestedOneWithoutItemsInput;
    question: Prisma.QuestionCreateNestedOneWithoutManualQuestionSetItemsInput;
};
export type ManualQuestionSetItemUncheckedCreateInput = {
    id?: string;
    manualQuestionSetId: string;
    questionId: string;
    questionOrder: number;
    createdAt?: Date | string;
};
export type ManualQuestionSetItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manualQuestionSet?: Prisma.ManualQuestionSetUpdateOneRequiredWithoutItemsNestedInput;
    question?: Prisma.QuestionUpdateOneRequiredWithoutManualQuestionSetItemsNestedInput;
};
export type ManualQuestionSetItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manualQuestionSetId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetItemCreateManyInput = {
    id?: string;
    manualQuestionSetId: string;
    questionId: string;
    questionOrder: number;
    createdAt?: Date | string;
};
export type ManualQuestionSetItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manualQuestionSetId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetItemListRelationFilter = {
    every?: Prisma.ManualQuestionSetItemWhereInput;
    some?: Prisma.ManualQuestionSetItemWhereInput;
    none?: Prisma.ManualQuestionSetItemWhereInput;
};
export type ManualQuestionSetItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ManualQuestionSetItemManualQuestionSetIdQuestionOrderCompoundUniqueInput = {
    manualQuestionSetId: string;
    questionOrder: number;
};
export type ManualQuestionSetItemManualQuestionSetIdQuestionIdCompoundUniqueInput = {
    manualQuestionSetId: string;
    questionId: string;
};
export type ManualQuestionSetItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manualQuestionSetId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ManualQuestionSetItemAvgOrderByAggregateInput = {
    questionOrder?: Prisma.SortOrder;
};
export type ManualQuestionSetItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manualQuestionSetId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ManualQuestionSetItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manualQuestionSetId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ManualQuestionSetItemSumOrderByAggregateInput = {
    questionOrder?: Prisma.SortOrder;
};
export type ManualQuestionSetItemCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutQuestionInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput> | Prisma.ManualQuestionSetItemCreateWithoutQuestionInput[] | Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.ManualQuestionSetItemCreateOrConnectWithoutQuestionInput | Prisma.ManualQuestionSetItemCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.ManualQuestionSetItemCreateManyQuestionInputEnvelope;
    connect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
};
export type ManualQuestionSetItemUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutQuestionInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput> | Prisma.ManualQuestionSetItemCreateWithoutQuestionInput[] | Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.ManualQuestionSetItemCreateOrConnectWithoutQuestionInput | Prisma.ManualQuestionSetItemCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.ManualQuestionSetItemCreateManyQuestionInputEnvelope;
    connect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
};
export type ManualQuestionSetItemUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutQuestionInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput> | Prisma.ManualQuestionSetItemCreateWithoutQuestionInput[] | Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.ManualQuestionSetItemCreateOrConnectWithoutQuestionInput | Prisma.ManualQuestionSetItemCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.ManualQuestionSetItemUpsertWithWhereUniqueWithoutQuestionInput | Prisma.ManualQuestionSetItemUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.ManualQuestionSetItemCreateManyQuestionInputEnvelope;
    set?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    disconnect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    delete?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    connect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    update?: Prisma.ManualQuestionSetItemUpdateWithWhereUniqueWithoutQuestionInput | Prisma.ManualQuestionSetItemUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.ManualQuestionSetItemUpdateManyWithWhereWithoutQuestionInput | Prisma.ManualQuestionSetItemUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.ManualQuestionSetItemScalarWhereInput | Prisma.ManualQuestionSetItemScalarWhereInput[];
};
export type ManualQuestionSetItemUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutQuestionInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput> | Prisma.ManualQuestionSetItemCreateWithoutQuestionInput[] | Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.ManualQuestionSetItemCreateOrConnectWithoutQuestionInput | Prisma.ManualQuestionSetItemCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.ManualQuestionSetItemUpsertWithWhereUniqueWithoutQuestionInput | Prisma.ManualQuestionSetItemUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.ManualQuestionSetItemCreateManyQuestionInputEnvelope;
    set?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    disconnect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    delete?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    connect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    update?: Prisma.ManualQuestionSetItemUpdateWithWhereUniqueWithoutQuestionInput | Prisma.ManualQuestionSetItemUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.ManualQuestionSetItemUpdateManyWithWhereWithoutQuestionInput | Prisma.ManualQuestionSetItemUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.ManualQuestionSetItemScalarWhereInput | Prisma.ManualQuestionSetItemScalarWhereInput[];
};
export type ManualQuestionSetItemCreateNestedManyWithoutManualQuestionSetInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput> | Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput[] | Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput[];
    connectOrCreate?: Prisma.ManualQuestionSetItemCreateOrConnectWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemCreateOrConnectWithoutManualQuestionSetInput[];
    createMany?: Prisma.ManualQuestionSetItemCreateManyManualQuestionSetInputEnvelope;
    connect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
};
export type ManualQuestionSetItemUncheckedCreateNestedManyWithoutManualQuestionSetInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput> | Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput[] | Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput[];
    connectOrCreate?: Prisma.ManualQuestionSetItemCreateOrConnectWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemCreateOrConnectWithoutManualQuestionSetInput[];
    createMany?: Prisma.ManualQuestionSetItemCreateManyManualQuestionSetInputEnvelope;
    connect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
};
export type ManualQuestionSetItemUpdateManyWithoutManualQuestionSetNestedInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput> | Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput[] | Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput[];
    connectOrCreate?: Prisma.ManualQuestionSetItemCreateOrConnectWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemCreateOrConnectWithoutManualQuestionSetInput[];
    upsert?: Prisma.ManualQuestionSetItemUpsertWithWhereUniqueWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemUpsertWithWhereUniqueWithoutManualQuestionSetInput[];
    createMany?: Prisma.ManualQuestionSetItemCreateManyManualQuestionSetInputEnvelope;
    set?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    disconnect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    delete?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    connect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    update?: Prisma.ManualQuestionSetItemUpdateWithWhereUniqueWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemUpdateWithWhereUniqueWithoutManualQuestionSetInput[];
    updateMany?: Prisma.ManualQuestionSetItemUpdateManyWithWhereWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemUpdateManyWithWhereWithoutManualQuestionSetInput[];
    deleteMany?: Prisma.ManualQuestionSetItemScalarWhereInput | Prisma.ManualQuestionSetItemScalarWhereInput[];
};
export type ManualQuestionSetItemUncheckedUpdateManyWithoutManualQuestionSetNestedInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput> | Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput[] | Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput[];
    connectOrCreate?: Prisma.ManualQuestionSetItemCreateOrConnectWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemCreateOrConnectWithoutManualQuestionSetInput[];
    upsert?: Prisma.ManualQuestionSetItemUpsertWithWhereUniqueWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemUpsertWithWhereUniqueWithoutManualQuestionSetInput[];
    createMany?: Prisma.ManualQuestionSetItemCreateManyManualQuestionSetInputEnvelope;
    set?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    disconnect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    delete?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    connect?: Prisma.ManualQuestionSetItemWhereUniqueInput | Prisma.ManualQuestionSetItemWhereUniqueInput[];
    update?: Prisma.ManualQuestionSetItemUpdateWithWhereUniqueWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemUpdateWithWhereUniqueWithoutManualQuestionSetInput[];
    updateMany?: Prisma.ManualQuestionSetItemUpdateManyWithWhereWithoutManualQuestionSetInput | Prisma.ManualQuestionSetItemUpdateManyWithWhereWithoutManualQuestionSetInput[];
    deleteMany?: Prisma.ManualQuestionSetItemScalarWhereInput | Prisma.ManualQuestionSetItemScalarWhereInput[];
};
export type ManualQuestionSetItemCreateWithoutQuestionInput = {
    id?: string;
    questionOrder: number;
    createdAt?: Date | string;
    manualQuestionSet: Prisma.ManualQuestionSetCreateNestedOneWithoutItemsInput;
};
export type ManualQuestionSetItemUncheckedCreateWithoutQuestionInput = {
    id?: string;
    manualQuestionSetId: string;
    questionOrder: number;
    createdAt?: Date | string;
};
export type ManualQuestionSetItemCreateOrConnectWithoutQuestionInput = {
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutQuestionInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput>;
};
export type ManualQuestionSetItemCreateManyQuestionInputEnvelope = {
    data: Prisma.ManualQuestionSetItemCreateManyQuestionInput | Prisma.ManualQuestionSetItemCreateManyQuestionInput[];
    skipDuplicates?: boolean;
};
export type ManualQuestionSetItemUpsertWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateWithoutQuestionInput, Prisma.ManualQuestionSetItemUncheckedUpdateWithoutQuestionInput>;
    create: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutQuestionInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutQuestionInput>;
};
export type ManualQuestionSetItemUpdateWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateWithoutQuestionInput, Prisma.ManualQuestionSetItemUncheckedUpdateWithoutQuestionInput>;
};
export type ManualQuestionSetItemUpdateManyWithWhereWithoutQuestionInput = {
    where: Prisma.ManualQuestionSetItemScalarWhereInput;
    data: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateManyMutationInput, Prisma.ManualQuestionSetItemUncheckedUpdateManyWithoutQuestionInput>;
};
export type ManualQuestionSetItemScalarWhereInput = {
    AND?: Prisma.ManualQuestionSetItemScalarWhereInput | Prisma.ManualQuestionSetItemScalarWhereInput[];
    OR?: Prisma.ManualQuestionSetItemScalarWhereInput[];
    NOT?: Prisma.ManualQuestionSetItemScalarWhereInput | Prisma.ManualQuestionSetItemScalarWhereInput[];
    id?: Prisma.StringFilter<"ManualQuestionSetItem"> | string;
    manualQuestionSetId?: Prisma.StringFilter<"ManualQuestionSetItem"> | string;
    questionId?: Prisma.StringFilter<"ManualQuestionSetItem"> | string;
    questionOrder?: Prisma.IntFilter<"ManualQuestionSetItem"> | number;
    createdAt?: Prisma.DateTimeFilter<"ManualQuestionSetItem"> | Date | string;
};
export type ManualQuestionSetItemCreateWithoutManualQuestionSetInput = {
    id?: string;
    questionOrder: number;
    createdAt?: Date | string;
    question: Prisma.QuestionCreateNestedOneWithoutManualQuestionSetItemsInput;
};
export type ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput = {
    id?: string;
    questionId: string;
    questionOrder: number;
    createdAt?: Date | string;
};
export type ManualQuestionSetItemCreateOrConnectWithoutManualQuestionSetInput = {
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput>;
};
export type ManualQuestionSetItemCreateManyManualQuestionSetInputEnvelope = {
    data: Prisma.ManualQuestionSetItemCreateManyManualQuestionSetInput | Prisma.ManualQuestionSetItemCreateManyManualQuestionSetInput[];
    skipDuplicates?: boolean;
};
export type ManualQuestionSetItemUpsertWithWhereUniqueWithoutManualQuestionSetInput = {
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateWithoutManualQuestionSetInput, Prisma.ManualQuestionSetItemUncheckedUpdateWithoutManualQuestionSetInput>;
    create: Prisma.XOR<Prisma.ManualQuestionSetItemCreateWithoutManualQuestionSetInput, Prisma.ManualQuestionSetItemUncheckedCreateWithoutManualQuestionSetInput>;
};
export type ManualQuestionSetItemUpdateWithWhereUniqueWithoutManualQuestionSetInput = {
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateWithoutManualQuestionSetInput, Prisma.ManualQuestionSetItemUncheckedUpdateWithoutManualQuestionSetInput>;
};
export type ManualQuestionSetItemUpdateManyWithWhereWithoutManualQuestionSetInput = {
    where: Prisma.ManualQuestionSetItemScalarWhereInput;
    data: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateManyMutationInput, Prisma.ManualQuestionSetItemUncheckedUpdateManyWithoutManualQuestionSetInput>;
};
export type ManualQuestionSetItemCreateManyQuestionInput = {
    id?: string;
    manualQuestionSetId: string;
    questionOrder: number;
    createdAt?: Date | string;
};
export type ManualQuestionSetItemUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manualQuestionSet?: Prisma.ManualQuestionSetUpdateOneRequiredWithoutItemsNestedInput;
};
export type ManualQuestionSetItemUncheckedUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manualQuestionSetId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetItemUncheckedUpdateManyWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manualQuestionSetId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetItemCreateManyManualQuestionSetInput = {
    id?: string;
    questionId: string;
    questionOrder: number;
    createdAt?: Date | string;
};
export type ManualQuestionSetItemUpdateWithoutManualQuestionSetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    question?: Prisma.QuestionUpdateOneRequiredWithoutManualQuestionSetItemsNestedInput;
};
export type ManualQuestionSetItemUncheckedUpdateWithoutManualQuestionSetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetItemUncheckedUpdateManyWithoutManualQuestionSetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manualQuestionSetId?: boolean;
    questionId?: boolean;
    questionOrder?: boolean;
    createdAt?: boolean;
    manualQuestionSet?: boolean | Prisma.ManualQuestionSetDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["manualQuestionSetItem"]>;
export type ManualQuestionSetItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manualQuestionSetId?: boolean;
    questionId?: boolean;
    questionOrder?: boolean;
    createdAt?: boolean;
    manualQuestionSet?: boolean | Prisma.ManualQuestionSetDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["manualQuestionSetItem"]>;
export type ManualQuestionSetItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manualQuestionSetId?: boolean;
    questionId?: boolean;
    questionOrder?: boolean;
    createdAt?: boolean;
    manualQuestionSet?: boolean | Prisma.ManualQuestionSetDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["manualQuestionSetItem"]>;
export type ManualQuestionSetItemSelectScalar = {
    id?: boolean;
    manualQuestionSetId?: boolean;
    questionId?: boolean;
    questionOrder?: boolean;
    createdAt?: boolean;
};
export type ManualQuestionSetItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "manualQuestionSetId" | "questionId" | "questionOrder" | "createdAt", ExtArgs["result"]["manualQuestionSetItem"]>;
export type ManualQuestionSetItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manualQuestionSet?: boolean | Prisma.ManualQuestionSetDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type ManualQuestionSetItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manualQuestionSet?: boolean | Prisma.ManualQuestionSetDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type ManualQuestionSetItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manualQuestionSet?: boolean | Prisma.ManualQuestionSetDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type $ManualQuestionSetItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ManualQuestionSetItem";
    objects: {
        manualQuestionSet: Prisma.$ManualQuestionSetPayload<ExtArgs>;
        question: Prisma.$QuestionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        manualQuestionSetId: string;
        questionId: string;
        questionOrder: number;
        createdAt: Date;
    }, ExtArgs["result"]["manualQuestionSetItem"]>;
    composites: {};
};
export type ManualQuestionSetItemGetPayload<S extends boolean | null | undefined | ManualQuestionSetItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload, S>;
export type ManualQuestionSetItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ManualQuestionSetItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ManualQuestionSetItemCountAggregateInputType | true;
};
export interface ManualQuestionSetItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ManualQuestionSetItem'];
        meta: {
            name: 'ManualQuestionSetItem';
        };
    };
    findUnique<T extends ManualQuestionSetItemFindUniqueArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetItemClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ManualQuestionSetItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetItemClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ManualQuestionSetItemFindFirstArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetItemClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ManualQuestionSetItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetItemClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ManualQuestionSetItemFindManyArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ManualQuestionSetItemCreateArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetItemCreateArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetItemClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ManualQuestionSetItemCreateManyArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ManualQuestionSetItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ManualQuestionSetItemDeleteArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetItemDeleteArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetItemClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ManualQuestionSetItemUpdateArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetItemUpdateArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetItemClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ManualQuestionSetItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ManualQuestionSetItemUpdateManyArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ManualQuestionSetItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ManualQuestionSetItemUpsertArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetItemUpsertArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetItemClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ManualQuestionSetItemCountArgs>(args?: Prisma.Subset<T, ManualQuestionSetItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ManualQuestionSetItemCountAggregateOutputType> : number>;
    aggregate<T extends ManualQuestionSetItemAggregateArgs>(args: Prisma.Subset<T, ManualQuestionSetItemAggregateArgs>): Prisma.PrismaPromise<GetManualQuestionSetItemAggregateType<T>>;
    groupBy<T extends ManualQuestionSetItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ManualQuestionSetItemGroupByArgs['orderBy'];
    } : {
        orderBy?: ManualQuestionSetItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ManualQuestionSetItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManualQuestionSetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ManualQuestionSetItemFieldRefs;
}
export interface Prisma__ManualQuestionSetItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manualQuestionSet<T extends Prisma.ManualQuestionSetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManualQuestionSetDefaultArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    question<T extends Prisma.QuestionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionDefaultArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ManualQuestionSetItemFieldRefs {
    readonly id: Prisma.FieldRef<"ManualQuestionSetItem", 'String'>;
    readonly manualQuestionSetId: Prisma.FieldRef<"ManualQuestionSetItem", 'String'>;
    readonly questionId: Prisma.FieldRef<"ManualQuestionSetItem", 'String'>;
    readonly questionOrder: Prisma.FieldRef<"ManualQuestionSetItem", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"ManualQuestionSetItem", 'DateTime'>;
}
export type ManualQuestionSetItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
};
export type ManualQuestionSetItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
};
export type ManualQuestionSetItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
    where?: Prisma.ManualQuestionSetItemWhereInput;
    orderBy?: Prisma.ManualQuestionSetItemOrderByWithRelationInput | Prisma.ManualQuestionSetItemOrderByWithRelationInput[];
    cursor?: Prisma.ManualQuestionSetItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManualQuestionSetItemScalarFieldEnum | Prisma.ManualQuestionSetItemScalarFieldEnum[];
};
export type ManualQuestionSetItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
    where?: Prisma.ManualQuestionSetItemWhereInput;
    orderBy?: Prisma.ManualQuestionSetItemOrderByWithRelationInput | Prisma.ManualQuestionSetItemOrderByWithRelationInput[];
    cursor?: Prisma.ManualQuestionSetItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManualQuestionSetItemScalarFieldEnum | Prisma.ManualQuestionSetItemScalarFieldEnum[];
};
export type ManualQuestionSetItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
    where?: Prisma.ManualQuestionSetItemWhereInput;
    orderBy?: Prisma.ManualQuestionSetItemOrderByWithRelationInput | Prisma.ManualQuestionSetItemOrderByWithRelationInput[];
    cursor?: Prisma.ManualQuestionSetItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManualQuestionSetItemScalarFieldEnum | Prisma.ManualQuestionSetItemScalarFieldEnum[];
};
export type ManualQuestionSetItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ManualQuestionSetItemCreateInput, Prisma.ManualQuestionSetItemUncheckedCreateInput>;
};
export type ManualQuestionSetItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ManualQuestionSetItemCreateManyInput | Prisma.ManualQuestionSetItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ManualQuestionSetItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    data: Prisma.ManualQuestionSetItemCreateManyInput | Prisma.ManualQuestionSetItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ManualQuestionSetItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ManualQuestionSetItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateInput, Prisma.ManualQuestionSetItemUncheckedUpdateInput>;
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
};
export type ManualQuestionSetItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateManyMutationInput, Prisma.ManualQuestionSetItemUncheckedUpdateManyInput>;
    where?: Prisma.ManualQuestionSetItemWhereInput;
    limit?: number;
};
export type ManualQuestionSetItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateManyMutationInput, Prisma.ManualQuestionSetItemUncheckedUpdateManyInput>;
    where?: Prisma.ManualQuestionSetItemWhereInput;
    limit?: number;
    include?: Prisma.ManualQuestionSetItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ManualQuestionSetItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ManualQuestionSetItemCreateInput, Prisma.ManualQuestionSetItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ManualQuestionSetItemUpdateInput, Prisma.ManualQuestionSetItemUncheckedUpdateInput>;
};
export type ManualQuestionSetItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
    where: Prisma.ManualQuestionSetItemWhereUniqueInput;
};
export type ManualQuestionSetItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManualQuestionSetItemWhereInput;
    limit?: number;
};
export type ManualQuestionSetItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetItemSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetItemOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetItemInclude<ExtArgs> | null;
};
