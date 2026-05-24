import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserSubscriptionModel = runtime.Types.Result.DefaultSelection<Prisma.$UserSubscriptionPayload>;
export type AggregateUserSubscription = {
    _count: UserSubscriptionCountAggregateOutputType | null;
    _avg: UserSubscriptionAvgAggregateOutputType | null;
    _sum: UserSubscriptionSumAggregateOutputType | null;
    _min: UserSubscriptionMinAggregateOutputType | null;
    _max: UserSubscriptionMaxAggregateOutputType | null;
};
export type UserSubscriptionAvgAggregateOutputType = {
    tryoutLimit: number | null;
    tryoutUsed: number | null;
};
export type UserSubscriptionSumAggregateOutputType = {
    tryoutLimit: number | null;
    tryoutUsed: number | null;
};
export type UserSubscriptionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    subscriptionPlanId: string | null;
    status: $Enums.SubscriptionStatus | null;
    startDate: Date | null;
    endDate: Date | null;
    tryoutLimit: number | null;
    tryoutUsed: number | null;
    isTrial: boolean | null;
    activationSource: $Enums.ActivationSource | null;
    activatedBy: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserSubscriptionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    subscriptionPlanId: string | null;
    status: $Enums.SubscriptionStatus | null;
    startDate: Date | null;
    endDate: Date | null;
    tryoutLimit: number | null;
    tryoutUsed: number | null;
    isTrial: boolean | null;
    activationSource: $Enums.ActivationSource | null;
    activatedBy: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserSubscriptionCountAggregateOutputType = {
    id: number;
    userId: number;
    subscriptionPlanId: number;
    status: number;
    startDate: number;
    endDate: number;
    tryoutLimit: number;
    tryoutUsed: number;
    isTrial: number;
    activationSource: number;
    activatedBy: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserSubscriptionAvgAggregateInputType = {
    tryoutLimit?: true;
    tryoutUsed?: true;
};
export type UserSubscriptionSumAggregateInputType = {
    tryoutLimit?: true;
    tryoutUsed?: true;
};
export type UserSubscriptionMinAggregateInputType = {
    id?: true;
    userId?: true;
    subscriptionPlanId?: true;
    status?: true;
    startDate?: true;
    endDate?: true;
    tryoutLimit?: true;
    tryoutUsed?: true;
    isTrial?: true;
    activationSource?: true;
    activatedBy?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserSubscriptionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    subscriptionPlanId?: true;
    status?: true;
    startDate?: true;
    endDate?: true;
    tryoutLimit?: true;
    tryoutUsed?: true;
    isTrial?: true;
    activationSource?: true;
    activatedBy?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserSubscriptionCountAggregateInputType = {
    id?: true;
    userId?: true;
    subscriptionPlanId?: true;
    status?: true;
    startDate?: true;
    endDate?: true;
    tryoutLimit?: true;
    tryoutUsed?: true;
    isTrial?: true;
    activationSource?: true;
    activatedBy?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserSubscriptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSubscriptionWhereInput;
    orderBy?: Prisma.UserSubscriptionOrderByWithRelationInput | Prisma.UserSubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.UserSubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserSubscriptionCountAggregateInputType;
    _avg?: UserSubscriptionAvgAggregateInputType;
    _sum?: UserSubscriptionSumAggregateInputType;
    _min?: UserSubscriptionMinAggregateInputType;
    _max?: UserSubscriptionMaxAggregateInputType;
};
export type GetUserSubscriptionAggregateType<T extends UserSubscriptionAggregateArgs> = {
    [P in keyof T & keyof AggregateUserSubscription]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserSubscription[P]> : Prisma.GetScalarType<T[P], AggregateUserSubscription[P]>;
};
export type UserSubscriptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSubscriptionWhereInput;
    orderBy?: Prisma.UserSubscriptionOrderByWithAggregationInput | Prisma.UserSubscriptionOrderByWithAggregationInput[];
    by: Prisma.UserSubscriptionScalarFieldEnum[] | Prisma.UserSubscriptionScalarFieldEnum;
    having?: Prisma.UserSubscriptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserSubscriptionCountAggregateInputType | true;
    _avg?: UserSubscriptionAvgAggregateInputType;
    _sum?: UserSubscriptionSumAggregateInputType;
    _min?: UserSubscriptionMinAggregateInputType;
    _max?: UserSubscriptionMaxAggregateInputType;
};
export type UserSubscriptionGroupByOutputType = {
    id: string;
    userId: string;
    subscriptionPlanId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    tryoutLimit: number | null;
    tryoutUsed: number;
    isTrial: boolean;
    activationSource: $Enums.ActivationSource;
    activatedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserSubscriptionCountAggregateOutputType | null;
    _avg: UserSubscriptionAvgAggregateOutputType | null;
    _sum: UserSubscriptionSumAggregateOutputType | null;
    _min: UserSubscriptionMinAggregateOutputType | null;
    _max: UserSubscriptionMaxAggregateOutputType | null;
};
export type GetUserSubscriptionGroupByPayload<T extends UserSubscriptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserSubscriptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserSubscriptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserSubscriptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserSubscriptionGroupByOutputType[P]>;
}>>;
export type UserSubscriptionWhereInput = {
    AND?: Prisma.UserSubscriptionWhereInput | Prisma.UserSubscriptionWhereInput[];
    OR?: Prisma.UserSubscriptionWhereInput[];
    NOT?: Prisma.UserSubscriptionWhereInput | Prisma.UserSubscriptionWhereInput[];
    id?: Prisma.StringFilter<"UserSubscription"> | string;
    userId?: Prisma.StringFilter<"UserSubscription"> | string;
    subscriptionPlanId?: Prisma.StringFilter<"UserSubscription"> | string;
    status?: Prisma.EnumSubscriptionStatusFilter<"UserSubscription"> | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    tryoutLimit?: Prisma.IntNullableFilter<"UserSubscription"> | number | null;
    tryoutUsed?: Prisma.IntFilter<"UserSubscription"> | number;
    isTrial?: Prisma.BoolFilter<"UserSubscription"> | boolean;
    activationSource?: Prisma.EnumActivationSourceFilter<"UserSubscription"> | $Enums.ActivationSource;
    activatedBy?: Prisma.StringNullableFilter<"UserSubscription"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    subscriptionPlan?: Prisma.XOR<Prisma.SubscriptionPlanScalarRelationFilter, Prisma.SubscriptionPlanWhereInput>;
    activatedByUser?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    paymentTransactions?: Prisma.PaymentTransactionListRelationFilter;
};
export type UserSubscriptionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    subscriptionPlanId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    tryoutLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    tryoutUsed?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    activationSource?: Prisma.SortOrder;
    activatedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    subscriptionPlan?: Prisma.SubscriptionPlanOrderByWithRelationInput;
    activatedByUser?: Prisma.UserOrderByWithRelationInput;
    paymentTransactions?: Prisma.PaymentTransactionOrderByRelationAggregateInput;
};
export type UserSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.UserSubscriptionWhereInput | Prisma.UserSubscriptionWhereInput[];
    OR?: Prisma.UserSubscriptionWhereInput[];
    NOT?: Prisma.UserSubscriptionWhereInput | Prisma.UserSubscriptionWhereInput[];
    userId?: Prisma.StringFilter<"UserSubscription"> | string;
    subscriptionPlanId?: Prisma.StringFilter<"UserSubscription"> | string;
    status?: Prisma.EnumSubscriptionStatusFilter<"UserSubscription"> | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    tryoutLimit?: Prisma.IntNullableFilter<"UserSubscription"> | number | null;
    tryoutUsed?: Prisma.IntFilter<"UserSubscription"> | number;
    isTrial?: Prisma.BoolFilter<"UserSubscription"> | boolean;
    activationSource?: Prisma.EnumActivationSourceFilter<"UserSubscription"> | $Enums.ActivationSource;
    activatedBy?: Prisma.StringNullableFilter<"UserSubscription"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    subscriptionPlan?: Prisma.XOR<Prisma.SubscriptionPlanScalarRelationFilter, Prisma.SubscriptionPlanWhereInput>;
    activatedByUser?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    paymentTransactions?: Prisma.PaymentTransactionListRelationFilter;
}, "id">;
export type UserSubscriptionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    subscriptionPlanId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    tryoutLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    tryoutUsed?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    activationSource?: Prisma.SortOrder;
    activatedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserSubscriptionCountOrderByAggregateInput;
    _avg?: Prisma.UserSubscriptionAvgOrderByAggregateInput;
    _max?: Prisma.UserSubscriptionMaxOrderByAggregateInput;
    _min?: Prisma.UserSubscriptionMinOrderByAggregateInput;
    _sum?: Prisma.UserSubscriptionSumOrderByAggregateInput;
};
export type UserSubscriptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserSubscriptionScalarWhereWithAggregatesInput | Prisma.UserSubscriptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserSubscriptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserSubscriptionScalarWhereWithAggregatesInput | Prisma.UserSubscriptionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserSubscription"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserSubscription"> | string;
    subscriptionPlanId?: Prisma.StringWithAggregatesFilter<"UserSubscription"> | string;
    status?: Prisma.EnumSubscriptionStatusWithAggregatesFilter<"UserSubscription"> | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"UserSubscription"> | Date | string;
    endDate?: Prisma.DateTimeWithAggregatesFilter<"UserSubscription"> | Date | string;
    tryoutLimit?: Prisma.IntNullableWithAggregatesFilter<"UserSubscription"> | number | null;
    tryoutUsed?: Prisma.IntWithAggregatesFilter<"UserSubscription"> | number;
    isTrial?: Prisma.BoolWithAggregatesFilter<"UserSubscription"> | boolean;
    activationSource?: Prisma.EnumActivationSourceWithAggregatesFilter<"UserSubscription"> | $Enums.ActivationSource;
    activatedBy?: Prisma.StringNullableWithAggregatesFilter<"UserSubscription"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserSubscription"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserSubscription"> | Date | string;
};
export type UserSubscriptionCreateInput = {
    id?: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutUserSubscriptionsInput;
    subscriptionPlan: Prisma.SubscriptionPlanCreateNestedOneWithoutUserSubscriptionsInput;
    activatedByUser?: Prisma.UserCreateNestedOneWithoutActivatedSubscriptionsInput;
    paymentTransactions?: Prisma.PaymentTransactionCreateNestedManyWithoutUserSubscriptionInput;
};
export type UserSubscriptionUncheckedCreateInput = {
    id?: string;
    userId: string;
    subscriptionPlanId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    activatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedCreateNestedManyWithoutUserSubscriptionInput;
};
export type UserSubscriptionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutUserSubscriptionsNestedInput;
    subscriptionPlan?: Prisma.SubscriptionPlanUpdateOneRequiredWithoutUserSubscriptionsNestedInput;
    activatedByUser?: Prisma.UserUpdateOneWithoutActivatedSubscriptionsNestedInput;
    paymentTransactions?: Prisma.PaymentTransactionUpdateManyWithoutUserSubscriptionNestedInput;
};
export type UserSubscriptionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionPlanId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    activatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedUpdateManyWithoutUserSubscriptionNestedInput;
};
export type UserSubscriptionCreateManyInput = {
    id?: string;
    userId: string;
    subscriptionPlanId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    activatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserSubscriptionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSubscriptionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionPlanId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    activatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSubscriptionListRelationFilter = {
    every?: Prisma.UserSubscriptionWhereInput;
    some?: Prisma.UserSubscriptionWhereInput;
    none?: Prisma.UserSubscriptionWhereInput;
};
export type UserSubscriptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserSubscriptionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    subscriptionPlanId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    tryoutLimit?: Prisma.SortOrder;
    tryoutUsed?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    activationSource?: Prisma.SortOrder;
    activatedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSubscriptionAvgOrderByAggregateInput = {
    tryoutLimit?: Prisma.SortOrder;
    tryoutUsed?: Prisma.SortOrder;
};
export type UserSubscriptionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    subscriptionPlanId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    tryoutLimit?: Prisma.SortOrder;
    tryoutUsed?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    activationSource?: Prisma.SortOrder;
    activatedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSubscriptionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    subscriptionPlanId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    tryoutLimit?: Prisma.SortOrder;
    tryoutUsed?: Prisma.SortOrder;
    isTrial?: Prisma.SortOrder;
    activationSource?: Prisma.SortOrder;
    activatedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSubscriptionSumOrderByAggregateInput = {
    tryoutLimit?: Prisma.SortOrder;
    tryoutUsed?: Prisma.SortOrder;
};
export type UserSubscriptionNullableScalarRelationFilter = {
    is?: Prisma.UserSubscriptionWhereInput | null;
    isNot?: Prisma.UserSubscriptionWhereInput | null;
};
export type UserSubscriptionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutUserInput> | Prisma.UserSubscriptionCreateWithoutUserInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutUserInput | Prisma.UserSubscriptionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserSubscriptionCreateManyUserInputEnvelope;
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
};
export type UserSubscriptionCreateNestedManyWithoutActivatedByUserInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutActivatedByUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput> | Prisma.UserSubscriptionCreateWithoutActivatedByUserInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutActivatedByUserInput | Prisma.UserSubscriptionCreateOrConnectWithoutActivatedByUserInput[];
    createMany?: Prisma.UserSubscriptionCreateManyActivatedByUserInputEnvelope;
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
};
export type UserSubscriptionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutUserInput> | Prisma.UserSubscriptionCreateWithoutUserInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutUserInput | Prisma.UserSubscriptionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserSubscriptionCreateManyUserInputEnvelope;
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
};
export type UserSubscriptionUncheckedCreateNestedManyWithoutActivatedByUserInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutActivatedByUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput> | Prisma.UserSubscriptionCreateWithoutActivatedByUserInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutActivatedByUserInput | Prisma.UserSubscriptionCreateOrConnectWithoutActivatedByUserInput[];
    createMany?: Prisma.UserSubscriptionCreateManyActivatedByUserInputEnvelope;
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
};
export type UserSubscriptionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutUserInput> | Prisma.UserSubscriptionCreateWithoutUserInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutUserInput | Prisma.UserSubscriptionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutUserInput | Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserSubscriptionCreateManyUserInputEnvelope;
    set?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    delete?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    update?: Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutUserInput | Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserSubscriptionUpdateManyWithWhereWithoutUserInput | Prisma.UserSubscriptionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserSubscriptionScalarWhereInput | Prisma.UserSubscriptionScalarWhereInput[];
};
export type UserSubscriptionUpdateManyWithoutActivatedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutActivatedByUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput> | Prisma.UserSubscriptionCreateWithoutActivatedByUserInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutActivatedByUserInput | Prisma.UserSubscriptionCreateOrConnectWithoutActivatedByUserInput[];
    upsert?: Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutActivatedByUserInput | Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutActivatedByUserInput[];
    createMany?: Prisma.UserSubscriptionCreateManyActivatedByUserInputEnvelope;
    set?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    delete?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    update?: Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutActivatedByUserInput | Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutActivatedByUserInput[];
    updateMany?: Prisma.UserSubscriptionUpdateManyWithWhereWithoutActivatedByUserInput | Prisma.UserSubscriptionUpdateManyWithWhereWithoutActivatedByUserInput[];
    deleteMany?: Prisma.UserSubscriptionScalarWhereInput | Prisma.UserSubscriptionScalarWhereInput[];
};
export type UserSubscriptionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutUserInput> | Prisma.UserSubscriptionCreateWithoutUserInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutUserInput | Prisma.UserSubscriptionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutUserInput | Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserSubscriptionCreateManyUserInputEnvelope;
    set?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    delete?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    update?: Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutUserInput | Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserSubscriptionUpdateManyWithWhereWithoutUserInput | Prisma.UserSubscriptionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserSubscriptionScalarWhereInput | Prisma.UserSubscriptionScalarWhereInput[];
};
export type UserSubscriptionUncheckedUpdateManyWithoutActivatedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutActivatedByUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput> | Prisma.UserSubscriptionCreateWithoutActivatedByUserInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutActivatedByUserInput | Prisma.UserSubscriptionCreateOrConnectWithoutActivatedByUserInput[];
    upsert?: Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutActivatedByUserInput | Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutActivatedByUserInput[];
    createMany?: Prisma.UserSubscriptionCreateManyActivatedByUserInputEnvelope;
    set?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    delete?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    update?: Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutActivatedByUserInput | Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutActivatedByUserInput[];
    updateMany?: Prisma.UserSubscriptionUpdateManyWithWhereWithoutActivatedByUserInput | Prisma.UserSubscriptionUpdateManyWithWhereWithoutActivatedByUserInput[];
    deleteMany?: Prisma.UserSubscriptionScalarWhereInput | Prisma.UserSubscriptionScalarWhereInput[];
};
export type UserSubscriptionCreateNestedManyWithoutSubscriptionPlanInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput, Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput> | Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutSubscriptionPlanInput | Prisma.UserSubscriptionCreateOrConnectWithoutSubscriptionPlanInput[];
    createMany?: Prisma.UserSubscriptionCreateManySubscriptionPlanInputEnvelope;
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
};
export type UserSubscriptionUncheckedCreateNestedManyWithoutSubscriptionPlanInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput, Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput> | Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutSubscriptionPlanInput | Prisma.UserSubscriptionCreateOrConnectWithoutSubscriptionPlanInput[];
    createMany?: Prisma.UserSubscriptionCreateManySubscriptionPlanInputEnvelope;
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
};
export type UserSubscriptionUpdateManyWithoutSubscriptionPlanNestedInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput, Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput> | Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutSubscriptionPlanInput | Prisma.UserSubscriptionCreateOrConnectWithoutSubscriptionPlanInput[];
    upsert?: Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutSubscriptionPlanInput | Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutSubscriptionPlanInput[];
    createMany?: Prisma.UserSubscriptionCreateManySubscriptionPlanInputEnvelope;
    set?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    delete?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    update?: Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutSubscriptionPlanInput | Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutSubscriptionPlanInput[];
    updateMany?: Prisma.UserSubscriptionUpdateManyWithWhereWithoutSubscriptionPlanInput | Prisma.UserSubscriptionUpdateManyWithWhereWithoutSubscriptionPlanInput[];
    deleteMany?: Prisma.UserSubscriptionScalarWhereInput | Prisma.UserSubscriptionScalarWhereInput[];
};
export type UserSubscriptionUncheckedUpdateManyWithoutSubscriptionPlanNestedInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput, Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput> | Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput[] | Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput[];
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutSubscriptionPlanInput | Prisma.UserSubscriptionCreateOrConnectWithoutSubscriptionPlanInput[];
    upsert?: Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutSubscriptionPlanInput | Prisma.UserSubscriptionUpsertWithWhereUniqueWithoutSubscriptionPlanInput[];
    createMany?: Prisma.UserSubscriptionCreateManySubscriptionPlanInputEnvelope;
    set?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    disconnect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    delete?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    connect?: Prisma.UserSubscriptionWhereUniqueInput | Prisma.UserSubscriptionWhereUniqueInput[];
    update?: Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutSubscriptionPlanInput | Prisma.UserSubscriptionUpdateWithWhereUniqueWithoutSubscriptionPlanInput[];
    updateMany?: Prisma.UserSubscriptionUpdateManyWithWhereWithoutSubscriptionPlanInput | Prisma.UserSubscriptionUpdateManyWithWhereWithoutSubscriptionPlanInput[];
    deleteMany?: Prisma.UserSubscriptionScalarWhereInput | Prisma.UserSubscriptionScalarWhereInput[];
};
export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus;
};
export type EnumActivationSourceFieldUpdateOperationsInput = {
    set?: $Enums.ActivationSource;
};
export type UserSubscriptionCreateNestedOneWithoutPaymentTransactionsInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutPaymentTransactionsInput, Prisma.UserSubscriptionUncheckedCreateWithoutPaymentTransactionsInput>;
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutPaymentTransactionsInput;
    connect?: Prisma.UserSubscriptionWhereUniqueInput;
};
export type UserSubscriptionUpdateOneWithoutPaymentTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutPaymentTransactionsInput, Prisma.UserSubscriptionUncheckedCreateWithoutPaymentTransactionsInput>;
    connectOrCreate?: Prisma.UserSubscriptionCreateOrConnectWithoutPaymentTransactionsInput;
    upsert?: Prisma.UserSubscriptionUpsertWithoutPaymentTransactionsInput;
    disconnect?: Prisma.UserSubscriptionWhereInput | boolean;
    delete?: Prisma.UserSubscriptionWhereInput | boolean;
    connect?: Prisma.UserSubscriptionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserSubscriptionUpdateToOneWithWhereWithoutPaymentTransactionsInput, Prisma.UserSubscriptionUpdateWithoutPaymentTransactionsInput>, Prisma.UserSubscriptionUncheckedUpdateWithoutPaymentTransactionsInput>;
};
export type UserSubscriptionCreateWithoutUserInput = {
    id?: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subscriptionPlan: Prisma.SubscriptionPlanCreateNestedOneWithoutUserSubscriptionsInput;
    activatedByUser?: Prisma.UserCreateNestedOneWithoutActivatedSubscriptionsInput;
    paymentTransactions?: Prisma.PaymentTransactionCreateNestedManyWithoutUserSubscriptionInput;
};
export type UserSubscriptionUncheckedCreateWithoutUserInput = {
    id?: string;
    subscriptionPlanId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    activatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedCreateNestedManyWithoutUserSubscriptionInput;
};
export type UserSubscriptionCreateOrConnectWithoutUserInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutUserInput>;
};
export type UserSubscriptionCreateManyUserInputEnvelope = {
    data: Prisma.UserSubscriptionCreateManyUserInput | Prisma.UserSubscriptionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserSubscriptionCreateWithoutActivatedByUserInput = {
    id?: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutUserSubscriptionsInput;
    subscriptionPlan: Prisma.SubscriptionPlanCreateNestedOneWithoutUserSubscriptionsInput;
    paymentTransactions?: Prisma.PaymentTransactionCreateNestedManyWithoutUserSubscriptionInput;
};
export type UserSubscriptionUncheckedCreateWithoutActivatedByUserInput = {
    id?: string;
    userId: string;
    subscriptionPlanId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedCreateNestedManyWithoutUserSubscriptionInput;
};
export type UserSubscriptionCreateOrConnectWithoutActivatedByUserInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutActivatedByUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput>;
};
export type UserSubscriptionCreateManyActivatedByUserInputEnvelope = {
    data: Prisma.UserSubscriptionCreateManyActivatedByUserInput | Prisma.UserSubscriptionCreateManyActivatedByUserInput[];
    skipDuplicates?: boolean;
};
export type UserSubscriptionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserSubscriptionUpdateWithoutUserInput, Prisma.UserSubscriptionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutUserInput>;
};
export type UserSubscriptionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateWithoutUserInput, Prisma.UserSubscriptionUncheckedUpdateWithoutUserInput>;
};
export type UserSubscriptionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserSubscriptionScalarWhereInput;
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateManyMutationInput, Prisma.UserSubscriptionUncheckedUpdateManyWithoutUserInput>;
};
export type UserSubscriptionScalarWhereInput = {
    AND?: Prisma.UserSubscriptionScalarWhereInput | Prisma.UserSubscriptionScalarWhereInput[];
    OR?: Prisma.UserSubscriptionScalarWhereInput[];
    NOT?: Prisma.UserSubscriptionScalarWhereInput | Prisma.UserSubscriptionScalarWhereInput[];
    id?: Prisma.StringFilter<"UserSubscription"> | string;
    userId?: Prisma.StringFilter<"UserSubscription"> | string;
    subscriptionPlanId?: Prisma.StringFilter<"UserSubscription"> | string;
    status?: Prisma.EnumSubscriptionStatusFilter<"UserSubscription"> | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    tryoutLimit?: Prisma.IntNullableFilter<"UserSubscription"> | number | null;
    tryoutUsed?: Prisma.IntFilter<"UserSubscription"> | number;
    isTrial?: Prisma.BoolFilter<"UserSubscription"> | boolean;
    activationSource?: Prisma.EnumActivationSourceFilter<"UserSubscription"> | $Enums.ActivationSource;
    activatedBy?: Prisma.StringNullableFilter<"UserSubscription"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserSubscription"> | Date | string;
};
export type UserSubscriptionUpsertWithWhereUniqueWithoutActivatedByUserInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserSubscriptionUpdateWithoutActivatedByUserInput, Prisma.UserSubscriptionUncheckedUpdateWithoutActivatedByUserInput>;
    create: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutActivatedByUserInput, Prisma.UserSubscriptionUncheckedCreateWithoutActivatedByUserInput>;
};
export type UserSubscriptionUpdateWithWhereUniqueWithoutActivatedByUserInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateWithoutActivatedByUserInput, Prisma.UserSubscriptionUncheckedUpdateWithoutActivatedByUserInput>;
};
export type UserSubscriptionUpdateManyWithWhereWithoutActivatedByUserInput = {
    where: Prisma.UserSubscriptionScalarWhereInput;
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateManyMutationInput, Prisma.UserSubscriptionUncheckedUpdateManyWithoutActivatedByUserInput>;
};
export type UserSubscriptionCreateWithoutSubscriptionPlanInput = {
    id?: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutUserSubscriptionsInput;
    activatedByUser?: Prisma.UserCreateNestedOneWithoutActivatedSubscriptionsInput;
    paymentTransactions?: Prisma.PaymentTransactionCreateNestedManyWithoutUserSubscriptionInput;
};
export type UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput = {
    id?: string;
    userId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    activatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedCreateNestedManyWithoutUserSubscriptionInput;
};
export type UserSubscriptionCreateOrConnectWithoutSubscriptionPlanInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput, Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput>;
};
export type UserSubscriptionCreateManySubscriptionPlanInputEnvelope = {
    data: Prisma.UserSubscriptionCreateManySubscriptionPlanInput | Prisma.UserSubscriptionCreateManySubscriptionPlanInput[];
    skipDuplicates?: boolean;
};
export type UserSubscriptionUpsertWithWhereUniqueWithoutSubscriptionPlanInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserSubscriptionUpdateWithoutSubscriptionPlanInput, Prisma.UserSubscriptionUncheckedUpdateWithoutSubscriptionPlanInput>;
    create: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutSubscriptionPlanInput, Prisma.UserSubscriptionUncheckedCreateWithoutSubscriptionPlanInput>;
};
export type UserSubscriptionUpdateWithWhereUniqueWithoutSubscriptionPlanInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateWithoutSubscriptionPlanInput, Prisma.UserSubscriptionUncheckedUpdateWithoutSubscriptionPlanInput>;
};
export type UserSubscriptionUpdateManyWithWhereWithoutSubscriptionPlanInput = {
    where: Prisma.UserSubscriptionScalarWhereInput;
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateManyMutationInput, Prisma.UserSubscriptionUncheckedUpdateManyWithoutSubscriptionPlanInput>;
};
export type UserSubscriptionCreateWithoutPaymentTransactionsInput = {
    id?: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutUserSubscriptionsInput;
    subscriptionPlan: Prisma.SubscriptionPlanCreateNestedOneWithoutUserSubscriptionsInput;
    activatedByUser?: Prisma.UserCreateNestedOneWithoutActivatedSubscriptionsInput;
};
export type UserSubscriptionUncheckedCreateWithoutPaymentTransactionsInput = {
    id?: string;
    userId: string;
    subscriptionPlanId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    activatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserSubscriptionCreateOrConnectWithoutPaymentTransactionsInput = {
    where: Prisma.UserSubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutPaymentTransactionsInput, Prisma.UserSubscriptionUncheckedCreateWithoutPaymentTransactionsInput>;
};
export type UserSubscriptionUpsertWithoutPaymentTransactionsInput = {
    update: Prisma.XOR<Prisma.UserSubscriptionUpdateWithoutPaymentTransactionsInput, Prisma.UserSubscriptionUncheckedUpdateWithoutPaymentTransactionsInput>;
    create: Prisma.XOR<Prisma.UserSubscriptionCreateWithoutPaymentTransactionsInput, Prisma.UserSubscriptionUncheckedCreateWithoutPaymentTransactionsInput>;
    where?: Prisma.UserSubscriptionWhereInput;
};
export type UserSubscriptionUpdateToOneWithWhereWithoutPaymentTransactionsInput = {
    where?: Prisma.UserSubscriptionWhereInput;
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateWithoutPaymentTransactionsInput, Prisma.UserSubscriptionUncheckedUpdateWithoutPaymentTransactionsInput>;
};
export type UserSubscriptionUpdateWithoutPaymentTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutUserSubscriptionsNestedInput;
    subscriptionPlan?: Prisma.SubscriptionPlanUpdateOneRequiredWithoutUserSubscriptionsNestedInput;
    activatedByUser?: Prisma.UserUpdateOneWithoutActivatedSubscriptionsNestedInput;
};
export type UserSubscriptionUncheckedUpdateWithoutPaymentTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionPlanId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    activatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSubscriptionCreateManyUserInput = {
    id?: string;
    subscriptionPlanId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    activatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserSubscriptionCreateManyActivatedByUserInput = {
    id?: string;
    userId: string;
    subscriptionPlanId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserSubscriptionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subscriptionPlan?: Prisma.SubscriptionPlanUpdateOneRequiredWithoutUserSubscriptionsNestedInput;
    activatedByUser?: Prisma.UserUpdateOneWithoutActivatedSubscriptionsNestedInput;
    paymentTransactions?: Prisma.PaymentTransactionUpdateManyWithoutUserSubscriptionNestedInput;
};
export type UserSubscriptionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionPlanId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    activatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedUpdateManyWithoutUserSubscriptionNestedInput;
};
export type UserSubscriptionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionPlanId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    activatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSubscriptionUpdateWithoutActivatedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutUserSubscriptionsNestedInput;
    subscriptionPlan?: Prisma.SubscriptionPlanUpdateOneRequiredWithoutUserSubscriptionsNestedInput;
    paymentTransactions?: Prisma.PaymentTransactionUpdateManyWithoutUserSubscriptionNestedInput;
};
export type UserSubscriptionUncheckedUpdateWithoutActivatedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionPlanId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedUpdateManyWithoutUserSubscriptionNestedInput;
};
export type UserSubscriptionUncheckedUpdateManyWithoutActivatedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionPlanId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSubscriptionCreateManySubscriptionPlanInput = {
    id?: string;
    userId: string;
    status: $Enums.SubscriptionStatus;
    startDate: Date | string;
    endDate: Date | string;
    tryoutLimit?: number | null;
    tryoutUsed?: number;
    isTrial?: boolean;
    activationSource: $Enums.ActivationSource;
    activatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserSubscriptionUpdateWithoutSubscriptionPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutUserSubscriptionsNestedInput;
    activatedByUser?: Prisma.UserUpdateOneWithoutActivatedSubscriptionsNestedInput;
    paymentTransactions?: Prisma.PaymentTransactionUpdateManyWithoutUserSubscriptionNestedInput;
};
export type UserSubscriptionUncheckedUpdateWithoutSubscriptionPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    activatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paymentTransactions?: Prisma.PaymentTransactionUncheckedUpdateManyWithoutUserSubscriptionNestedInput;
};
export type UserSubscriptionUncheckedUpdateManyWithoutSubscriptionPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tryoutUsed?: Prisma.IntFieldUpdateOperationsInput | number;
    isTrial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activationSource?: Prisma.EnumActivationSourceFieldUpdateOperationsInput | $Enums.ActivationSource;
    activatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSubscriptionCountOutputType = {
    paymentTransactions: number;
};
export type UserSubscriptionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    paymentTransactions?: boolean | UserSubscriptionCountOutputTypeCountPaymentTransactionsArgs;
};
export type UserSubscriptionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionCountOutputTypeSelect<ExtArgs> | null;
};
export type UserSubscriptionCountOutputTypeCountPaymentTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentTransactionWhereInput;
};
export type UserSubscriptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    subscriptionPlanId?: boolean;
    status?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    tryoutLimit?: boolean;
    tryoutUsed?: boolean;
    isTrial?: boolean;
    activationSource?: boolean;
    activatedBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subscriptionPlan?: boolean | Prisma.SubscriptionPlanDefaultArgs<ExtArgs>;
    activatedByUser?: boolean | Prisma.UserSubscription$activatedByUserArgs<ExtArgs>;
    paymentTransactions?: boolean | Prisma.UserSubscription$paymentTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserSubscriptionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSubscription"]>;
export type UserSubscriptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    subscriptionPlanId?: boolean;
    status?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    tryoutLimit?: boolean;
    tryoutUsed?: boolean;
    isTrial?: boolean;
    activationSource?: boolean;
    activatedBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subscriptionPlan?: boolean | Prisma.SubscriptionPlanDefaultArgs<ExtArgs>;
    activatedByUser?: boolean | Prisma.UserSubscription$activatedByUserArgs<ExtArgs>;
}, ExtArgs["result"]["userSubscription"]>;
export type UserSubscriptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    subscriptionPlanId?: boolean;
    status?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    tryoutLimit?: boolean;
    tryoutUsed?: boolean;
    isTrial?: boolean;
    activationSource?: boolean;
    activatedBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subscriptionPlan?: boolean | Prisma.SubscriptionPlanDefaultArgs<ExtArgs>;
    activatedByUser?: boolean | Prisma.UserSubscription$activatedByUserArgs<ExtArgs>;
}, ExtArgs["result"]["userSubscription"]>;
export type UserSubscriptionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    subscriptionPlanId?: boolean;
    status?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    tryoutLimit?: boolean;
    tryoutUsed?: boolean;
    isTrial?: boolean;
    activationSource?: boolean;
    activatedBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserSubscriptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "subscriptionPlanId" | "status" | "startDate" | "endDate" | "tryoutLimit" | "tryoutUsed" | "isTrial" | "activationSource" | "activatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["userSubscription"]>;
export type UserSubscriptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subscriptionPlan?: boolean | Prisma.SubscriptionPlanDefaultArgs<ExtArgs>;
    activatedByUser?: boolean | Prisma.UserSubscription$activatedByUserArgs<ExtArgs>;
    paymentTransactions?: boolean | Prisma.UserSubscription$paymentTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserSubscriptionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserSubscriptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subscriptionPlan?: boolean | Prisma.SubscriptionPlanDefaultArgs<ExtArgs>;
    activatedByUser?: boolean | Prisma.UserSubscription$activatedByUserArgs<ExtArgs>;
};
export type UserSubscriptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subscriptionPlan?: boolean | Prisma.SubscriptionPlanDefaultArgs<ExtArgs>;
    activatedByUser?: boolean | Prisma.UserSubscription$activatedByUserArgs<ExtArgs>;
};
export type $UserSubscriptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserSubscription";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        subscriptionPlan: Prisma.$SubscriptionPlanPayload<ExtArgs>;
        activatedByUser: Prisma.$UserPayload<ExtArgs> | null;
        paymentTransactions: Prisma.$PaymentTransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        subscriptionPlanId: string;
        status: $Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date;
        tryoutLimit: number | null;
        tryoutUsed: number;
        isTrial: boolean;
        activationSource: $Enums.ActivationSource;
        activatedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["userSubscription"]>;
    composites: {};
};
export type UserSubscriptionGetPayload<S extends boolean | null | undefined | UserSubscriptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload, S>;
export type UserSubscriptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserSubscriptionCountAggregateInputType | true;
};
export interface UserSubscriptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserSubscription'];
        meta: {
            name: 'UserSubscription';
        };
    };
    findUnique<T extends UserSubscriptionFindUniqueArgs>(args: Prisma.SelectSubset<T, UserSubscriptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserSubscriptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserSubscriptionFindFirstArgs>(args?: Prisma.SelectSubset<T, UserSubscriptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserSubscriptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserSubscriptionFindManyArgs>(args?: Prisma.SelectSubset<T, UserSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserSubscriptionCreateArgs>(args: Prisma.SelectSubset<T, UserSubscriptionCreateArgs<ExtArgs>>): Prisma.Prisma__UserSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserSubscriptionCreateManyArgs>(args?: Prisma.SelectSubset<T, UserSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserSubscriptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserSubscriptionDeleteArgs>(args: Prisma.SelectSubset<T, UserSubscriptionDeleteArgs<ExtArgs>>): Prisma.Prisma__UserSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserSubscriptionUpdateArgs>(args: Prisma.SelectSubset<T, UserSubscriptionUpdateArgs<ExtArgs>>): Prisma.Prisma__UserSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserSubscriptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserSubscriptionUpdateManyArgs>(args: Prisma.SelectSubset<T, UserSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserSubscriptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserSubscriptionUpsertArgs>(args: Prisma.SelectSubset<T, UserSubscriptionUpsertArgs<ExtArgs>>): Prisma.Prisma__UserSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$UserSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserSubscriptionCountArgs>(args?: Prisma.Subset<T, UserSubscriptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserSubscriptionCountAggregateOutputType> : number>;
    aggregate<T extends UserSubscriptionAggregateArgs>(args: Prisma.Subset<T, UserSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetUserSubscriptionAggregateType<T>>;
    groupBy<T extends UserSubscriptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserSubscriptionGroupByArgs['orderBy'];
    } : {
        orderBy?: UserSubscriptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserSubscriptionFieldRefs;
}
export interface Prisma__UserSubscriptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    subscriptionPlan<T extends Prisma.SubscriptionPlanDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubscriptionPlanDefaultArgs<ExtArgs>>): Prisma.Prisma__SubscriptionPlanClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    activatedByUser<T extends Prisma.UserSubscription$activatedByUserArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserSubscription$activatedByUserArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    paymentTransactions<T extends Prisma.UserSubscription$paymentTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserSubscription$paymentTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserSubscriptionFieldRefs {
    readonly id: Prisma.FieldRef<"UserSubscription", 'String'>;
    readonly userId: Prisma.FieldRef<"UserSubscription", 'String'>;
    readonly subscriptionPlanId: Prisma.FieldRef<"UserSubscription", 'String'>;
    readonly status: Prisma.FieldRef<"UserSubscription", 'SubscriptionStatus'>;
    readonly startDate: Prisma.FieldRef<"UserSubscription", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"UserSubscription", 'DateTime'>;
    readonly tryoutLimit: Prisma.FieldRef<"UserSubscription", 'Int'>;
    readonly tryoutUsed: Prisma.FieldRef<"UserSubscription", 'Int'>;
    readonly isTrial: Prisma.FieldRef<"UserSubscription", 'Boolean'>;
    readonly activationSource: Prisma.FieldRef<"UserSubscription", 'ActivationSource'>;
    readonly activatedBy: Prisma.FieldRef<"UserSubscription", 'String'>;
    readonly createdAt: Prisma.FieldRef<"UserSubscription", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserSubscription", 'DateTime'>;
}
export type UserSubscriptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.UserSubscriptionInclude<ExtArgs> | null;
    where: Prisma.UserSubscriptionWhereUniqueInput;
};
export type UserSubscriptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.UserSubscriptionInclude<ExtArgs> | null;
    where: Prisma.UserSubscriptionWhereUniqueInput;
};
export type UserSubscriptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserSubscriptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserSubscriptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserSubscriptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.UserSubscriptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSubscriptionCreateInput, Prisma.UserSubscriptionUncheckedCreateInput>;
};
export type UserSubscriptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserSubscriptionCreateManyInput | Prisma.UserSubscriptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserSubscriptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    data: Prisma.UserSubscriptionCreateManyInput | Prisma.UserSubscriptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserSubscriptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserSubscriptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.UserSubscriptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateInput, Prisma.UserSubscriptionUncheckedUpdateInput>;
    where: Prisma.UserSubscriptionWhereUniqueInput;
};
export type UserSubscriptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateManyMutationInput, Prisma.UserSubscriptionUncheckedUpdateManyInput>;
    where?: Prisma.UserSubscriptionWhereInput;
    limit?: number;
};
export type UserSubscriptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSubscriptionUpdateManyMutationInput, Prisma.UserSubscriptionUncheckedUpdateManyInput>;
    where?: Prisma.UserSubscriptionWhereInput;
    limit?: number;
    include?: Prisma.UserSubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserSubscriptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.UserSubscriptionInclude<ExtArgs> | null;
    where: Prisma.UserSubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSubscriptionCreateInput, Prisma.UserSubscriptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserSubscriptionUpdateInput, Prisma.UserSubscriptionUncheckedUpdateInput>;
};
export type UserSubscriptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.UserSubscriptionInclude<ExtArgs> | null;
    where: Prisma.UserSubscriptionWhereUniqueInput;
};
export type UserSubscriptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSubscriptionWhereInput;
    limit?: number;
};
export type UserSubscription$activatedByUserArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type UserSubscription$paymentTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserSubscriptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.UserSubscriptionOmit<ExtArgs> | null;
    include?: Prisma.UserSubscriptionInclude<ExtArgs> | null;
};
