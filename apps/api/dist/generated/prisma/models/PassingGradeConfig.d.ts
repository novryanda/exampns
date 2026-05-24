import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PassingGradeConfigModel = runtime.Types.Result.DefaultSelection<Prisma.$PassingGradeConfigPayload>;
export type AggregatePassingGradeConfig = {
    _count: PassingGradeConfigCountAggregateOutputType | null;
    _avg: PassingGradeConfigAvgAggregateOutputType | null;
    _sum: PassingGradeConfigSumAggregateOutputType | null;
    _min: PassingGradeConfigMinAggregateOutputType | null;
    _max: PassingGradeConfigMaxAggregateOutputType | null;
};
export type PassingGradeConfigAvgAggregateOutputType = {
    twkMinScore: number | null;
    tiuMinScore: number | null;
    tkpMinScore: number | null;
    totalMinScore: number | null;
};
export type PassingGradeConfigSumAggregateOutputType = {
    twkMinScore: number | null;
    tiuMinScore: number | null;
    tkpMinScore: number | null;
    totalMinScore: number | null;
};
export type PassingGradeConfigMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    twkMinScore: number | null;
    tiuMinScore: number | null;
    tkpMinScore: number | null;
    totalMinScore: number | null;
    isActive: boolean | null;
    effectiveFrom: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PassingGradeConfigMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    twkMinScore: number | null;
    tiuMinScore: number | null;
    tkpMinScore: number | null;
    totalMinScore: number | null;
    isActive: boolean | null;
    effectiveFrom: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PassingGradeConfigCountAggregateOutputType = {
    id: number;
    name: number;
    twkMinScore: number;
    tiuMinScore: number;
    tkpMinScore: number;
    totalMinScore: number;
    isActive: number;
    effectiveFrom: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PassingGradeConfigAvgAggregateInputType = {
    twkMinScore?: true;
    tiuMinScore?: true;
    tkpMinScore?: true;
    totalMinScore?: true;
};
export type PassingGradeConfigSumAggregateInputType = {
    twkMinScore?: true;
    tiuMinScore?: true;
    tkpMinScore?: true;
    totalMinScore?: true;
};
export type PassingGradeConfigMinAggregateInputType = {
    id?: true;
    name?: true;
    twkMinScore?: true;
    tiuMinScore?: true;
    tkpMinScore?: true;
    totalMinScore?: true;
    isActive?: true;
    effectiveFrom?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PassingGradeConfigMaxAggregateInputType = {
    id?: true;
    name?: true;
    twkMinScore?: true;
    tiuMinScore?: true;
    tkpMinScore?: true;
    totalMinScore?: true;
    isActive?: true;
    effectiveFrom?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PassingGradeConfigCountAggregateInputType = {
    id?: true;
    name?: true;
    twkMinScore?: true;
    tiuMinScore?: true;
    tkpMinScore?: true;
    totalMinScore?: true;
    isActive?: true;
    effectiveFrom?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PassingGradeConfigAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PassingGradeConfigWhereInput;
    orderBy?: Prisma.PassingGradeConfigOrderByWithRelationInput | Prisma.PassingGradeConfigOrderByWithRelationInput[];
    cursor?: Prisma.PassingGradeConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PassingGradeConfigCountAggregateInputType;
    _avg?: PassingGradeConfigAvgAggregateInputType;
    _sum?: PassingGradeConfigSumAggregateInputType;
    _min?: PassingGradeConfigMinAggregateInputType;
    _max?: PassingGradeConfigMaxAggregateInputType;
};
export type GetPassingGradeConfigAggregateType<T extends PassingGradeConfigAggregateArgs> = {
    [P in keyof T & keyof AggregatePassingGradeConfig]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePassingGradeConfig[P]> : Prisma.GetScalarType<T[P], AggregatePassingGradeConfig[P]>;
};
export type PassingGradeConfigGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PassingGradeConfigWhereInput;
    orderBy?: Prisma.PassingGradeConfigOrderByWithAggregationInput | Prisma.PassingGradeConfigOrderByWithAggregationInput[];
    by: Prisma.PassingGradeConfigScalarFieldEnum[] | Prisma.PassingGradeConfigScalarFieldEnum;
    having?: Prisma.PassingGradeConfigScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PassingGradeConfigCountAggregateInputType | true;
    _avg?: PassingGradeConfigAvgAggregateInputType;
    _sum?: PassingGradeConfigSumAggregateInputType;
    _min?: PassingGradeConfigMinAggregateInputType;
    _max?: PassingGradeConfigMaxAggregateInputType;
};
export type PassingGradeConfigGroupByOutputType = {
    id: string;
    name: string;
    twkMinScore: number;
    tiuMinScore: number;
    tkpMinScore: number;
    totalMinScore: number;
    isActive: boolean;
    effectiveFrom: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: PassingGradeConfigCountAggregateOutputType | null;
    _avg: PassingGradeConfigAvgAggregateOutputType | null;
    _sum: PassingGradeConfigSumAggregateOutputType | null;
    _min: PassingGradeConfigMinAggregateOutputType | null;
    _max: PassingGradeConfigMaxAggregateOutputType | null;
};
export type GetPassingGradeConfigGroupByPayload<T extends PassingGradeConfigGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PassingGradeConfigGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PassingGradeConfigGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PassingGradeConfigGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PassingGradeConfigGroupByOutputType[P]>;
}>>;
export type PassingGradeConfigWhereInput = {
    AND?: Prisma.PassingGradeConfigWhereInput | Prisma.PassingGradeConfigWhereInput[];
    OR?: Prisma.PassingGradeConfigWhereInput[];
    NOT?: Prisma.PassingGradeConfigWhereInput | Prisma.PassingGradeConfigWhereInput[];
    id?: Prisma.StringFilter<"PassingGradeConfig"> | string;
    name?: Prisma.StringFilter<"PassingGradeConfig"> | string;
    twkMinScore?: Prisma.IntFilter<"PassingGradeConfig"> | number;
    tiuMinScore?: Prisma.IntFilter<"PassingGradeConfig"> | number;
    tkpMinScore?: Prisma.IntFilter<"PassingGradeConfig"> | number;
    totalMinScore?: Prisma.IntFilter<"PassingGradeConfig"> | number;
    isActive?: Prisma.BoolFilter<"PassingGradeConfig"> | boolean;
    effectiveFrom?: Prisma.DateTimeFilter<"PassingGradeConfig"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PassingGradeConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PassingGradeConfig"> | Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogListRelationFilter;
    examResults?: Prisma.ExamResultListRelationFilter;
};
export type PassingGradeConfigOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    twkMinScore?: Prisma.SortOrder;
    tiuMinScore?: Prisma.SortOrder;
    tkpMinScore?: Prisma.SortOrder;
    totalMinScore?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    effectiveFrom?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tryoutCatalogs?: Prisma.TryoutCatalogOrderByRelationAggregateInput;
    examResults?: Prisma.ExamResultOrderByRelationAggregateInput;
};
export type PassingGradeConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PassingGradeConfigWhereInput | Prisma.PassingGradeConfigWhereInput[];
    OR?: Prisma.PassingGradeConfigWhereInput[];
    NOT?: Prisma.PassingGradeConfigWhereInput | Prisma.PassingGradeConfigWhereInput[];
    name?: Prisma.StringFilter<"PassingGradeConfig"> | string;
    twkMinScore?: Prisma.IntFilter<"PassingGradeConfig"> | number;
    tiuMinScore?: Prisma.IntFilter<"PassingGradeConfig"> | number;
    tkpMinScore?: Prisma.IntFilter<"PassingGradeConfig"> | number;
    totalMinScore?: Prisma.IntFilter<"PassingGradeConfig"> | number;
    isActive?: Prisma.BoolFilter<"PassingGradeConfig"> | boolean;
    effectiveFrom?: Prisma.DateTimeFilter<"PassingGradeConfig"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PassingGradeConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PassingGradeConfig"> | Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogListRelationFilter;
    examResults?: Prisma.ExamResultListRelationFilter;
}, "id">;
export type PassingGradeConfigOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    twkMinScore?: Prisma.SortOrder;
    tiuMinScore?: Prisma.SortOrder;
    tkpMinScore?: Prisma.SortOrder;
    totalMinScore?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    effectiveFrom?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PassingGradeConfigCountOrderByAggregateInput;
    _avg?: Prisma.PassingGradeConfigAvgOrderByAggregateInput;
    _max?: Prisma.PassingGradeConfigMaxOrderByAggregateInput;
    _min?: Prisma.PassingGradeConfigMinOrderByAggregateInput;
    _sum?: Prisma.PassingGradeConfigSumOrderByAggregateInput;
};
export type PassingGradeConfigScalarWhereWithAggregatesInput = {
    AND?: Prisma.PassingGradeConfigScalarWhereWithAggregatesInput | Prisma.PassingGradeConfigScalarWhereWithAggregatesInput[];
    OR?: Prisma.PassingGradeConfigScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PassingGradeConfigScalarWhereWithAggregatesInput | Prisma.PassingGradeConfigScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PassingGradeConfig"> | string;
    name?: Prisma.StringWithAggregatesFilter<"PassingGradeConfig"> | string;
    twkMinScore?: Prisma.IntWithAggregatesFilter<"PassingGradeConfig"> | number;
    tiuMinScore?: Prisma.IntWithAggregatesFilter<"PassingGradeConfig"> | number;
    tkpMinScore?: Prisma.IntWithAggregatesFilter<"PassingGradeConfig"> | number;
    totalMinScore?: Prisma.IntWithAggregatesFilter<"PassingGradeConfig"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"PassingGradeConfig"> | boolean;
    effectiveFrom?: Prisma.DateTimeWithAggregatesFilter<"PassingGradeConfig"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PassingGradeConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PassingGradeConfig"> | Date | string;
};
export type PassingGradeConfigCreateInput = {
    id?: string;
    name: string;
    twkMinScore: number;
    tiuMinScore: number;
    tkpMinScore: number;
    totalMinScore: number;
    isActive?: boolean;
    effectiveFrom: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogCreateNestedManyWithoutPassingGradeConfigInput;
    examResults?: Prisma.ExamResultCreateNestedManyWithoutPassingGradeConfigInput;
};
export type PassingGradeConfigUncheckedCreateInput = {
    id?: string;
    name: string;
    twkMinScore: number;
    tiuMinScore: number;
    tkpMinScore: number;
    totalMinScore: number;
    isActive?: boolean;
    effectiveFrom: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogUncheckedCreateNestedManyWithoutPassingGradeConfigInput;
    examResults?: Prisma.ExamResultUncheckedCreateNestedManyWithoutPassingGradeConfigInput;
};
export type PassingGradeConfigUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    twkMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tiuMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tkpMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    effectiveFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogUpdateManyWithoutPassingGradeConfigNestedInput;
    examResults?: Prisma.ExamResultUpdateManyWithoutPassingGradeConfigNestedInput;
};
export type PassingGradeConfigUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    twkMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tiuMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tkpMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    effectiveFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogUncheckedUpdateManyWithoutPassingGradeConfigNestedInput;
    examResults?: Prisma.ExamResultUncheckedUpdateManyWithoutPassingGradeConfigNestedInput;
};
export type PassingGradeConfigCreateManyInput = {
    id?: string;
    name: string;
    twkMinScore: number;
    tiuMinScore: number;
    tkpMinScore: number;
    totalMinScore: number;
    isActive?: boolean;
    effectiveFrom: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PassingGradeConfigUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    twkMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tiuMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tkpMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    effectiveFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PassingGradeConfigUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    twkMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tiuMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tkpMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    effectiveFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PassingGradeConfigNullableScalarRelationFilter = {
    is?: Prisma.PassingGradeConfigWhereInput | null;
    isNot?: Prisma.PassingGradeConfigWhereInput | null;
};
export type PassingGradeConfigScalarRelationFilter = {
    is?: Prisma.PassingGradeConfigWhereInput;
    isNot?: Prisma.PassingGradeConfigWhereInput;
};
export type PassingGradeConfigCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    twkMinScore?: Prisma.SortOrder;
    tiuMinScore?: Prisma.SortOrder;
    tkpMinScore?: Prisma.SortOrder;
    totalMinScore?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    effectiveFrom?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PassingGradeConfigAvgOrderByAggregateInput = {
    twkMinScore?: Prisma.SortOrder;
    tiuMinScore?: Prisma.SortOrder;
    tkpMinScore?: Prisma.SortOrder;
    totalMinScore?: Prisma.SortOrder;
};
export type PassingGradeConfigMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    twkMinScore?: Prisma.SortOrder;
    tiuMinScore?: Prisma.SortOrder;
    tkpMinScore?: Prisma.SortOrder;
    totalMinScore?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    effectiveFrom?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PassingGradeConfigMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    twkMinScore?: Prisma.SortOrder;
    tiuMinScore?: Prisma.SortOrder;
    tkpMinScore?: Prisma.SortOrder;
    totalMinScore?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    effectiveFrom?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PassingGradeConfigSumOrderByAggregateInput = {
    twkMinScore?: Prisma.SortOrder;
    tiuMinScore?: Prisma.SortOrder;
    tkpMinScore?: Prisma.SortOrder;
    totalMinScore?: Prisma.SortOrder;
};
export type PassingGradeConfigCreateNestedOneWithoutTryoutCatalogsInput = {
    create?: Prisma.XOR<Prisma.PassingGradeConfigCreateWithoutTryoutCatalogsInput, Prisma.PassingGradeConfigUncheckedCreateWithoutTryoutCatalogsInput>;
    connectOrCreate?: Prisma.PassingGradeConfigCreateOrConnectWithoutTryoutCatalogsInput;
    connect?: Prisma.PassingGradeConfigWhereUniqueInput;
};
export type PassingGradeConfigUpdateOneWithoutTryoutCatalogsNestedInput = {
    create?: Prisma.XOR<Prisma.PassingGradeConfigCreateWithoutTryoutCatalogsInput, Prisma.PassingGradeConfigUncheckedCreateWithoutTryoutCatalogsInput>;
    connectOrCreate?: Prisma.PassingGradeConfigCreateOrConnectWithoutTryoutCatalogsInput;
    upsert?: Prisma.PassingGradeConfigUpsertWithoutTryoutCatalogsInput;
    disconnect?: Prisma.PassingGradeConfigWhereInput | boolean;
    delete?: Prisma.PassingGradeConfigWhereInput | boolean;
    connect?: Prisma.PassingGradeConfigWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PassingGradeConfigUpdateToOneWithWhereWithoutTryoutCatalogsInput, Prisma.PassingGradeConfigUpdateWithoutTryoutCatalogsInput>, Prisma.PassingGradeConfigUncheckedUpdateWithoutTryoutCatalogsInput>;
};
export type PassingGradeConfigCreateNestedOneWithoutExamResultsInput = {
    create?: Prisma.XOR<Prisma.PassingGradeConfigCreateWithoutExamResultsInput, Prisma.PassingGradeConfigUncheckedCreateWithoutExamResultsInput>;
    connectOrCreate?: Prisma.PassingGradeConfigCreateOrConnectWithoutExamResultsInput;
    connect?: Prisma.PassingGradeConfigWhereUniqueInput;
};
export type PassingGradeConfigUpdateOneRequiredWithoutExamResultsNestedInput = {
    create?: Prisma.XOR<Prisma.PassingGradeConfigCreateWithoutExamResultsInput, Prisma.PassingGradeConfigUncheckedCreateWithoutExamResultsInput>;
    connectOrCreate?: Prisma.PassingGradeConfigCreateOrConnectWithoutExamResultsInput;
    upsert?: Prisma.PassingGradeConfigUpsertWithoutExamResultsInput;
    connect?: Prisma.PassingGradeConfigWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PassingGradeConfigUpdateToOneWithWhereWithoutExamResultsInput, Prisma.PassingGradeConfigUpdateWithoutExamResultsInput>, Prisma.PassingGradeConfigUncheckedUpdateWithoutExamResultsInput>;
};
export type PassingGradeConfigCreateWithoutTryoutCatalogsInput = {
    id?: string;
    name: string;
    twkMinScore: number;
    tiuMinScore: number;
    tkpMinScore: number;
    totalMinScore: number;
    isActive?: boolean;
    effectiveFrom: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    examResults?: Prisma.ExamResultCreateNestedManyWithoutPassingGradeConfigInput;
};
export type PassingGradeConfigUncheckedCreateWithoutTryoutCatalogsInput = {
    id?: string;
    name: string;
    twkMinScore: number;
    tiuMinScore: number;
    tkpMinScore: number;
    totalMinScore: number;
    isActive?: boolean;
    effectiveFrom: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    examResults?: Prisma.ExamResultUncheckedCreateNestedManyWithoutPassingGradeConfigInput;
};
export type PassingGradeConfigCreateOrConnectWithoutTryoutCatalogsInput = {
    where: Prisma.PassingGradeConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.PassingGradeConfigCreateWithoutTryoutCatalogsInput, Prisma.PassingGradeConfigUncheckedCreateWithoutTryoutCatalogsInput>;
};
export type PassingGradeConfigUpsertWithoutTryoutCatalogsInput = {
    update: Prisma.XOR<Prisma.PassingGradeConfigUpdateWithoutTryoutCatalogsInput, Prisma.PassingGradeConfigUncheckedUpdateWithoutTryoutCatalogsInput>;
    create: Prisma.XOR<Prisma.PassingGradeConfigCreateWithoutTryoutCatalogsInput, Prisma.PassingGradeConfigUncheckedCreateWithoutTryoutCatalogsInput>;
    where?: Prisma.PassingGradeConfigWhereInput;
};
export type PassingGradeConfigUpdateToOneWithWhereWithoutTryoutCatalogsInput = {
    where?: Prisma.PassingGradeConfigWhereInput;
    data: Prisma.XOR<Prisma.PassingGradeConfigUpdateWithoutTryoutCatalogsInput, Prisma.PassingGradeConfigUncheckedUpdateWithoutTryoutCatalogsInput>;
};
export type PassingGradeConfigUpdateWithoutTryoutCatalogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    twkMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tiuMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tkpMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    effectiveFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examResults?: Prisma.ExamResultUpdateManyWithoutPassingGradeConfigNestedInput;
};
export type PassingGradeConfigUncheckedUpdateWithoutTryoutCatalogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    twkMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tiuMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tkpMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    effectiveFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examResults?: Prisma.ExamResultUncheckedUpdateManyWithoutPassingGradeConfigNestedInput;
};
export type PassingGradeConfigCreateWithoutExamResultsInput = {
    id?: string;
    name: string;
    twkMinScore: number;
    tiuMinScore: number;
    tkpMinScore: number;
    totalMinScore: number;
    isActive?: boolean;
    effectiveFrom: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogCreateNestedManyWithoutPassingGradeConfigInput;
};
export type PassingGradeConfigUncheckedCreateWithoutExamResultsInput = {
    id?: string;
    name: string;
    twkMinScore: number;
    tiuMinScore: number;
    tkpMinScore: number;
    totalMinScore: number;
    isActive?: boolean;
    effectiveFrom: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogUncheckedCreateNestedManyWithoutPassingGradeConfigInput;
};
export type PassingGradeConfigCreateOrConnectWithoutExamResultsInput = {
    where: Prisma.PassingGradeConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.PassingGradeConfigCreateWithoutExamResultsInput, Prisma.PassingGradeConfigUncheckedCreateWithoutExamResultsInput>;
};
export type PassingGradeConfigUpsertWithoutExamResultsInput = {
    update: Prisma.XOR<Prisma.PassingGradeConfigUpdateWithoutExamResultsInput, Prisma.PassingGradeConfigUncheckedUpdateWithoutExamResultsInput>;
    create: Prisma.XOR<Prisma.PassingGradeConfigCreateWithoutExamResultsInput, Prisma.PassingGradeConfigUncheckedCreateWithoutExamResultsInput>;
    where?: Prisma.PassingGradeConfigWhereInput;
};
export type PassingGradeConfigUpdateToOneWithWhereWithoutExamResultsInput = {
    where?: Prisma.PassingGradeConfigWhereInput;
    data: Prisma.XOR<Prisma.PassingGradeConfigUpdateWithoutExamResultsInput, Prisma.PassingGradeConfigUncheckedUpdateWithoutExamResultsInput>;
};
export type PassingGradeConfigUpdateWithoutExamResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    twkMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tiuMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tkpMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    effectiveFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogUpdateManyWithoutPassingGradeConfigNestedInput;
};
export type PassingGradeConfigUncheckedUpdateWithoutExamResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    twkMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tiuMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    tkpMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    totalMinScore?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    effectiveFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutCatalogs?: Prisma.TryoutCatalogUncheckedUpdateManyWithoutPassingGradeConfigNestedInput;
};
export type PassingGradeConfigCountOutputType = {
    tryoutCatalogs: number;
    examResults: number;
};
export type PassingGradeConfigCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutCatalogs?: boolean | PassingGradeConfigCountOutputTypeCountTryoutCatalogsArgs;
    examResults?: boolean | PassingGradeConfigCountOutputTypeCountExamResultsArgs;
};
export type PassingGradeConfigCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigCountOutputTypeSelect<ExtArgs> | null;
};
export type PassingGradeConfigCountOutputTypeCountTryoutCatalogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TryoutCatalogWhereInput;
};
export type PassingGradeConfigCountOutputTypeCountExamResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamResultWhereInput;
};
export type PassingGradeConfigSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    twkMinScore?: boolean;
    tiuMinScore?: boolean;
    tkpMinScore?: boolean;
    totalMinScore?: boolean;
    isActive?: boolean;
    effectiveFrom?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tryoutCatalogs?: boolean | Prisma.PassingGradeConfig$tryoutCatalogsArgs<ExtArgs>;
    examResults?: boolean | Prisma.PassingGradeConfig$examResultsArgs<ExtArgs>;
    _count?: boolean | Prisma.PassingGradeConfigCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["passingGradeConfig"]>;
export type PassingGradeConfigSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    twkMinScore?: boolean;
    tiuMinScore?: boolean;
    tkpMinScore?: boolean;
    totalMinScore?: boolean;
    isActive?: boolean;
    effectiveFrom?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["passingGradeConfig"]>;
export type PassingGradeConfigSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    twkMinScore?: boolean;
    tiuMinScore?: boolean;
    tkpMinScore?: boolean;
    totalMinScore?: boolean;
    isActive?: boolean;
    effectiveFrom?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["passingGradeConfig"]>;
export type PassingGradeConfigSelectScalar = {
    id?: boolean;
    name?: boolean;
    twkMinScore?: boolean;
    tiuMinScore?: boolean;
    tkpMinScore?: boolean;
    totalMinScore?: boolean;
    isActive?: boolean;
    effectiveFrom?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PassingGradeConfigOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "twkMinScore" | "tiuMinScore" | "tkpMinScore" | "totalMinScore" | "isActive" | "effectiveFrom" | "createdAt" | "updatedAt", ExtArgs["result"]["passingGradeConfig"]>;
export type PassingGradeConfigInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tryoutCatalogs?: boolean | Prisma.PassingGradeConfig$tryoutCatalogsArgs<ExtArgs>;
    examResults?: boolean | Prisma.PassingGradeConfig$examResultsArgs<ExtArgs>;
    _count?: boolean | Prisma.PassingGradeConfigCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PassingGradeConfigIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PassingGradeConfigIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PassingGradeConfigPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PassingGradeConfig";
    objects: {
        tryoutCatalogs: Prisma.$TryoutCatalogPayload<ExtArgs>[];
        examResults: Prisma.$ExamResultPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        twkMinScore: number;
        tiuMinScore: number;
        tkpMinScore: number;
        totalMinScore: number;
        isActive: boolean;
        effectiveFrom: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["passingGradeConfig"]>;
    composites: {};
};
export type PassingGradeConfigGetPayload<S extends boolean | null | undefined | PassingGradeConfigDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload, S>;
export type PassingGradeConfigCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PassingGradeConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PassingGradeConfigCountAggregateInputType | true;
};
export interface PassingGradeConfigDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PassingGradeConfig'];
        meta: {
            name: 'PassingGradeConfig';
        };
    };
    findUnique<T extends PassingGradeConfigFindUniqueArgs>(args: Prisma.SelectSubset<T, PassingGradeConfigFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PassingGradeConfigClient<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PassingGradeConfigFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PassingGradeConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PassingGradeConfigClient<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PassingGradeConfigFindFirstArgs>(args?: Prisma.SelectSubset<T, PassingGradeConfigFindFirstArgs<ExtArgs>>): Prisma.Prisma__PassingGradeConfigClient<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PassingGradeConfigFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PassingGradeConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PassingGradeConfigClient<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PassingGradeConfigFindManyArgs>(args?: Prisma.SelectSubset<T, PassingGradeConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PassingGradeConfigCreateArgs>(args: Prisma.SelectSubset<T, PassingGradeConfigCreateArgs<ExtArgs>>): Prisma.Prisma__PassingGradeConfigClient<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PassingGradeConfigCreateManyArgs>(args?: Prisma.SelectSubset<T, PassingGradeConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PassingGradeConfigCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PassingGradeConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PassingGradeConfigDeleteArgs>(args: Prisma.SelectSubset<T, PassingGradeConfigDeleteArgs<ExtArgs>>): Prisma.Prisma__PassingGradeConfigClient<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PassingGradeConfigUpdateArgs>(args: Prisma.SelectSubset<T, PassingGradeConfigUpdateArgs<ExtArgs>>): Prisma.Prisma__PassingGradeConfigClient<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PassingGradeConfigDeleteManyArgs>(args?: Prisma.SelectSubset<T, PassingGradeConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PassingGradeConfigUpdateManyArgs>(args: Prisma.SelectSubset<T, PassingGradeConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PassingGradeConfigUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PassingGradeConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PassingGradeConfigUpsertArgs>(args: Prisma.SelectSubset<T, PassingGradeConfigUpsertArgs<ExtArgs>>): Prisma.Prisma__PassingGradeConfigClient<runtime.Types.Result.GetResult<Prisma.$PassingGradeConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PassingGradeConfigCountArgs>(args?: Prisma.Subset<T, PassingGradeConfigCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PassingGradeConfigCountAggregateOutputType> : number>;
    aggregate<T extends PassingGradeConfigAggregateArgs>(args: Prisma.Subset<T, PassingGradeConfigAggregateArgs>): Prisma.PrismaPromise<GetPassingGradeConfigAggregateType<T>>;
    groupBy<T extends PassingGradeConfigGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PassingGradeConfigGroupByArgs['orderBy'];
    } : {
        orderBy?: PassingGradeConfigGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PassingGradeConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPassingGradeConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PassingGradeConfigFieldRefs;
}
export interface Prisma__PassingGradeConfigClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tryoutCatalogs<T extends Prisma.PassingGradeConfig$tryoutCatalogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PassingGradeConfig$tryoutCatalogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TryoutCatalogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    examResults<T extends Prisma.PassingGradeConfig$examResultsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PassingGradeConfig$examResultsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PassingGradeConfigFieldRefs {
    readonly id: Prisma.FieldRef<"PassingGradeConfig", 'String'>;
    readonly name: Prisma.FieldRef<"PassingGradeConfig", 'String'>;
    readonly twkMinScore: Prisma.FieldRef<"PassingGradeConfig", 'Int'>;
    readonly tiuMinScore: Prisma.FieldRef<"PassingGradeConfig", 'Int'>;
    readonly tkpMinScore: Prisma.FieldRef<"PassingGradeConfig", 'Int'>;
    readonly totalMinScore: Prisma.FieldRef<"PassingGradeConfig", 'Int'>;
    readonly isActive: Prisma.FieldRef<"PassingGradeConfig", 'Boolean'>;
    readonly effectiveFrom: Prisma.FieldRef<"PassingGradeConfig", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PassingGradeConfig", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PassingGradeConfig", 'DateTime'>;
}
export type PassingGradeConfigFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
    where: Prisma.PassingGradeConfigWhereUniqueInput;
};
export type PassingGradeConfigFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
    where: Prisma.PassingGradeConfigWhereUniqueInput;
};
export type PassingGradeConfigFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
    where?: Prisma.PassingGradeConfigWhereInput;
    orderBy?: Prisma.PassingGradeConfigOrderByWithRelationInput | Prisma.PassingGradeConfigOrderByWithRelationInput[];
    cursor?: Prisma.PassingGradeConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PassingGradeConfigScalarFieldEnum | Prisma.PassingGradeConfigScalarFieldEnum[];
};
export type PassingGradeConfigFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
    where?: Prisma.PassingGradeConfigWhereInput;
    orderBy?: Prisma.PassingGradeConfigOrderByWithRelationInput | Prisma.PassingGradeConfigOrderByWithRelationInput[];
    cursor?: Prisma.PassingGradeConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PassingGradeConfigScalarFieldEnum | Prisma.PassingGradeConfigScalarFieldEnum[];
};
export type PassingGradeConfigFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
    where?: Prisma.PassingGradeConfigWhereInput;
    orderBy?: Prisma.PassingGradeConfigOrderByWithRelationInput | Prisma.PassingGradeConfigOrderByWithRelationInput[];
    cursor?: Prisma.PassingGradeConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PassingGradeConfigScalarFieldEnum | Prisma.PassingGradeConfigScalarFieldEnum[];
};
export type PassingGradeConfigCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PassingGradeConfigCreateInput, Prisma.PassingGradeConfigUncheckedCreateInput>;
};
export type PassingGradeConfigCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PassingGradeConfigCreateManyInput | Prisma.PassingGradeConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PassingGradeConfigCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    data: Prisma.PassingGradeConfigCreateManyInput | Prisma.PassingGradeConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PassingGradeConfigUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PassingGradeConfigUpdateInput, Prisma.PassingGradeConfigUncheckedUpdateInput>;
    where: Prisma.PassingGradeConfigWhereUniqueInput;
};
export type PassingGradeConfigUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PassingGradeConfigUpdateManyMutationInput, Prisma.PassingGradeConfigUncheckedUpdateManyInput>;
    where?: Prisma.PassingGradeConfigWhereInput;
    limit?: number;
};
export type PassingGradeConfigUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PassingGradeConfigUpdateManyMutationInput, Prisma.PassingGradeConfigUncheckedUpdateManyInput>;
    where?: Prisma.PassingGradeConfigWhereInput;
    limit?: number;
};
export type PassingGradeConfigUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
    where: Prisma.PassingGradeConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.PassingGradeConfigCreateInput, Prisma.PassingGradeConfigUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PassingGradeConfigUpdateInput, Prisma.PassingGradeConfigUncheckedUpdateInput>;
};
export type PassingGradeConfigDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
    where: Prisma.PassingGradeConfigWhereUniqueInput;
};
export type PassingGradeConfigDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PassingGradeConfigWhereInput;
    limit?: number;
};
export type PassingGradeConfig$tryoutCatalogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TryoutCatalogSelect<ExtArgs> | null;
    omit?: Prisma.TryoutCatalogOmit<ExtArgs> | null;
    include?: Prisma.TryoutCatalogInclude<ExtArgs> | null;
    where?: Prisma.TryoutCatalogWhereInput;
    orderBy?: Prisma.TryoutCatalogOrderByWithRelationInput | Prisma.TryoutCatalogOrderByWithRelationInput[];
    cursor?: Prisma.TryoutCatalogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TryoutCatalogScalarFieldEnum | Prisma.TryoutCatalogScalarFieldEnum[];
};
export type PassingGradeConfig$examResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    where?: Prisma.ExamResultWhereInput;
    orderBy?: Prisma.ExamResultOrderByWithRelationInput | Prisma.ExamResultOrderByWithRelationInput[];
    cursor?: Prisma.ExamResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamResultScalarFieldEnum | Prisma.ExamResultScalarFieldEnum[];
};
export type PassingGradeConfigDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PassingGradeConfigSelect<ExtArgs> | null;
    omit?: Prisma.PassingGradeConfigOmit<ExtArgs> | null;
    include?: Prisma.PassingGradeConfigInclude<ExtArgs> | null;
};
