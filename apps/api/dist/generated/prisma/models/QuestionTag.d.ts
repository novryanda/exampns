import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuestionTagModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionTagPayload>;
export type AggregateQuestionTag = {
    _count: QuestionTagCountAggregateOutputType | null;
    _min: QuestionTagMinAggregateOutputType | null;
    _max: QuestionTagMaxAggregateOutputType | null;
};
export type QuestionTagMinAggregateOutputType = {
    id: string | null;
    questionId: string | null;
    tag: string | null;
    createdAt: Date | null;
};
export type QuestionTagMaxAggregateOutputType = {
    id: string | null;
    questionId: string | null;
    tag: string | null;
    createdAt: Date | null;
};
export type QuestionTagCountAggregateOutputType = {
    id: number;
    questionId: number;
    tag: number;
    createdAt: number;
    _all: number;
};
export type QuestionTagMinAggregateInputType = {
    id?: true;
    questionId?: true;
    tag?: true;
    createdAt?: true;
};
export type QuestionTagMaxAggregateInputType = {
    id?: true;
    questionId?: true;
    tag?: true;
    createdAt?: true;
};
export type QuestionTagCountAggregateInputType = {
    id?: true;
    questionId?: true;
    tag?: true;
    createdAt?: true;
    _all?: true;
};
export type QuestionTagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionTagWhereInput;
    orderBy?: Prisma.QuestionTagOrderByWithRelationInput | Prisma.QuestionTagOrderByWithRelationInput[];
    cursor?: Prisma.QuestionTagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionTagCountAggregateInputType;
    _min?: QuestionTagMinAggregateInputType;
    _max?: QuestionTagMaxAggregateInputType;
};
export type GetQuestionTagAggregateType<T extends QuestionTagAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestionTag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestionTag[P]> : Prisma.GetScalarType<T[P], AggregateQuestionTag[P]>;
};
export type QuestionTagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionTagWhereInput;
    orderBy?: Prisma.QuestionTagOrderByWithAggregationInput | Prisma.QuestionTagOrderByWithAggregationInput[];
    by: Prisma.QuestionTagScalarFieldEnum[] | Prisma.QuestionTagScalarFieldEnum;
    having?: Prisma.QuestionTagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionTagCountAggregateInputType | true;
    _min?: QuestionTagMinAggregateInputType;
    _max?: QuestionTagMaxAggregateInputType;
};
export type QuestionTagGroupByOutputType = {
    id: string;
    questionId: string;
    tag: string;
    createdAt: Date;
    _count: QuestionTagCountAggregateOutputType | null;
    _min: QuestionTagMinAggregateOutputType | null;
    _max: QuestionTagMaxAggregateOutputType | null;
};
export type GetQuestionTagGroupByPayload<T extends QuestionTagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionTagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionTagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionTagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionTagGroupByOutputType[P]>;
}>>;
export type QuestionTagWhereInput = {
    AND?: Prisma.QuestionTagWhereInput | Prisma.QuestionTagWhereInput[];
    OR?: Prisma.QuestionTagWhereInput[];
    NOT?: Prisma.QuestionTagWhereInput | Prisma.QuestionTagWhereInput[];
    id?: Prisma.StringFilter<"QuestionTag"> | string;
    questionId?: Prisma.StringFilter<"QuestionTag"> | string;
    tag?: Prisma.StringFilter<"QuestionTag"> | string;
    createdAt?: Prisma.DateTimeFilter<"QuestionTag"> | Date | string;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
};
export type QuestionTagOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    tag?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    question?: Prisma.QuestionOrderByWithRelationInput;
};
export type QuestionTagWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    questionId_tag?: Prisma.QuestionTagQuestionIdTagCompoundUniqueInput;
    AND?: Prisma.QuestionTagWhereInput | Prisma.QuestionTagWhereInput[];
    OR?: Prisma.QuestionTagWhereInput[];
    NOT?: Prisma.QuestionTagWhereInput | Prisma.QuestionTagWhereInput[];
    questionId?: Prisma.StringFilter<"QuestionTag"> | string;
    tag?: Prisma.StringFilter<"QuestionTag"> | string;
    createdAt?: Prisma.DateTimeFilter<"QuestionTag"> | Date | string;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
}, "id" | "questionId_tag">;
export type QuestionTagOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    tag?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.QuestionTagCountOrderByAggregateInput;
    _max?: Prisma.QuestionTagMaxOrderByAggregateInput;
    _min?: Prisma.QuestionTagMinOrderByAggregateInput;
};
export type QuestionTagScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionTagScalarWhereWithAggregatesInput | Prisma.QuestionTagScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionTagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionTagScalarWhereWithAggregatesInput | Prisma.QuestionTagScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"QuestionTag"> | string;
    questionId?: Prisma.StringWithAggregatesFilter<"QuestionTag"> | string;
    tag?: Prisma.StringWithAggregatesFilter<"QuestionTag"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"QuestionTag"> | Date | string;
};
export type QuestionTagCreateInput = {
    id?: string;
    tag: string;
    createdAt?: Date | string;
    question: Prisma.QuestionCreateNestedOneWithoutTagsInput;
};
export type QuestionTagUncheckedCreateInput = {
    id?: string;
    questionId: string;
    tag: string;
    createdAt?: Date | string;
};
export type QuestionTagUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tag?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    question?: Prisma.QuestionUpdateOneRequiredWithoutTagsNestedInput;
};
export type QuestionTagUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    tag?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionTagCreateManyInput = {
    id?: string;
    questionId: string;
    tag: string;
    createdAt?: Date | string;
};
export type QuestionTagUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tag?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionTagUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    tag?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionTagListRelationFilter = {
    every?: Prisma.QuestionTagWhereInput;
    some?: Prisma.QuestionTagWhereInput;
    none?: Prisma.QuestionTagWhereInput;
};
export type QuestionTagOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuestionTagQuestionIdTagCompoundUniqueInput = {
    questionId: string;
    tag: string;
};
export type QuestionTagCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    tag?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type QuestionTagMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    tag?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type QuestionTagMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    tag?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type QuestionTagCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.QuestionTagCreateWithoutQuestionInput, Prisma.QuestionTagUncheckedCreateWithoutQuestionInput> | Prisma.QuestionTagCreateWithoutQuestionInput[] | Prisma.QuestionTagUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionTagCreateOrConnectWithoutQuestionInput | Prisma.QuestionTagCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.QuestionTagCreateManyQuestionInputEnvelope;
    connect?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
};
export type QuestionTagUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.QuestionTagCreateWithoutQuestionInput, Prisma.QuestionTagUncheckedCreateWithoutQuestionInput> | Prisma.QuestionTagCreateWithoutQuestionInput[] | Prisma.QuestionTagUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionTagCreateOrConnectWithoutQuestionInput | Prisma.QuestionTagCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.QuestionTagCreateManyQuestionInputEnvelope;
    connect?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
};
export type QuestionTagUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionTagCreateWithoutQuestionInput, Prisma.QuestionTagUncheckedCreateWithoutQuestionInput> | Prisma.QuestionTagCreateWithoutQuestionInput[] | Prisma.QuestionTagUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionTagCreateOrConnectWithoutQuestionInput | Prisma.QuestionTagCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.QuestionTagUpsertWithWhereUniqueWithoutQuestionInput | Prisma.QuestionTagUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.QuestionTagCreateManyQuestionInputEnvelope;
    set?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
    disconnect?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
    delete?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
    connect?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
    update?: Prisma.QuestionTagUpdateWithWhereUniqueWithoutQuestionInput | Prisma.QuestionTagUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.QuestionTagUpdateManyWithWhereWithoutQuestionInput | Prisma.QuestionTagUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.QuestionTagScalarWhereInput | Prisma.QuestionTagScalarWhereInput[];
};
export type QuestionTagUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionTagCreateWithoutQuestionInput, Prisma.QuestionTagUncheckedCreateWithoutQuestionInput> | Prisma.QuestionTagCreateWithoutQuestionInput[] | Prisma.QuestionTagUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionTagCreateOrConnectWithoutQuestionInput | Prisma.QuestionTagCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.QuestionTagUpsertWithWhereUniqueWithoutQuestionInput | Prisma.QuestionTagUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.QuestionTagCreateManyQuestionInputEnvelope;
    set?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
    disconnect?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
    delete?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
    connect?: Prisma.QuestionTagWhereUniqueInput | Prisma.QuestionTagWhereUniqueInput[];
    update?: Prisma.QuestionTagUpdateWithWhereUniqueWithoutQuestionInput | Prisma.QuestionTagUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.QuestionTagUpdateManyWithWhereWithoutQuestionInput | Prisma.QuestionTagUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.QuestionTagScalarWhereInput | Prisma.QuestionTagScalarWhereInput[];
};
export type QuestionTagCreateWithoutQuestionInput = {
    id?: string;
    tag: string;
    createdAt?: Date | string;
};
export type QuestionTagUncheckedCreateWithoutQuestionInput = {
    id?: string;
    tag: string;
    createdAt?: Date | string;
};
export type QuestionTagCreateOrConnectWithoutQuestionInput = {
    where: Prisma.QuestionTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionTagCreateWithoutQuestionInput, Prisma.QuestionTagUncheckedCreateWithoutQuestionInput>;
};
export type QuestionTagCreateManyQuestionInputEnvelope = {
    data: Prisma.QuestionTagCreateManyQuestionInput | Prisma.QuestionTagCreateManyQuestionInput[];
    skipDuplicates?: boolean;
};
export type QuestionTagUpsertWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.QuestionTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuestionTagUpdateWithoutQuestionInput, Prisma.QuestionTagUncheckedUpdateWithoutQuestionInput>;
    create: Prisma.XOR<Prisma.QuestionTagCreateWithoutQuestionInput, Prisma.QuestionTagUncheckedCreateWithoutQuestionInput>;
};
export type QuestionTagUpdateWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.QuestionTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuestionTagUpdateWithoutQuestionInput, Prisma.QuestionTagUncheckedUpdateWithoutQuestionInput>;
};
export type QuestionTagUpdateManyWithWhereWithoutQuestionInput = {
    where: Prisma.QuestionTagScalarWhereInput;
    data: Prisma.XOR<Prisma.QuestionTagUpdateManyMutationInput, Prisma.QuestionTagUncheckedUpdateManyWithoutQuestionInput>;
};
export type QuestionTagScalarWhereInput = {
    AND?: Prisma.QuestionTagScalarWhereInput | Prisma.QuestionTagScalarWhereInput[];
    OR?: Prisma.QuestionTagScalarWhereInput[];
    NOT?: Prisma.QuestionTagScalarWhereInput | Prisma.QuestionTagScalarWhereInput[];
    id?: Prisma.StringFilter<"QuestionTag"> | string;
    questionId?: Prisma.StringFilter<"QuestionTag"> | string;
    tag?: Prisma.StringFilter<"QuestionTag"> | string;
    createdAt?: Prisma.DateTimeFilter<"QuestionTag"> | Date | string;
};
export type QuestionTagCreateManyQuestionInput = {
    id?: string;
    tag: string;
    createdAt?: Date | string;
};
export type QuestionTagUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tag?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionTagUncheckedUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tag?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionTagUncheckedUpdateManyWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tag?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionTagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    questionId?: boolean;
    tag?: boolean;
    createdAt?: boolean;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionTag"]>;
export type QuestionTagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    questionId?: boolean;
    tag?: boolean;
    createdAt?: boolean;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionTag"]>;
export type QuestionTagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    questionId?: boolean;
    tag?: boolean;
    createdAt?: boolean;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionTag"]>;
export type QuestionTagSelectScalar = {
    id?: boolean;
    questionId?: boolean;
    tag?: boolean;
    createdAt?: boolean;
};
export type QuestionTagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "questionId" | "tag" | "createdAt", ExtArgs["result"]["questionTag"]>;
export type QuestionTagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type QuestionTagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type QuestionTagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type $QuestionTagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QuestionTag";
    objects: {
        question: Prisma.$QuestionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        questionId: string;
        tag: string;
        createdAt: Date;
    }, ExtArgs["result"]["questionTag"]>;
    composites: {};
};
export type QuestionTagGetPayload<S extends boolean | null | undefined | QuestionTagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload, S>;
export type QuestionTagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionTagCountAggregateInputType | true;
};
export interface QuestionTagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QuestionTag'];
        meta: {
            name: 'QuestionTag';
        };
    };
    findUnique<T extends QuestionTagFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionTagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionTagClient<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionTagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionTagClient<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionTagFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionTagFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionTagClient<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionTagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionTagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionTagClient<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionTagFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionTagCreateArgs>(args: Prisma.SelectSubset<T, QuestionTagCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionTagClient<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionTagCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionTagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionTagDeleteArgs>(args: Prisma.SelectSubset<T, QuestionTagDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionTagClient<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionTagUpdateArgs>(args: Prisma.SelectSubset<T, QuestionTagUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionTagClient<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionTagDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionTagUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionTagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionTagUpsertArgs>(args: Prisma.SelectSubset<T, QuestionTagUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionTagClient<runtime.Types.Result.GetResult<Prisma.$QuestionTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionTagCountArgs>(args?: Prisma.Subset<T, QuestionTagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionTagCountAggregateOutputType> : number>;
    aggregate<T extends QuestionTagAggregateArgs>(args: Prisma.Subset<T, QuestionTagAggregateArgs>): Prisma.PrismaPromise<GetQuestionTagAggregateType<T>>;
    groupBy<T extends QuestionTagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionTagGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionTagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionTagFieldRefs;
}
export interface Prisma__QuestionTagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    question<T extends Prisma.QuestionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionDefaultArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionTagFieldRefs {
    readonly id: Prisma.FieldRef<"QuestionTag", 'String'>;
    readonly questionId: Prisma.FieldRef<"QuestionTag", 'String'>;
    readonly tag: Prisma.FieldRef<"QuestionTag", 'String'>;
    readonly createdAt: Prisma.FieldRef<"QuestionTag", 'DateTime'>;
}
export type QuestionTagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
    where: Prisma.QuestionTagWhereUniqueInput;
};
export type QuestionTagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
    where: Prisma.QuestionTagWhereUniqueInput;
};
export type QuestionTagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
    where?: Prisma.QuestionTagWhereInput;
    orderBy?: Prisma.QuestionTagOrderByWithRelationInput | Prisma.QuestionTagOrderByWithRelationInput[];
    cursor?: Prisma.QuestionTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionTagScalarFieldEnum | Prisma.QuestionTagScalarFieldEnum[];
};
export type QuestionTagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
    where?: Prisma.QuestionTagWhereInput;
    orderBy?: Prisma.QuestionTagOrderByWithRelationInput | Prisma.QuestionTagOrderByWithRelationInput[];
    cursor?: Prisma.QuestionTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionTagScalarFieldEnum | Prisma.QuestionTagScalarFieldEnum[];
};
export type QuestionTagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
    where?: Prisma.QuestionTagWhereInput;
    orderBy?: Prisma.QuestionTagOrderByWithRelationInput | Prisma.QuestionTagOrderByWithRelationInput[];
    cursor?: Prisma.QuestionTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionTagScalarFieldEnum | Prisma.QuestionTagScalarFieldEnum[];
};
export type QuestionTagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionTagCreateInput, Prisma.QuestionTagUncheckedCreateInput>;
};
export type QuestionTagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionTagCreateManyInput | Prisma.QuestionTagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionTagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    data: Prisma.QuestionTagCreateManyInput | Prisma.QuestionTagCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuestionTagIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuestionTagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionTagUpdateInput, Prisma.QuestionTagUncheckedUpdateInput>;
    where: Prisma.QuestionTagWhereUniqueInput;
};
export type QuestionTagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionTagUpdateManyMutationInput, Prisma.QuestionTagUncheckedUpdateManyInput>;
    where?: Prisma.QuestionTagWhereInput;
    limit?: number;
};
export type QuestionTagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionTagUpdateManyMutationInput, Prisma.QuestionTagUncheckedUpdateManyInput>;
    where?: Prisma.QuestionTagWhereInput;
    limit?: number;
    include?: Prisma.QuestionTagIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuestionTagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
    where: Prisma.QuestionTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionTagCreateInput, Prisma.QuestionTagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionTagUpdateInput, Prisma.QuestionTagUncheckedUpdateInput>;
};
export type QuestionTagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
    where: Prisma.QuestionTagWhereUniqueInput;
};
export type QuestionTagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionTagWhereInput;
    limit?: number;
};
export type QuestionTagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionTagSelect<ExtArgs> | null;
    omit?: Prisma.QuestionTagOmit<ExtArgs> | null;
    include?: Prisma.QuestionTagInclude<ExtArgs> | null;
};
