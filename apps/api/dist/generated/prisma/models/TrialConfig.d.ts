import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TrialConfigModel = runtime.Types.Result.DefaultSelection<Prisma.$TrialConfigPayload>;
export type AggregateTrialConfig = {
    _count: TrialConfigCountAggregateOutputType | null;
    _avg: TrialConfigAvgAggregateOutputType | null;
    _sum: TrialConfigSumAggregateOutputType | null;
    _min: TrialConfigMinAggregateOutputType | null;
    _max: TrialConfigMaxAggregateOutputType | null;
};
export type TrialConfigAvgAggregateOutputType = {
    freeTryoutCount: number | null;
    trialDurationDays: number | null;
};
export type TrialConfigSumAggregateOutputType = {
    freeTryoutCount: number | null;
    trialDurationDays: number | null;
};
export type TrialConfigMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    freeTryoutCount: number | null;
    trialDurationDays: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TrialConfigMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    freeTryoutCount: number | null;
    trialDurationDays: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TrialConfigCountAggregateOutputType = {
    id: number;
    name: number;
    freeTryoutCount: number;
    trialDurationDays: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TrialConfigAvgAggregateInputType = {
    freeTryoutCount?: true;
    trialDurationDays?: true;
};
export type TrialConfigSumAggregateInputType = {
    freeTryoutCount?: true;
    trialDurationDays?: true;
};
export type TrialConfigMinAggregateInputType = {
    id?: true;
    name?: true;
    freeTryoutCount?: true;
    trialDurationDays?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TrialConfigMaxAggregateInputType = {
    id?: true;
    name?: true;
    freeTryoutCount?: true;
    trialDurationDays?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TrialConfigCountAggregateInputType = {
    id?: true;
    name?: true;
    freeTryoutCount?: true;
    trialDurationDays?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TrialConfigAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrialConfigWhereInput;
    orderBy?: Prisma.TrialConfigOrderByWithRelationInput | Prisma.TrialConfigOrderByWithRelationInput[];
    cursor?: Prisma.TrialConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TrialConfigCountAggregateInputType;
    _avg?: TrialConfigAvgAggregateInputType;
    _sum?: TrialConfigSumAggregateInputType;
    _min?: TrialConfigMinAggregateInputType;
    _max?: TrialConfigMaxAggregateInputType;
};
export type GetTrialConfigAggregateType<T extends TrialConfigAggregateArgs> = {
    [P in keyof T & keyof AggregateTrialConfig]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTrialConfig[P]> : Prisma.GetScalarType<T[P], AggregateTrialConfig[P]>;
};
export type TrialConfigGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrialConfigWhereInput;
    orderBy?: Prisma.TrialConfigOrderByWithAggregationInput | Prisma.TrialConfigOrderByWithAggregationInput[];
    by: Prisma.TrialConfigScalarFieldEnum[] | Prisma.TrialConfigScalarFieldEnum;
    having?: Prisma.TrialConfigScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TrialConfigCountAggregateInputType | true;
    _avg?: TrialConfigAvgAggregateInputType;
    _sum?: TrialConfigSumAggregateInputType;
    _min?: TrialConfigMinAggregateInputType;
    _max?: TrialConfigMaxAggregateInputType;
};
export type TrialConfigGroupByOutputType = {
    id: string;
    name: string;
    freeTryoutCount: number;
    trialDurationDays: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: TrialConfigCountAggregateOutputType | null;
    _avg: TrialConfigAvgAggregateOutputType | null;
    _sum: TrialConfigSumAggregateOutputType | null;
    _min: TrialConfigMinAggregateOutputType | null;
    _max: TrialConfigMaxAggregateOutputType | null;
};
export type GetTrialConfigGroupByPayload<T extends TrialConfigGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TrialConfigGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TrialConfigGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TrialConfigGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TrialConfigGroupByOutputType[P]>;
}>>;
export type TrialConfigWhereInput = {
    AND?: Prisma.TrialConfigWhereInput | Prisma.TrialConfigWhereInput[];
    OR?: Prisma.TrialConfigWhereInput[];
    NOT?: Prisma.TrialConfigWhereInput | Prisma.TrialConfigWhereInput[];
    id?: Prisma.StringFilter<"TrialConfig"> | string;
    name?: Prisma.StringFilter<"TrialConfig"> | string;
    freeTryoutCount?: Prisma.IntFilter<"TrialConfig"> | number;
    trialDurationDays?: Prisma.IntFilter<"TrialConfig"> | number;
    isActive?: Prisma.BoolFilter<"TrialConfig"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"TrialConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TrialConfig"> | Date | string;
};
export type TrialConfigOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    freeTryoutCount?: Prisma.SortOrder;
    trialDurationDays?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TrialConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TrialConfigWhereInput | Prisma.TrialConfigWhereInput[];
    OR?: Prisma.TrialConfigWhereInput[];
    NOT?: Prisma.TrialConfigWhereInput | Prisma.TrialConfigWhereInput[];
    name?: Prisma.StringFilter<"TrialConfig"> | string;
    freeTryoutCount?: Prisma.IntFilter<"TrialConfig"> | number;
    trialDurationDays?: Prisma.IntFilter<"TrialConfig"> | number;
    isActive?: Prisma.BoolFilter<"TrialConfig"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"TrialConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TrialConfig"> | Date | string;
}, "id">;
export type TrialConfigOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    freeTryoutCount?: Prisma.SortOrder;
    trialDurationDays?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TrialConfigCountOrderByAggregateInput;
    _avg?: Prisma.TrialConfigAvgOrderByAggregateInput;
    _max?: Prisma.TrialConfigMaxOrderByAggregateInput;
    _min?: Prisma.TrialConfigMinOrderByAggregateInput;
    _sum?: Prisma.TrialConfigSumOrderByAggregateInput;
};
export type TrialConfigScalarWhereWithAggregatesInput = {
    AND?: Prisma.TrialConfigScalarWhereWithAggregatesInput | Prisma.TrialConfigScalarWhereWithAggregatesInput[];
    OR?: Prisma.TrialConfigScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TrialConfigScalarWhereWithAggregatesInput | Prisma.TrialConfigScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TrialConfig"> | string;
    name?: Prisma.StringWithAggregatesFilter<"TrialConfig"> | string;
    freeTryoutCount?: Prisma.IntWithAggregatesFilter<"TrialConfig"> | number;
    trialDurationDays?: Prisma.IntWithAggregatesFilter<"TrialConfig"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"TrialConfig"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TrialConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TrialConfig"> | Date | string;
};
export type TrialConfigCreateInput = {
    id?: string;
    name: string;
    freeTryoutCount: number;
    trialDurationDays: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TrialConfigUncheckedCreateInput = {
    id?: string;
    name: string;
    freeTryoutCount: number;
    trialDurationDays: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TrialConfigUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    freeTryoutCount?: Prisma.IntFieldUpdateOperationsInput | number;
    trialDurationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrialConfigUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    freeTryoutCount?: Prisma.IntFieldUpdateOperationsInput | number;
    trialDurationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrialConfigCreateManyInput = {
    id?: string;
    name: string;
    freeTryoutCount: number;
    trialDurationDays: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TrialConfigUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    freeTryoutCount?: Prisma.IntFieldUpdateOperationsInput | number;
    trialDurationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrialConfigUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    freeTryoutCount?: Prisma.IntFieldUpdateOperationsInput | number;
    trialDurationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrialConfigCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    freeTryoutCount?: Prisma.SortOrder;
    trialDurationDays?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TrialConfigAvgOrderByAggregateInput = {
    freeTryoutCount?: Prisma.SortOrder;
    trialDurationDays?: Prisma.SortOrder;
};
export type TrialConfigMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    freeTryoutCount?: Prisma.SortOrder;
    trialDurationDays?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TrialConfigMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    freeTryoutCount?: Prisma.SortOrder;
    trialDurationDays?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TrialConfigSumOrderByAggregateInput = {
    freeTryoutCount?: Prisma.SortOrder;
    trialDurationDays?: Prisma.SortOrder;
};
export type TrialConfigSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    freeTryoutCount?: boolean;
    trialDurationDays?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["trialConfig"]>;
export type TrialConfigSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    freeTryoutCount?: boolean;
    trialDurationDays?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["trialConfig"]>;
export type TrialConfigSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    freeTryoutCount?: boolean;
    trialDurationDays?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["trialConfig"]>;
export type TrialConfigSelectScalar = {
    id?: boolean;
    name?: boolean;
    freeTryoutCount?: boolean;
    trialDurationDays?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TrialConfigOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "freeTryoutCount" | "trialDurationDays" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["trialConfig"]>;
export type $TrialConfigPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TrialConfig";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        freeTryoutCount: number;
        trialDurationDays: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["trialConfig"]>;
    composites: {};
};
export type TrialConfigGetPayload<S extends boolean | null | undefined | TrialConfigDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload, S>;
export type TrialConfigCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TrialConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TrialConfigCountAggregateInputType | true;
};
export interface TrialConfigDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TrialConfig'];
        meta: {
            name: 'TrialConfig';
        };
    };
    findUnique<T extends TrialConfigFindUniqueArgs>(args: Prisma.SelectSubset<T, TrialConfigFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TrialConfigClient<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TrialConfigFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TrialConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrialConfigClient<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TrialConfigFindFirstArgs>(args?: Prisma.SelectSubset<T, TrialConfigFindFirstArgs<ExtArgs>>): Prisma.Prisma__TrialConfigClient<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TrialConfigFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TrialConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrialConfigClient<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TrialConfigFindManyArgs>(args?: Prisma.SelectSubset<T, TrialConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TrialConfigCreateArgs>(args: Prisma.SelectSubset<T, TrialConfigCreateArgs<ExtArgs>>): Prisma.Prisma__TrialConfigClient<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TrialConfigCreateManyArgs>(args?: Prisma.SelectSubset<T, TrialConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TrialConfigCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TrialConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TrialConfigDeleteArgs>(args: Prisma.SelectSubset<T, TrialConfigDeleteArgs<ExtArgs>>): Prisma.Prisma__TrialConfigClient<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TrialConfigUpdateArgs>(args: Prisma.SelectSubset<T, TrialConfigUpdateArgs<ExtArgs>>): Prisma.Prisma__TrialConfigClient<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TrialConfigDeleteManyArgs>(args?: Prisma.SelectSubset<T, TrialConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TrialConfigUpdateManyArgs>(args: Prisma.SelectSubset<T, TrialConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TrialConfigUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TrialConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TrialConfigUpsertArgs>(args: Prisma.SelectSubset<T, TrialConfigUpsertArgs<ExtArgs>>): Prisma.Prisma__TrialConfigClient<runtime.Types.Result.GetResult<Prisma.$TrialConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TrialConfigCountArgs>(args?: Prisma.Subset<T, TrialConfigCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TrialConfigCountAggregateOutputType> : number>;
    aggregate<T extends TrialConfigAggregateArgs>(args: Prisma.Subset<T, TrialConfigAggregateArgs>): Prisma.PrismaPromise<GetTrialConfigAggregateType<T>>;
    groupBy<T extends TrialConfigGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TrialConfigGroupByArgs['orderBy'];
    } : {
        orderBy?: TrialConfigGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TrialConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrialConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TrialConfigFieldRefs;
}
export interface Prisma__TrialConfigClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TrialConfigFieldRefs {
    readonly id: Prisma.FieldRef<"TrialConfig", 'String'>;
    readonly name: Prisma.FieldRef<"TrialConfig", 'String'>;
    readonly freeTryoutCount: Prisma.FieldRef<"TrialConfig", 'Int'>;
    readonly trialDurationDays: Prisma.FieldRef<"TrialConfig", 'Int'>;
    readonly isActive: Prisma.FieldRef<"TrialConfig", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"TrialConfig", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TrialConfig", 'DateTime'>;
}
export type TrialConfigFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    where: Prisma.TrialConfigWhereUniqueInput;
};
export type TrialConfigFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    where: Prisma.TrialConfigWhereUniqueInput;
};
export type TrialConfigFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    where?: Prisma.TrialConfigWhereInput;
    orderBy?: Prisma.TrialConfigOrderByWithRelationInput | Prisma.TrialConfigOrderByWithRelationInput[];
    cursor?: Prisma.TrialConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrialConfigScalarFieldEnum | Prisma.TrialConfigScalarFieldEnum[];
};
export type TrialConfigFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    where?: Prisma.TrialConfigWhereInput;
    orderBy?: Prisma.TrialConfigOrderByWithRelationInput | Prisma.TrialConfigOrderByWithRelationInput[];
    cursor?: Prisma.TrialConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrialConfigScalarFieldEnum | Prisma.TrialConfigScalarFieldEnum[];
};
export type TrialConfigFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    where?: Prisma.TrialConfigWhereInput;
    orderBy?: Prisma.TrialConfigOrderByWithRelationInput | Prisma.TrialConfigOrderByWithRelationInput[];
    cursor?: Prisma.TrialConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrialConfigScalarFieldEnum | Prisma.TrialConfigScalarFieldEnum[];
};
export type TrialConfigCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrialConfigCreateInput, Prisma.TrialConfigUncheckedCreateInput>;
};
export type TrialConfigCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TrialConfigCreateManyInput | Prisma.TrialConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TrialConfigCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    data: Prisma.TrialConfigCreateManyInput | Prisma.TrialConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TrialConfigUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrialConfigUpdateInput, Prisma.TrialConfigUncheckedUpdateInput>;
    where: Prisma.TrialConfigWhereUniqueInput;
};
export type TrialConfigUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TrialConfigUpdateManyMutationInput, Prisma.TrialConfigUncheckedUpdateManyInput>;
    where?: Prisma.TrialConfigWhereInput;
    limit?: number;
};
export type TrialConfigUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrialConfigUpdateManyMutationInput, Prisma.TrialConfigUncheckedUpdateManyInput>;
    where?: Prisma.TrialConfigWhereInput;
    limit?: number;
};
export type TrialConfigUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    where: Prisma.TrialConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrialConfigCreateInput, Prisma.TrialConfigUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TrialConfigUpdateInput, Prisma.TrialConfigUncheckedUpdateInput>;
};
export type TrialConfigDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
    where: Prisma.TrialConfigWhereUniqueInput;
};
export type TrialConfigDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrialConfigWhereInput;
    limit?: number;
};
export type TrialConfigDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrialConfigSelect<ExtArgs> | null;
    omit?: Prisma.TrialConfigOmit<ExtArgs> | null;
};
