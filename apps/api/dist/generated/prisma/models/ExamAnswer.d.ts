import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExamAnswerModel = runtime.Types.Result.DefaultSelection<Prisma.$ExamAnswerPayload>;
export type AggregateExamAnswer = {
    _count: ExamAnswerCountAggregateOutputType | null;
    _avg: ExamAnswerAvgAggregateOutputType | null;
    _sum: ExamAnswerSumAggregateOutputType | null;
    _min: ExamAnswerMinAggregateOutputType | null;
    _max: ExamAnswerMaxAggregateOutputType | null;
};
export type ExamAnswerAvgAggregateOutputType = {
    scoreAwarded: number | null;
};
export type ExamAnswerSumAggregateOutputType = {
    scoreAwarded: number | null;
};
export type ExamAnswerMinAggregateOutputType = {
    id: string | null;
    examSessionId: string | null;
    examSessionQuestionId: string | null;
    selectedOptionId: string | null;
    selectedLabel: string | null;
    isCorrect: boolean | null;
    scoreAwarded: number | null;
    isFlagged: boolean | null;
    answeredAt: Date | null;
    updatedAt: Date | null;
};
export type ExamAnswerMaxAggregateOutputType = {
    id: string | null;
    examSessionId: string | null;
    examSessionQuestionId: string | null;
    selectedOptionId: string | null;
    selectedLabel: string | null;
    isCorrect: boolean | null;
    scoreAwarded: number | null;
    isFlagged: boolean | null;
    answeredAt: Date | null;
    updatedAt: Date | null;
};
export type ExamAnswerCountAggregateOutputType = {
    id: number;
    examSessionId: number;
    examSessionQuestionId: number;
    selectedOptionId: number;
    selectedLabel: number;
    isCorrect: number;
    scoreAwarded: number;
    isFlagged: number;
    answeredAt: number;
    updatedAt: number;
    _all: number;
};
export type ExamAnswerAvgAggregateInputType = {
    scoreAwarded?: true;
};
export type ExamAnswerSumAggregateInputType = {
    scoreAwarded?: true;
};
export type ExamAnswerMinAggregateInputType = {
    id?: true;
    examSessionId?: true;
    examSessionQuestionId?: true;
    selectedOptionId?: true;
    selectedLabel?: true;
    isCorrect?: true;
    scoreAwarded?: true;
    isFlagged?: true;
    answeredAt?: true;
    updatedAt?: true;
};
export type ExamAnswerMaxAggregateInputType = {
    id?: true;
    examSessionId?: true;
    examSessionQuestionId?: true;
    selectedOptionId?: true;
    selectedLabel?: true;
    isCorrect?: true;
    scoreAwarded?: true;
    isFlagged?: true;
    answeredAt?: true;
    updatedAt?: true;
};
export type ExamAnswerCountAggregateInputType = {
    id?: true;
    examSessionId?: true;
    examSessionQuestionId?: true;
    selectedOptionId?: true;
    selectedLabel?: true;
    isCorrect?: true;
    scoreAwarded?: true;
    isFlagged?: true;
    answeredAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ExamAnswerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamAnswerWhereInput;
    orderBy?: Prisma.ExamAnswerOrderByWithRelationInput | Prisma.ExamAnswerOrderByWithRelationInput[];
    cursor?: Prisma.ExamAnswerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExamAnswerCountAggregateInputType;
    _avg?: ExamAnswerAvgAggregateInputType;
    _sum?: ExamAnswerSumAggregateInputType;
    _min?: ExamAnswerMinAggregateInputType;
    _max?: ExamAnswerMaxAggregateInputType;
};
export type GetExamAnswerAggregateType<T extends ExamAnswerAggregateArgs> = {
    [P in keyof T & keyof AggregateExamAnswer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExamAnswer[P]> : Prisma.GetScalarType<T[P], AggregateExamAnswer[P]>;
};
export type ExamAnswerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamAnswerWhereInput;
    orderBy?: Prisma.ExamAnswerOrderByWithAggregationInput | Prisma.ExamAnswerOrderByWithAggregationInput[];
    by: Prisma.ExamAnswerScalarFieldEnum[] | Prisma.ExamAnswerScalarFieldEnum;
    having?: Prisma.ExamAnswerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExamAnswerCountAggregateInputType | true;
    _avg?: ExamAnswerAvgAggregateInputType;
    _sum?: ExamAnswerSumAggregateInputType;
    _min?: ExamAnswerMinAggregateInputType;
    _max?: ExamAnswerMaxAggregateInputType;
};
export type ExamAnswerGroupByOutputType = {
    id: string;
    examSessionId: string;
    examSessionQuestionId: string;
    selectedOptionId: string | null;
    selectedLabel: string | null;
    isCorrect: boolean | null;
    scoreAwarded: number;
    isFlagged: boolean;
    answeredAt: Date | null;
    updatedAt: Date;
    _count: ExamAnswerCountAggregateOutputType | null;
    _avg: ExamAnswerAvgAggregateOutputType | null;
    _sum: ExamAnswerSumAggregateOutputType | null;
    _min: ExamAnswerMinAggregateOutputType | null;
    _max: ExamAnswerMaxAggregateOutputType | null;
};
export type GetExamAnswerGroupByPayload<T extends ExamAnswerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExamAnswerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExamAnswerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExamAnswerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExamAnswerGroupByOutputType[P]>;
}>>;
export type ExamAnswerWhereInput = {
    AND?: Prisma.ExamAnswerWhereInput | Prisma.ExamAnswerWhereInput[];
    OR?: Prisma.ExamAnswerWhereInput[];
    NOT?: Prisma.ExamAnswerWhereInput | Prisma.ExamAnswerWhereInput[];
    id?: Prisma.StringFilter<"ExamAnswer"> | string;
    examSessionId?: Prisma.StringFilter<"ExamAnswer"> | string;
    examSessionQuestionId?: Prisma.StringFilter<"ExamAnswer"> | string;
    selectedOptionId?: Prisma.StringNullableFilter<"ExamAnswer"> | string | null;
    selectedLabel?: Prisma.StringNullableFilter<"ExamAnswer"> | string | null;
    isCorrect?: Prisma.BoolNullableFilter<"ExamAnswer"> | boolean | null;
    scoreAwarded?: Prisma.IntFilter<"ExamAnswer"> | number;
    isFlagged?: Prisma.BoolFilter<"ExamAnswer"> | boolean;
    answeredAt?: Prisma.DateTimeNullableFilter<"ExamAnswer"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"ExamAnswer"> | Date | string;
    examSession?: Prisma.XOR<Prisma.ExamSessionScalarRelationFilter, Prisma.ExamSessionWhereInput>;
    examSessionQuestion?: Prisma.XOR<Prisma.ExamSessionQuestionScalarRelationFilter, Prisma.ExamSessionQuestionWhereInput>;
    selectedOption?: Prisma.XOR<Prisma.QuestionOptionNullableScalarRelationFilter, Prisma.QuestionOptionWhereInput> | null;
};
export type ExamAnswerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    examSessionQuestionId?: Prisma.SortOrder;
    selectedOptionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    selectedLabel?: Prisma.SortOrderInput | Prisma.SortOrder;
    isCorrect?: Prisma.SortOrderInput | Prisma.SortOrder;
    scoreAwarded?: Prisma.SortOrder;
    isFlagged?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    examSession?: Prisma.ExamSessionOrderByWithRelationInput;
    examSessionQuestion?: Prisma.ExamSessionQuestionOrderByWithRelationInput;
    selectedOption?: Prisma.QuestionOptionOrderByWithRelationInput;
};
export type ExamAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    examSessionId_examSessionQuestionId?: Prisma.ExamAnswerExamSessionIdExamSessionQuestionIdCompoundUniqueInput;
    AND?: Prisma.ExamAnswerWhereInput | Prisma.ExamAnswerWhereInput[];
    OR?: Prisma.ExamAnswerWhereInput[];
    NOT?: Prisma.ExamAnswerWhereInput | Prisma.ExamAnswerWhereInput[];
    examSessionId?: Prisma.StringFilter<"ExamAnswer"> | string;
    examSessionQuestionId?: Prisma.StringFilter<"ExamAnswer"> | string;
    selectedOptionId?: Prisma.StringNullableFilter<"ExamAnswer"> | string | null;
    selectedLabel?: Prisma.StringNullableFilter<"ExamAnswer"> | string | null;
    isCorrect?: Prisma.BoolNullableFilter<"ExamAnswer"> | boolean | null;
    scoreAwarded?: Prisma.IntFilter<"ExamAnswer"> | number;
    isFlagged?: Prisma.BoolFilter<"ExamAnswer"> | boolean;
    answeredAt?: Prisma.DateTimeNullableFilter<"ExamAnswer"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"ExamAnswer"> | Date | string;
    examSession?: Prisma.XOR<Prisma.ExamSessionScalarRelationFilter, Prisma.ExamSessionWhereInput>;
    examSessionQuestion?: Prisma.XOR<Prisma.ExamSessionQuestionScalarRelationFilter, Prisma.ExamSessionQuestionWhereInput>;
    selectedOption?: Prisma.XOR<Prisma.QuestionOptionNullableScalarRelationFilter, Prisma.QuestionOptionWhereInput> | null;
}, "id" | "examSessionId_examSessionQuestionId">;
export type ExamAnswerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    examSessionQuestionId?: Prisma.SortOrder;
    selectedOptionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    selectedLabel?: Prisma.SortOrderInput | Prisma.SortOrder;
    isCorrect?: Prisma.SortOrderInput | Prisma.SortOrder;
    scoreAwarded?: Prisma.SortOrder;
    isFlagged?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ExamAnswerCountOrderByAggregateInput;
    _avg?: Prisma.ExamAnswerAvgOrderByAggregateInput;
    _max?: Prisma.ExamAnswerMaxOrderByAggregateInput;
    _min?: Prisma.ExamAnswerMinOrderByAggregateInput;
    _sum?: Prisma.ExamAnswerSumOrderByAggregateInput;
};
export type ExamAnswerScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExamAnswerScalarWhereWithAggregatesInput | Prisma.ExamAnswerScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExamAnswerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExamAnswerScalarWhereWithAggregatesInput | Prisma.ExamAnswerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ExamAnswer"> | string;
    examSessionId?: Prisma.StringWithAggregatesFilter<"ExamAnswer"> | string;
    examSessionQuestionId?: Prisma.StringWithAggregatesFilter<"ExamAnswer"> | string;
    selectedOptionId?: Prisma.StringNullableWithAggregatesFilter<"ExamAnswer"> | string | null;
    selectedLabel?: Prisma.StringNullableWithAggregatesFilter<"ExamAnswer"> | string | null;
    isCorrect?: Prisma.BoolNullableWithAggregatesFilter<"ExamAnswer"> | boolean | null;
    scoreAwarded?: Prisma.IntWithAggregatesFilter<"ExamAnswer"> | number;
    isFlagged?: Prisma.BoolWithAggregatesFilter<"ExamAnswer"> | boolean;
    answeredAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ExamAnswer"> | Date | string | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ExamAnswer"> | Date | string;
};
export type ExamAnswerCreateInput = {
    id?: string;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
    examSession: Prisma.ExamSessionCreateNestedOneWithoutAnswersInput;
    examSessionQuestion: Prisma.ExamSessionQuestionCreateNestedOneWithoutAnswersInput;
    selectedOption?: Prisma.QuestionOptionCreateNestedOneWithoutSelectedAnswersInput;
};
export type ExamAnswerUncheckedCreateInput = {
    id?: string;
    examSessionId: string;
    examSessionQuestionId: string;
    selectedOptionId?: string | null;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type ExamAnswerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examSession?: Prisma.ExamSessionUpdateOneRequiredWithoutAnswersNestedInput;
    examSessionQuestion?: Prisma.ExamSessionQuestionUpdateOneRequiredWithoutAnswersNestedInput;
    selectedOption?: Prisma.QuestionOptionUpdateOneWithoutSelectedAnswersNestedInput;
};
export type ExamAnswerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionQuestionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedOptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamAnswerCreateManyInput = {
    id?: string;
    examSessionId: string;
    examSessionQuestionId: string;
    selectedOptionId?: string | null;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type ExamAnswerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamAnswerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionQuestionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedOptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamAnswerListRelationFilter = {
    every?: Prisma.ExamAnswerWhereInput;
    some?: Prisma.ExamAnswerWhereInput;
    none?: Prisma.ExamAnswerWhereInput;
};
export type ExamAnswerOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExamAnswerExamSessionIdExamSessionQuestionIdCompoundUniqueInput = {
    examSessionId: string;
    examSessionQuestionId: string;
};
export type ExamAnswerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    examSessionQuestionId?: Prisma.SortOrder;
    selectedOptionId?: Prisma.SortOrder;
    selectedLabel?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    scoreAwarded?: Prisma.SortOrder;
    isFlagged?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ExamAnswerAvgOrderByAggregateInput = {
    scoreAwarded?: Prisma.SortOrder;
};
export type ExamAnswerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    examSessionQuestionId?: Prisma.SortOrder;
    selectedOptionId?: Prisma.SortOrder;
    selectedLabel?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    scoreAwarded?: Prisma.SortOrder;
    isFlagged?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ExamAnswerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    examSessionQuestionId?: Prisma.SortOrder;
    selectedOptionId?: Prisma.SortOrder;
    selectedLabel?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    scoreAwarded?: Prisma.SortOrder;
    isFlagged?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ExamAnswerSumOrderByAggregateInput = {
    scoreAwarded?: Prisma.SortOrder;
};
export type ExamAnswerCreateNestedManyWithoutSelectedOptionInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutSelectedOptionInput, Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput> | Prisma.ExamAnswerCreateWithoutSelectedOptionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutSelectedOptionInput | Prisma.ExamAnswerCreateOrConnectWithoutSelectedOptionInput[];
    createMany?: Prisma.ExamAnswerCreateManySelectedOptionInputEnvelope;
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
};
export type ExamAnswerUncheckedCreateNestedManyWithoutSelectedOptionInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutSelectedOptionInput, Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput> | Prisma.ExamAnswerCreateWithoutSelectedOptionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutSelectedOptionInput | Prisma.ExamAnswerCreateOrConnectWithoutSelectedOptionInput[];
    createMany?: Prisma.ExamAnswerCreateManySelectedOptionInputEnvelope;
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
};
export type ExamAnswerUpdateManyWithoutSelectedOptionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutSelectedOptionInput, Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput> | Prisma.ExamAnswerCreateWithoutSelectedOptionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutSelectedOptionInput | Prisma.ExamAnswerCreateOrConnectWithoutSelectedOptionInput[];
    upsert?: Prisma.ExamAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput | Prisma.ExamAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput[];
    createMany?: Prisma.ExamAnswerCreateManySelectedOptionInputEnvelope;
    set?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    disconnect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    delete?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    update?: Prisma.ExamAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput | Prisma.ExamAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput[];
    updateMany?: Prisma.ExamAnswerUpdateManyWithWhereWithoutSelectedOptionInput | Prisma.ExamAnswerUpdateManyWithWhereWithoutSelectedOptionInput[];
    deleteMany?: Prisma.ExamAnswerScalarWhereInput | Prisma.ExamAnswerScalarWhereInput[];
};
export type ExamAnswerUncheckedUpdateManyWithoutSelectedOptionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutSelectedOptionInput, Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput> | Prisma.ExamAnswerCreateWithoutSelectedOptionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutSelectedOptionInput | Prisma.ExamAnswerCreateOrConnectWithoutSelectedOptionInput[];
    upsert?: Prisma.ExamAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput | Prisma.ExamAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput[];
    createMany?: Prisma.ExamAnswerCreateManySelectedOptionInputEnvelope;
    set?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    disconnect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    delete?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    update?: Prisma.ExamAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput | Prisma.ExamAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput[];
    updateMany?: Prisma.ExamAnswerUpdateManyWithWhereWithoutSelectedOptionInput | Prisma.ExamAnswerUpdateManyWithWhereWithoutSelectedOptionInput[];
    deleteMany?: Prisma.ExamAnswerScalarWhereInput | Prisma.ExamAnswerScalarWhereInput[];
};
export type ExamAnswerCreateNestedManyWithoutExamSessionInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput> | Prisma.ExamAnswerCreateWithoutExamSessionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutExamSessionInput | Prisma.ExamAnswerCreateOrConnectWithoutExamSessionInput[];
    createMany?: Prisma.ExamAnswerCreateManyExamSessionInputEnvelope;
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
};
export type ExamAnswerUncheckedCreateNestedManyWithoutExamSessionInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput> | Prisma.ExamAnswerCreateWithoutExamSessionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutExamSessionInput | Prisma.ExamAnswerCreateOrConnectWithoutExamSessionInput[];
    createMany?: Prisma.ExamAnswerCreateManyExamSessionInputEnvelope;
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
};
export type ExamAnswerUpdateManyWithoutExamSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput> | Prisma.ExamAnswerCreateWithoutExamSessionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutExamSessionInput | Prisma.ExamAnswerCreateOrConnectWithoutExamSessionInput[];
    upsert?: Prisma.ExamAnswerUpsertWithWhereUniqueWithoutExamSessionInput | Prisma.ExamAnswerUpsertWithWhereUniqueWithoutExamSessionInput[];
    createMany?: Prisma.ExamAnswerCreateManyExamSessionInputEnvelope;
    set?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    disconnect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    delete?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    update?: Prisma.ExamAnswerUpdateWithWhereUniqueWithoutExamSessionInput | Prisma.ExamAnswerUpdateWithWhereUniqueWithoutExamSessionInput[];
    updateMany?: Prisma.ExamAnswerUpdateManyWithWhereWithoutExamSessionInput | Prisma.ExamAnswerUpdateManyWithWhereWithoutExamSessionInput[];
    deleteMany?: Prisma.ExamAnswerScalarWhereInput | Prisma.ExamAnswerScalarWhereInput[];
};
export type ExamAnswerUncheckedUpdateManyWithoutExamSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput> | Prisma.ExamAnswerCreateWithoutExamSessionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutExamSessionInput | Prisma.ExamAnswerCreateOrConnectWithoutExamSessionInput[];
    upsert?: Prisma.ExamAnswerUpsertWithWhereUniqueWithoutExamSessionInput | Prisma.ExamAnswerUpsertWithWhereUniqueWithoutExamSessionInput[];
    createMany?: Prisma.ExamAnswerCreateManyExamSessionInputEnvelope;
    set?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    disconnect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    delete?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    update?: Prisma.ExamAnswerUpdateWithWhereUniqueWithoutExamSessionInput | Prisma.ExamAnswerUpdateWithWhereUniqueWithoutExamSessionInput[];
    updateMany?: Prisma.ExamAnswerUpdateManyWithWhereWithoutExamSessionInput | Prisma.ExamAnswerUpdateManyWithWhereWithoutExamSessionInput[];
    deleteMany?: Prisma.ExamAnswerScalarWhereInput | Prisma.ExamAnswerScalarWhereInput[];
};
export type ExamAnswerCreateNestedManyWithoutExamSessionQuestionInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput> | Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutExamSessionQuestionInput | Prisma.ExamAnswerCreateOrConnectWithoutExamSessionQuestionInput[];
    createMany?: Prisma.ExamAnswerCreateManyExamSessionQuestionInputEnvelope;
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
};
export type ExamAnswerUncheckedCreateNestedManyWithoutExamSessionQuestionInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput> | Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutExamSessionQuestionInput | Prisma.ExamAnswerCreateOrConnectWithoutExamSessionQuestionInput[];
    createMany?: Prisma.ExamAnswerCreateManyExamSessionQuestionInputEnvelope;
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
};
export type ExamAnswerUpdateManyWithoutExamSessionQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput> | Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutExamSessionQuestionInput | Prisma.ExamAnswerCreateOrConnectWithoutExamSessionQuestionInput[];
    upsert?: Prisma.ExamAnswerUpsertWithWhereUniqueWithoutExamSessionQuestionInput | Prisma.ExamAnswerUpsertWithWhereUniqueWithoutExamSessionQuestionInput[];
    createMany?: Prisma.ExamAnswerCreateManyExamSessionQuestionInputEnvelope;
    set?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    disconnect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    delete?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    update?: Prisma.ExamAnswerUpdateWithWhereUniqueWithoutExamSessionQuestionInput | Prisma.ExamAnswerUpdateWithWhereUniqueWithoutExamSessionQuestionInput[];
    updateMany?: Prisma.ExamAnswerUpdateManyWithWhereWithoutExamSessionQuestionInput | Prisma.ExamAnswerUpdateManyWithWhereWithoutExamSessionQuestionInput[];
    deleteMany?: Prisma.ExamAnswerScalarWhereInput | Prisma.ExamAnswerScalarWhereInput[];
};
export type ExamAnswerUncheckedUpdateManyWithoutExamSessionQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput> | Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput[] | Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput[];
    connectOrCreate?: Prisma.ExamAnswerCreateOrConnectWithoutExamSessionQuestionInput | Prisma.ExamAnswerCreateOrConnectWithoutExamSessionQuestionInput[];
    upsert?: Prisma.ExamAnswerUpsertWithWhereUniqueWithoutExamSessionQuestionInput | Prisma.ExamAnswerUpsertWithWhereUniqueWithoutExamSessionQuestionInput[];
    createMany?: Prisma.ExamAnswerCreateManyExamSessionQuestionInputEnvelope;
    set?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    disconnect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    delete?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    connect?: Prisma.ExamAnswerWhereUniqueInput | Prisma.ExamAnswerWhereUniqueInput[];
    update?: Prisma.ExamAnswerUpdateWithWhereUniqueWithoutExamSessionQuestionInput | Prisma.ExamAnswerUpdateWithWhereUniqueWithoutExamSessionQuestionInput[];
    updateMany?: Prisma.ExamAnswerUpdateManyWithWhereWithoutExamSessionQuestionInput | Prisma.ExamAnswerUpdateManyWithWhereWithoutExamSessionQuestionInput[];
    deleteMany?: Prisma.ExamAnswerScalarWhereInput | Prisma.ExamAnswerScalarWhereInput[];
};
export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null;
};
export type ExamAnswerCreateWithoutSelectedOptionInput = {
    id?: string;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
    examSession: Prisma.ExamSessionCreateNestedOneWithoutAnswersInput;
    examSessionQuestion: Prisma.ExamSessionQuestionCreateNestedOneWithoutAnswersInput;
};
export type ExamAnswerUncheckedCreateWithoutSelectedOptionInput = {
    id?: string;
    examSessionId: string;
    examSessionQuestionId: string;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type ExamAnswerCreateOrConnectWithoutSelectedOptionInput = {
    where: Prisma.ExamAnswerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamAnswerCreateWithoutSelectedOptionInput, Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput>;
};
export type ExamAnswerCreateManySelectedOptionInputEnvelope = {
    data: Prisma.ExamAnswerCreateManySelectedOptionInput | Prisma.ExamAnswerCreateManySelectedOptionInput[];
    skipDuplicates?: boolean;
};
export type ExamAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput = {
    where: Prisma.ExamAnswerWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamAnswerUpdateWithoutSelectedOptionInput, Prisma.ExamAnswerUncheckedUpdateWithoutSelectedOptionInput>;
    create: Prisma.XOR<Prisma.ExamAnswerCreateWithoutSelectedOptionInput, Prisma.ExamAnswerUncheckedCreateWithoutSelectedOptionInput>;
};
export type ExamAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput = {
    where: Prisma.ExamAnswerWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamAnswerUpdateWithoutSelectedOptionInput, Prisma.ExamAnswerUncheckedUpdateWithoutSelectedOptionInput>;
};
export type ExamAnswerUpdateManyWithWhereWithoutSelectedOptionInput = {
    where: Prisma.ExamAnswerScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamAnswerUpdateManyMutationInput, Prisma.ExamAnswerUncheckedUpdateManyWithoutSelectedOptionInput>;
};
export type ExamAnswerScalarWhereInput = {
    AND?: Prisma.ExamAnswerScalarWhereInput | Prisma.ExamAnswerScalarWhereInput[];
    OR?: Prisma.ExamAnswerScalarWhereInput[];
    NOT?: Prisma.ExamAnswerScalarWhereInput | Prisma.ExamAnswerScalarWhereInput[];
    id?: Prisma.StringFilter<"ExamAnswer"> | string;
    examSessionId?: Prisma.StringFilter<"ExamAnswer"> | string;
    examSessionQuestionId?: Prisma.StringFilter<"ExamAnswer"> | string;
    selectedOptionId?: Prisma.StringNullableFilter<"ExamAnswer"> | string | null;
    selectedLabel?: Prisma.StringNullableFilter<"ExamAnswer"> | string | null;
    isCorrect?: Prisma.BoolNullableFilter<"ExamAnswer"> | boolean | null;
    scoreAwarded?: Prisma.IntFilter<"ExamAnswer"> | number;
    isFlagged?: Prisma.BoolFilter<"ExamAnswer"> | boolean;
    answeredAt?: Prisma.DateTimeNullableFilter<"ExamAnswer"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"ExamAnswer"> | Date | string;
};
export type ExamAnswerCreateWithoutExamSessionInput = {
    id?: string;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
    examSessionQuestion: Prisma.ExamSessionQuestionCreateNestedOneWithoutAnswersInput;
    selectedOption?: Prisma.QuestionOptionCreateNestedOneWithoutSelectedAnswersInput;
};
export type ExamAnswerUncheckedCreateWithoutExamSessionInput = {
    id?: string;
    examSessionQuestionId: string;
    selectedOptionId?: string | null;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type ExamAnswerCreateOrConnectWithoutExamSessionInput = {
    where: Prisma.ExamAnswerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput>;
};
export type ExamAnswerCreateManyExamSessionInputEnvelope = {
    data: Prisma.ExamAnswerCreateManyExamSessionInput | Prisma.ExamAnswerCreateManyExamSessionInput[];
    skipDuplicates?: boolean;
};
export type ExamAnswerUpsertWithWhereUniqueWithoutExamSessionInput = {
    where: Prisma.ExamAnswerWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamAnswerUpdateWithoutExamSessionInput, Prisma.ExamAnswerUncheckedUpdateWithoutExamSessionInput>;
    create: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionInput>;
};
export type ExamAnswerUpdateWithWhereUniqueWithoutExamSessionInput = {
    where: Prisma.ExamAnswerWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamAnswerUpdateWithoutExamSessionInput, Prisma.ExamAnswerUncheckedUpdateWithoutExamSessionInput>;
};
export type ExamAnswerUpdateManyWithWhereWithoutExamSessionInput = {
    where: Prisma.ExamAnswerScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamAnswerUpdateManyMutationInput, Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionInput>;
};
export type ExamAnswerCreateWithoutExamSessionQuestionInput = {
    id?: string;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
    examSession: Prisma.ExamSessionCreateNestedOneWithoutAnswersInput;
    selectedOption?: Prisma.QuestionOptionCreateNestedOneWithoutSelectedAnswersInput;
};
export type ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput = {
    id?: string;
    examSessionId: string;
    selectedOptionId?: string | null;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type ExamAnswerCreateOrConnectWithoutExamSessionQuestionInput = {
    where: Prisma.ExamAnswerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput>;
};
export type ExamAnswerCreateManyExamSessionQuestionInputEnvelope = {
    data: Prisma.ExamAnswerCreateManyExamSessionQuestionInput | Prisma.ExamAnswerCreateManyExamSessionQuestionInput[];
    skipDuplicates?: boolean;
};
export type ExamAnswerUpsertWithWhereUniqueWithoutExamSessionQuestionInput = {
    where: Prisma.ExamAnswerWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamAnswerUpdateWithoutExamSessionQuestionInput, Prisma.ExamAnswerUncheckedUpdateWithoutExamSessionQuestionInput>;
    create: Prisma.XOR<Prisma.ExamAnswerCreateWithoutExamSessionQuestionInput, Prisma.ExamAnswerUncheckedCreateWithoutExamSessionQuestionInput>;
};
export type ExamAnswerUpdateWithWhereUniqueWithoutExamSessionQuestionInput = {
    where: Prisma.ExamAnswerWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamAnswerUpdateWithoutExamSessionQuestionInput, Prisma.ExamAnswerUncheckedUpdateWithoutExamSessionQuestionInput>;
};
export type ExamAnswerUpdateManyWithWhereWithoutExamSessionQuestionInput = {
    where: Prisma.ExamAnswerScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamAnswerUpdateManyMutationInput, Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionQuestionInput>;
};
export type ExamAnswerCreateManySelectedOptionInput = {
    id?: string;
    examSessionId: string;
    examSessionQuestionId: string;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type ExamAnswerUpdateWithoutSelectedOptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examSession?: Prisma.ExamSessionUpdateOneRequiredWithoutAnswersNestedInput;
    examSessionQuestion?: Prisma.ExamSessionQuestionUpdateOneRequiredWithoutAnswersNestedInput;
};
export type ExamAnswerUncheckedUpdateWithoutSelectedOptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionQuestionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamAnswerUncheckedUpdateManyWithoutSelectedOptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionQuestionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamAnswerCreateManyExamSessionInput = {
    id?: string;
    examSessionQuestionId: string;
    selectedOptionId?: string | null;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type ExamAnswerUpdateWithoutExamSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examSessionQuestion?: Prisma.ExamSessionQuestionUpdateOneRequiredWithoutAnswersNestedInput;
    selectedOption?: Prisma.QuestionOptionUpdateOneWithoutSelectedAnswersNestedInput;
};
export type ExamAnswerUncheckedUpdateWithoutExamSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionQuestionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedOptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamAnswerUncheckedUpdateManyWithoutExamSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionQuestionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedOptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamAnswerCreateManyExamSessionQuestionInput = {
    id?: string;
    examSessionId: string;
    selectedOptionId?: string | null;
    selectedLabel?: string | null;
    isCorrect?: boolean | null;
    scoreAwarded?: number;
    isFlagged?: boolean;
    answeredAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type ExamAnswerUpdateWithoutExamSessionQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examSession?: Prisma.ExamSessionUpdateOneRequiredWithoutAnswersNestedInput;
    selectedOption?: Prisma.QuestionOptionUpdateOneWithoutSelectedAnswersNestedInput;
};
export type ExamAnswerUncheckedUpdateWithoutExamSessionQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedOptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamAnswerUncheckedUpdateManyWithoutExamSessionQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedOptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isCorrect?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    scoreAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    isFlagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    answeredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamAnswerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examSessionId?: boolean;
    examSessionQuestionId?: boolean;
    selectedOptionId?: boolean;
    selectedLabel?: boolean;
    isCorrect?: boolean;
    scoreAwarded?: boolean;
    isFlagged?: boolean;
    answeredAt?: boolean;
    updatedAt?: boolean;
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    examSessionQuestion?: boolean | Prisma.ExamSessionQuestionDefaultArgs<ExtArgs>;
    selectedOption?: boolean | Prisma.ExamAnswer$selectedOptionArgs<ExtArgs>;
}, ExtArgs["result"]["examAnswer"]>;
export type ExamAnswerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examSessionId?: boolean;
    examSessionQuestionId?: boolean;
    selectedOptionId?: boolean;
    selectedLabel?: boolean;
    isCorrect?: boolean;
    scoreAwarded?: boolean;
    isFlagged?: boolean;
    answeredAt?: boolean;
    updatedAt?: boolean;
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    examSessionQuestion?: boolean | Prisma.ExamSessionQuestionDefaultArgs<ExtArgs>;
    selectedOption?: boolean | Prisma.ExamAnswer$selectedOptionArgs<ExtArgs>;
}, ExtArgs["result"]["examAnswer"]>;
export type ExamAnswerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examSessionId?: boolean;
    examSessionQuestionId?: boolean;
    selectedOptionId?: boolean;
    selectedLabel?: boolean;
    isCorrect?: boolean;
    scoreAwarded?: boolean;
    isFlagged?: boolean;
    answeredAt?: boolean;
    updatedAt?: boolean;
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    examSessionQuestion?: boolean | Prisma.ExamSessionQuestionDefaultArgs<ExtArgs>;
    selectedOption?: boolean | Prisma.ExamAnswer$selectedOptionArgs<ExtArgs>;
}, ExtArgs["result"]["examAnswer"]>;
export type ExamAnswerSelectScalar = {
    id?: boolean;
    examSessionId?: boolean;
    examSessionQuestionId?: boolean;
    selectedOptionId?: boolean;
    selectedLabel?: boolean;
    isCorrect?: boolean;
    scoreAwarded?: boolean;
    isFlagged?: boolean;
    answeredAt?: boolean;
    updatedAt?: boolean;
};
export type ExamAnswerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "examSessionId" | "examSessionQuestionId" | "selectedOptionId" | "selectedLabel" | "isCorrect" | "scoreAwarded" | "isFlagged" | "answeredAt" | "updatedAt", ExtArgs["result"]["examAnswer"]>;
export type ExamAnswerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    examSessionQuestion?: boolean | Prisma.ExamSessionQuestionDefaultArgs<ExtArgs>;
    selectedOption?: boolean | Prisma.ExamAnswer$selectedOptionArgs<ExtArgs>;
};
export type ExamAnswerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    examSessionQuestion?: boolean | Prisma.ExamSessionQuestionDefaultArgs<ExtArgs>;
    selectedOption?: boolean | Prisma.ExamAnswer$selectedOptionArgs<ExtArgs>;
};
export type ExamAnswerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    examSessionQuestion?: boolean | Prisma.ExamSessionQuestionDefaultArgs<ExtArgs>;
    selectedOption?: boolean | Prisma.ExamAnswer$selectedOptionArgs<ExtArgs>;
};
export type $ExamAnswerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ExamAnswer";
    objects: {
        examSession: Prisma.$ExamSessionPayload<ExtArgs>;
        examSessionQuestion: Prisma.$ExamSessionQuestionPayload<ExtArgs>;
        selectedOption: Prisma.$QuestionOptionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        examSessionId: string;
        examSessionQuestionId: string;
        selectedOptionId: string | null;
        selectedLabel: string | null;
        isCorrect: boolean | null;
        scoreAwarded: number;
        isFlagged: boolean;
        answeredAt: Date | null;
        updatedAt: Date;
    }, ExtArgs["result"]["examAnswer"]>;
    composites: {};
};
export type ExamAnswerGetPayload<S extends boolean | null | undefined | ExamAnswerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload, S>;
export type ExamAnswerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExamAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExamAnswerCountAggregateInputType | true;
};
export interface ExamAnswerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ExamAnswer'];
        meta: {
            name: 'ExamAnswer';
        };
    };
    findUnique<T extends ExamAnswerFindUniqueArgs>(args: Prisma.SelectSubset<T, ExamAnswerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExamAnswerClient<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExamAnswerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExamAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamAnswerClient<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExamAnswerFindFirstArgs>(args?: Prisma.SelectSubset<T, ExamAnswerFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExamAnswerClient<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExamAnswerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExamAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamAnswerClient<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExamAnswerFindManyArgs>(args?: Prisma.SelectSubset<T, ExamAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExamAnswerCreateArgs>(args: Prisma.SelectSubset<T, ExamAnswerCreateArgs<ExtArgs>>): Prisma.Prisma__ExamAnswerClient<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExamAnswerCreateManyArgs>(args?: Prisma.SelectSubset<T, ExamAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExamAnswerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExamAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExamAnswerDeleteArgs>(args: Prisma.SelectSubset<T, ExamAnswerDeleteArgs<ExtArgs>>): Prisma.Prisma__ExamAnswerClient<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExamAnswerUpdateArgs>(args: Prisma.SelectSubset<T, ExamAnswerUpdateArgs<ExtArgs>>): Prisma.Prisma__ExamAnswerClient<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExamAnswerDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExamAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExamAnswerUpdateManyArgs>(args: Prisma.SelectSubset<T, ExamAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExamAnswerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExamAnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExamAnswerUpsertArgs>(args: Prisma.SelectSubset<T, ExamAnswerUpsertArgs<ExtArgs>>): Prisma.Prisma__ExamAnswerClient<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExamAnswerCountArgs>(args?: Prisma.Subset<T, ExamAnswerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExamAnswerCountAggregateOutputType> : number>;
    aggregate<T extends ExamAnswerAggregateArgs>(args: Prisma.Subset<T, ExamAnswerAggregateArgs>): Prisma.PrismaPromise<GetExamAnswerAggregateType<T>>;
    groupBy<T extends ExamAnswerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExamAnswerGroupByArgs['orderBy'];
    } : {
        orderBy?: ExamAnswerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExamAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExamAnswerFieldRefs;
}
export interface Prisma__ExamAnswerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    examSession<T extends Prisma.ExamSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    examSessionQuestion<T extends Prisma.ExamSessionQuestionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamSessionQuestionDefaultArgs<ExtArgs>>): Prisma.Prisma__ExamSessionQuestionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    selectedOption<T extends Prisma.ExamAnswer$selectedOptionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamAnswer$selectedOptionArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExamAnswerFieldRefs {
    readonly id: Prisma.FieldRef<"ExamAnswer", 'String'>;
    readonly examSessionId: Prisma.FieldRef<"ExamAnswer", 'String'>;
    readonly examSessionQuestionId: Prisma.FieldRef<"ExamAnswer", 'String'>;
    readonly selectedOptionId: Prisma.FieldRef<"ExamAnswer", 'String'>;
    readonly selectedLabel: Prisma.FieldRef<"ExamAnswer", 'String'>;
    readonly isCorrect: Prisma.FieldRef<"ExamAnswer", 'Boolean'>;
    readonly scoreAwarded: Prisma.FieldRef<"ExamAnswer", 'Int'>;
    readonly isFlagged: Prisma.FieldRef<"ExamAnswer", 'Boolean'>;
    readonly answeredAt: Prisma.FieldRef<"ExamAnswer", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ExamAnswer", 'DateTime'>;
}
export type ExamAnswerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    include?: Prisma.ExamAnswerInclude<ExtArgs> | null;
    where: Prisma.ExamAnswerWhereUniqueInput;
};
export type ExamAnswerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    include?: Prisma.ExamAnswerInclude<ExtArgs> | null;
    where: Prisma.ExamAnswerWhereUniqueInput;
};
export type ExamAnswerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamAnswerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamAnswerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamAnswerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    include?: Prisma.ExamAnswerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamAnswerCreateInput, Prisma.ExamAnswerUncheckedCreateInput>;
};
export type ExamAnswerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExamAnswerCreateManyInput | Prisma.ExamAnswerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExamAnswerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    data: Prisma.ExamAnswerCreateManyInput | Prisma.ExamAnswerCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ExamAnswerIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ExamAnswerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    include?: Prisma.ExamAnswerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamAnswerUpdateInput, Prisma.ExamAnswerUncheckedUpdateInput>;
    where: Prisma.ExamAnswerWhereUniqueInput;
};
export type ExamAnswerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExamAnswerUpdateManyMutationInput, Prisma.ExamAnswerUncheckedUpdateManyInput>;
    where?: Prisma.ExamAnswerWhereInput;
    limit?: number;
};
export type ExamAnswerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamAnswerUpdateManyMutationInput, Prisma.ExamAnswerUncheckedUpdateManyInput>;
    where?: Prisma.ExamAnswerWhereInput;
    limit?: number;
    include?: Prisma.ExamAnswerIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ExamAnswerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    include?: Prisma.ExamAnswerInclude<ExtArgs> | null;
    where: Prisma.ExamAnswerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamAnswerCreateInput, Prisma.ExamAnswerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExamAnswerUpdateInput, Prisma.ExamAnswerUncheckedUpdateInput>;
};
export type ExamAnswerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    include?: Prisma.ExamAnswerInclude<ExtArgs> | null;
    where: Prisma.ExamAnswerWhereUniqueInput;
};
export type ExamAnswerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamAnswerWhereInput;
    limit?: number;
};
export type ExamAnswer$selectedOptionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where?: Prisma.QuestionOptionWhereInput;
};
export type ExamAnswerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ExamAnswerOmit<ExtArgs> | null;
    include?: Prisma.ExamAnswerInclude<ExtArgs> | null;
};
