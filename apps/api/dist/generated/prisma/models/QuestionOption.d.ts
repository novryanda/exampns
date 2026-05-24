import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuestionOptionModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionOptionPayload>;
export type AggregateQuestionOption = {
    _count: QuestionOptionCountAggregateOutputType | null;
    _avg: QuestionOptionAvgAggregateOutputType | null;
    _sum: QuestionOptionSumAggregateOutputType | null;
    _min: QuestionOptionMinAggregateOutputType | null;
    _max: QuestionOptionMaxAggregateOutputType | null;
};
export type QuestionOptionAvgAggregateOutputType = {
    tkpWeight: number | null;
    displayOrder: number | null;
};
export type QuestionOptionSumAggregateOutputType = {
    tkpWeight: number | null;
    displayOrder: number | null;
};
export type QuestionOptionMinAggregateOutputType = {
    id: string | null;
    questionId: string | null;
    label: string | null;
    optionText: string | null;
    isCorrect: boolean | null;
    tkpWeight: number | null;
    displayOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type QuestionOptionMaxAggregateOutputType = {
    id: string | null;
    questionId: string | null;
    label: string | null;
    optionText: string | null;
    isCorrect: boolean | null;
    tkpWeight: number | null;
    displayOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type QuestionOptionCountAggregateOutputType = {
    id: number;
    questionId: number;
    label: number;
    optionText: number;
    isCorrect: number;
    tkpWeight: number;
    displayOrder: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type QuestionOptionAvgAggregateInputType = {
    tkpWeight?: true;
    displayOrder?: true;
};
export type QuestionOptionSumAggregateInputType = {
    tkpWeight?: true;
    displayOrder?: true;
};
export type QuestionOptionMinAggregateInputType = {
    id?: true;
    questionId?: true;
    label?: true;
    optionText?: true;
    isCorrect?: true;
    tkpWeight?: true;
    displayOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type QuestionOptionMaxAggregateInputType = {
    id?: true;
    questionId?: true;
    label?: true;
    optionText?: true;
    isCorrect?: true;
    tkpWeight?: true;
    displayOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type QuestionOptionCountAggregateInputType = {
    id?: true;
    questionId?: true;
    label?: true;
    optionText?: true;
    isCorrect?: true;
    tkpWeight?: true;
    displayOrder?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type QuestionOptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionOptionWhereInput;
    orderBy?: Prisma.QuestionOptionOrderByWithRelationInput | Prisma.QuestionOptionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionOptionCountAggregateInputType;
    _avg?: QuestionOptionAvgAggregateInputType;
    _sum?: QuestionOptionSumAggregateInputType;
    _min?: QuestionOptionMinAggregateInputType;
    _max?: QuestionOptionMaxAggregateInputType;
};
export type GetQuestionOptionAggregateType<T extends QuestionOptionAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestionOption]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestionOption[P]> : Prisma.GetScalarType<T[P], AggregateQuestionOption[P]>;
};
export type QuestionOptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionOptionWhereInput;
    orderBy?: Prisma.QuestionOptionOrderByWithAggregationInput | Prisma.QuestionOptionOrderByWithAggregationInput[];
    by: Prisma.QuestionOptionScalarFieldEnum[] | Prisma.QuestionOptionScalarFieldEnum;
    having?: Prisma.QuestionOptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionOptionCountAggregateInputType | true;
    _avg?: QuestionOptionAvgAggregateInputType;
    _sum?: QuestionOptionSumAggregateInputType;
    _min?: QuestionOptionMinAggregateInputType;
    _max?: QuestionOptionMaxAggregateInputType;
};
export type QuestionOptionGroupByOutputType = {
    id: string;
    questionId: string;
    label: string;
    optionText: string;
    isCorrect: boolean;
    tkpWeight: number | null;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
    _count: QuestionOptionCountAggregateOutputType | null;
    _avg: QuestionOptionAvgAggregateOutputType | null;
    _sum: QuestionOptionSumAggregateOutputType | null;
    _min: QuestionOptionMinAggregateOutputType | null;
    _max: QuestionOptionMaxAggregateOutputType | null;
};
export type GetQuestionOptionGroupByPayload<T extends QuestionOptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionOptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionOptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionOptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionOptionGroupByOutputType[P]>;
}>>;
export type QuestionOptionWhereInput = {
    AND?: Prisma.QuestionOptionWhereInput | Prisma.QuestionOptionWhereInput[];
    OR?: Prisma.QuestionOptionWhereInput[];
    NOT?: Prisma.QuestionOptionWhereInput | Prisma.QuestionOptionWhereInput[];
    id?: Prisma.StringFilter<"QuestionOption"> | string;
    questionId?: Prisma.StringFilter<"QuestionOption"> | string;
    label?: Prisma.StringFilter<"QuestionOption"> | string;
    optionText?: Prisma.StringFilter<"QuestionOption"> | string;
    isCorrect?: Prisma.BoolFilter<"QuestionOption"> | boolean;
    tkpWeight?: Prisma.IntNullableFilter<"QuestionOption"> | number | null;
    displayOrder?: Prisma.IntFilter<"QuestionOption"> | number;
    createdAt?: Prisma.DateTimeFilter<"QuestionOption"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"QuestionOption"> | Date | string;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
    selectedAnswers?: Prisma.ExamAnswerListRelationFilter;
};
export type QuestionOptionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    optionText?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    tkpWeight?: Prisma.SortOrderInput | Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    question?: Prisma.QuestionOrderByWithRelationInput;
    selectedAnswers?: Prisma.ExamAnswerOrderByRelationAggregateInput;
};
export type QuestionOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    questionId_label?: Prisma.QuestionOptionQuestionIdLabelCompoundUniqueInput;
    questionId_displayOrder?: Prisma.QuestionOptionQuestionIdDisplayOrderCompoundUniqueInput;
    AND?: Prisma.QuestionOptionWhereInput | Prisma.QuestionOptionWhereInput[];
    OR?: Prisma.QuestionOptionWhereInput[];
    NOT?: Prisma.QuestionOptionWhereInput | Prisma.QuestionOptionWhereInput[];
    questionId?: Prisma.StringFilter<"QuestionOption"> | string;
    label?: Prisma.StringFilter<"QuestionOption"> | string;
    optionText?: Prisma.StringFilter<"QuestionOption"> | string;
    isCorrect?: Prisma.BoolFilter<"QuestionOption"> | boolean;
    tkpWeight?: Prisma.IntNullableFilter<"QuestionOption"> | number | null;
    displayOrder?: Prisma.IntFilter<"QuestionOption"> | number;
    createdAt?: Prisma.DateTimeFilter<"QuestionOption"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"QuestionOption"> | Date | string;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
    selectedAnswers?: Prisma.ExamAnswerListRelationFilter;
}, "id" | "questionId_label" | "questionId_displayOrder">;
export type QuestionOptionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    optionText?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    tkpWeight?: Prisma.SortOrderInput | Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.QuestionOptionCountOrderByAggregateInput;
    _avg?: Prisma.QuestionOptionAvgOrderByAggregateInput;
    _max?: Prisma.QuestionOptionMaxOrderByAggregateInput;
    _min?: Prisma.QuestionOptionMinOrderByAggregateInput;
    _sum?: Prisma.QuestionOptionSumOrderByAggregateInput;
};
export type QuestionOptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionOptionScalarWhereWithAggregatesInput | Prisma.QuestionOptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionOptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionOptionScalarWhereWithAggregatesInput | Prisma.QuestionOptionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"QuestionOption"> | string;
    questionId?: Prisma.StringWithAggregatesFilter<"QuestionOption"> | string;
    label?: Prisma.StringWithAggregatesFilter<"QuestionOption"> | string;
    optionText?: Prisma.StringWithAggregatesFilter<"QuestionOption"> | string;
    isCorrect?: Prisma.BoolWithAggregatesFilter<"QuestionOption"> | boolean;
    tkpWeight?: Prisma.IntNullableWithAggregatesFilter<"QuestionOption"> | number | null;
    displayOrder?: Prisma.IntWithAggregatesFilter<"QuestionOption"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"QuestionOption"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"QuestionOption"> | Date | string;
};
export type QuestionOptionCreateInput = {
    id?: string;
    label: string;
    optionText: string;
    isCorrect?: boolean;
    tkpWeight?: number | null;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    question: Prisma.QuestionCreateNestedOneWithoutOptionsInput;
    selectedAnswers?: Prisma.ExamAnswerCreateNestedManyWithoutSelectedOptionInput;
};
export type QuestionOptionUncheckedCreateInput = {
    id?: string;
    questionId: string;
    label: string;
    optionText: string;
    isCorrect?: boolean;
    tkpWeight?: number | null;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    selectedAnswers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutSelectedOptionInput;
};
export type QuestionOptionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    optionText?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tkpWeight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    question?: Prisma.QuestionUpdateOneRequiredWithoutOptionsNestedInput;
    selectedAnswers?: Prisma.ExamAnswerUpdateManyWithoutSelectedOptionNestedInput;
};
export type QuestionOptionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    optionText?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tkpWeight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selectedAnswers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutSelectedOptionNestedInput;
};
export type QuestionOptionCreateManyInput = {
    id?: string;
    questionId: string;
    label: string;
    optionText: string;
    isCorrect?: boolean;
    tkpWeight?: number | null;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QuestionOptionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    optionText?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tkpWeight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionOptionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    optionText?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tkpWeight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionOptionListRelationFilter = {
    every?: Prisma.QuestionOptionWhereInput;
    some?: Prisma.QuestionOptionWhereInput;
    none?: Prisma.QuestionOptionWhereInput;
};
export type QuestionOptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuestionOptionQuestionIdLabelCompoundUniqueInput = {
    questionId: string;
    label: string;
};
export type QuestionOptionQuestionIdDisplayOrderCompoundUniqueInput = {
    questionId: string;
    displayOrder: number;
};
export type QuestionOptionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    optionText?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    tkpWeight?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QuestionOptionAvgOrderByAggregateInput = {
    tkpWeight?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
};
export type QuestionOptionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    optionText?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    tkpWeight?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QuestionOptionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    optionText?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    tkpWeight?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QuestionOptionSumOrderByAggregateInput = {
    tkpWeight?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
};
export type QuestionOptionNullableScalarRelationFilter = {
    is?: Prisma.QuestionOptionWhereInput | null;
    isNot?: Prisma.QuestionOptionWhereInput | null;
};
export type QuestionOptionCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput> | Prisma.QuestionOptionCreateWithoutQuestionInput[] | Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput | Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.QuestionOptionCreateManyQuestionInputEnvelope;
    connect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
};
export type QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput> | Prisma.QuestionOptionCreateWithoutQuestionInput[] | Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput | Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.QuestionOptionCreateManyQuestionInputEnvelope;
    connect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
};
export type QuestionOptionUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput> | Prisma.QuestionOptionCreateWithoutQuestionInput[] | Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput | Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput | Prisma.QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.QuestionOptionCreateManyQuestionInputEnvelope;
    set?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    disconnect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    delete?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    connect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    update?: Prisma.QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput | Prisma.QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.QuestionOptionUpdateManyWithWhereWithoutQuestionInput | Prisma.QuestionOptionUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.QuestionOptionScalarWhereInput | Prisma.QuestionOptionScalarWhereInput[];
};
export type QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput> | Prisma.QuestionOptionCreateWithoutQuestionInput[] | Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput | Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput | Prisma.QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.QuestionOptionCreateManyQuestionInputEnvelope;
    set?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    disconnect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    delete?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    connect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    update?: Prisma.QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput | Prisma.QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.QuestionOptionUpdateManyWithWhereWithoutQuestionInput | Prisma.QuestionOptionUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.QuestionOptionScalarWhereInput | Prisma.QuestionOptionScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type QuestionOptionCreateNestedOneWithoutSelectedAnswersInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutSelectedAnswersInput, Prisma.QuestionOptionUncheckedCreateWithoutSelectedAnswersInput>;
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutSelectedAnswersInput;
    connect?: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionUpdateOneWithoutSelectedAnswersNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutSelectedAnswersInput, Prisma.QuestionOptionUncheckedCreateWithoutSelectedAnswersInput>;
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutSelectedAnswersInput;
    upsert?: Prisma.QuestionOptionUpsertWithoutSelectedAnswersInput;
    disconnect?: Prisma.QuestionOptionWhereInput | boolean;
    delete?: Prisma.QuestionOptionWhereInput | boolean;
    connect?: Prisma.QuestionOptionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuestionOptionUpdateToOneWithWhereWithoutSelectedAnswersInput, Prisma.QuestionOptionUpdateWithoutSelectedAnswersInput>, Prisma.QuestionOptionUncheckedUpdateWithoutSelectedAnswersInput>;
};
export type QuestionOptionCreateWithoutQuestionInput = {
    id?: string;
    label: string;
    optionText: string;
    isCorrect?: boolean;
    tkpWeight?: number | null;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    selectedAnswers?: Prisma.ExamAnswerCreateNestedManyWithoutSelectedOptionInput;
};
export type QuestionOptionUncheckedCreateWithoutQuestionInput = {
    id?: string;
    label: string;
    optionText: string;
    isCorrect?: boolean;
    tkpWeight?: number | null;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    selectedAnswers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutSelectedOptionInput;
};
export type QuestionOptionCreateOrConnectWithoutQuestionInput = {
    where: Prisma.QuestionOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput>;
};
export type QuestionOptionCreateManyQuestionInputEnvelope = {
    data: Prisma.QuestionOptionCreateManyQuestionInput | Prisma.QuestionOptionCreateManyQuestionInput[];
    skipDuplicates?: boolean;
};
export type QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.QuestionOptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuestionOptionUpdateWithoutQuestionInput, Prisma.QuestionOptionUncheckedUpdateWithoutQuestionInput>;
    create: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput>;
};
export type QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.QuestionOptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateWithoutQuestionInput, Prisma.QuestionOptionUncheckedUpdateWithoutQuestionInput>;
};
export type QuestionOptionUpdateManyWithWhereWithoutQuestionInput = {
    where: Prisma.QuestionOptionScalarWhereInput;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateManyMutationInput, Prisma.QuestionOptionUncheckedUpdateManyWithoutQuestionInput>;
};
export type QuestionOptionScalarWhereInput = {
    AND?: Prisma.QuestionOptionScalarWhereInput | Prisma.QuestionOptionScalarWhereInput[];
    OR?: Prisma.QuestionOptionScalarWhereInput[];
    NOT?: Prisma.QuestionOptionScalarWhereInput | Prisma.QuestionOptionScalarWhereInput[];
    id?: Prisma.StringFilter<"QuestionOption"> | string;
    questionId?: Prisma.StringFilter<"QuestionOption"> | string;
    label?: Prisma.StringFilter<"QuestionOption"> | string;
    optionText?: Prisma.StringFilter<"QuestionOption"> | string;
    isCorrect?: Prisma.BoolFilter<"QuestionOption"> | boolean;
    tkpWeight?: Prisma.IntNullableFilter<"QuestionOption"> | number | null;
    displayOrder?: Prisma.IntFilter<"QuestionOption"> | number;
    createdAt?: Prisma.DateTimeFilter<"QuestionOption"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"QuestionOption"> | Date | string;
};
export type QuestionOptionCreateWithoutSelectedAnswersInput = {
    id?: string;
    label: string;
    optionText: string;
    isCorrect?: boolean;
    tkpWeight?: number | null;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    question: Prisma.QuestionCreateNestedOneWithoutOptionsInput;
};
export type QuestionOptionUncheckedCreateWithoutSelectedAnswersInput = {
    id?: string;
    questionId: string;
    label: string;
    optionText: string;
    isCorrect?: boolean;
    tkpWeight?: number | null;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QuestionOptionCreateOrConnectWithoutSelectedAnswersInput = {
    where: Prisma.QuestionOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionOptionCreateWithoutSelectedAnswersInput, Prisma.QuestionOptionUncheckedCreateWithoutSelectedAnswersInput>;
};
export type QuestionOptionUpsertWithoutSelectedAnswersInput = {
    update: Prisma.XOR<Prisma.QuestionOptionUpdateWithoutSelectedAnswersInput, Prisma.QuestionOptionUncheckedUpdateWithoutSelectedAnswersInput>;
    create: Prisma.XOR<Prisma.QuestionOptionCreateWithoutSelectedAnswersInput, Prisma.QuestionOptionUncheckedCreateWithoutSelectedAnswersInput>;
    where?: Prisma.QuestionOptionWhereInput;
};
export type QuestionOptionUpdateToOneWithWhereWithoutSelectedAnswersInput = {
    where?: Prisma.QuestionOptionWhereInput;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateWithoutSelectedAnswersInput, Prisma.QuestionOptionUncheckedUpdateWithoutSelectedAnswersInput>;
};
export type QuestionOptionUpdateWithoutSelectedAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    optionText?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tkpWeight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    question?: Prisma.QuestionUpdateOneRequiredWithoutOptionsNestedInput;
};
export type QuestionOptionUncheckedUpdateWithoutSelectedAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    optionText?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tkpWeight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionOptionCreateManyQuestionInput = {
    id?: string;
    label: string;
    optionText: string;
    isCorrect?: boolean;
    tkpWeight?: number | null;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QuestionOptionUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    optionText?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tkpWeight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selectedAnswers?: Prisma.ExamAnswerUpdateManyWithoutSelectedOptionNestedInput;
};
export type QuestionOptionUncheckedUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    optionText?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tkpWeight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selectedAnswers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutSelectedOptionNestedInput;
};
export type QuestionOptionUncheckedUpdateManyWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    optionText?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tkpWeight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionOptionCountOutputType = {
    selectedAnswers: number;
};
export type QuestionOptionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    selectedAnswers?: boolean | QuestionOptionCountOutputTypeCountSelectedAnswersArgs;
};
export type QuestionOptionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionCountOutputTypeSelect<ExtArgs> | null;
};
export type QuestionOptionCountOutputTypeCountSelectedAnswersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamAnswerWhereInput;
};
export type QuestionOptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    questionId?: boolean;
    label?: boolean;
    optionText?: boolean;
    isCorrect?: boolean;
    tkpWeight?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
    selectedAnswers?: boolean | Prisma.QuestionOption$selectedAnswersArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionOptionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionOption"]>;
export type QuestionOptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    questionId?: boolean;
    label?: boolean;
    optionText?: boolean;
    isCorrect?: boolean;
    tkpWeight?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionOption"]>;
export type QuestionOptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    questionId?: boolean;
    label?: boolean;
    optionText?: boolean;
    isCorrect?: boolean;
    tkpWeight?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionOption"]>;
export type QuestionOptionSelectScalar = {
    id?: boolean;
    questionId?: boolean;
    label?: boolean;
    optionText?: boolean;
    isCorrect?: boolean;
    tkpWeight?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type QuestionOptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "questionId" | "label" | "optionText" | "isCorrect" | "tkpWeight" | "displayOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["questionOption"]>;
export type QuestionOptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
    selectedAnswers?: boolean | Prisma.QuestionOption$selectedAnswersArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionOptionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QuestionOptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type QuestionOptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type $QuestionOptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QuestionOption";
    objects: {
        question: Prisma.$QuestionPayload<ExtArgs>;
        selectedAnswers: Prisma.$ExamAnswerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        questionId: string;
        label: string;
        optionText: string;
        isCorrect: boolean;
        tkpWeight: number | null;
        displayOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["questionOption"]>;
    composites: {};
};
export type QuestionOptionGetPayload<S extends boolean | null | undefined | QuestionOptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload, S>;
export type QuestionOptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionOptionCountAggregateInputType | true;
};
export interface QuestionOptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QuestionOption'];
        meta: {
            name: 'QuestionOption';
        };
    };
    findUnique<T extends QuestionOptionFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionOptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionOptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionOptionFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionOptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionOptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionOptionFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionOptionCreateArgs>(args: Prisma.SelectSubset<T, QuestionOptionCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionOptionCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionOptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionOptionDeleteArgs>(args: Prisma.SelectSubset<T, QuestionOptionDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionOptionUpdateArgs>(args: Prisma.SelectSubset<T, QuestionOptionUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionOptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionOptionUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionOptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionOptionUpsertArgs>(args: Prisma.SelectSubset<T, QuestionOptionUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionOptionCountArgs>(args?: Prisma.Subset<T, QuestionOptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionOptionCountAggregateOutputType> : number>;
    aggregate<T extends QuestionOptionAggregateArgs>(args: Prisma.Subset<T, QuestionOptionAggregateArgs>): Prisma.PrismaPromise<GetQuestionOptionAggregateType<T>>;
    groupBy<T extends QuestionOptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionOptionGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionOptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionOptionFieldRefs;
}
export interface Prisma__QuestionOptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    question<T extends Prisma.QuestionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionDefaultArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    selectedAnswers<T extends Prisma.QuestionOption$selectedAnswersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionOption$selectedAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionOptionFieldRefs {
    readonly id: Prisma.FieldRef<"QuestionOption", 'String'>;
    readonly questionId: Prisma.FieldRef<"QuestionOption", 'String'>;
    readonly label: Prisma.FieldRef<"QuestionOption", 'String'>;
    readonly optionText: Prisma.FieldRef<"QuestionOption", 'String'>;
    readonly isCorrect: Prisma.FieldRef<"QuestionOption", 'Boolean'>;
    readonly tkpWeight: Prisma.FieldRef<"QuestionOption", 'Int'>;
    readonly displayOrder: Prisma.FieldRef<"QuestionOption", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"QuestionOption", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"QuestionOption", 'DateTime'>;
}
export type QuestionOptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where?: Prisma.QuestionOptionWhereInput;
    orderBy?: Prisma.QuestionOptionOrderByWithRelationInput | Prisma.QuestionOptionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionOptionScalarFieldEnum | Prisma.QuestionOptionScalarFieldEnum[];
};
export type QuestionOptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where?: Prisma.QuestionOptionWhereInput;
    orderBy?: Prisma.QuestionOptionOrderByWithRelationInput | Prisma.QuestionOptionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionOptionScalarFieldEnum | Prisma.QuestionOptionScalarFieldEnum[];
};
export type QuestionOptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where?: Prisma.QuestionOptionWhereInput;
    orderBy?: Prisma.QuestionOptionOrderByWithRelationInput | Prisma.QuestionOptionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionOptionScalarFieldEnum | Prisma.QuestionOptionScalarFieldEnum[];
};
export type QuestionOptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionOptionCreateInput, Prisma.QuestionOptionUncheckedCreateInput>;
};
export type QuestionOptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionOptionCreateManyInput | Prisma.QuestionOptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionOptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    data: Prisma.QuestionOptionCreateManyInput | Prisma.QuestionOptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuestionOptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuestionOptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateInput, Prisma.QuestionOptionUncheckedUpdateInput>;
    where: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionOptionUpdateManyMutationInput, Prisma.QuestionOptionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionOptionWhereInput;
    limit?: number;
};
export type QuestionOptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateManyMutationInput, Prisma.QuestionOptionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionOptionWhereInput;
    limit?: number;
    include?: Prisma.QuestionOptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuestionOptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where: Prisma.QuestionOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionOptionCreateInput, Prisma.QuestionOptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionOptionUpdateInput, Prisma.QuestionOptionUncheckedUpdateInput>;
};
export type QuestionOptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionOptionWhereInput;
    limit?: number;
};
export type QuestionOption$selectedAnswersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuestionOptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
};
