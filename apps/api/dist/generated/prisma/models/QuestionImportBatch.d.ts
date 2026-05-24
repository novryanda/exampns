import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuestionImportBatchModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionImportBatchPayload>;
export type AggregateQuestionImportBatch = {
    _count: QuestionImportBatchCountAggregateOutputType | null;
    _avg: QuestionImportBatchAvgAggregateOutputType | null;
    _sum: QuestionImportBatchSumAggregateOutputType | null;
    _min: QuestionImportBatchMinAggregateOutputType | null;
    _max: QuestionImportBatchMaxAggregateOutputType | null;
};
export type QuestionImportBatchAvgAggregateOutputType = {
    fileSizeBytes: number | null;
    totalDetected: number | null;
    validCount: number | null;
    invalidCount: number | null;
};
export type QuestionImportBatchSumAggregateOutputType = {
    fileSizeBytes: number | null;
    totalDetected: number | null;
    validCount: number | null;
    invalidCount: number | null;
};
export type QuestionImportBatchMinAggregateOutputType = {
    id: string | null;
    uploadedBy: string | null;
    fileName: string | null;
    fileUrl: string | null;
    fileSizeBytes: number | null;
    status: $Enums.ImportBatchStatus | null;
    totalDetected: number | null;
    validCount: number | null;
    invalidCount: number | null;
    errorMessage: string | null;
    createdAt: Date | null;
    completedAt: Date | null;
};
export type QuestionImportBatchMaxAggregateOutputType = {
    id: string | null;
    uploadedBy: string | null;
    fileName: string | null;
    fileUrl: string | null;
    fileSizeBytes: number | null;
    status: $Enums.ImportBatchStatus | null;
    totalDetected: number | null;
    validCount: number | null;
    invalidCount: number | null;
    errorMessage: string | null;
    createdAt: Date | null;
    completedAt: Date | null;
};
export type QuestionImportBatchCountAggregateOutputType = {
    id: number;
    uploadedBy: number;
    fileName: number;
    fileUrl: number;
    fileSizeBytes: number;
    status: number;
    totalDetected: number;
    validCount: number;
    invalidCount: number;
    errorMessage: number;
    createdAt: number;
    completedAt: number;
    _all: number;
};
export type QuestionImportBatchAvgAggregateInputType = {
    fileSizeBytes?: true;
    totalDetected?: true;
    validCount?: true;
    invalidCount?: true;
};
export type QuestionImportBatchSumAggregateInputType = {
    fileSizeBytes?: true;
    totalDetected?: true;
    validCount?: true;
    invalidCount?: true;
};
export type QuestionImportBatchMinAggregateInputType = {
    id?: true;
    uploadedBy?: true;
    fileName?: true;
    fileUrl?: true;
    fileSizeBytes?: true;
    status?: true;
    totalDetected?: true;
    validCount?: true;
    invalidCount?: true;
    errorMessage?: true;
    createdAt?: true;
    completedAt?: true;
};
export type QuestionImportBatchMaxAggregateInputType = {
    id?: true;
    uploadedBy?: true;
    fileName?: true;
    fileUrl?: true;
    fileSizeBytes?: true;
    status?: true;
    totalDetected?: true;
    validCount?: true;
    invalidCount?: true;
    errorMessage?: true;
    createdAt?: true;
    completedAt?: true;
};
export type QuestionImportBatchCountAggregateInputType = {
    id?: true;
    uploadedBy?: true;
    fileName?: true;
    fileUrl?: true;
    fileSizeBytes?: true;
    status?: true;
    totalDetected?: true;
    validCount?: true;
    invalidCount?: true;
    errorMessage?: true;
    createdAt?: true;
    completedAt?: true;
    _all?: true;
};
export type QuestionImportBatchAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionImportBatchWhereInput;
    orderBy?: Prisma.QuestionImportBatchOrderByWithRelationInput | Prisma.QuestionImportBatchOrderByWithRelationInput[];
    cursor?: Prisma.QuestionImportBatchWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionImportBatchCountAggregateInputType;
    _avg?: QuestionImportBatchAvgAggregateInputType;
    _sum?: QuestionImportBatchSumAggregateInputType;
    _min?: QuestionImportBatchMinAggregateInputType;
    _max?: QuestionImportBatchMaxAggregateInputType;
};
export type GetQuestionImportBatchAggregateType<T extends QuestionImportBatchAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestionImportBatch]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestionImportBatch[P]> : Prisma.GetScalarType<T[P], AggregateQuestionImportBatch[P]>;
};
export type QuestionImportBatchGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionImportBatchWhereInput;
    orderBy?: Prisma.QuestionImportBatchOrderByWithAggregationInput | Prisma.QuestionImportBatchOrderByWithAggregationInput[];
    by: Prisma.QuestionImportBatchScalarFieldEnum[] | Prisma.QuestionImportBatchScalarFieldEnum;
    having?: Prisma.QuestionImportBatchScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionImportBatchCountAggregateInputType | true;
    _avg?: QuestionImportBatchAvgAggregateInputType;
    _sum?: QuestionImportBatchSumAggregateInputType;
    _min?: QuestionImportBatchMinAggregateInputType;
    _max?: QuestionImportBatchMaxAggregateInputType;
};
export type QuestionImportBatchGroupByOutputType = {
    id: string;
    uploadedBy: string;
    fileName: string;
    fileUrl: string | null;
    fileSizeBytes: number;
    status: $Enums.ImportBatchStatus;
    totalDetected: number;
    validCount: number;
    invalidCount: number;
    errorMessage: string | null;
    createdAt: Date;
    completedAt: Date | null;
    _count: QuestionImportBatchCountAggregateOutputType | null;
    _avg: QuestionImportBatchAvgAggregateOutputType | null;
    _sum: QuestionImportBatchSumAggregateOutputType | null;
    _min: QuestionImportBatchMinAggregateOutputType | null;
    _max: QuestionImportBatchMaxAggregateOutputType | null;
};
export type GetQuestionImportBatchGroupByPayload<T extends QuestionImportBatchGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionImportBatchGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionImportBatchGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionImportBatchGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionImportBatchGroupByOutputType[P]>;
}>>;
export type QuestionImportBatchWhereInput = {
    AND?: Prisma.QuestionImportBatchWhereInput | Prisma.QuestionImportBatchWhereInput[];
    OR?: Prisma.QuestionImportBatchWhereInput[];
    NOT?: Prisma.QuestionImportBatchWhereInput | Prisma.QuestionImportBatchWhereInput[];
    id?: Prisma.StringFilter<"QuestionImportBatch"> | string;
    uploadedBy?: Prisma.StringFilter<"QuestionImportBatch"> | string;
    fileName?: Prisma.StringFilter<"QuestionImportBatch"> | string;
    fileUrl?: Prisma.StringNullableFilter<"QuestionImportBatch"> | string | null;
    fileSizeBytes?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    status?: Prisma.EnumImportBatchStatusFilter<"QuestionImportBatch"> | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    validCount?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    invalidCount?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    errorMessage?: Prisma.StringNullableFilter<"QuestionImportBatch"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"QuestionImportBatch"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"QuestionImportBatch"> | Date | string | null;
    uploadedByUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    parsedQuestions?: Prisma.ParsedQuestionReviewListRelationFilter;
};
export type QuestionImportBatchOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    uploadedBy?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileSizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalDetected?: Prisma.SortOrder;
    validCount?: Prisma.SortOrder;
    invalidCount?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploadedByUser?: Prisma.UserOrderByWithRelationInput;
    parsedQuestions?: Prisma.ParsedQuestionReviewOrderByRelationAggregateInput;
};
export type QuestionImportBatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.QuestionImportBatchWhereInput | Prisma.QuestionImportBatchWhereInput[];
    OR?: Prisma.QuestionImportBatchWhereInput[];
    NOT?: Prisma.QuestionImportBatchWhereInput | Prisma.QuestionImportBatchWhereInput[];
    uploadedBy?: Prisma.StringFilter<"QuestionImportBatch"> | string;
    fileName?: Prisma.StringFilter<"QuestionImportBatch"> | string;
    fileUrl?: Prisma.StringNullableFilter<"QuestionImportBatch"> | string | null;
    fileSizeBytes?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    status?: Prisma.EnumImportBatchStatusFilter<"QuestionImportBatch"> | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    validCount?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    invalidCount?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    errorMessage?: Prisma.StringNullableFilter<"QuestionImportBatch"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"QuestionImportBatch"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"QuestionImportBatch"> | Date | string | null;
    uploadedByUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    parsedQuestions?: Prisma.ParsedQuestionReviewListRelationFilter;
}, "id">;
export type QuestionImportBatchOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    uploadedBy?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileSizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalDetected?: Prisma.SortOrder;
    validCount?: Prisma.SortOrder;
    invalidCount?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.QuestionImportBatchCountOrderByAggregateInput;
    _avg?: Prisma.QuestionImportBatchAvgOrderByAggregateInput;
    _max?: Prisma.QuestionImportBatchMaxOrderByAggregateInput;
    _min?: Prisma.QuestionImportBatchMinOrderByAggregateInput;
    _sum?: Prisma.QuestionImportBatchSumOrderByAggregateInput;
};
export type QuestionImportBatchScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionImportBatchScalarWhereWithAggregatesInput | Prisma.QuestionImportBatchScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionImportBatchScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionImportBatchScalarWhereWithAggregatesInput | Prisma.QuestionImportBatchScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"QuestionImportBatch"> | string;
    uploadedBy?: Prisma.StringWithAggregatesFilter<"QuestionImportBatch"> | string;
    fileName?: Prisma.StringWithAggregatesFilter<"QuestionImportBatch"> | string;
    fileUrl?: Prisma.StringNullableWithAggregatesFilter<"QuestionImportBatch"> | string | null;
    fileSizeBytes?: Prisma.IntWithAggregatesFilter<"QuestionImportBatch"> | number;
    status?: Prisma.EnumImportBatchStatusWithAggregatesFilter<"QuestionImportBatch"> | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntWithAggregatesFilter<"QuestionImportBatch"> | number;
    validCount?: Prisma.IntWithAggregatesFilter<"QuestionImportBatch"> | number;
    invalidCount?: Prisma.IntWithAggregatesFilter<"QuestionImportBatch"> | number;
    errorMessage?: Prisma.StringNullableWithAggregatesFilter<"QuestionImportBatch"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"QuestionImportBatch"> | Date | string;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QuestionImportBatch"> | Date | string | null;
};
export type QuestionImportBatchCreateInput = {
    id?: string;
    fileName: string;
    fileUrl?: string | null;
    fileSizeBytes: number;
    status: $Enums.ImportBatchStatus;
    totalDetected?: number;
    validCount?: number;
    invalidCount?: number;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    uploadedByUser: Prisma.UserCreateNestedOneWithoutUploadedImportBatchesInput;
    parsedQuestions?: Prisma.ParsedQuestionReviewCreateNestedManyWithoutBatchInput;
};
export type QuestionImportBatchUncheckedCreateInput = {
    id?: string;
    uploadedBy: string;
    fileName: string;
    fileUrl?: string | null;
    fileSizeBytes: number;
    status: $Enums.ImportBatchStatus;
    totalDetected?: number;
    validCount?: number;
    invalidCount?: number;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    parsedQuestions?: Prisma.ParsedQuestionReviewUncheckedCreateNestedManyWithoutBatchInput;
};
export type QuestionImportBatchUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumImportBatchStatusFieldUpdateOperationsInput | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    validCount?: Prisma.IntFieldUpdateOperationsInput | number;
    invalidCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    uploadedByUser?: Prisma.UserUpdateOneRequiredWithoutUploadedImportBatchesNestedInput;
    parsedQuestions?: Prisma.ParsedQuestionReviewUpdateManyWithoutBatchNestedInput;
};
export type QuestionImportBatchUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumImportBatchStatusFieldUpdateOperationsInput | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    validCount?: Prisma.IntFieldUpdateOperationsInput | number;
    invalidCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    parsedQuestions?: Prisma.ParsedQuestionReviewUncheckedUpdateManyWithoutBatchNestedInput;
};
export type QuestionImportBatchCreateManyInput = {
    id?: string;
    uploadedBy: string;
    fileName: string;
    fileUrl?: string | null;
    fileSizeBytes: number;
    status: $Enums.ImportBatchStatus;
    totalDetected?: number;
    validCount?: number;
    invalidCount?: number;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type QuestionImportBatchUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumImportBatchStatusFieldUpdateOperationsInput | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    validCount?: Prisma.IntFieldUpdateOperationsInput | number;
    invalidCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QuestionImportBatchUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumImportBatchStatusFieldUpdateOperationsInput | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    validCount?: Prisma.IntFieldUpdateOperationsInput | number;
    invalidCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QuestionImportBatchListRelationFilter = {
    every?: Prisma.QuestionImportBatchWhereInput;
    some?: Prisma.QuestionImportBatchWhereInput;
    none?: Prisma.QuestionImportBatchWhereInput;
};
export type QuestionImportBatchOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuestionImportBatchCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uploadedBy?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    fileSizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalDetected?: Prisma.SortOrder;
    validCount?: Prisma.SortOrder;
    invalidCount?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type QuestionImportBatchAvgOrderByAggregateInput = {
    fileSizeBytes?: Prisma.SortOrder;
    totalDetected?: Prisma.SortOrder;
    validCount?: Prisma.SortOrder;
    invalidCount?: Prisma.SortOrder;
};
export type QuestionImportBatchMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uploadedBy?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    fileSizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalDetected?: Prisma.SortOrder;
    validCount?: Prisma.SortOrder;
    invalidCount?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type QuestionImportBatchMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uploadedBy?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    fileSizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalDetected?: Prisma.SortOrder;
    validCount?: Prisma.SortOrder;
    invalidCount?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type QuestionImportBatchSumOrderByAggregateInput = {
    fileSizeBytes?: Prisma.SortOrder;
    totalDetected?: Prisma.SortOrder;
    validCount?: Prisma.SortOrder;
    invalidCount?: Prisma.SortOrder;
};
export type QuestionImportBatchScalarRelationFilter = {
    is?: Prisma.QuestionImportBatchWhereInput;
    isNot?: Prisma.QuestionImportBatchWhereInput;
};
export type QuestionImportBatchCreateNestedManyWithoutUploadedByUserInput = {
    create?: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput, Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput> | Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput[] | Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput[];
    connectOrCreate?: Prisma.QuestionImportBatchCreateOrConnectWithoutUploadedByUserInput | Prisma.QuestionImportBatchCreateOrConnectWithoutUploadedByUserInput[];
    createMany?: Prisma.QuestionImportBatchCreateManyUploadedByUserInputEnvelope;
    connect?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
};
export type QuestionImportBatchUncheckedCreateNestedManyWithoutUploadedByUserInput = {
    create?: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput, Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput> | Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput[] | Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput[];
    connectOrCreate?: Prisma.QuestionImportBatchCreateOrConnectWithoutUploadedByUserInput | Prisma.QuestionImportBatchCreateOrConnectWithoutUploadedByUserInput[];
    createMany?: Prisma.QuestionImportBatchCreateManyUploadedByUserInputEnvelope;
    connect?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
};
export type QuestionImportBatchUpdateManyWithoutUploadedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput, Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput> | Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput[] | Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput[];
    connectOrCreate?: Prisma.QuestionImportBatchCreateOrConnectWithoutUploadedByUserInput | Prisma.QuestionImportBatchCreateOrConnectWithoutUploadedByUserInput[];
    upsert?: Prisma.QuestionImportBatchUpsertWithWhereUniqueWithoutUploadedByUserInput | Prisma.QuestionImportBatchUpsertWithWhereUniqueWithoutUploadedByUserInput[];
    createMany?: Prisma.QuestionImportBatchCreateManyUploadedByUserInputEnvelope;
    set?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
    disconnect?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
    delete?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
    connect?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
    update?: Prisma.QuestionImportBatchUpdateWithWhereUniqueWithoutUploadedByUserInput | Prisma.QuestionImportBatchUpdateWithWhereUniqueWithoutUploadedByUserInput[];
    updateMany?: Prisma.QuestionImportBatchUpdateManyWithWhereWithoutUploadedByUserInput | Prisma.QuestionImportBatchUpdateManyWithWhereWithoutUploadedByUserInput[];
    deleteMany?: Prisma.QuestionImportBatchScalarWhereInput | Prisma.QuestionImportBatchScalarWhereInput[];
};
export type QuestionImportBatchUncheckedUpdateManyWithoutUploadedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput, Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput> | Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput[] | Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput[];
    connectOrCreate?: Prisma.QuestionImportBatchCreateOrConnectWithoutUploadedByUserInput | Prisma.QuestionImportBatchCreateOrConnectWithoutUploadedByUserInput[];
    upsert?: Prisma.QuestionImportBatchUpsertWithWhereUniqueWithoutUploadedByUserInput | Prisma.QuestionImportBatchUpsertWithWhereUniqueWithoutUploadedByUserInput[];
    createMany?: Prisma.QuestionImportBatchCreateManyUploadedByUserInputEnvelope;
    set?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
    disconnect?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
    delete?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
    connect?: Prisma.QuestionImportBatchWhereUniqueInput | Prisma.QuestionImportBatchWhereUniqueInput[];
    update?: Prisma.QuestionImportBatchUpdateWithWhereUniqueWithoutUploadedByUserInput | Prisma.QuestionImportBatchUpdateWithWhereUniqueWithoutUploadedByUserInput[];
    updateMany?: Prisma.QuestionImportBatchUpdateManyWithWhereWithoutUploadedByUserInput | Prisma.QuestionImportBatchUpdateManyWithWhereWithoutUploadedByUserInput[];
    deleteMany?: Prisma.QuestionImportBatchScalarWhereInput | Prisma.QuestionImportBatchScalarWhereInput[];
};
export type EnumImportBatchStatusFieldUpdateOperationsInput = {
    set?: $Enums.ImportBatchStatus;
};
export type QuestionImportBatchCreateNestedOneWithoutParsedQuestionsInput = {
    create?: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutParsedQuestionsInput, Prisma.QuestionImportBatchUncheckedCreateWithoutParsedQuestionsInput>;
    connectOrCreate?: Prisma.QuestionImportBatchCreateOrConnectWithoutParsedQuestionsInput;
    connect?: Prisma.QuestionImportBatchWhereUniqueInput;
};
export type QuestionImportBatchUpdateOneRequiredWithoutParsedQuestionsNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutParsedQuestionsInput, Prisma.QuestionImportBatchUncheckedCreateWithoutParsedQuestionsInput>;
    connectOrCreate?: Prisma.QuestionImportBatchCreateOrConnectWithoutParsedQuestionsInput;
    upsert?: Prisma.QuestionImportBatchUpsertWithoutParsedQuestionsInput;
    connect?: Prisma.QuestionImportBatchWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuestionImportBatchUpdateToOneWithWhereWithoutParsedQuestionsInput, Prisma.QuestionImportBatchUpdateWithoutParsedQuestionsInput>, Prisma.QuestionImportBatchUncheckedUpdateWithoutParsedQuestionsInput>;
};
export type QuestionImportBatchCreateWithoutUploadedByUserInput = {
    id?: string;
    fileName: string;
    fileUrl?: string | null;
    fileSizeBytes: number;
    status: $Enums.ImportBatchStatus;
    totalDetected?: number;
    validCount?: number;
    invalidCount?: number;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    parsedQuestions?: Prisma.ParsedQuestionReviewCreateNestedManyWithoutBatchInput;
};
export type QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput = {
    id?: string;
    fileName: string;
    fileUrl?: string | null;
    fileSizeBytes: number;
    status: $Enums.ImportBatchStatus;
    totalDetected?: number;
    validCount?: number;
    invalidCount?: number;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    parsedQuestions?: Prisma.ParsedQuestionReviewUncheckedCreateNestedManyWithoutBatchInput;
};
export type QuestionImportBatchCreateOrConnectWithoutUploadedByUserInput = {
    where: Prisma.QuestionImportBatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput, Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput>;
};
export type QuestionImportBatchCreateManyUploadedByUserInputEnvelope = {
    data: Prisma.QuestionImportBatchCreateManyUploadedByUserInput | Prisma.QuestionImportBatchCreateManyUploadedByUserInput[];
    skipDuplicates?: boolean;
};
export type QuestionImportBatchUpsertWithWhereUniqueWithoutUploadedByUserInput = {
    where: Prisma.QuestionImportBatchWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuestionImportBatchUpdateWithoutUploadedByUserInput, Prisma.QuestionImportBatchUncheckedUpdateWithoutUploadedByUserInput>;
    create: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutUploadedByUserInput, Prisma.QuestionImportBatchUncheckedCreateWithoutUploadedByUserInput>;
};
export type QuestionImportBatchUpdateWithWhereUniqueWithoutUploadedByUserInput = {
    where: Prisma.QuestionImportBatchWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuestionImportBatchUpdateWithoutUploadedByUserInput, Prisma.QuestionImportBatchUncheckedUpdateWithoutUploadedByUserInput>;
};
export type QuestionImportBatchUpdateManyWithWhereWithoutUploadedByUserInput = {
    where: Prisma.QuestionImportBatchScalarWhereInput;
    data: Prisma.XOR<Prisma.QuestionImportBatchUpdateManyMutationInput, Prisma.QuestionImportBatchUncheckedUpdateManyWithoutUploadedByUserInput>;
};
export type QuestionImportBatchScalarWhereInput = {
    AND?: Prisma.QuestionImportBatchScalarWhereInput | Prisma.QuestionImportBatchScalarWhereInput[];
    OR?: Prisma.QuestionImportBatchScalarWhereInput[];
    NOT?: Prisma.QuestionImportBatchScalarWhereInput | Prisma.QuestionImportBatchScalarWhereInput[];
    id?: Prisma.StringFilter<"QuestionImportBatch"> | string;
    uploadedBy?: Prisma.StringFilter<"QuestionImportBatch"> | string;
    fileName?: Prisma.StringFilter<"QuestionImportBatch"> | string;
    fileUrl?: Prisma.StringNullableFilter<"QuestionImportBatch"> | string | null;
    fileSizeBytes?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    status?: Prisma.EnumImportBatchStatusFilter<"QuestionImportBatch"> | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    validCount?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    invalidCount?: Prisma.IntFilter<"QuestionImportBatch"> | number;
    errorMessage?: Prisma.StringNullableFilter<"QuestionImportBatch"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"QuestionImportBatch"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"QuestionImportBatch"> | Date | string | null;
};
export type QuestionImportBatchCreateWithoutParsedQuestionsInput = {
    id?: string;
    fileName: string;
    fileUrl?: string | null;
    fileSizeBytes: number;
    status: $Enums.ImportBatchStatus;
    totalDetected?: number;
    validCount?: number;
    invalidCount?: number;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    uploadedByUser: Prisma.UserCreateNestedOneWithoutUploadedImportBatchesInput;
};
export type QuestionImportBatchUncheckedCreateWithoutParsedQuestionsInput = {
    id?: string;
    uploadedBy: string;
    fileName: string;
    fileUrl?: string | null;
    fileSizeBytes: number;
    status: $Enums.ImportBatchStatus;
    totalDetected?: number;
    validCount?: number;
    invalidCount?: number;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type QuestionImportBatchCreateOrConnectWithoutParsedQuestionsInput = {
    where: Prisma.QuestionImportBatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutParsedQuestionsInput, Prisma.QuestionImportBatchUncheckedCreateWithoutParsedQuestionsInput>;
};
export type QuestionImportBatchUpsertWithoutParsedQuestionsInput = {
    update: Prisma.XOR<Prisma.QuestionImportBatchUpdateWithoutParsedQuestionsInput, Prisma.QuestionImportBatchUncheckedUpdateWithoutParsedQuestionsInput>;
    create: Prisma.XOR<Prisma.QuestionImportBatchCreateWithoutParsedQuestionsInput, Prisma.QuestionImportBatchUncheckedCreateWithoutParsedQuestionsInput>;
    where?: Prisma.QuestionImportBatchWhereInput;
};
export type QuestionImportBatchUpdateToOneWithWhereWithoutParsedQuestionsInput = {
    where?: Prisma.QuestionImportBatchWhereInput;
    data: Prisma.XOR<Prisma.QuestionImportBatchUpdateWithoutParsedQuestionsInput, Prisma.QuestionImportBatchUncheckedUpdateWithoutParsedQuestionsInput>;
};
export type QuestionImportBatchUpdateWithoutParsedQuestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumImportBatchStatusFieldUpdateOperationsInput | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    validCount?: Prisma.IntFieldUpdateOperationsInput | number;
    invalidCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    uploadedByUser?: Prisma.UserUpdateOneRequiredWithoutUploadedImportBatchesNestedInput;
};
export type QuestionImportBatchUncheckedUpdateWithoutParsedQuestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumImportBatchStatusFieldUpdateOperationsInput | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    validCount?: Prisma.IntFieldUpdateOperationsInput | number;
    invalidCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QuestionImportBatchCreateManyUploadedByUserInput = {
    id?: string;
    fileName: string;
    fileUrl?: string | null;
    fileSizeBytes: number;
    status: $Enums.ImportBatchStatus;
    totalDetected?: number;
    validCount?: number;
    invalidCount?: number;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type QuestionImportBatchUpdateWithoutUploadedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumImportBatchStatusFieldUpdateOperationsInput | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    validCount?: Prisma.IntFieldUpdateOperationsInput | number;
    invalidCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    parsedQuestions?: Prisma.ParsedQuestionReviewUpdateManyWithoutBatchNestedInput;
};
export type QuestionImportBatchUncheckedUpdateWithoutUploadedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumImportBatchStatusFieldUpdateOperationsInput | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    validCount?: Prisma.IntFieldUpdateOperationsInput | number;
    invalidCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    parsedQuestions?: Prisma.ParsedQuestionReviewUncheckedUpdateManyWithoutBatchNestedInput;
};
export type QuestionImportBatchUncheckedUpdateManyWithoutUploadedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumImportBatchStatusFieldUpdateOperationsInput | $Enums.ImportBatchStatus;
    totalDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    validCount?: Prisma.IntFieldUpdateOperationsInput | number;
    invalidCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QuestionImportBatchCountOutputType = {
    parsedQuestions: number;
};
export type QuestionImportBatchCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parsedQuestions?: boolean | QuestionImportBatchCountOutputTypeCountParsedQuestionsArgs;
};
export type QuestionImportBatchCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchCountOutputTypeSelect<ExtArgs> | null;
};
export type QuestionImportBatchCountOutputTypeCountParsedQuestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParsedQuestionReviewWhereInput;
};
export type QuestionImportBatchSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uploadedBy?: boolean;
    fileName?: boolean;
    fileUrl?: boolean;
    fileSizeBytes?: boolean;
    status?: boolean;
    totalDetected?: boolean;
    validCount?: boolean;
    invalidCount?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
    uploadedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    parsedQuestions?: boolean | Prisma.QuestionImportBatch$parsedQuestionsArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionImportBatchCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionImportBatch"]>;
export type QuestionImportBatchSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uploadedBy?: boolean;
    fileName?: boolean;
    fileUrl?: boolean;
    fileSizeBytes?: boolean;
    status?: boolean;
    totalDetected?: boolean;
    validCount?: boolean;
    invalidCount?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
    uploadedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionImportBatch"]>;
export type QuestionImportBatchSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uploadedBy?: boolean;
    fileName?: boolean;
    fileUrl?: boolean;
    fileSizeBytes?: boolean;
    status?: boolean;
    totalDetected?: boolean;
    validCount?: boolean;
    invalidCount?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
    uploadedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionImportBatch"]>;
export type QuestionImportBatchSelectScalar = {
    id?: boolean;
    uploadedBy?: boolean;
    fileName?: boolean;
    fileUrl?: boolean;
    fileSizeBytes?: boolean;
    status?: boolean;
    totalDetected?: boolean;
    validCount?: boolean;
    invalidCount?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
};
export type QuestionImportBatchOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "uploadedBy" | "fileName" | "fileUrl" | "fileSizeBytes" | "status" | "totalDetected" | "validCount" | "invalidCount" | "errorMessage" | "createdAt" | "completedAt", ExtArgs["result"]["questionImportBatch"]>;
export type QuestionImportBatchInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploadedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    parsedQuestions?: boolean | Prisma.QuestionImportBatch$parsedQuestionsArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionImportBatchCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QuestionImportBatchIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploadedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type QuestionImportBatchIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploadedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $QuestionImportBatchPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QuestionImportBatch";
    objects: {
        uploadedByUser: Prisma.$UserPayload<ExtArgs>;
        parsedQuestions: Prisma.$ParsedQuestionReviewPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        uploadedBy: string;
        fileName: string;
        fileUrl: string | null;
        fileSizeBytes: number;
        status: $Enums.ImportBatchStatus;
        totalDetected: number;
        validCount: number;
        invalidCount: number;
        errorMessage: string | null;
        createdAt: Date;
        completedAt: Date | null;
    }, ExtArgs["result"]["questionImportBatch"]>;
    composites: {};
};
export type QuestionImportBatchGetPayload<S extends boolean | null | undefined | QuestionImportBatchDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload, S>;
export type QuestionImportBatchCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionImportBatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionImportBatchCountAggregateInputType | true;
};
export interface QuestionImportBatchDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QuestionImportBatch'];
        meta: {
            name: 'QuestionImportBatch';
        };
    };
    findUnique<T extends QuestionImportBatchFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionImportBatchFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionImportBatchClient<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionImportBatchFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionImportBatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionImportBatchClient<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionImportBatchFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionImportBatchFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionImportBatchClient<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionImportBatchFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionImportBatchFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionImportBatchClient<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionImportBatchFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionImportBatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionImportBatchCreateArgs>(args: Prisma.SelectSubset<T, QuestionImportBatchCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionImportBatchClient<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionImportBatchCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionImportBatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionImportBatchCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionImportBatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionImportBatchDeleteArgs>(args: Prisma.SelectSubset<T, QuestionImportBatchDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionImportBatchClient<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionImportBatchUpdateArgs>(args: Prisma.SelectSubset<T, QuestionImportBatchUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionImportBatchClient<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionImportBatchDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionImportBatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionImportBatchUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionImportBatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionImportBatchUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionImportBatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionImportBatchUpsertArgs>(args: Prisma.SelectSubset<T, QuestionImportBatchUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionImportBatchClient<runtime.Types.Result.GetResult<Prisma.$QuestionImportBatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionImportBatchCountArgs>(args?: Prisma.Subset<T, QuestionImportBatchCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionImportBatchCountAggregateOutputType> : number>;
    aggregate<T extends QuestionImportBatchAggregateArgs>(args: Prisma.Subset<T, QuestionImportBatchAggregateArgs>): Prisma.PrismaPromise<GetQuestionImportBatchAggregateType<T>>;
    groupBy<T extends QuestionImportBatchGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionImportBatchGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionImportBatchGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionImportBatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionImportBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionImportBatchFieldRefs;
}
export interface Prisma__QuestionImportBatchClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    uploadedByUser<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    parsedQuestions<T extends Prisma.QuestionImportBatch$parsedQuestionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionImportBatch$parsedQuestionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParsedQuestionReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionImportBatchFieldRefs {
    readonly id: Prisma.FieldRef<"QuestionImportBatch", 'String'>;
    readonly uploadedBy: Prisma.FieldRef<"QuestionImportBatch", 'String'>;
    readonly fileName: Prisma.FieldRef<"QuestionImportBatch", 'String'>;
    readonly fileUrl: Prisma.FieldRef<"QuestionImportBatch", 'String'>;
    readonly fileSizeBytes: Prisma.FieldRef<"QuestionImportBatch", 'Int'>;
    readonly status: Prisma.FieldRef<"QuestionImportBatch", 'ImportBatchStatus'>;
    readonly totalDetected: Prisma.FieldRef<"QuestionImportBatch", 'Int'>;
    readonly validCount: Prisma.FieldRef<"QuestionImportBatch", 'Int'>;
    readonly invalidCount: Prisma.FieldRef<"QuestionImportBatch", 'Int'>;
    readonly errorMessage: Prisma.FieldRef<"QuestionImportBatch", 'String'>;
    readonly createdAt: Prisma.FieldRef<"QuestionImportBatch", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"QuestionImportBatch", 'DateTime'>;
}
export type QuestionImportBatchFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
    where: Prisma.QuestionImportBatchWhereUniqueInput;
};
export type QuestionImportBatchFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
    where: Prisma.QuestionImportBatchWhereUniqueInput;
};
export type QuestionImportBatchFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
    where?: Prisma.QuestionImportBatchWhereInput;
    orderBy?: Prisma.QuestionImportBatchOrderByWithRelationInput | Prisma.QuestionImportBatchOrderByWithRelationInput[];
    cursor?: Prisma.QuestionImportBatchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionImportBatchScalarFieldEnum | Prisma.QuestionImportBatchScalarFieldEnum[];
};
export type QuestionImportBatchFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
    where?: Prisma.QuestionImportBatchWhereInput;
    orderBy?: Prisma.QuestionImportBatchOrderByWithRelationInput | Prisma.QuestionImportBatchOrderByWithRelationInput[];
    cursor?: Prisma.QuestionImportBatchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionImportBatchScalarFieldEnum | Prisma.QuestionImportBatchScalarFieldEnum[];
};
export type QuestionImportBatchFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
    where?: Prisma.QuestionImportBatchWhereInput;
    orderBy?: Prisma.QuestionImportBatchOrderByWithRelationInput | Prisma.QuestionImportBatchOrderByWithRelationInput[];
    cursor?: Prisma.QuestionImportBatchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionImportBatchScalarFieldEnum | Prisma.QuestionImportBatchScalarFieldEnum[];
};
export type QuestionImportBatchCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionImportBatchCreateInput, Prisma.QuestionImportBatchUncheckedCreateInput>;
};
export type QuestionImportBatchCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionImportBatchCreateManyInput | Prisma.QuestionImportBatchCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionImportBatchCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    data: Prisma.QuestionImportBatchCreateManyInput | Prisma.QuestionImportBatchCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuestionImportBatchIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuestionImportBatchUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionImportBatchUpdateInput, Prisma.QuestionImportBatchUncheckedUpdateInput>;
    where: Prisma.QuestionImportBatchWhereUniqueInput;
};
export type QuestionImportBatchUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionImportBatchUpdateManyMutationInput, Prisma.QuestionImportBatchUncheckedUpdateManyInput>;
    where?: Prisma.QuestionImportBatchWhereInput;
    limit?: number;
};
export type QuestionImportBatchUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionImportBatchUpdateManyMutationInput, Prisma.QuestionImportBatchUncheckedUpdateManyInput>;
    where?: Prisma.QuestionImportBatchWhereInput;
    limit?: number;
    include?: Prisma.QuestionImportBatchIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuestionImportBatchUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
    where: Prisma.QuestionImportBatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionImportBatchCreateInput, Prisma.QuestionImportBatchUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionImportBatchUpdateInput, Prisma.QuestionImportBatchUncheckedUpdateInput>;
};
export type QuestionImportBatchDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
    where: Prisma.QuestionImportBatchWhereUniqueInput;
};
export type QuestionImportBatchDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionImportBatchWhereInput;
    limit?: number;
};
export type QuestionImportBatch$parsedQuestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParsedQuestionReviewSelect<ExtArgs> | null;
    omit?: Prisma.ParsedQuestionReviewOmit<ExtArgs> | null;
    include?: Prisma.ParsedQuestionReviewInclude<ExtArgs> | null;
    where?: Prisma.ParsedQuestionReviewWhereInput;
    orderBy?: Prisma.ParsedQuestionReviewOrderByWithRelationInput | Prisma.ParsedQuestionReviewOrderByWithRelationInput[];
    cursor?: Prisma.ParsedQuestionReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParsedQuestionReviewScalarFieldEnum | Prisma.ParsedQuestionReviewScalarFieldEnum[];
};
export type QuestionImportBatchDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionImportBatchSelect<ExtArgs> | null;
    omit?: Prisma.QuestionImportBatchOmit<ExtArgs> | null;
    include?: Prisma.QuestionImportBatchInclude<ExtArgs> | null;
};
