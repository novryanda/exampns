import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ManualQuestionSetModel = runtime.Types.Result.DefaultSelection<Prisma.$ManualQuestionSetPayload>;
export type AggregateManualQuestionSet = {
    _count: ManualQuestionSetCountAggregateOutputType | null;
    _min: ManualQuestionSetMinAggregateOutputType | null;
    _max: ManualQuestionSetMaxAggregateOutputType | null;
};
export type ManualQuestionSetMinAggregateOutputType = {
    id: string | null;
    tryoutCatalogId: string | null;
    name: string | null;
    description: string | null;
    status: $Enums.ManualQuestionSetStatus | null;
    createdBy: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ManualQuestionSetMaxAggregateOutputType = {
    id: string | null;
    tryoutCatalogId: string | null;
    name: string | null;
    description: string | null;
    status: $Enums.ManualQuestionSetStatus | null;
    createdBy: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ManualQuestionSetCountAggregateOutputType = {
    id: number;
    tryoutCatalogId: number;
    name: number;
    description: number;
    status: number;
    createdBy: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ManualQuestionSetMinAggregateInputType = {
    id?: true;
    tryoutCatalogId?: true;
    name?: true;
    description?: true;
    status?: true;
    createdBy?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ManualQuestionSetMaxAggregateInputType = {
    id?: true;
    tryoutCatalogId?: true;
    name?: true;
    description?: true;
    status?: true;
    createdBy?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ManualQuestionSetCountAggregateInputType = {
    id?: true;
    tryoutCatalogId?: true;
    name?: true;
    description?: true;
    status?: true;
    createdBy?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ManualQuestionSetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManualQuestionSetWhereInput;
    orderBy?: Prisma.ManualQuestionSetOrderByWithRelationInput | Prisma.ManualQuestionSetOrderByWithRelationInput[];
    cursor?: Prisma.ManualQuestionSetWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ManualQuestionSetCountAggregateInputType;
    _min?: ManualQuestionSetMinAggregateInputType;
    _max?: ManualQuestionSetMaxAggregateInputType;
};
export type GetManualQuestionSetAggregateType<T extends ManualQuestionSetAggregateArgs> = {
    [P in keyof T & keyof AggregateManualQuestionSet]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateManualQuestionSet[P]> : Prisma.GetScalarType<T[P], AggregateManualQuestionSet[P]>;
};
export type ManualQuestionSetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManualQuestionSetWhereInput;
    orderBy?: Prisma.ManualQuestionSetOrderByWithAggregationInput | Prisma.ManualQuestionSetOrderByWithAggregationInput[];
    by: Prisma.ManualQuestionSetScalarFieldEnum[] | Prisma.ManualQuestionSetScalarFieldEnum;
    having?: Prisma.ManualQuestionSetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ManualQuestionSetCountAggregateInputType | true;
    _min?: ManualQuestionSetMinAggregateInputType;
    _max?: ManualQuestionSetMaxAggregateInputType;
};
export type ManualQuestionSetGroupByOutputType = {
    id: string;
    tryoutCatalogId: string;
    name: string;
    description: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ManualQuestionSetCountAggregateOutputType | null;
    _min: ManualQuestionSetMinAggregateOutputType | null;
    _max: ManualQuestionSetMaxAggregateOutputType | null;
};
export type GetManualQuestionSetGroupByPayload<T extends ManualQuestionSetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ManualQuestionSetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ManualQuestionSetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ManualQuestionSetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ManualQuestionSetGroupByOutputType[P]>;
}>>;
export type ManualQuestionSetWhereInput = {
    AND?: Prisma.ManualQuestionSetWhereInput | Prisma.ManualQuestionSetWhereInput[];
    OR?: Prisma.ManualQuestionSetWhereInput[];
    NOT?: Prisma.ManualQuestionSetWhereInput | Prisma.ManualQuestionSetWhereInput[];
    id?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    tryoutCatalogId?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    name?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    description?: Prisma.StringNullableFilter<"ManualQuestionSet"> | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFilter<"ManualQuestionSet"> | $Enums.ManualQuestionSetStatus;
    createdBy?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    createdAt?: Prisma.DateTimeFilter<"ManualQuestionSet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ManualQuestionSet"> | Date | string;
    tryoutCatalog?: Prisma.XOR<Prisma.TryoutCatalogScalarRelationFilter, Prisma.TryoutCatalogWhereInput>;
    createdByUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    items?: Prisma.ManualQuestionSetItemListRelationFilter;
};
export type ManualQuestionSetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tryoutCatalog?: Prisma.TryoutCatalogOrderByWithRelationInput;
    createdByUser?: Prisma.UserOrderByWithRelationInput;
    items?: Prisma.ManualQuestionSetItemOrderByRelationAggregateInput;
};
export type ManualQuestionSetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ManualQuestionSetWhereInput | Prisma.ManualQuestionSetWhereInput[];
    OR?: Prisma.ManualQuestionSetWhereInput[];
    NOT?: Prisma.ManualQuestionSetWhereInput | Prisma.ManualQuestionSetWhereInput[];
    tryoutCatalogId?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    name?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    description?: Prisma.StringNullableFilter<"ManualQuestionSet"> | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFilter<"ManualQuestionSet"> | $Enums.ManualQuestionSetStatus;
    createdBy?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    createdAt?: Prisma.DateTimeFilter<"ManualQuestionSet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ManualQuestionSet"> | Date | string;
    tryoutCatalog?: Prisma.XOR<Prisma.TryoutCatalogScalarRelationFilter, Prisma.TryoutCatalogWhereInput>;
    createdByUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    items?: Prisma.ManualQuestionSetItemListRelationFilter;
}, "id">;
export type ManualQuestionSetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ManualQuestionSetCountOrderByAggregateInput;
    _max?: Prisma.ManualQuestionSetMaxOrderByAggregateInput;
    _min?: Prisma.ManualQuestionSetMinOrderByAggregateInput;
};
export type ManualQuestionSetScalarWhereWithAggregatesInput = {
    AND?: Prisma.ManualQuestionSetScalarWhereWithAggregatesInput | Prisma.ManualQuestionSetScalarWhereWithAggregatesInput[];
    OR?: Prisma.ManualQuestionSetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ManualQuestionSetScalarWhereWithAggregatesInput | Prisma.ManualQuestionSetScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ManualQuestionSet"> | string;
    tryoutCatalogId?: Prisma.StringWithAggregatesFilter<"ManualQuestionSet"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ManualQuestionSet"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"ManualQuestionSet"> | string | null;
    status?: Prisma.EnumManualQuestionSetStatusWithAggregatesFilter<"ManualQuestionSet"> | $Enums.ManualQuestionSetStatus;
    createdBy?: Prisma.StringWithAggregatesFilter<"ManualQuestionSet"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ManualQuestionSet"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ManualQuestionSet"> | Date | string;
};
export type ManualQuestionSetCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutManualQuestionSetsInput;
    createdByUser: Prisma.UserCreateNestedOneWithoutCreatedManualQuestionSetsInput;
    items?: Prisma.ManualQuestionSetItemCreateNestedManyWithoutManualQuestionSetInput;
};
export type ManualQuestionSetUncheckedCreateInput = {
    id?: string;
    tryoutCatalogId: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdBy: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ManualQuestionSetItemUncheckedCreateNestedManyWithoutManualQuestionSetInput;
};
export type ManualQuestionSetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutManualQuestionSetsNestedInput;
    createdByUser?: Prisma.UserUpdateOneRequiredWithoutCreatedManualQuestionSetsNestedInput;
    items?: Prisma.ManualQuestionSetItemUpdateManyWithoutManualQuestionSetNestedInput;
};
export type ManualQuestionSetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ManualQuestionSetItemUncheckedUpdateManyWithoutManualQuestionSetNestedInput;
};
export type ManualQuestionSetCreateManyInput = {
    id?: string;
    tryoutCatalogId: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdBy: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ManualQuestionSetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetListRelationFilter = {
    every?: Prisma.ManualQuestionSetWhereInput;
    some?: Prisma.ManualQuestionSetWhereInput;
    none?: Prisma.ManualQuestionSetWhereInput;
};
export type ManualQuestionSetOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ManualQuestionSetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ManualQuestionSetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ManualQuestionSetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tryoutCatalogId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ManualQuestionSetScalarRelationFilter = {
    is?: Prisma.ManualQuestionSetWhereInput;
    isNot?: Prisma.ManualQuestionSetWhereInput;
};
export type ManualQuestionSetCreateNestedManyWithoutCreatedByUserInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput, Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput> | Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput[] | Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutCreatedByUserInput | Prisma.ManualQuestionSetCreateOrConnectWithoutCreatedByUserInput[];
    createMany?: Prisma.ManualQuestionSetCreateManyCreatedByUserInputEnvelope;
    connect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
};
export type ManualQuestionSetUncheckedCreateNestedManyWithoutCreatedByUserInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput, Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput> | Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput[] | Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutCreatedByUserInput | Prisma.ManualQuestionSetCreateOrConnectWithoutCreatedByUserInput[];
    createMany?: Prisma.ManualQuestionSetCreateManyCreatedByUserInputEnvelope;
    connect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
};
export type ManualQuestionSetUpdateManyWithoutCreatedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput, Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput> | Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput[] | Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutCreatedByUserInput | Prisma.ManualQuestionSetCreateOrConnectWithoutCreatedByUserInput[];
    upsert?: Prisma.ManualQuestionSetUpsertWithWhereUniqueWithoutCreatedByUserInput | Prisma.ManualQuestionSetUpsertWithWhereUniqueWithoutCreatedByUserInput[];
    createMany?: Prisma.ManualQuestionSetCreateManyCreatedByUserInputEnvelope;
    set?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    disconnect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    delete?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    connect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    update?: Prisma.ManualQuestionSetUpdateWithWhereUniqueWithoutCreatedByUserInput | Prisma.ManualQuestionSetUpdateWithWhereUniqueWithoutCreatedByUserInput[];
    updateMany?: Prisma.ManualQuestionSetUpdateManyWithWhereWithoutCreatedByUserInput | Prisma.ManualQuestionSetUpdateManyWithWhereWithoutCreatedByUserInput[];
    deleteMany?: Prisma.ManualQuestionSetScalarWhereInput | Prisma.ManualQuestionSetScalarWhereInput[];
};
export type ManualQuestionSetUncheckedUpdateManyWithoutCreatedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput, Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput> | Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput[] | Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutCreatedByUserInput | Prisma.ManualQuestionSetCreateOrConnectWithoutCreatedByUserInput[];
    upsert?: Prisma.ManualQuestionSetUpsertWithWhereUniqueWithoutCreatedByUserInput | Prisma.ManualQuestionSetUpsertWithWhereUniqueWithoutCreatedByUserInput[];
    createMany?: Prisma.ManualQuestionSetCreateManyCreatedByUserInputEnvelope;
    set?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    disconnect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    delete?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    connect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    update?: Prisma.ManualQuestionSetUpdateWithWhereUniqueWithoutCreatedByUserInput | Prisma.ManualQuestionSetUpdateWithWhereUniqueWithoutCreatedByUserInput[];
    updateMany?: Prisma.ManualQuestionSetUpdateManyWithWhereWithoutCreatedByUserInput | Prisma.ManualQuestionSetUpdateManyWithWhereWithoutCreatedByUserInput[];
    deleteMany?: Prisma.ManualQuestionSetScalarWhereInput | Prisma.ManualQuestionSetScalarWhereInput[];
};
export type ManualQuestionSetCreateNestedManyWithoutTryoutCatalogInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput, Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput> | Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput[] | Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput[];
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutTryoutCatalogInput | Prisma.ManualQuestionSetCreateOrConnectWithoutTryoutCatalogInput[];
    createMany?: Prisma.ManualQuestionSetCreateManyTryoutCatalogInputEnvelope;
    connect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
};
export type ManualQuestionSetUncheckedCreateNestedManyWithoutTryoutCatalogInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput, Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput> | Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput[] | Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput[];
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutTryoutCatalogInput | Prisma.ManualQuestionSetCreateOrConnectWithoutTryoutCatalogInput[];
    createMany?: Prisma.ManualQuestionSetCreateManyTryoutCatalogInputEnvelope;
    connect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
};
export type ManualQuestionSetUpdateManyWithoutTryoutCatalogNestedInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput, Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput> | Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput[] | Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput[];
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutTryoutCatalogInput | Prisma.ManualQuestionSetCreateOrConnectWithoutTryoutCatalogInput[];
    upsert?: Prisma.ManualQuestionSetUpsertWithWhereUniqueWithoutTryoutCatalogInput | Prisma.ManualQuestionSetUpsertWithWhereUniqueWithoutTryoutCatalogInput[];
    createMany?: Prisma.ManualQuestionSetCreateManyTryoutCatalogInputEnvelope;
    set?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    disconnect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    delete?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    connect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    update?: Prisma.ManualQuestionSetUpdateWithWhereUniqueWithoutTryoutCatalogInput | Prisma.ManualQuestionSetUpdateWithWhereUniqueWithoutTryoutCatalogInput[];
    updateMany?: Prisma.ManualQuestionSetUpdateManyWithWhereWithoutTryoutCatalogInput | Prisma.ManualQuestionSetUpdateManyWithWhereWithoutTryoutCatalogInput[];
    deleteMany?: Prisma.ManualQuestionSetScalarWhereInput | Prisma.ManualQuestionSetScalarWhereInput[];
};
export type ManualQuestionSetUncheckedUpdateManyWithoutTryoutCatalogNestedInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput, Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput> | Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput[] | Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput[];
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutTryoutCatalogInput | Prisma.ManualQuestionSetCreateOrConnectWithoutTryoutCatalogInput[];
    upsert?: Prisma.ManualQuestionSetUpsertWithWhereUniqueWithoutTryoutCatalogInput | Prisma.ManualQuestionSetUpsertWithWhereUniqueWithoutTryoutCatalogInput[];
    createMany?: Prisma.ManualQuestionSetCreateManyTryoutCatalogInputEnvelope;
    set?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    disconnect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    delete?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    connect?: Prisma.ManualQuestionSetWhereUniqueInput | Prisma.ManualQuestionSetWhereUniqueInput[];
    update?: Prisma.ManualQuestionSetUpdateWithWhereUniqueWithoutTryoutCatalogInput | Prisma.ManualQuestionSetUpdateWithWhereUniqueWithoutTryoutCatalogInput[];
    updateMany?: Prisma.ManualQuestionSetUpdateManyWithWhereWithoutTryoutCatalogInput | Prisma.ManualQuestionSetUpdateManyWithWhereWithoutTryoutCatalogInput[];
    deleteMany?: Prisma.ManualQuestionSetScalarWhereInput | Prisma.ManualQuestionSetScalarWhereInput[];
};
export type EnumManualQuestionSetStatusFieldUpdateOperationsInput = {
    set?: $Enums.ManualQuestionSetStatus;
};
export type ManualQuestionSetCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutItemsInput, Prisma.ManualQuestionSetUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutItemsInput;
    connect?: Prisma.ManualQuestionSetWhereUniqueInput;
};
export type ManualQuestionSetUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutItemsInput, Prisma.ManualQuestionSetUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.ManualQuestionSetCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.ManualQuestionSetUpsertWithoutItemsInput;
    connect?: Prisma.ManualQuestionSetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ManualQuestionSetUpdateToOneWithWhereWithoutItemsInput, Prisma.ManualQuestionSetUpdateWithoutItemsInput>, Prisma.ManualQuestionSetUncheckedUpdateWithoutItemsInput>;
};
export type ManualQuestionSetCreateWithoutCreatedByUserInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutManualQuestionSetsInput;
    items?: Prisma.ManualQuestionSetItemCreateNestedManyWithoutManualQuestionSetInput;
};
export type ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput = {
    id?: string;
    tryoutCatalogId: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ManualQuestionSetItemUncheckedCreateNestedManyWithoutManualQuestionSetInput;
};
export type ManualQuestionSetCreateOrConnectWithoutCreatedByUserInput = {
    where: Prisma.ManualQuestionSetWhereUniqueInput;
    create: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput, Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput>;
};
export type ManualQuestionSetCreateManyCreatedByUserInputEnvelope = {
    data: Prisma.ManualQuestionSetCreateManyCreatedByUserInput | Prisma.ManualQuestionSetCreateManyCreatedByUserInput[];
    skipDuplicates?: boolean;
};
export type ManualQuestionSetUpsertWithWhereUniqueWithoutCreatedByUserInput = {
    where: Prisma.ManualQuestionSetWhereUniqueInput;
    update: Prisma.XOR<Prisma.ManualQuestionSetUpdateWithoutCreatedByUserInput, Prisma.ManualQuestionSetUncheckedUpdateWithoutCreatedByUserInput>;
    create: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutCreatedByUserInput, Prisma.ManualQuestionSetUncheckedCreateWithoutCreatedByUserInput>;
};
export type ManualQuestionSetUpdateWithWhereUniqueWithoutCreatedByUserInput = {
    where: Prisma.ManualQuestionSetWhereUniqueInput;
    data: Prisma.XOR<Prisma.ManualQuestionSetUpdateWithoutCreatedByUserInput, Prisma.ManualQuestionSetUncheckedUpdateWithoutCreatedByUserInput>;
};
export type ManualQuestionSetUpdateManyWithWhereWithoutCreatedByUserInput = {
    where: Prisma.ManualQuestionSetScalarWhereInput;
    data: Prisma.XOR<Prisma.ManualQuestionSetUpdateManyMutationInput, Prisma.ManualQuestionSetUncheckedUpdateManyWithoutCreatedByUserInput>;
};
export type ManualQuestionSetScalarWhereInput = {
    AND?: Prisma.ManualQuestionSetScalarWhereInput | Prisma.ManualQuestionSetScalarWhereInput[];
    OR?: Prisma.ManualQuestionSetScalarWhereInput[];
    NOT?: Prisma.ManualQuestionSetScalarWhereInput | Prisma.ManualQuestionSetScalarWhereInput[];
    id?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    tryoutCatalogId?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    name?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    description?: Prisma.StringNullableFilter<"ManualQuestionSet"> | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFilter<"ManualQuestionSet"> | $Enums.ManualQuestionSetStatus;
    createdBy?: Prisma.StringFilter<"ManualQuestionSet"> | string;
    createdAt?: Prisma.DateTimeFilter<"ManualQuestionSet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ManualQuestionSet"> | Date | string;
};
export type ManualQuestionSetCreateWithoutTryoutCatalogInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdByUser: Prisma.UserCreateNestedOneWithoutCreatedManualQuestionSetsInput;
    items?: Prisma.ManualQuestionSetItemCreateNestedManyWithoutManualQuestionSetInput;
};
export type ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdBy: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ManualQuestionSetItemUncheckedCreateNestedManyWithoutManualQuestionSetInput;
};
export type ManualQuestionSetCreateOrConnectWithoutTryoutCatalogInput = {
    where: Prisma.ManualQuestionSetWhereUniqueInput;
    create: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput, Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput>;
};
export type ManualQuestionSetCreateManyTryoutCatalogInputEnvelope = {
    data: Prisma.ManualQuestionSetCreateManyTryoutCatalogInput | Prisma.ManualQuestionSetCreateManyTryoutCatalogInput[];
    skipDuplicates?: boolean;
};
export type ManualQuestionSetUpsertWithWhereUniqueWithoutTryoutCatalogInput = {
    where: Prisma.ManualQuestionSetWhereUniqueInput;
    update: Prisma.XOR<Prisma.ManualQuestionSetUpdateWithoutTryoutCatalogInput, Prisma.ManualQuestionSetUncheckedUpdateWithoutTryoutCatalogInput>;
    create: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutTryoutCatalogInput, Prisma.ManualQuestionSetUncheckedCreateWithoutTryoutCatalogInput>;
};
export type ManualQuestionSetUpdateWithWhereUniqueWithoutTryoutCatalogInput = {
    where: Prisma.ManualQuestionSetWhereUniqueInput;
    data: Prisma.XOR<Prisma.ManualQuestionSetUpdateWithoutTryoutCatalogInput, Prisma.ManualQuestionSetUncheckedUpdateWithoutTryoutCatalogInput>;
};
export type ManualQuestionSetUpdateManyWithWhereWithoutTryoutCatalogInput = {
    where: Prisma.ManualQuestionSetScalarWhereInput;
    data: Prisma.XOR<Prisma.ManualQuestionSetUpdateManyMutationInput, Prisma.ManualQuestionSetUncheckedUpdateManyWithoutTryoutCatalogInput>;
};
export type ManualQuestionSetCreateWithoutItemsInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalog: Prisma.TryoutCatalogCreateNestedOneWithoutManualQuestionSetsInput;
    createdByUser: Prisma.UserCreateNestedOneWithoutCreatedManualQuestionSetsInput;
};
export type ManualQuestionSetUncheckedCreateWithoutItemsInput = {
    id?: string;
    tryoutCatalogId: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdBy: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ManualQuestionSetCreateOrConnectWithoutItemsInput = {
    where: Prisma.ManualQuestionSetWhereUniqueInput;
    create: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutItemsInput, Prisma.ManualQuestionSetUncheckedCreateWithoutItemsInput>;
};
export type ManualQuestionSetUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.ManualQuestionSetUpdateWithoutItemsInput, Prisma.ManualQuestionSetUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.ManualQuestionSetCreateWithoutItemsInput, Prisma.ManualQuestionSetUncheckedCreateWithoutItemsInput>;
    where?: Prisma.ManualQuestionSetWhereInput;
};
export type ManualQuestionSetUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.ManualQuestionSetWhereInput;
    data: Prisma.XOR<Prisma.ManualQuestionSetUpdateWithoutItemsInput, Prisma.ManualQuestionSetUncheckedUpdateWithoutItemsInput>;
};
export type ManualQuestionSetUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutManualQuestionSetsNestedInput;
    createdByUser?: Prisma.UserUpdateOneRequiredWithoutCreatedManualQuestionSetsNestedInput;
};
export type ManualQuestionSetUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetCreateManyCreatedByUserInput = {
    id?: string;
    tryoutCatalogId: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ManualQuestionSetUpdateWithoutCreatedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalog?: Prisma.TryoutCatalogUpdateOneRequiredWithoutManualQuestionSetsNestedInput;
    items?: Prisma.ManualQuestionSetItemUpdateManyWithoutManualQuestionSetNestedInput;
};
export type ManualQuestionSetUncheckedUpdateWithoutCreatedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ManualQuestionSetItemUncheckedUpdateManyWithoutManualQuestionSetNestedInput;
};
export type ManualQuestionSetUncheckedUpdateManyWithoutCreatedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tryoutCatalogId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetCreateManyTryoutCatalogInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ManualQuestionSetStatus;
    createdBy: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ManualQuestionSetUpdateWithoutTryoutCatalogInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdByUser?: Prisma.UserUpdateOneRequiredWithoutCreatedManualQuestionSetsNestedInput;
    items?: Prisma.ManualQuestionSetItemUpdateManyWithoutManualQuestionSetNestedInput;
};
export type ManualQuestionSetUncheckedUpdateWithoutTryoutCatalogInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ManualQuestionSetItemUncheckedUpdateManyWithoutManualQuestionSetNestedInput;
};
export type ManualQuestionSetUncheckedUpdateManyWithoutTryoutCatalogInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumManualQuestionSetStatusFieldUpdateOperationsInput | $Enums.ManualQuestionSetStatus;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManualQuestionSetCountOutputType = {
    items: number;
};
export type ManualQuestionSetCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | ManualQuestionSetCountOutputTypeCountItemsArgs;
};
export type ManualQuestionSetCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetCountOutputTypeSelect<ExtArgs> | null;
};
export type ManualQuestionSetCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManualQuestionSetItemWhereInput;
};
export type ManualQuestionSetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tryoutCatalogId?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    createdByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.ManualQuestionSet$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.ManualQuestionSetCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["manualQuestionSet"]>;
export type ManualQuestionSetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tryoutCatalogId?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    createdByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["manualQuestionSet"]>;
export type ManualQuestionSetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tryoutCatalogId?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    createdByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["manualQuestionSet"]>;
export type ManualQuestionSetSelectScalar = {
    id?: boolean;
    tryoutCatalogId?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ManualQuestionSetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tryoutCatalogId" | "name" | "description" | "status" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["manualQuestionSet"]>;
export type ManualQuestionSetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    createdByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.ManualQuestionSet$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.ManualQuestionSetCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ManualQuestionSetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    createdByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ManualQuestionSetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutCatalog?: boolean | Prisma.TryoutCatalogDefaultArgs<ExtArgs>;
    createdByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ManualQuestionSetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ManualQuestionSet";
    objects: {
        tryoutCatalog: Prisma.$TryoutCatalogPayload<ExtArgs>;
        createdByUser: Prisma.$UserPayload<ExtArgs>;
        items: Prisma.$ManualQuestionSetItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tryoutCatalogId: string;
        name: string;
        description: string | null;
        status: $Enums.ManualQuestionSetStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["manualQuestionSet"]>;
    composites: {};
};
export type ManualQuestionSetGetPayload<S extends boolean | null | undefined | ManualQuestionSetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload, S>;
export type ManualQuestionSetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ManualQuestionSetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ManualQuestionSetCountAggregateInputType | true;
};
export interface ManualQuestionSetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ManualQuestionSet'];
        meta: {
            name: 'ManualQuestionSet';
        };
    };
    findUnique<T extends ManualQuestionSetFindUniqueArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ManualQuestionSetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ManualQuestionSetFindFirstArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetFindFirstArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ManualQuestionSetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ManualQuestionSetFindManyArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ManualQuestionSetCreateArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetCreateArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ManualQuestionSetCreateManyArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ManualQuestionSetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ManualQuestionSetDeleteArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetDeleteArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ManualQuestionSetUpdateArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetUpdateArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ManualQuestionSetDeleteManyArgs>(args?: Prisma.SelectSubset<T, ManualQuestionSetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ManualQuestionSetUpdateManyArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ManualQuestionSetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ManualQuestionSetUpsertArgs>(args: Prisma.SelectSubset<T, ManualQuestionSetUpsertArgs<ExtArgs>>): Prisma.Prisma__ManualQuestionSetClient<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ManualQuestionSetCountArgs>(args?: Prisma.Subset<T, ManualQuestionSetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ManualQuestionSetCountAggregateOutputType> : number>;
    aggregate<T extends ManualQuestionSetAggregateArgs>(args: Prisma.Subset<T, ManualQuestionSetAggregateArgs>): Prisma.PrismaPromise<GetManualQuestionSetAggregateType<T>>;
    groupBy<T extends ManualQuestionSetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ManualQuestionSetGroupByArgs['orderBy'];
    } : {
        orderBy?: ManualQuestionSetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ManualQuestionSetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManualQuestionSetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ManualQuestionSetFieldRefs;
}
export interface Prisma__ManualQuestionSetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tryoutCatalog<T extends Prisma.TryoutCatalogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TryoutCatalogDefaultArgs<ExtArgs>>): Prisma.Prisma__TryoutCatalogClient<runtime.Types.Result.GetResult<Prisma.$TryoutCatalogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdByUser<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.ManualQuestionSet$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManualQuestionSet$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManualQuestionSetItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ManualQuestionSetFieldRefs {
    readonly id: Prisma.FieldRef<"ManualQuestionSet", 'String'>;
    readonly tryoutCatalogId: Prisma.FieldRef<"ManualQuestionSet", 'String'>;
    readonly name: Prisma.FieldRef<"ManualQuestionSet", 'String'>;
    readonly description: Prisma.FieldRef<"ManualQuestionSet", 'String'>;
    readonly status: Prisma.FieldRef<"ManualQuestionSet", 'ManualQuestionSetStatus'>;
    readonly createdBy: Prisma.FieldRef<"ManualQuestionSet", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ManualQuestionSet", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ManualQuestionSet", 'DateTime'>;
}
export type ManualQuestionSetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
    where: Prisma.ManualQuestionSetWhereUniqueInput;
};
export type ManualQuestionSetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
    where: Prisma.ManualQuestionSetWhereUniqueInput;
};
export type ManualQuestionSetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
    where?: Prisma.ManualQuestionSetWhereInput;
    orderBy?: Prisma.ManualQuestionSetOrderByWithRelationInput | Prisma.ManualQuestionSetOrderByWithRelationInput[];
    cursor?: Prisma.ManualQuestionSetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManualQuestionSetScalarFieldEnum | Prisma.ManualQuestionSetScalarFieldEnum[];
};
export type ManualQuestionSetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
    where?: Prisma.ManualQuestionSetWhereInput;
    orderBy?: Prisma.ManualQuestionSetOrderByWithRelationInput | Prisma.ManualQuestionSetOrderByWithRelationInput[];
    cursor?: Prisma.ManualQuestionSetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManualQuestionSetScalarFieldEnum | Prisma.ManualQuestionSetScalarFieldEnum[];
};
export type ManualQuestionSetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
    where?: Prisma.ManualQuestionSetWhereInput;
    orderBy?: Prisma.ManualQuestionSetOrderByWithRelationInput | Prisma.ManualQuestionSetOrderByWithRelationInput[];
    cursor?: Prisma.ManualQuestionSetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManualQuestionSetScalarFieldEnum | Prisma.ManualQuestionSetScalarFieldEnum[];
};
export type ManualQuestionSetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ManualQuestionSetCreateInput, Prisma.ManualQuestionSetUncheckedCreateInput>;
};
export type ManualQuestionSetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ManualQuestionSetCreateManyInput | Prisma.ManualQuestionSetCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ManualQuestionSetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    data: Prisma.ManualQuestionSetCreateManyInput | Prisma.ManualQuestionSetCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ManualQuestionSetIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ManualQuestionSetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ManualQuestionSetUpdateInput, Prisma.ManualQuestionSetUncheckedUpdateInput>;
    where: Prisma.ManualQuestionSetWhereUniqueInput;
};
export type ManualQuestionSetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ManualQuestionSetUpdateManyMutationInput, Prisma.ManualQuestionSetUncheckedUpdateManyInput>;
    where?: Prisma.ManualQuestionSetWhereInput;
    limit?: number;
};
export type ManualQuestionSetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ManualQuestionSetUpdateManyMutationInput, Prisma.ManualQuestionSetUncheckedUpdateManyInput>;
    where?: Prisma.ManualQuestionSetWhereInput;
    limit?: number;
    include?: Prisma.ManualQuestionSetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ManualQuestionSetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
    where: Prisma.ManualQuestionSetWhereUniqueInput;
    create: Prisma.XOR<Prisma.ManualQuestionSetCreateInput, Prisma.ManualQuestionSetUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ManualQuestionSetUpdateInput, Prisma.ManualQuestionSetUncheckedUpdateInput>;
};
export type ManualQuestionSetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
    where: Prisma.ManualQuestionSetWhereUniqueInput;
};
export type ManualQuestionSetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManualQuestionSetWhereInput;
    limit?: number;
};
export type ManualQuestionSet$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ManualQuestionSetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManualQuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.ManualQuestionSetOmit<ExtArgs> | null;
    include?: Prisma.ManualQuestionSetInclude<ExtArgs> | null;
};
