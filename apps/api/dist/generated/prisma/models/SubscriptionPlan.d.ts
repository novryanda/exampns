import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SubscriptionPlanModel = runtime.Types.Result.DefaultSelection<Prisma.$SubscriptionPlanPayload>;
export type AggregateSubscriptionPlan = {
    _count: SubscriptionPlanCountAggregateOutputType | null;
    _avg: SubscriptionPlanAvgAggregateOutputType | null;
    _sum: SubscriptionPlanSumAggregateOutputType | null;
    _min: SubscriptionPlanMinAggregateOutputType | null;
    _max: SubscriptionPlanMaxAggregateOutputType | null;
};
export type SubscriptionPlanAvgAggregateOutputType = {
    durationDays: number | null;
    price: runtime.Decimal | null;
    trialTryoutLimit: number | null;
    trialDayLimit: number | null;
};
export type SubscriptionPlanSumAggregateOutputType = {
    durationDays: number | null;
    price: runtime.Decimal | null;
    trialTryoutLimit: number | null;
    trialDayLimit: number | null;
};
export type SubscriptionPlanMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    durationDays: number | null;
    price: runtime.Decimal | null;
    currency: string | null;
    isActive: boolean | null;
    isTrial: boolean | null;
    trialTryoutLimit: number | null;
    trialDayLimit: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SubscriptionPlanMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    durationDays: number | null;
    price: runtime.Decimal | null;
    currency: string | null;
    isActive: boolean | null;
    isTrial: boolean | null;
    trialTryoutLimit: number | null;
    trialDayLimit: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SubscriptionPlanCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    durationDays: number;
    price: number;
    currency: number;
    isActive: number;
    isTrial: number;
    trialTryoutLimit: number;
    trialDayLimit: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SubscriptionPlanAvgAggregateInputType = {
    durationDays?: true;
    price?: true;
    trialTryoutLimit?: true;
    trialDayLimit?: true;
};
export type SubscriptionPlanSumAggregateInputType = {
    durationDays?: true;
    price?: true;
    trialTryoutLimit?: true;
    trialDayLimit?: true;
};
export type SubscriptionPlanMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    durationDays?: true;
    price?: true;
    currency?: true;
    isActive?: true;
    isTrial?: true;
    trialTryoutLimit?: true;
    trialDayLimit?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SubscriptionPlanMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    durationDays?: true;
    price?: true;
    currency?: true;
    isActive?: true;
    isTrial?: true;
    trialTryoutLimit?: true;
    trialDayLimit?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SubscriptionPlanCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    durationDays?: true;
    price?: true;
    currency?: true;
    isActive?: true;
    isTrial?: true;
    trialTryoutLimit?: true;
    trialDayLimit?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SubscriptionPlanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscriptionPlanWhereInput;
    orderBy?: Prisma.SubscriptionPlanOrderByWithRelationInput | Prisma.SubscriptionPlanOrderByWithRelationInput[];
    cursor?: Prisma.SubscriptionPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SubscriptionPlanCountAggregateInputType;
    _avg?: SubscriptionPlanAvgAggregateInputType;
    _sum?: SubscriptionPlanSumAggregateInputType;
    _min?: SubscriptionPlanMinAggregateInputType;
    _max?: SubscriptionPlanMaxAggregateInputType;
};
export type GetSubscriptionPlanAggregateType<T extends SubscriptionPlanAggregateArgs> = {
    [P in keyof T & keyof AggregateSubscriptionPlan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSubscriptionPlan[P]> : Prisma.GetScalarType<T[P], AggregateSubscriptionPlan[P]>;
};
export type SubscriptionPlanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscriptionPlanWhereInput;
    orderBy?: Prisma.SubscriptionPlanOrderByWithAggregationInput | Prisma.SubscriptionPlanOrderByWithAggregationInput[];
    by: Prisma.SubscriptionPlanScalarFieldEnum[] | Prisma.SubscriptionPlanScalarFieldEnum;
    having?: Prisma.SubscriptionPlanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubscriptionPlanCountAggregateInputType | true;
    _avg?: SubscriptionPlanAvgAggregateInputType;
    _sum?: SubscriptionPlanSumAggregateInputType;
    _min?: SubscriptionPlanMinAggregateInputType;
    _max?: SubscriptionPlanMaxAggregateInputType;
};
export type SubscriptionPlanGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    durationDays: number;
    price: runtime.Decimal;
    currency: string;
    isActive: boolean;
    isTrial: boolean;
    trialTryoutLimit: number | null;
    trialDayLimit: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: SubscriptionPlanCountAggregateOutputType | null;
    _avg: SubscriptionPlanAvgAggregateOutputType | null;
    _sum: SubscriptionPlanSumAggregateOutputType | null;
    _min: SubscriptionPlanMinAggregateOutputType | null;
    _max: SubscriptionPlanMaxAggregateOutputType | null;
};
export type GetSubscriptionPlanGroupByPayload<T extends SubscriptionPlanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SubscriptionPlanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SubscriptionPlanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SubscriptionPlanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SubscriptionPlanGroupByOutputType[P]>;
}>>;
export type SubscriptionPlanWhereInput = {
    AND?: Prisma.SubscriptionPlanWhereInput | Prisma.SubscriptionPlanWhereInput[];
    OR?: Prisma.SubscriptionPlanWhereInput[];
    NOT?: Prisma.SubscriptionPlanWhereInput | Prisma.SubscriptionPlanWhereInput[];
    id?: Prisma.StringFilter<"SubscriptionPlan"> | string;
    name?: Prisma.StringFilter<"SubscriptionPlan"> | string;
    description?: Prisma.StringNullableFilter<"SubscriptionPlan"> | string | null;
    durationDays?: Prisma.IntFilter<"SubscriptionPlan"> | number;
    price?: Prisma.DecimalFilter<"SubscriptionPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFilter<"SubscriptionPlan"> | string;
    isActive?: Prisma.BoolFilter<"SubscriptionPlan"> | boolean;
    isTrial?: Prisma.BoolFilter<"SubscriptionPlan"> | boolean;
    trialTryoutLimit?: Prisma.IntNullableFilter<"SubscriptionPlan"> | number | null;
    trialDayLimit?: Prisma.IntNullableFilter<"SubscriptionPlan"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"SubscriptionPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SubscriptionPlan"> | Date | string;
    userSubscriptions?: Prisma.UserSubscriptionListRelationFilter;
    paymentTransactions?: Prisma.PaymentTransactionListRelationFilter;
};
export type SubscriptionPlanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationDays?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    trialTryoutLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    trialDayLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userSubscriptions?: Prisma.UserSubscriptionOrderByRelationAggregateInput;
    paymentTransactions?: Prisma.PaymentTransactionOrderByRelationAggregateInput;
};
export type SubscriptionPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SubscriptionPlanWhereInput | Prisma.SubscriptionPlanWhereInput[];
    OR?: Prisma.SubscriptionPlanWhereInput[];
    NOT?: Prisma.SubscriptionPlanWhereInput | Prisma.SubscriptionPlanWhereInput[];
    name?: Prisma.StringFilter<"SubscriptionPlan"> | string;
    description?: Prisma.StringNullableFilter<"SubscriptionPlan"> | string | null;
    durationDays?: Prisma.IntFilter<"SubscriptionPlan"> | number;
    price?: Prisma.DecimalFilter<"SubscriptionPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFilter<"SubscriptionPlan"> | string;
    isActive?: Prisma.BoolFilter<"SubscriptionPlan"> | boolean;
    isTrial?: Prisma.BoolFilter<"SubscriptionPlan"> | boolean;
    trialTryoutLimit?: Prisma.IntNullableFilter<"SubscriptionPlan"> | number | null;
    trialDayLimit?: Prisma.IntNullableFilter<"SubscriptionPlan"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"SubscriptionPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SubscriptionPlan"> | Date | string;
    userSubscriptions?: Prisma.UserSubscriptionListRelationFilter;
    paymentTransactions?: Prisma.PaymentTransactionListRelationFilter;
}, "id">;
export type SubscriptionPlanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationDays?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    trialTryoutLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    trialDayLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SubscriptionPlanCountOrderByAggregateInput;
    _avg?: Prisma.SubscriptionPlanAvgOrderByAggregateInput;
    _max?: Prisma.SubscriptionPlanMaxOrderByAggregateInput;
    _min?: Prisma.SubscriptionPlanMinOrderByAggregateInput;
    _sum?: Prisma.SubscriptionPlanSumOrderByAggregateInput;
};
export type SubscriptionPlanScalarWhereWithAggregatesInput = {
    AND?: Prisma.SubscriptionPlanScalarWhereWithAggregatesInput | Prisma.SubscriptionPlanScalarWhereWithAggregatesInput[];
    OR?: Prisma.SubscriptionPlanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SubscriptionPlanScalarWhereWithAggregatesInput | Prisma.SubscriptionPlanScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SubscriptionPlan"> | string;
    name?: Prisma.StringWithAggregatesFilter<"SubscriptionPlan"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"SubscriptionPlan"> | string | null;
    durationDays?: Prisma.IntWithAggregatesFilter<"SubscriptionPlan"> | number;
    price?: Prisma.DecimalWithAggregatesFilter<"SubscriptionPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringWithAggregatesFilter<"SubscriptionPlan"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"SubscriptionPlan"> | boolean;
    isTrial?: Prisma.BoolWithAggregatesFilter<"SubscriptionPlan"> | boolean;
    trialTryoutLimit?: Prisma.IntNullableWithAggregatesFilter<"SubscriptionPlan"> | number | null;
    trialDayLimit?: Prisma.IntNullableWithAggregatesFilter<"SubscriptionPlan"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SubscriptionPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SubscriptionPlan"> | Date | string;
};
export type SubscriptionPlanCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    durationDays: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: number | null;
    trialDayLimit?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userSubscriptions?: Prisma.UserSubscriptionCreateNestedManyWithoutSubscriptionPlanInput;
    paymentTransactions?: Prisma.PaymentTransactionCreateNestedManyWithoutSubscriptionPlanInput;
};
export type SubscriptionPlanUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    durationDays: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: number | null;
    trialDayLimit?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userSubscriptions?: Prisma.UserSubscriptionUncheckedCreateNestedManyWithoutSubscriptionPlanInput;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedCreateNestedManyWithoutSubscriptionPlanInput;
};
export type SubscriptionPlanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    trialTryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trialDayLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userSubscriptions?: Prisma.UserSubscriptionUpdateManyWithoutSubscriptionPlanNestedInput;
    paymentTransactions?: Prisma.PaymentTransactionUpdateManyWithoutSubscriptionPlanNestedInput;
};
export type SubscriptionPlanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    trialTryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trialDayLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userSubscriptions?: Prisma.UserSubscriptionUncheckedUpdateManyWithoutSubscriptionPlanNestedInput;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedUpdateManyWithoutSubscriptionPlanNestedInput;
};
export type SubscriptionPlanCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    durationDays: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: number | null;
    trialDayLimit?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SubscriptionPlanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    trialTryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trialDayLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscriptionPlanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    trialTryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trialDayLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscriptionPlanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    durationDays?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    trialTryoutLimit?: Prisma.SortOrder;
    trialDayLimit?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubscriptionPlanAvgOrderByAggregateInput = {
    durationDays?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    trialTryoutLimit?: Prisma.SortOrder;
    trialDayLimit?: Prisma.SortOrder;
};
export type SubscriptionPlanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    durationDays?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    trialTryoutLimit?: Prisma.SortOrder;
    trialDayLimit?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubscriptionPlanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    durationDays?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    trialTryoutLimit?: Prisma.SortOrder;
    trialDayLimit?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubscriptionPlanSumOrderByAggregateInput = {
    durationDays?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    trialTryoutLimit?: Prisma.SortOrder;
    trialDayLimit?: Prisma.SortOrder;
};
export type SubscriptionPlanScalarRelationFilter = {
    is?: Prisma.SubscriptionPlanWhereInput;
    isNot?: Prisma.SubscriptionPlanWhereInput;
};
export type SubscriptionPlanCreateNestedOneWithoutUserSubscriptionsInput = {
    create?: Prisma.XOR<Prisma.SubscriptionPlanCreateWithoutUserSubscriptionsInput, Prisma.SubscriptionPlanUncheckedCreateWithoutUserSubscriptionsInput>;
    connectOrCreate?: Prisma.SubscriptionPlanCreateOrConnectWithoutUserSubscriptionsInput;
    connect?: Prisma.SubscriptionPlanWhereUniqueInput;
};
export type SubscriptionPlanUpdateOneRequiredWithoutUserSubscriptionsNestedInput = {
    create?: Prisma.XOR<Prisma.SubscriptionPlanCreateWithoutUserSubscriptionsInput, Prisma.SubscriptionPlanUncheckedCreateWithoutUserSubscriptionsInput>;
    connectOrCreate?: Prisma.SubscriptionPlanCreateOrConnectWithoutUserSubscriptionsInput;
    upsert?: Prisma.SubscriptionPlanUpsertWithoutUserSubscriptionsInput;
    connect?: Prisma.SubscriptionPlanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubscriptionPlanUpdateToOneWithWhereWithoutUserSubscriptionsInput, Prisma.SubscriptionPlanUpdateWithoutUserSubscriptionsInput>, Prisma.SubscriptionPlanUncheckedUpdateWithoutUserSubscriptionsInput>;
};
export type SubscriptionPlanCreateNestedOneWithoutPaymentTransactionsInput = {
    create?: Prisma.XOR<Prisma.SubscriptionPlanCreateWithoutPaymentTransactionsInput, Prisma.SubscriptionPlanUncheckedCreateWithoutPaymentTransactionsInput>;
    connectOrCreate?: Prisma.SubscriptionPlanCreateOrConnectWithoutPaymentTransactionsInput;
    connect?: Prisma.SubscriptionPlanWhereUniqueInput;
};
export type SubscriptionPlanUpdateOneRequiredWithoutPaymentTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.SubscriptionPlanCreateWithoutPaymentTransactionsInput, Prisma.SubscriptionPlanUncheckedCreateWithoutPaymentTransactionsInput>;
    connectOrCreate?: Prisma.SubscriptionPlanCreateOrConnectWithoutPaymentTransactionsInput;
    upsert?: Prisma.SubscriptionPlanUpsertWithoutPaymentTransactionsInput;
    connect?: Prisma.SubscriptionPlanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubscriptionPlanUpdateToOneWithWhereWithoutPaymentTransactionsInput, Prisma.SubscriptionPlanUpdateWithoutPaymentTransactionsInput>, Prisma.SubscriptionPlanUncheckedUpdateWithoutPaymentTransactionsInput>;
};
export type SubscriptionPlanCreateWithoutUserSubscriptionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    durationDays: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: number | null;
    trialDayLimit?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paymentTransactions?: Prisma.PaymentTransactionCreateNestedManyWithoutSubscriptionPlanInput;
};
export type SubscriptionPlanUncheckedCreateWithoutUserSubscriptionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    durationDays: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: number | null;
    trialDayLimit?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedCreateNestedManyWithoutSubscriptionPlanInput;
};
export type SubscriptionPlanCreateOrConnectWithoutUserSubscriptionsInput = {
    where: Prisma.SubscriptionPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubscriptionPlanCreateWithoutUserSubscriptionsInput, Prisma.SubscriptionPlanUncheckedCreateWithoutUserSubscriptionsInput>;
};
export type SubscriptionPlanUpsertWithoutUserSubscriptionsInput = {
    update: Prisma.XOR<Prisma.SubscriptionPlanUpdateWithoutUserSubscriptionsInput, Prisma.SubscriptionPlanUncheckedUpdateWithoutUserSubscriptionsInput>;
    create: Prisma.XOR<Prisma.SubscriptionPlanCreateWithoutUserSubscriptionsInput, Prisma.SubscriptionPlanUncheckedCreateWithoutUserSubscriptionsInput>;
    where?: Prisma.SubscriptionPlanWhereInput;
};
export type SubscriptionPlanUpdateToOneWithWhereWithoutUserSubscriptionsInput = {
    where?: Prisma.SubscriptionPlanWhereInput;
    data: Prisma.XOR<Prisma.SubscriptionPlanUpdateWithoutUserSubscriptionsInput, Prisma.SubscriptionPlanUncheckedUpdateWithoutUserSubscriptionsInput>;
};
export type SubscriptionPlanUpdateWithoutUserSubscriptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    trialTryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trialDayLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUpdateManyWithoutSubscriptionPlanNestedInput;
};
export type SubscriptionPlanUncheckedUpdateWithoutUserSubscriptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    trialTryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trialDayLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedUpdateManyWithoutSubscriptionPlanNestedInput;
};
export type SubscriptionPlanCreateWithoutPaymentTransactionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    durationDays: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: number | null;
    trialDayLimit?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userSubscriptions?: Prisma.UserSubscriptionCreateNestedManyWithoutSubscriptionPlanInput;
};
export type SubscriptionPlanUncheckedCreateWithoutPaymentTransactionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    durationDays: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: number | null;
    trialDayLimit?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userSubscriptions?: Prisma.UserSubscriptionUncheckedCreateNestedManyWithoutSubscriptionPlanInput;
};
export type SubscriptionPlanCreateOrConnectWithoutPaymentTransactionsInput = {
    where: Prisma.SubscriptionPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubscriptionPlanCreateWithoutPaymentTransactionsInput, Prisma.SubscriptionPlanUncheckedCreateWithoutPaymentTransactionsInput>;
};
export type SubscriptionPlanUpsertWithoutPaymentTransactionsInput = {
    update: Prisma.XOR<Prisma.SubscriptionPlanUpdateWithoutPaymentTransactionsInput, Prisma.SubscriptionPlanUncheckedUpdateWithoutPaymentTransactionsInput>;
    create: Prisma.XOR<Prisma.SubscriptionPlanCreateWithoutPaymentTransactionsInput, Prisma.SubscriptionPlanUncheckedCreateWithoutPaymentTransactionsInput>;
    where?: Prisma.SubscriptionPlanWhereInput;
};
export type SubscriptionPlanUpdateToOneWithWhereWithoutPaymentTransactionsInput = {
    where?: Prisma.SubscriptionPlanWhereInput;
    data: Prisma.XOR<Prisma.SubscriptionPlanUpdateWithoutPaymentTransactionsInput, Prisma.SubscriptionPlanUncheckedUpdateWithoutPaymentTransactionsInput>;
};
export type SubscriptionPlanUpdateWithoutPaymentTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    trialTryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trialDayLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userSubscriptions?: Prisma.UserSubscriptionUpdateManyWithoutSubscriptionPlanNestedInput;
};
export type SubscriptionPlanUncheckedUpdateWithoutPaymentTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationDays?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    trialTryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    trialDayLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userSubscriptions?: Prisma.UserSubscriptionUncheckedUpdateManyWithoutSubscriptionPlanNestedInput;
};
export type SubscriptionPlanCountOutputType = {
    userSubscriptions: number;
    paymentTransactions: number;
};
export type SubscriptionPlanCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userSubscriptions?: boolean | SubscriptionPlanCountOutputTypeCountUserSubscriptionsArgs;
    paymentTransactions?: boolean | SubscriptionPlanCountOutputTypeCountPaymentTransactionsArgs;
};
export type SubscriptionPlanCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanCountOutputTypeSelect<ExtArgs> | null;
};
export type SubscriptionPlanCountOutputTypeCountUserSubscriptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSubscriptionWhereInput;
};
export type SubscriptionPlanCountOutputTypeCountPaymentTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentTransactionWhereInput;
};
export type SubscriptionPlanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    durationDays?: boolean;
    price?: boolean;
    currency?: boolean;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: boolean;
    trialDayLimit?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userSubscriptions?: boolean | Prisma.SubscriptionPlan$userSubscriptionsArgs<ExtArgs>;
    paymentTransactions?: boolean | Prisma.SubscriptionPlan$paymentTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubscriptionPlanCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subscriptionPlan"]>;
export type SubscriptionPlanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    durationDays?: boolean;
    price?: boolean;
    currency?: boolean;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: boolean;
    trialDayLimit?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["subscriptionPlan"]>;
export type SubscriptionPlanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    durationDays?: boolean;
    price?: boolean;
    currency?: boolean;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: boolean;
    trialDayLimit?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["subscriptionPlan"]>;
export type SubscriptionPlanSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    durationDays?: boolean;
    price?: boolean;
    currency?: boolean;
    isActive?: boolean;
    isTrial?: boolean;
    trialTryoutLimit?: boolean;
    trialDayLimit?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SubscriptionPlanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "durationDays" | "price" | "currency" | "isActive" | "isTrial" | "trialTryoutLimit" | "trialDayLimit" | "createdAt" | "updatedAt", ExtArgs["result"]["subscriptionPlan"]>;
export type SubscriptionPlanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userSubscriptions?: boolean | Prisma.SubscriptionPlan$userSubscriptionsArgs<ExtArgs>;
    paymentTransactions?: boolean | Prisma.SubscriptionPlan$paymentTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubscriptionPlanCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SubscriptionPlanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type SubscriptionPlanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $SubscriptionPlanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SubscriptionPlan";
    objects: {
        userSubscriptions: Prisma.$UserSubscriptionPayload<ExtArgs>[];
        paymentTransactions: Prisma.$PaymentTransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        durationDays: number;
        price: runtime.Decimal;
        currency: string;
        isActive: boolean;
        isTrial: boolean;
        trialTryoutLimit: number | null;
        trialDayLimit: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["subscriptionPlan"]>;
    composites: {};
};
export type SubscriptionPlanGetPayload<S extends boolean | null | undefined | SubscriptionPlanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload, S>;
export type SubscriptionPlanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SubscriptionPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SubscriptionPlanCountAggregateInputType | true;
};
export interface SubscriptionPlanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SubscriptionPlan'];
        meta: {
            name: 'SubscriptionPlan';
        };
    };
    findUnique<T extends SubscriptionPlanFindUniqueArgs>(args: Prisma.SelectSubset<T, SubscriptionPlanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SubscriptionPlanClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SubscriptionPlanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SubscriptionPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubscriptionPlanClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SubscriptionPlanFindFirstArgs>(args?: Prisma.SelectSubset<T, SubscriptionPlanFindFirstArgs<ExtArgs>>): Prisma.Prisma__SubscriptionPlanClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SubscriptionPlanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SubscriptionPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubscriptionPlanClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SubscriptionPlanFindManyArgs>(args?: Prisma.SelectSubset<T, SubscriptionPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SubscriptionPlanCreateArgs>(args: Prisma.SelectSubset<T, SubscriptionPlanCreateArgs<ExtArgs>>): Prisma.Prisma__SubscriptionPlanClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SubscriptionPlanCreateManyArgs>(args?: Prisma.SelectSubset<T, SubscriptionPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SubscriptionPlanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SubscriptionPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SubscriptionPlanDeleteArgs>(args: Prisma.SelectSubset<T, SubscriptionPlanDeleteArgs<ExtArgs>>): Prisma.Prisma__SubscriptionPlanClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SubscriptionPlanUpdateArgs>(args: Prisma.SelectSubset<T, SubscriptionPlanUpdateArgs<ExtArgs>>): Prisma.Prisma__SubscriptionPlanClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SubscriptionPlanDeleteManyArgs>(args?: Prisma.SelectSubset<T, SubscriptionPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SubscriptionPlanUpdateManyArgs>(args: Prisma.SelectSubset<T, SubscriptionPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SubscriptionPlanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SubscriptionPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SubscriptionPlanUpsertArgs>(args: Prisma.SelectSubset<T, SubscriptionPlanUpsertArgs<ExtArgs>>): Prisma.Prisma__SubscriptionPlanClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SubscriptionPlanCountArgs>(args?: Prisma.Subset<T, SubscriptionPlanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SubscriptionPlanCountAggregateOutputType> : number>;
    aggregate<T extends SubscriptionPlanAggregateArgs>(args: Prisma.Subset<T, SubscriptionPlanAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionPlanAggregateType<T>>;
    groupBy<T extends SubscriptionPlanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SubscriptionPlanGroupByArgs['orderBy'];
    } : {
        orderBy?: SubscriptionPlanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SubscriptionPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SubscriptionPlanFieldRefs;
}
export interface Prisma__SubscriptionPlanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    userSubscriptions<T extends Prisma.SubscriptionPlan$userSubscriptionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubscriptionPlan$userSubscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    paymentTransactions<T extends Prisma.SubscriptionPlan$paymentTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubscriptionPlan$paymentTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SubscriptionPlanFieldRefs {
    readonly id: Prisma.FieldRef<"SubscriptionPlan", 'String'>;
    readonly name: Prisma.FieldRef<"SubscriptionPlan", 'String'>;
    readonly description: Prisma.FieldRef<"SubscriptionPlan", 'String'>;
    readonly durationDays: Prisma.FieldRef<"SubscriptionPlan", 'Int'>;
    readonly price: Prisma.FieldRef<"SubscriptionPlan", 'Decimal'>;
    readonly currency: Prisma.FieldRef<"SubscriptionPlan", 'String'>;
    readonly isActive: Prisma.FieldRef<"SubscriptionPlan", 'Boolean'>;
    readonly isTrial: Prisma.FieldRef<"SubscriptionPlan", 'Boolean'>;
    readonly trialTryoutLimit: Prisma.FieldRef<"SubscriptionPlan", 'Int'>;
    readonly trialDayLimit: Prisma.FieldRef<"SubscriptionPlan", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"SubscriptionPlan", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SubscriptionPlan", 'DateTime'>;
}
export type SubscriptionPlanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    where: Prisma.SubscriptionPlanWhereUniqueInput;
};
export type SubscriptionPlanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    where: Prisma.SubscriptionPlanWhereUniqueInput;
};
export type SubscriptionPlanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionPlanWhereInput;
    orderBy?: Prisma.SubscriptionPlanOrderByWithRelationInput | Prisma.SubscriptionPlanOrderByWithRelationInput[];
    cursor?: Prisma.SubscriptionPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscriptionPlanScalarFieldEnum | Prisma.SubscriptionPlanScalarFieldEnum[];
};
export type SubscriptionPlanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionPlanWhereInput;
    orderBy?: Prisma.SubscriptionPlanOrderByWithRelationInput | Prisma.SubscriptionPlanOrderByWithRelationInput[];
    cursor?: Prisma.SubscriptionPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscriptionPlanScalarFieldEnum | Prisma.SubscriptionPlanScalarFieldEnum[];
};
export type SubscriptionPlanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionPlanWhereInput;
    orderBy?: Prisma.SubscriptionPlanOrderByWithRelationInput | Prisma.SubscriptionPlanOrderByWithRelationInput[];
    cursor?: Prisma.SubscriptionPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscriptionPlanScalarFieldEnum | Prisma.SubscriptionPlanScalarFieldEnum[];
};
export type SubscriptionPlanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubscriptionPlanCreateInput, Prisma.SubscriptionPlanUncheckedCreateInput>;
};
export type SubscriptionPlanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SubscriptionPlanCreateManyInput | Prisma.SubscriptionPlanCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SubscriptionPlanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    data: Prisma.SubscriptionPlanCreateManyInput | Prisma.SubscriptionPlanCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SubscriptionPlanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubscriptionPlanUpdateInput, Prisma.SubscriptionPlanUncheckedUpdateInput>;
    where: Prisma.SubscriptionPlanWhereUniqueInput;
};
export type SubscriptionPlanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SubscriptionPlanUpdateManyMutationInput, Prisma.SubscriptionPlanUncheckedUpdateManyInput>;
    where?: Prisma.SubscriptionPlanWhereInput;
    limit?: number;
};
export type SubscriptionPlanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubscriptionPlanUpdateManyMutationInput, Prisma.SubscriptionPlanUncheckedUpdateManyInput>;
    where?: Prisma.SubscriptionPlanWhereInput;
    limit?: number;
};
export type SubscriptionPlanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    where: Prisma.SubscriptionPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubscriptionPlanCreateInput, Prisma.SubscriptionPlanUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SubscriptionPlanUpdateInput, Prisma.SubscriptionPlanUncheckedUpdateInput>;
};
export type SubscriptionPlanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    where: Prisma.SubscriptionPlanWhereUniqueInput;
};
export type SubscriptionPlanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscriptionPlanWhereInput;
    limit?: number;
};
export type SubscriptionPlan$userSubscriptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.UserSubscriptionInclude<ExtArgs> | null;
    where?: Prisma.UserSubscriptionWhereInput;
    orderBy?: Prisma.UserSubscriptionOrderByWithRelationInput | Prisma.UserSubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.UserSubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSubscriptionScalarFieldEnum | Prisma.UserSubscriptionScalarFieldEnum[];
};
export type SubscriptionPlan$paymentTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTransactionOmit<ExtArgs> | null;
    include?: Prisma.PaymentTransactionInclude<ExtArgs> | null;
    where?: Prisma.PaymentTransactionWhereInput;
    orderBy?: Prisma.PaymentTransactionOrderByWithRelationInput | Prisma.PaymentTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PaymentTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentTransactionScalarFieldEnum | Prisma.PaymentTransactionScalarFieldEnum[];
};
export type SubscriptionPlanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
};
