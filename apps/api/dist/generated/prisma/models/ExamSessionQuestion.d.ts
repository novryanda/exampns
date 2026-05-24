import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExamSessionQuestionModel = runtime.Types.Result.DefaultSelection<Prisma.$ExamSessionQuestionPayload>;
export type AggregateExamSessionQuestion = {
    _count: ExamSessionQuestionCountAggregateOutputType | null;
    _avg: ExamSessionQuestionAvgAggregateOutputType | null;
    _sum: ExamSessionQuestionSumAggregateOutputType | null;
    _min: ExamSessionQuestionMinAggregateOutputType | null;
    _max: ExamSessionQuestionMaxAggregateOutputType | null;
};
export type ExamSessionQuestionAvgAggregateOutputType = {
    questionOrder: number | null;
};
export type ExamSessionQuestionSumAggregateOutputType = {
    questionOrder: number | null;
};
export type ExamSessionQuestionMinAggregateOutputType = {
    id: string | null;
    examSessionId: string | null;
    questionId: string | null;
    questionOrder: number | null;
    categorySnapshot: $Enums.QuestionCategory | null;
    subCategorySnapshot: string | null;
    topicTagSnapshot: string | null;
    difficultySnapshot: $Enums.QuestionDifficulty | null;
    createdAt: Date | null;
};
export type ExamSessionQuestionMaxAggregateOutputType = {
    id: string | null;
    examSessionId: string | null;
    questionId: string | null;
    questionOrder: number | null;
    categorySnapshot: $Enums.QuestionCategory | null;
    subCategorySnapshot: string | null;
    topicTagSnapshot: string | null;
    difficultySnapshot: $Enums.QuestionDifficulty | null;
    createdAt: Date | null;
};
export type ExamSessionQuestionCountAggregateOutputType = {
    id: number;
    examSessionId: number;
    questionId: number;
    questionOrder: number;
    questionSnapshot: number;
    optionsSnapshot: number;
    categorySnapshot: number;
    subCategorySnapshot: number;
    topicTagSnapshot: number;
    difficultySnapshot: number;
    createdAt: number;
    _all: number;
};
export type ExamSessionQuestionAvgAggregateInputType = {
    questionOrder?: true;
};
export type ExamSessionQuestionSumAggregateInputType = {
    questionOrder?: true;
};
export type ExamSessionQuestionMinAggregateInputType = {
    id?: true;
    examSessionId?: true;
    questionId?: true;
    questionOrder?: true;
    categorySnapshot?: true;
    subCategorySnapshot?: true;
    topicTagSnapshot?: true;
    difficultySnapshot?: true;
    createdAt?: true;
};
export type ExamSessionQuestionMaxAggregateInputType = {
    id?: true;
    examSessionId?: true;
    questionId?: true;
    questionOrder?: true;
    categorySnapshot?: true;
    subCategorySnapshot?: true;
    topicTagSnapshot?: true;
    difficultySnapshot?: true;
    createdAt?: true;
};
export type ExamSessionQuestionCountAggregateInputType = {
    id?: true;
    examSessionId?: true;
    questionId?: true;
    questionOrder?: true;
    questionSnapshot?: true;
    optionsSnapshot?: true;
    categorySnapshot?: true;
    subCategorySnapshot?: true;
    topicTagSnapshot?: true;
    difficultySnapshot?: true;
    createdAt?: true;
    _all?: true;
};
export type ExamSessionQuestionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamSessionQuestionWhereInput;
    orderBy?: Prisma.ExamSessionQuestionOrderByWithRelationInput | Prisma.ExamSessionQuestionOrderByWithRelationInput[];
    cursor?: Prisma.ExamSessionQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExamSessionQuestionCountAggregateInputType;
    _avg?: ExamSessionQuestionAvgAggregateInputType;
    _sum?: ExamSessionQuestionSumAggregateInputType;
    _min?: ExamSessionQuestionMinAggregateInputType;
    _max?: ExamSessionQuestionMaxAggregateInputType;
};
export type GetExamSessionQuestionAggregateType<T extends ExamSessionQuestionAggregateArgs> = {
    [P in keyof T & keyof AggregateExamSessionQuestion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExamSessionQuestion[P]> : Prisma.GetScalarType<T[P], AggregateExamSessionQuestion[P]>;
};
export type ExamSessionQuestionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamSessionQuestionWhereInput;
    orderBy?: Prisma.ExamSessionQuestionOrderByWithAggregationInput | Prisma.ExamSessionQuestionOrderByWithAggregationInput[];
    by: Prisma.ExamSessionQuestionScalarFieldEnum[] | Prisma.ExamSessionQuestionScalarFieldEnum;
    having?: Prisma.ExamSessionQuestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExamSessionQuestionCountAggregateInputType | true;
    _avg?: ExamSessionQuestionAvgAggregateInputType;
    _sum?: ExamSessionQuestionSumAggregateInputType;
    _min?: ExamSessionQuestionMinAggregateInputType;
    _max?: ExamSessionQuestionMaxAggregateInputType;
};
export type ExamSessionQuestionGroupByOutputType = {
    id: string;
    examSessionId: string;
    questionId: string;
    questionOrder: number;
    questionSnapshot: runtime.JsonValue;
    optionsSnapshot: runtime.JsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt: Date;
    _count: ExamSessionQuestionCountAggregateOutputType | null;
    _avg: ExamSessionQuestionAvgAggregateOutputType | null;
    _sum: ExamSessionQuestionSumAggregateOutputType | null;
    _min: ExamSessionQuestionMinAggregateOutputType | null;
    _max: ExamSessionQuestionMaxAggregateOutputType | null;
};
export type GetExamSessionQuestionGroupByPayload<T extends ExamSessionQuestionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExamSessionQuestionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExamSessionQuestionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExamSessionQuestionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExamSessionQuestionGroupByOutputType[P]>;
}>>;
export type ExamSessionQuestionWhereInput = {
    AND?: Prisma.ExamSessionQuestionWhereInput | Prisma.ExamSessionQuestionWhereInput[];
    OR?: Prisma.ExamSessionQuestionWhereInput[];
    NOT?: Prisma.ExamSessionQuestionWhereInput | Prisma.ExamSessionQuestionWhereInput[];
    id?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    examSessionId?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    questionId?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    questionOrder?: Prisma.IntFilter<"ExamSessionQuestion"> | number;
    questionSnapshot?: Prisma.JsonFilter<"ExamSessionQuestion">;
    optionsSnapshot?: Prisma.JsonFilter<"ExamSessionQuestion">;
    categorySnapshot?: Prisma.EnumQuestionCategoryFilter<"ExamSessionQuestion"> | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    topicTagSnapshot?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFilter<"ExamSessionQuestion"> | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFilter<"ExamSessionQuestion"> | Date | string;
    examSession?: Prisma.XOR<Prisma.ExamSessionScalarRelationFilter, Prisma.ExamSessionWhereInput>;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
    answers?: Prisma.ExamAnswerListRelationFilter;
};
export type ExamSessionQuestionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    questionSnapshot?: Prisma.SortOrder;
    optionsSnapshot?: Prisma.SortOrder;
    categorySnapshot?: Prisma.SortOrder;
    subCategorySnapshot?: Prisma.SortOrder;
    topicTagSnapshot?: Prisma.SortOrder;
    difficultySnapshot?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    examSession?: Prisma.ExamSessionOrderByWithRelationInput;
    question?: Prisma.QuestionOrderByWithRelationInput;
    answers?: Prisma.ExamAnswerOrderByRelationAggregateInput;
};
export type ExamSessionQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    examSessionId_questionOrder?: Prisma.ExamSessionQuestionExamSessionIdQuestionOrderCompoundUniqueInput;
    examSessionId_questionId?: Prisma.ExamSessionQuestionExamSessionIdQuestionIdCompoundUniqueInput;
    AND?: Prisma.ExamSessionQuestionWhereInput | Prisma.ExamSessionQuestionWhereInput[];
    OR?: Prisma.ExamSessionQuestionWhereInput[];
    NOT?: Prisma.ExamSessionQuestionWhereInput | Prisma.ExamSessionQuestionWhereInput[];
    examSessionId?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    questionId?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    questionOrder?: Prisma.IntFilter<"ExamSessionQuestion"> | number;
    questionSnapshot?: Prisma.JsonFilter<"ExamSessionQuestion">;
    optionsSnapshot?: Prisma.JsonFilter<"ExamSessionQuestion">;
    categorySnapshot?: Prisma.EnumQuestionCategoryFilter<"ExamSessionQuestion"> | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    topicTagSnapshot?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFilter<"ExamSessionQuestion"> | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFilter<"ExamSessionQuestion"> | Date | string;
    examSession?: Prisma.XOR<Prisma.ExamSessionScalarRelationFilter, Prisma.ExamSessionWhereInput>;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
    answers?: Prisma.ExamAnswerListRelationFilter;
}, "id" | "examSessionId_questionOrder" | "examSessionId_questionId">;
export type ExamSessionQuestionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    questionSnapshot?: Prisma.SortOrder;
    optionsSnapshot?: Prisma.SortOrder;
    categorySnapshot?: Prisma.SortOrder;
    subCategorySnapshot?: Prisma.SortOrder;
    topicTagSnapshot?: Prisma.SortOrder;
    difficultySnapshot?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ExamSessionQuestionCountOrderByAggregateInput;
    _avg?: Prisma.ExamSessionQuestionAvgOrderByAggregateInput;
    _max?: Prisma.ExamSessionQuestionMaxOrderByAggregateInput;
    _min?: Prisma.ExamSessionQuestionMinOrderByAggregateInput;
    _sum?: Prisma.ExamSessionQuestionSumOrderByAggregateInput;
};
export type ExamSessionQuestionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExamSessionQuestionScalarWhereWithAggregatesInput | Prisma.ExamSessionQuestionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExamSessionQuestionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExamSessionQuestionScalarWhereWithAggregatesInput | Prisma.ExamSessionQuestionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ExamSessionQuestion"> | string;
    examSessionId?: Prisma.StringWithAggregatesFilter<"ExamSessionQuestion"> | string;
    questionId?: Prisma.StringWithAggregatesFilter<"ExamSessionQuestion"> | string;
    questionOrder?: Prisma.IntWithAggregatesFilter<"ExamSessionQuestion"> | number;
    questionSnapshot?: Prisma.JsonWithAggregatesFilter<"ExamSessionQuestion">;
    optionsSnapshot?: Prisma.JsonWithAggregatesFilter<"ExamSessionQuestion">;
    categorySnapshot?: Prisma.EnumQuestionCategoryWithAggregatesFilter<"ExamSessionQuestion"> | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringWithAggregatesFilter<"ExamSessionQuestion"> | string;
    topicTagSnapshot?: Prisma.StringWithAggregatesFilter<"ExamSessionQuestion"> | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyWithAggregatesFilter<"ExamSessionQuestion"> | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ExamSessionQuestion"> | Date | string;
};
export type ExamSessionQuestionCreateInput = {
    id?: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
    examSession: Prisma.ExamSessionCreateNestedOneWithoutQuestionsInput;
    question: Prisma.QuestionCreateNestedOneWithoutExamSessionQuestionsInput;
    answers?: Prisma.ExamAnswerCreateNestedManyWithoutExamSessionQuestionInput;
};
export type ExamSessionQuestionUncheckedCreateInput = {
    id?: string;
    examSessionId: string;
    questionId: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
    answers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutExamSessionQuestionInput;
};
export type ExamSessionQuestionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examSession?: Prisma.ExamSessionUpdateOneRequiredWithoutQuestionsNestedInput;
    question?: Prisma.QuestionUpdateOneRequiredWithoutExamSessionQuestionsNestedInput;
    answers?: Prisma.ExamAnswerUpdateManyWithoutExamSessionQuestionNestedInput;
};
export type ExamSessionQuestionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionQuestionNestedInput;
};
export type ExamSessionQuestionCreateManyInput = {
    id?: string;
    examSessionId: string;
    questionId: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
};
export type ExamSessionQuestionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamSessionQuestionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamSessionQuestionListRelationFilter = {
    every?: Prisma.ExamSessionQuestionWhereInput;
    some?: Prisma.ExamSessionQuestionWhereInput;
    none?: Prisma.ExamSessionQuestionWhereInput;
};
export type ExamSessionQuestionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExamSessionQuestionExamSessionIdQuestionOrderCompoundUniqueInput = {
    examSessionId: string;
    questionOrder: number;
};
export type ExamSessionQuestionExamSessionIdQuestionIdCompoundUniqueInput = {
    examSessionId: string;
    questionId: string;
};
export type ExamSessionQuestionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    questionSnapshot?: Prisma.SortOrder;
    optionsSnapshot?: Prisma.SortOrder;
    categorySnapshot?: Prisma.SortOrder;
    subCategorySnapshot?: Prisma.SortOrder;
    topicTagSnapshot?: Prisma.SortOrder;
    difficultySnapshot?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ExamSessionQuestionAvgOrderByAggregateInput = {
    questionOrder?: Prisma.SortOrder;
};
export type ExamSessionQuestionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    categorySnapshot?: Prisma.SortOrder;
    subCategorySnapshot?: Prisma.SortOrder;
    topicTagSnapshot?: Prisma.SortOrder;
    difficultySnapshot?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ExamSessionQuestionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    questionOrder?: Prisma.SortOrder;
    categorySnapshot?: Prisma.SortOrder;
    subCategorySnapshot?: Prisma.SortOrder;
    topicTagSnapshot?: Prisma.SortOrder;
    difficultySnapshot?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ExamSessionQuestionSumOrderByAggregateInput = {
    questionOrder?: Prisma.SortOrder;
};
export type ExamSessionQuestionScalarRelationFilter = {
    is?: Prisma.ExamSessionQuestionWhereInput;
    isNot?: Prisma.ExamSessionQuestionWhereInput;
};
export type ExamSessionQuestionCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutQuestionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput> | Prisma.ExamSessionQuestionCreateWithoutQuestionInput[] | Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutQuestionInput | Prisma.ExamSessionQuestionCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.ExamSessionQuestionCreateManyQuestionInputEnvelope;
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
};
export type ExamSessionQuestionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutQuestionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput> | Prisma.ExamSessionQuestionCreateWithoutQuestionInput[] | Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutQuestionInput | Prisma.ExamSessionQuestionCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.ExamSessionQuestionCreateManyQuestionInputEnvelope;
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
};
export type ExamSessionQuestionUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutQuestionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput> | Prisma.ExamSessionQuestionCreateWithoutQuestionInput[] | Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutQuestionInput | Prisma.ExamSessionQuestionCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.ExamSessionQuestionUpsertWithWhereUniqueWithoutQuestionInput | Prisma.ExamSessionQuestionUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.ExamSessionQuestionCreateManyQuestionInputEnvelope;
    set?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    disconnect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    delete?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    update?: Prisma.ExamSessionQuestionUpdateWithWhereUniqueWithoutQuestionInput | Prisma.ExamSessionQuestionUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.ExamSessionQuestionUpdateManyWithWhereWithoutQuestionInput | Prisma.ExamSessionQuestionUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.ExamSessionQuestionScalarWhereInput | Prisma.ExamSessionQuestionScalarWhereInput[];
};
export type ExamSessionQuestionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutQuestionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput> | Prisma.ExamSessionQuestionCreateWithoutQuestionInput[] | Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutQuestionInput | Prisma.ExamSessionQuestionCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.ExamSessionQuestionUpsertWithWhereUniqueWithoutQuestionInput | Prisma.ExamSessionQuestionUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.ExamSessionQuestionCreateManyQuestionInputEnvelope;
    set?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    disconnect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    delete?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    update?: Prisma.ExamSessionQuestionUpdateWithWhereUniqueWithoutQuestionInput | Prisma.ExamSessionQuestionUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.ExamSessionQuestionUpdateManyWithWhereWithoutQuestionInput | Prisma.ExamSessionQuestionUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.ExamSessionQuestionScalarWhereInput | Prisma.ExamSessionQuestionScalarWhereInput[];
};
export type ExamSessionQuestionCreateNestedManyWithoutExamSessionInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutExamSessionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput> | Prisma.ExamSessionQuestionCreateWithoutExamSessionInput[] | Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutExamSessionInput | Prisma.ExamSessionQuestionCreateOrConnectWithoutExamSessionInput[];
    createMany?: Prisma.ExamSessionQuestionCreateManyExamSessionInputEnvelope;
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
};
export type ExamSessionQuestionUncheckedCreateNestedManyWithoutExamSessionInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutExamSessionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput> | Prisma.ExamSessionQuestionCreateWithoutExamSessionInput[] | Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutExamSessionInput | Prisma.ExamSessionQuestionCreateOrConnectWithoutExamSessionInput[];
    createMany?: Prisma.ExamSessionQuestionCreateManyExamSessionInputEnvelope;
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
};
export type ExamSessionQuestionUpdateManyWithoutExamSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutExamSessionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput> | Prisma.ExamSessionQuestionCreateWithoutExamSessionInput[] | Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutExamSessionInput | Prisma.ExamSessionQuestionCreateOrConnectWithoutExamSessionInput[];
    upsert?: Prisma.ExamSessionQuestionUpsertWithWhereUniqueWithoutExamSessionInput | Prisma.ExamSessionQuestionUpsertWithWhereUniqueWithoutExamSessionInput[];
    createMany?: Prisma.ExamSessionQuestionCreateManyExamSessionInputEnvelope;
    set?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    disconnect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    delete?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    update?: Prisma.ExamSessionQuestionUpdateWithWhereUniqueWithoutExamSessionInput | Prisma.ExamSessionQuestionUpdateWithWhereUniqueWithoutExamSessionInput[];
    updateMany?: Prisma.ExamSessionQuestionUpdateManyWithWhereWithoutExamSessionInput | Prisma.ExamSessionQuestionUpdateManyWithWhereWithoutExamSessionInput[];
    deleteMany?: Prisma.ExamSessionQuestionScalarWhereInput | Prisma.ExamSessionQuestionScalarWhereInput[];
};
export type ExamSessionQuestionUncheckedUpdateManyWithoutExamSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutExamSessionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput> | Prisma.ExamSessionQuestionCreateWithoutExamSessionInput[] | Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutExamSessionInput | Prisma.ExamSessionQuestionCreateOrConnectWithoutExamSessionInput[];
    upsert?: Prisma.ExamSessionQuestionUpsertWithWhereUniqueWithoutExamSessionInput | Prisma.ExamSessionQuestionUpsertWithWhereUniqueWithoutExamSessionInput[];
    createMany?: Prisma.ExamSessionQuestionCreateManyExamSessionInputEnvelope;
    set?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    disconnect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    delete?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput | Prisma.ExamSessionQuestionWhereUniqueInput[];
    update?: Prisma.ExamSessionQuestionUpdateWithWhereUniqueWithoutExamSessionInput | Prisma.ExamSessionQuestionUpdateWithWhereUniqueWithoutExamSessionInput[];
    updateMany?: Prisma.ExamSessionQuestionUpdateManyWithWhereWithoutExamSessionInput | Prisma.ExamSessionQuestionUpdateManyWithWhereWithoutExamSessionInput[];
    deleteMany?: Prisma.ExamSessionQuestionScalarWhereInput | Prisma.ExamSessionQuestionScalarWhereInput[];
};
export type ExamSessionQuestionCreateNestedOneWithoutAnswersInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutAnswersInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutAnswersInput;
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput;
};
export type ExamSessionQuestionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutAnswersInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.ExamSessionQuestionCreateOrConnectWithoutAnswersInput;
    upsert?: Prisma.ExamSessionQuestionUpsertWithoutAnswersInput;
    connect?: Prisma.ExamSessionQuestionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExamSessionQuestionUpdateToOneWithWhereWithoutAnswersInput, Prisma.ExamSessionQuestionUpdateWithoutAnswersInput>, Prisma.ExamSessionQuestionUncheckedUpdateWithoutAnswersInput>;
};
export type ExamSessionQuestionCreateWithoutQuestionInput = {
    id?: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
    examSession: Prisma.ExamSessionCreateNestedOneWithoutQuestionsInput;
    answers?: Prisma.ExamAnswerCreateNestedManyWithoutExamSessionQuestionInput;
};
export type ExamSessionQuestionUncheckedCreateWithoutQuestionInput = {
    id?: string;
    examSessionId: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
    answers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutExamSessionQuestionInput;
};
export type ExamSessionQuestionCreateOrConnectWithoutQuestionInput = {
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutQuestionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput>;
};
export type ExamSessionQuestionCreateManyQuestionInputEnvelope = {
    data: Prisma.ExamSessionQuestionCreateManyQuestionInput | Prisma.ExamSessionQuestionCreateManyQuestionInput[];
    skipDuplicates?: boolean;
};
export type ExamSessionQuestionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamSessionQuestionUpdateWithoutQuestionInput, Prisma.ExamSessionQuestionUncheckedUpdateWithoutQuestionInput>;
    create: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutQuestionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutQuestionInput>;
};
export type ExamSessionQuestionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamSessionQuestionUpdateWithoutQuestionInput, Prisma.ExamSessionQuestionUncheckedUpdateWithoutQuestionInput>;
};
export type ExamSessionQuestionUpdateManyWithWhereWithoutQuestionInput = {
    where: Prisma.ExamSessionQuestionScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamSessionQuestionUpdateManyMutationInput, Prisma.ExamSessionQuestionUncheckedUpdateManyWithoutQuestionInput>;
};
export type ExamSessionQuestionScalarWhereInput = {
    AND?: Prisma.ExamSessionQuestionScalarWhereInput | Prisma.ExamSessionQuestionScalarWhereInput[];
    OR?: Prisma.ExamSessionQuestionScalarWhereInput[];
    NOT?: Prisma.ExamSessionQuestionScalarWhereInput | Prisma.ExamSessionQuestionScalarWhereInput[];
    id?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    examSessionId?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    questionId?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    questionOrder?: Prisma.IntFilter<"ExamSessionQuestion"> | number;
    questionSnapshot?: Prisma.JsonFilter<"ExamSessionQuestion">;
    optionsSnapshot?: Prisma.JsonFilter<"ExamSessionQuestion">;
    categorySnapshot?: Prisma.EnumQuestionCategoryFilter<"ExamSessionQuestion"> | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    topicTagSnapshot?: Prisma.StringFilter<"ExamSessionQuestion"> | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFilter<"ExamSessionQuestion"> | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFilter<"ExamSessionQuestion"> | Date | string;
};
export type ExamSessionQuestionCreateWithoutExamSessionInput = {
    id?: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
    question: Prisma.QuestionCreateNestedOneWithoutExamSessionQuestionsInput;
    answers?: Prisma.ExamAnswerCreateNestedManyWithoutExamSessionQuestionInput;
};
export type ExamSessionQuestionUncheckedCreateWithoutExamSessionInput = {
    id?: string;
    questionId: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
    answers?: Prisma.ExamAnswerUncheckedCreateNestedManyWithoutExamSessionQuestionInput;
};
export type ExamSessionQuestionCreateOrConnectWithoutExamSessionInput = {
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutExamSessionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput>;
};
export type ExamSessionQuestionCreateManyExamSessionInputEnvelope = {
    data: Prisma.ExamSessionQuestionCreateManyExamSessionInput | Prisma.ExamSessionQuestionCreateManyExamSessionInput[];
    skipDuplicates?: boolean;
};
export type ExamSessionQuestionUpsertWithWhereUniqueWithoutExamSessionInput = {
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamSessionQuestionUpdateWithoutExamSessionInput, Prisma.ExamSessionQuestionUncheckedUpdateWithoutExamSessionInput>;
    create: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutExamSessionInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutExamSessionInput>;
};
export type ExamSessionQuestionUpdateWithWhereUniqueWithoutExamSessionInput = {
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamSessionQuestionUpdateWithoutExamSessionInput, Prisma.ExamSessionQuestionUncheckedUpdateWithoutExamSessionInput>;
};
export type ExamSessionQuestionUpdateManyWithWhereWithoutExamSessionInput = {
    where: Prisma.ExamSessionQuestionScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamSessionQuestionUpdateManyMutationInput, Prisma.ExamSessionQuestionUncheckedUpdateManyWithoutExamSessionInput>;
};
export type ExamSessionQuestionCreateWithoutAnswersInput = {
    id?: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
    examSession: Prisma.ExamSessionCreateNestedOneWithoutQuestionsInput;
    question: Prisma.QuestionCreateNestedOneWithoutExamSessionQuestionsInput;
};
export type ExamSessionQuestionUncheckedCreateWithoutAnswersInput = {
    id?: string;
    examSessionId: string;
    questionId: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
};
export type ExamSessionQuestionCreateOrConnectWithoutAnswersInput = {
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutAnswersInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutAnswersInput>;
};
export type ExamSessionQuestionUpsertWithoutAnswersInput = {
    update: Prisma.XOR<Prisma.ExamSessionQuestionUpdateWithoutAnswersInput, Prisma.ExamSessionQuestionUncheckedUpdateWithoutAnswersInput>;
    create: Prisma.XOR<Prisma.ExamSessionQuestionCreateWithoutAnswersInput, Prisma.ExamSessionQuestionUncheckedCreateWithoutAnswersInput>;
    where?: Prisma.ExamSessionQuestionWhereInput;
};
export type ExamSessionQuestionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: Prisma.ExamSessionQuestionWhereInput;
    data: Prisma.XOR<Prisma.ExamSessionQuestionUpdateWithoutAnswersInput, Prisma.ExamSessionQuestionUncheckedUpdateWithoutAnswersInput>;
};
export type ExamSessionQuestionUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examSession?: Prisma.ExamSessionUpdateOneRequiredWithoutQuestionsNestedInput;
    question?: Prisma.QuestionUpdateOneRequiredWithoutExamSessionQuestionsNestedInput;
};
export type ExamSessionQuestionUncheckedUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamSessionQuestionCreateManyQuestionInput = {
    id?: string;
    examSessionId: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
};
export type ExamSessionQuestionUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examSession?: Prisma.ExamSessionUpdateOneRequiredWithoutQuestionsNestedInput;
    answers?: Prisma.ExamAnswerUpdateManyWithoutExamSessionQuestionNestedInput;
};
export type ExamSessionQuestionUncheckedUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionQuestionNestedInput;
};
export type ExamSessionQuestionUncheckedUpdateManyWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamSessionQuestionCreateManyExamSessionInput = {
    id?: string;
    questionId: string;
    questionOrder: number;
    questionSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot: $Enums.QuestionCategory;
    subCategorySnapshot: string;
    topicTagSnapshot: string;
    difficultySnapshot: $Enums.QuestionDifficulty;
    createdAt?: Date | string;
};
export type ExamSessionQuestionUpdateWithoutExamSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    question?: Prisma.QuestionUpdateOneRequiredWithoutExamSessionQuestionsNestedInput;
    answers?: Prisma.ExamAnswerUpdateManyWithoutExamSessionQuestionNestedInput;
};
export type ExamSessionQuestionUncheckedUpdateWithoutExamSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.ExamAnswerUncheckedUpdateManyWithoutExamSessionQuestionNestedInput;
};
export type ExamSessionQuestionUncheckedUpdateManyWithoutExamSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    questionSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    optionsSnapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    categorySnapshot?: Prisma.EnumQuestionCategoryFieldUpdateOperationsInput | $Enums.QuestionCategory;
    subCategorySnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    topicTagSnapshot?: Prisma.StringFieldUpdateOperationsInput | string;
    difficultySnapshot?: Prisma.EnumQuestionDifficultyFieldUpdateOperationsInput | $Enums.QuestionDifficulty;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamSessionQuestionCountOutputType = {
    answers: number;
};
export type ExamSessionQuestionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    answers?: boolean | ExamSessionQuestionCountOutputTypeCountAnswersArgs;
};
export type ExamSessionQuestionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionCountOutputTypeSelect<ExtArgs> | null;
};
export type ExamSessionQuestionCountOutputTypeCountAnswersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamAnswerWhereInput;
};
export type ExamSessionQuestionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examSessionId?: boolean;
    questionId?: boolean;
    questionOrder?: boolean;
    questionSnapshot?: boolean;
    optionsSnapshot?: boolean;
    categorySnapshot?: boolean;
    subCategorySnapshot?: boolean;
    topicTagSnapshot?: boolean;
    difficultySnapshot?: boolean;
    createdAt?: boolean;
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
    answers?: boolean | Prisma.ExamSessionQuestion$answersArgs<ExtArgs>;
    _count?: boolean | Prisma.ExamSessionQuestionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examSessionQuestion"]>;
export type ExamSessionQuestionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examSessionId?: boolean;
    questionId?: boolean;
    questionOrder?: boolean;
    questionSnapshot?: boolean;
    optionsSnapshot?: boolean;
    categorySnapshot?: boolean;
    subCategorySnapshot?: boolean;
    topicTagSnapshot?: boolean;
    difficultySnapshot?: boolean;
    createdAt?: boolean;
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examSessionQuestion"]>;
export type ExamSessionQuestionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examSessionId?: boolean;
    questionId?: boolean;
    questionOrder?: boolean;
    questionSnapshot?: boolean;
    optionsSnapshot?: boolean;
    categorySnapshot?: boolean;
    subCategorySnapshot?: boolean;
    topicTagSnapshot?: boolean;
    difficultySnapshot?: boolean;
    createdAt?: boolean;
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examSessionQuestion"]>;
export type ExamSessionQuestionSelectScalar = {
    id?: boolean;
    examSessionId?: boolean;
    questionId?: boolean;
    questionOrder?: boolean;
    questionSnapshot?: boolean;
    optionsSnapshot?: boolean;
    categorySnapshot?: boolean;
    subCategorySnapshot?: boolean;
    topicTagSnapshot?: boolean;
    difficultySnapshot?: boolean;
    createdAt?: boolean;
};
export type ExamSessionQuestionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "examSessionId" | "questionId" | "questionOrder" | "questionSnapshot" | "optionsSnapshot" | "categorySnapshot" | "subCategorySnapshot" | "topicTagSnapshot" | "difficultySnapshot" | "createdAt", ExtArgs["result"]["examSessionQuestion"]>;
export type ExamSessionQuestionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
    answers?: boolean | Prisma.ExamSessionQuestion$answersArgs<ExtArgs>;
    _count?: boolean | Prisma.ExamSessionQuestionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ExamSessionQuestionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type ExamSessionQuestionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type $ExamSessionQuestionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ExamSessionQuestion";
    objects: {
        examSession: Prisma.$ExamSessionPayload<ExtArgs>;
        question: Prisma.$QuestionPayload<ExtArgs>;
        answers: Prisma.$ExamAnswerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        examSessionId: string;
        questionId: string;
        questionOrder: number;
        questionSnapshot: runtime.JsonValue;
        optionsSnapshot: runtime.JsonValue;
        categorySnapshot: $Enums.QuestionCategory;
        subCategorySnapshot: string;
        topicTagSnapshot: string;
        difficultySnapshot: $Enums.QuestionDifficulty;
        createdAt: Date;
    }, ExtArgs["result"]["examSessionQuestion"]>;
    composites: {};
};
export type ExamSessionQuestionGetPayload<S extends boolean | null | undefined | ExamSessionQuestionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload, S>;
export type ExamSessionQuestionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExamSessionQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExamSessionQuestionCountAggregateInputType | true;
};
export interface ExamSessionQuestionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ExamSessionQuestion'];
        meta: {
            name: 'ExamSessionQuestion';
        };
    };
    findUnique<T extends ExamSessionQuestionFindUniqueArgs>(args: Prisma.SelectSubset<T, ExamSessionQuestionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExamSessionQuestionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExamSessionQuestionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExamSessionQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamSessionQuestionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExamSessionQuestionFindFirstArgs>(args?: Prisma.SelectSubset<T, ExamSessionQuestionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExamSessionQuestionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExamSessionQuestionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExamSessionQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamSessionQuestionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExamSessionQuestionFindManyArgs>(args?: Prisma.SelectSubset<T, ExamSessionQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExamSessionQuestionCreateArgs>(args: Prisma.SelectSubset<T, ExamSessionQuestionCreateArgs<ExtArgs>>): Prisma.Prisma__ExamSessionQuestionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExamSessionQuestionCreateManyArgs>(args?: Prisma.SelectSubset<T, ExamSessionQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExamSessionQuestionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExamSessionQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExamSessionQuestionDeleteArgs>(args: Prisma.SelectSubset<T, ExamSessionQuestionDeleteArgs<ExtArgs>>): Prisma.Prisma__ExamSessionQuestionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExamSessionQuestionUpdateArgs>(args: Prisma.SelectSubset<T, ExamSessionQuestionUpdateArgs<ExtArgs>>): Prisma.Prisma__ExamSessionQuestionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExamSessionQuestionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExamSessionQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExamSessionQuestionUpdateManyArgs>(args: Prisma.SelectSubset<T, ExamSessionQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExamSessionQuestionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExamSessionQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExamSessionQuestionUpsertArgs>(args: Prisma.SelectSubset<T, ExamSessionQuestionUpsertArgs<ExtArgs>>): Prisma.Prisma__ExamSessionQuestionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExamSessionQuestionCountArgs>(args?: Prisma.Subset<T, ExamSessionQuestionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExamSessionQuestionCountAggregateOutputType> : number>;
    aggregate<T extends ExamSessionQuestionAggregateArgs>(args: Prisma.Subset<T, ExamSessionQuestionAggregateArgs>): Prisma.PrismaPromise<GetExamSessionQuestionAggregateType<T>>;
    groupBy<T extends ExamSessionQuestionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExamSessionQuestionGroupByArgs['orderBy'];
    } : {
        orderBy?: ExamSessionQuestionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExamSessionQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamSessionQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExamSessionQuestionFieldRefs;
}
export interface Prisma__ExamSessionQuestionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    examSession<T extends Prisma.ExamSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    question<T extends Prisma.QuestionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionDefaultArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    answers<T extends Prisma.ExamSessionQuestion$answersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamSessionQuestion$answersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExamSessionQuestionFieldRefs {
    readonly id: Prisma.FieldRef<"ExamSessionQuestion", 'String'>;
    readonly examSessionId: Prisma.FieldRef<"ExamSessionQuestion", 'String'>;
    readonly questionId: Prisma.FieldRef<"ExamSessionQuestion", 'String'>;
    readonly questionOrder: Prisma.FieldRef<"ExamSessionQuestion", 'Int'>;
    readonly questionSnapshot: Prisma.FieldRef<"ExamSessionQuestion", 'Json'>;
    readonly optionsSnapshot: Prisma.FieldRef<"ExamSessionQuestion", 'Json'>;
    readonly categorySnapshot: Prisma.FieldRef<"ExamSessionQuestion", 'QuestionCategory'>;
    readonly subCategorySnapshot: Prisma.FieldRef<"ExamSessionQuestion", 'String'>;
    readonly topicTagSnapshot: Prisma.FieldRef<"ExamSessionQuestion", 'String'>;
    readonly difficultySnapshot: Prisma.FieldRef<"ExamSessionQuestion", 'QuestionDifficulty'>;
    readonly createdAt: Prisma.FieldRef<"ExamSessionQuestion", 'DateTime'>;
}
export type ExamSessionQuestionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionQuestionInclude<ExtArgs> | null;
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
};
export type ExamSessionQuestionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionQuestionInclude<ExtArgs> | null;
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
};
export type ExamSessionQuestionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamSessionQuestionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamSessionQuestionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamSessionQuestionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionQuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamSessionQuestionCreateInput, Prisma.ExamSessionQuestionUncheckedCreateInput>;
};
export type ExamSessionQuestionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExamSessionQuestionCreateManyInput | Prisma.ExamSessionQuestionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExamSessionQuestionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    data: Prisma.ExamSessionQuestionCreateManyInput | Prisma.ExamSessionQuestionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ExamSessionQuestionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ExamSessionQuestionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionQuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamSessionQuestionUpdateInput, Prisma.ExamSessionQuestionUncheckedUpdateInput>;
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
};
export type ExamSessionQuestionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExamSessionQuestionUpdateManyMutationInput, Prisma.ExamSessionQuestionUncheckedUpdateManyInput>;
    where?: Prisma.ExamSessionQuestionWhereInput;
    limit?: number;
};
export type ExamSessionQuestionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamSessionQuestionUpdateManyMutationInput, Prisma.ExamSessionQuestionUncheckedUpdateManyInput>;
    where?: Prisma.ExamSessionQuestionWhereInput;
    limit?: number;
    include?: Prisma.ExamSessionQuestionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ExamSessionQuestionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionQuestionInclude<ExtArgs> | null;
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamSessionQuestionCreateInput, Prisma.ExamSessionQuestionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExamSessionQuestionUpdateInput, Prisma.ExamSessionQuestionUncheckedUpdateInput>;
};
export type ExamSessionQuestionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionQuestionInclude<ExtArgs> | null;
    where: Prisma.ExamSessionQuestionWhereUniqueInput;
};
export type ExamSessionQuestionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamSessionQuestionWhereInput;
    limit?: number;
};
export type ExamSessionQuestion$answersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamSessionQuestionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSessionQuestionSelect<ExtArgs> | null;
    omit?: Prisma.ExamSessionQuestionOmit<ExtArgs> | null;
    include?: Prisma.ExamSessionQuestionInclude<ExtArgs> | null;
};
