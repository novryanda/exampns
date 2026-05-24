import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExamIntegrityLogModel = runtime.Types.Result.DefaultSelection<Prisma.$ExamIntegrityLogPayload>;
export type AggregateExamIntegrityLog = {
    _count: ExamIntegrityLogCountAggregateOutputType | null;
    _min: ExamIntegrityLogMinAggregateOutputType | null;
    _max: ExamIntegrityLogMaxAggregateOutputType | null;
};
export type ExamIntegrityLogMinAggregateOutputType = {
    id: string | null;
    examSessionId: string | null;
    eventType: $Enums.ExamIntegrityEventType | null;
    createdAt: Date | null;
};
export type ExamIntegrityLogMaxAggregateOutputType = {
    id: string | null;
    examSessionId: string | null;
    eventType: $Enums.ExamIntegrityEventType | null;
    createdAt: Date | null;
};
export type ExamIntegrityLogCountAggregateOutputType = {
    id: number;
    examSessionId: number;
    eventType: number;
    metadata: number;
    createdAt: number;
    _all: number;
};
export type ExamIntegrityLogMinAggregateInputType = {
    id?: true;
    examSessionId?: true;
    eventType?: true;
    createdAt?: true;
};
export type ExamIntegrityLogMaxAggregateInputType = {
    id?: true;
    examSessionId?: true;
    eventType?: true;
    createdAt?: true;
};
export type ExamIntegrityLogCountAggregateInputType = {
    id?: true;
    examSessionId?: true;
    eventType?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
};
export type ExamIntegrityLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamIntegrityLogWhereInput;
    orderBy?: Prisma.ExamIntegrityLogOrderByWithRelationInput | Prisma.ExamIntegrityLogOrderByWithRelationInput[];
    cursor?: Prisma.ExamIntegrityLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExamIntegrityLogCountAggregateInputType;
    _min?: ExamIntegrityLogMinAggregateInputType;
    _max?: ExamIntegrityLogMaxAggregateInputType;
};
export type GetExamIntegrityLogAggregateType<T extends ExamIntegrityLogAggregateArgs> = {
    [P in keyof T & keyof AggregateExamIntegrityLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExamIntegrityLog[P]> : Prisma.GetScalarType<T[P], AggregateExamIntegrityLog[P]>;
};
export type ExamIntegrityLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamIntegrityLogWhereInput;
    orderBy?: Prisma.ExamIntegrityLogOrderByWithAggregationInput | Prisma.ExamIntegrityLogOrderByWithAggregationInput[];
    by: Prisma.ExamIntegrityLogScalarFieldEnum[] | Prisma.ExamIntegrityLogScalarFieldEnum;
    having?: Prisma.ExamIntegrityLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExamIntegrityLogCountAggregateInputType | true;
    _min?: ExamIntegrityLogMinAggregateInputType;
    _max?: ExamIntegrityLogMaxAggregateInputType;
};
export type ExamIntegrityLogGroupByOutputType = {
    id: string;
    examSessionId: string;
    eventType: $Enums.ExamIntegrityEventType;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    _count: ExamIntegrityLogCountAggregateOutputType | null;
    _min: ExamIntegrityLogMinAggregateOutputType | null;
    _max: ExamIntegrityLogMaxAggregateOutputType | null;
};
export type GetExamIntegrityLogGroupByPayload<T extends ExamIntegrityLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExamIntegrityLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExamIntegrityLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExamIntegrityLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExamIntegrityLogGroupByOutputType[P]>;
}>>;
export type ExamIntegrityLogWhereInput = {
    AND?: Prisma.ExamIntegrityLogWhereInput | Prisma.ExamIntegrityLogWhereInput[];
    OR?: Prisma.ExamIntegrityLogWhereInput[];
    NOT?: Prisma.ExamIntegrityLogWhereInput | Prisma.ExamIntegrityLogWhereInput[];
    id?: Prisma.StringFilter<"ExamIntegrityLog"> | string;
    examSessionId?: Prisma.StringFilter<"ExamIntegrityLog"> | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFilter<"ExamIntegrityLog"> | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.JsonNullableFilter<"ExamIntegrityLog">;
    createdAt?: Prisma.DateTimeFilter<"ExamIntegrityLog"> | Date | string;
    examSession?: Prisma.XOR<Prisma.ExamSessionScalarRelationFilter, Prisma.ExamSessionWhereInput>;
};
export type ExamIntegrityLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    examSession?: Prisma.ExamSessionOrderByWithRelationInput;
};
export type ExamIntegrityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ExamIntegrityLogWhereInput | Prisma.ExamIntegrityLogWhereInput[];
    OR?: Prisma.ExamIntegrityLogWhereInput[];
    NOT?: Prisma.ExamIntegrityLogWhereInput | Prisma.ExamIntegrityLogWhereInput[];
    examSessionId?: Prisma.StringFilter<"ExamIntegrityLog"> | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFilter<"ExamIntegrityLog"> | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.JsonNullableFilter<"ExamIntegrityLog">;
    createdAt?: Prisma.DateTimeFilter<"ExamIntegrityLog"> | Date | string;
    examSession?: Prisma.XOR<Prisma.ExamSessionScalarRelationFilter, Prisma.ExamSessionWhereInput>;
}, "id">;
export type ExamIntegrityLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ExamIntegrityLogCountOrderByAggregateInput;
    _max?: Prisma.ExamIntegrityLogMaxOrderByAggregateInput;
    _min?: Prisma.ExamIntegrityLogMinOrderByAggregateInput;
};
export type ExamIntegrityLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExamIntegrityLogScalarWhereWithAggregatesInput | Prisma.ExamIntegrityLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExamIntegrityLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExamIntegrityLogScalarWhereWithAggregatesInput | Prisma.ExamIntegrityLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ExamIntegrityLog"> | string;
    examSessionId?: Prisma.StringWithAggregatesFilter<"ExamIntegrityLog"> | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeWithAggregatesFilter<"ExamIntegrityLog"> | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"ExamIntegrityLog">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ExamIntegrityLog"> | Date | string;
};
export type ExamIntegrityLogCreateInput = {
    id?: string;
    eventType: $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    examSession: Prisma.ExamSessionCreateNestedOneWithoutIntegrityLogsInput;
};
export type ExamIntegrityLogUncheckedCreateInput = {
    id?: string;
    examSessionId: string;
    eventType: $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ExamIntegrityLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFieldUpdateOperationsInput | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examSession?: Prisma.ExamSessionUpdateOneRequiredWithoutIntegrityLogsNestedInput;
};
export type ExamIntegrityLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFieldUpdateOperationsInput | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamIntegrityLogCreateManyInput = {
    id?: string;
    examSessionId: string;
    eventType: $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ExamIntegrityLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFieldUpdateOperationsInput | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamIntegrityLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFieldUpdateOperationsInput | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamIntegrityLogListRelationFilter = {
    every?: Prisma.ExamIntegrityLogWhereInput;
    some?: Prisma.ExamIntegrityLogWhereInput;
    none?: Prisma.ExamIntegrityLogWhereInput;
};
export type ExamIntegrityLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExamIntegrityLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ExamIntegrityLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ExamIntegrityLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examSessionId?: Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ExamIntegrityLogCreateNestedManyWithoutExamSessionInput = {
    create?: Prisma.XOR<Prisma.ExamIntegrityLogCreateWithoutExamSessionInput, Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput> | Prisma.ExamIntegrityLogCreateWithoutExamSessionInput[] | Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamIntegrityLogCreateOrConnectWithoutExamSessionInput | Prisma.ExamIntegrityLogCreateOrConnectWithoutExamSessionInput[];
    createMany?: Prisma.ExamIntegrityLogCreateManyExamSessionInputEnvelope;
    connect?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
};
export type ExamIntegrityLogUncheckedCreateNestedManyWithoutExamSessionInput = {
    create?: Prisma.XOR<Prisma.ExamIntegrityLogCreateWithoutExamSessionInput, Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput> | Prisma.ExamIntegrityLogCreateWithoutExamSessionInput[] | Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamIntegrityLogCreateOrConnectWithoutExamSessionInput | Prisma.ExamIntegrityLogCreateOrConnectWithoutExamSessionInput[];
    createMany?: Prisma.ExamIntegrityLogCreateManyExamSessionInputEnvelope;
    connect?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
};
export type ExamIntegrityLogUpdateManyWithoutExamSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamIntegrityLogCreateWithoutExamSessionInput, Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput> | Prisma.ExamIntegrityLogCreateWithoutExamSessionInput[] | Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamIntegrityLogCreateOrConnectWithoutExamSessionInput | Prisma.ExamIntegrityLogCreateOrConnectWithoutExamSessionInput[];
    upsert?: Prisma.ExamIntegrityLogUpsertWithWhereUniqueWithoutExamSessionInput | Prisma.ExamIntegrityLogUpsertWithWhereUniqueWithoutExamSessionInput[];
    createMany?: Prisma.ExamIntegrityLogCreateManyExamSessionInputEnvelope;
    set?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
    disconnect?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
    delete?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
    connect?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
    update?: Prisma.ExamIntegrityLogUpdateWithWhereUniqueWithoutExamSessionInput | Prisma.ExamIntegrityLogUpdateWithWhereUniqueWithoutExamSessionInput[];
    updateMany?: Prisma.ExamIntegrityLogUpdateManyWithWhereWithoutExamSessionInput | Prisma.ExamIntegrityLogUpdateManyWithWhereWithoutExamSessionInput[];
    deleteMany?: Prisma.ExamIntegrityLogScalarWhereInput | Prisma.ExamIntegrityLogScalarWhereInput[];
};
export type ExamIntegrityLogUncheckedUpdateManyWithoutExamSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ExamIntegrityLogCreateWithoutExamSessionInput, Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput> | Prisma.ExamIntegrityLogCreateWithoutExamSessionInput[] | Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput[];
    connectOrCreate?: Prisma.ExamIntegrityLogCreateOrConnectWithoutExamSessionInput | Prisma.ExamIntegrityLogCreateOrConnectWithoutExamSessionInput[];
    upsert?: Prisma.ExamIntegrityLogUpsertWithWhereUniqueWithoutExamSessionInput | Prisma.ExamIntegrityLogUpsertWithWhereUniqueWithoutExamSessionInput[];
    createMany?: Prisma.ExamIntegrityLogCreateManyExamSessionInputEnvelope;
    set?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
    disconnect?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
    delete?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
    connect?: Prisma.ExamIntegrityLogWhereUniqueInput | Prisma.ExamIntegrityLogWhereUniqueInput[];
    update?: Prisma.ExamIntegrityLogUpdateWithWhereUniqueWithoutExamSessionInput | Prisma.ExamIntegrityLogUpdateWithWhereUniqueWithoutExamSessionInput[];
    updateMany?: Prisma.ExamIntegrityLogUpdateManyWithWhereWithoutExamSessionInput | Prisma.ExamIntegrityLogUpdateManyWithWhereWithoutExamSessionInput[];
    deleteMany?: Prisma.ExamIntegrityLogScalarWhereInput | Prisma.ExamIntegrityLogScalarWhereInput[];
};
export type EnumExamIntegrityEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExamIntegrityEventType;
};
export type ExamIntegrityLogCreateWithoutExamSessionInput = {
    id?: string;
    eventType: $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ExamIntegrityLogUncheckedCreateWithoutExamSessionInput = {
    id?: string;
    eventType: $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ExamIntegrityLogCreateOrConnectWithoutExamSessionInput = {
    where: Prisma.ExamIntegrityLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamIntegrityLogCreateWithoutExamSessionInput, Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput>;
};
export type ExamIntegrityLogCreateManyExamSessionInputEnvelope = {
    data: Prisma.ExamIntegrityLogCreateManyExamSessionInput | Prisma.ExamIntegrityLogCreateManyExamSessionInput[];
    skipDuplicates?: boolean;
};
export type ExamIntegrityLogUpsertWithWhereUniqueWithoutExamSessionInput = {
    where: Prisma.ExamIntegrityLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamIntegrityLogUpdateWithoutExamSessionInput, Prisma.ExamIntegrityLogUncheckedUpdateWithoutExamSessionInput>;
    create: Prisma.XOR<Prisma.ExamIntegrityLogCreateWithoutExamSessionInput, Prisma.ExamIntegrityLogUncheckedCreateWithoutExamSessionInput>;
};
export type ExamIntegrityLogUpdateWithWhereUniqueWithoutExamSessionInput = {
    where: Prisma.ExamIntegrityLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamIntegrityLogUpdateWithoutExamSessionInput, Prisma.ExamIntegrityLogUncheckedUpdateWithoutExamSessionInput>;
};
export type ExamIntegrityLogUpdateManyWithWhereWithoutExamSessionInput = {
    where: Prisma.ExamIntegrityLogScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamIntegrityLogUpdateManyMutationInput, Prisma.ExamIntegrityLogUncheckedUpdateManyWithoutExamSessionInput>;
};
export type ExamIntegrityLogScalarWhereInput = {
    AND?: Prisma.ExamIntegrityLogScalarWhereInput | Prisma.ExamIntegrityLogScalarWhereInput[];
    OR?: Prisma.ExamIntegrityLogScalarWhereInput[];
    NOT?: Prisma.ExamIntegrityLogScalarWhereInput | Prisma.ExamIntegrityLogScalarWhereInput[];
    id?: Prisma.StringFilter<"ExamIntegrityLog"> | string;
    examSessionId?: Prisma.StringFilter<"ExamIntegrityLog"> | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFilter<"ExamIntegrityLog"> | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.JsonNullableFilter<"ExamIntegrityLog">;
    createdAt?: Prisma.DateTimeFilter<"ExamIntegrityLog"> | Date | string;
};
export type ExamIntegrityLogCreateManyExamSessionInput = {
    id?: string;
    eventType: $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ExamIntegrityLogUpdateWithoutExamSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFieldUpdateOperationsInput | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamIntegrityLogUncheckedUpdateWithoutExamSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFieldUpdateOperationsInput | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamIntegrityLogUncheckedUpdateManyWithoutExamSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumExamIntegrityEventTypeFieldUpdateOperationsInput | $Enums.ExamIntegrityEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamIntegrityLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examSessionId?: boolean;
    eventType?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examIntegrityLog"]>;
export type ExamIntegrityLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examSessionId?: boolean;
    eventType?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examIntegrityLog"]>;
export type ExamIntegrityLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examSessionId?: boolean;
    eventType?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examIntegrityLog"]>;
export type ExamIntegrityLogSelectScalar = {
    id?: boolean;
    examSessionId?: boolean;
    eventType?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
};
export type ExamIntegrityLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "examSessionId" | "eventType" | "metadata" | "createdAt", ExtArgs["result"]["examIntegrityLog"]>;
export type ExamIntegrityLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
};
export type ExamIntegrityLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
};
export type ExamIntegrityLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    examSession?: boolean | Prisma.ExamSessionDefaultArgs<ExtArgs>;
};
export type $ExamIntegrityLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ExamIntegrityLog";
    objects: {
        examSession: Prisma.$ExamSessionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        examSessionId: string;
        eventType: $Enums.ExamIntegrityEventType;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["examIntegrityLog"]>;
    composites: {};
};
export type ExamIntegrityLogGetPayload<S extends boolean | null | undefined | ExamIntegrityLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload, S>;
export type ExamIntegrityLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExamIntegrityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExamIntegrityLogCountAggregateInputType | true;
};
export interface ExamIntegrityLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ExamIntegrityLog'];
        meta: {
            name: 'ExamIntegrityLog';
        };
    };
    findUnique<T extends ExamIntegrityLogFindUniqueArgs>(args: Prisma.SelectSubset<T, ExamIntegrityLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExamIntegrityLogClient<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExamIntegrityLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExamIntegrityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamIntegrityLogClient<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExamIntegrityLogFindFirstArgs>(args?: Prisma.SelectSubset<T, ExamIntegrityLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExamIntegrityLogClient<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExamIntegrityLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExamIntegrityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamIntegrityLogClient<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExamIntegrityLogFindManyArgs>(args?: Prisma.SelectSubset<T, ExamIntegrityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExamIntegrityLogCreateArgs>(args: Prisma.SelectSubset<T, ExamIntegrityLogCreateArgs<ExtArgs>>): Prisma.Prisma__ExamIntegrityLogClient<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExamIntegrityLogCreateManyArgs>(args?: Prisma.SelectSubset<T, ExamIntegrityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExamIntegrityLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExamIntegrityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExamIntegrityLogDeleteArgs>(args: Prisma.SelectSubset<T, ExamIntegrityLogDeleteArgs<ExtArgs>>): Prisma.Prisma__ExamIntegrityLogClient<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExamIntegrityLogUpdateArgs>(args: Prisma.SelectSubset<T, ExamIntegrityLogUpdateArgs<ExtArgs>>): Prisma.Prisma__ExamIntegrityLogClient<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExamIntegrityLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExamIntegrityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExamIntegrityLogUpdateManyArgs>(args: Prisma.SelectSubset<T, ExamIntegrityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExamIntegrityLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExamIntegrityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExamIntegrityLogUpsertArgs>(args: Prisma.SelectSubset<T, ExamIntegrityLogUpsertArgs<ExtArgs>>): Prisma.Prisma__ExamIntegrityLogClient<runtime.Types.Result.GetResult<Prisma.$ExamIntegrityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExamIntegrityLogCountArgs>(args?: Prisma.Subset<T, ExamIntegrityLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExamIntegrityLogCountAggregateOutputType> : number>;
    aggregate<T extends ExamIntegrityLogAggregateArgs>(args: Prisma.Subset<T, ExamIntegrityLogAggregateArgs>): Prisma.PrismaPromise<GetExamIntegrityLogAggregateType<T>>;
    groupBy<T extends ExamIntegrityLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExamIntegrityLogGroupByArgs['orderBy'];
    } : {
        orderBy?: ExamIntegrityLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExamIntegrityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamIntegrityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExamIntegrityLogFieldRefs;
}
export interface Prisma__ExamIntegrityLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    examSession<T extends Prisma.ExamSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__ExamSessionClient<runtime.Types.Result.GetResult<Prisma.$ExamSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExamIntegrityLogFieldRefs {
    readonly id: Prisma.FieldRef<"ExamIntegrityLog", 'String'>;
    readonly examSessionId: Prisma.FieldRef<"ExamIntegrityLog", 'String'>;
    readonly eventType: Prisma.FieldRef<"ExamIntegrityLog", 'ExamIntegrityEventType'>;
    readonly metadata: Prisma.FieldRef<"ExamIntegrityLog", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"ExamIntegrityLog", 'DateTime'>;
}
export type ExamIntegrityLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    where: Prisma.ExamIntegrityLogWhereUniqueInput;
};
export type ExamIntegrityLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    where: Prisma.ExamIntegrityLogWhereUniqueInput;
};
export type ExamIntegrityLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    where?: Prisma.ExamIntegrityLogWhereInput;
    orderBy?: Prisma.ExamIntegrityLogOrderByWithRelationInput | Prisma.ExamIntegrityLogOrderByWithRelationInput[];
    cursor?: Prisma.ExamIntegrityLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamIntegrityLogScalarFieldEnum | Prisma.ExamIntegrityLogScalarFieldEnum[];
};
export type ExamIntegrityLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    where?: Prisma.ExamIntegrityLogWhereInput;
    orderBy?: Prisma.ExamIntegrityLogOrderByWithRelationInput | Prisma.ExamIntegrityLogOrderByWithRelationInput[];
    cursor?: Prisma.ExamIntegrityLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamIntegrityLogScalarFieldEnum | Prisma.ExamIntegrityLogScalarFieldEnum[];
};
export type ExamIntegrityLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    where?: Prisma.ExamIntegrityLogWhereInput;
    orderBy?: Prisma.ExamIntegrityLogOrderByWithRelationInput | Prisma.ExamIntegrityLogOrderByWithRelationInput[];
    cursor?: Prisma.ExamIntegrityLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamIntegrityLogScalarFieldEnum | Prisma.ExamIntegrityLogScalarFieldEnum[];
};
export type ExamIntegrityLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamIntegrityLogCreateInput, Prisma.ExamIntegrityLogUncheckedCreateInput>;
};
export type ExamIntegrityLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExamIntegrityLogCreateManyInput | Prisma.ExamIntegrityLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExamIntegrityLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    data: Prisma.ExamIntegrityLogCreateManyInput | Prisma.ExamIntegrityLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ExamIntegrityLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ExamIntegrityLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamIntegrityLogUpdateInput, Prisma.ExamIntegrityLogUncheckedUpdateInput>;
    where: Prisma.ExamIntegrityLogWhereUniqueInput;
};
export type ExamIntegrityLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExamIntegrityLogUpdateManyMutationInput, Prisma.ExamIntegrityLogUncheckedUpdateManyInput>;
    where?: Prisma.ExamIntegrityLogWhereInput;
    limit?: number;
};
export type ExamIntegrityLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamIntegrityLogUpdateManyMutationInput, Prisma.ExamIntegrityLogUncheckedUpdateManyInput>;
    where?: Prisma.ExamIntegrityLogWhereInput;
    limit?: number;
    include?: Prisma.ExamIntegrityLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ExamIntegrityLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    where: Prisma.ExamIntegrityLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamIntegrityLogCreateInput, Prisma.ExamIntegrityLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExamIntegrityLogUpdateInput, Prisma.ExamIntegrityLogUncheckedUpdateInput>;
};
export type ExamIntegrityLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
    where: Prisma.ExamIntegrityLogWhereUniqueInput;
};
export type ExamIntegrityLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamIntegrityLogWhereInput;
    limit?: number;
};
export type ExamIntegrityLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamIntegrityLogSelect<ExtArgs> | null;
    omit?: Prisma.ExamIntegrityLogOmit<ExtArgs> | null;
    include?: Prisma.ExamIntegrityLogInclude<ExtArgs> | null;
};
