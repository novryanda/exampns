import type * as runtime from "@prisma/client/runtime/client";
import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumQuestionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionCategory | Prisma.EnumQuestionCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionCategoryFilter<$PrismaModel> | $Enums.QuestionCategory;
};
export type EnumQuestionDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionDifficulty | Prisma.EnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionDifficultyFilter<$PrismaModel> | $Enums.QuestionDifficulty;
};
export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | Prisma.EnumQuestionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType;
};
export type EnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | Prisma.EnumSourceTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SourceType[] | Prisma.ListEnumSourceTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SourceType[] | Prisma.ListEnumSourceTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType;
};
export type EnumQuestionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionStatus | Prisma.EnumQuestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionStatus[] | Prisma.ListEnumQuestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionStatus[] | Prisma.ListEnumQuestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionStatusFilter<$PrismaModel> | $Enums.QuestionStatus;
};
export type EnumQuestionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionCategory | Prisma.EnumQuestionCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.QuestionCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionCategoryFilter<$PrismaModel>;
};
export type EnumQuestionDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionDifficulty | Prisma.EnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.QuestionDifficulty;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionDifficultyFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionDifficultyFilter<$PrismaModel>;
};
export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | Prisma.EnumQuestionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel>;
};
export type EnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | Prisma.EnumSourceTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SourceType[] | Prisma.ListEnumSourceTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SourceType[] | Prisma.ListEnumSourceTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSourceTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSourceTypeFilter<$PrismaModel>;
};
export type EnumQuestionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionStatus | Prisma.EnumQuestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionStatus[] | Prisma.ListEnumQuestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionStatus[] | Prisma.ListEnumQuestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuestionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionStatusFilter<$PrismaModel>;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type EnumImportBatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportBatchStatus | Prisma.EnumImportBatchStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ImportBatchStatus[] | Prisma.ListEnumImportBatchStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ImportBatchStatus[] | Prisma.ListEnumImportBatchStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumImportBatchStatusFilter<$PrismaModel> | $Enums.ImportBatchStatus;
};
export type EnumImportBatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportBatchStatus | Prisma.EnumImportBatchStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ImportBatchStatus[] | Prisma.ListEnumImportBatchStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ImportBatchStatus[] | Prisma.ListEnumImportBatchStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumImportBatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.ImportBatchStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumImportBatchStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumImportBatchStatusFilter<$PrismaModel>;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type JsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>, Required<JsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;
export type JsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type EnumQuestionCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionCategory | Prisma.EnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    in?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumQuestionCategoryNullableFilter<$PrismaModel> | $Enums.QuestionCategory | null;
};
export type EnumQuestionDifficultyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionDifficulty | Prisma.EnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    in?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumQuestionDifficultyNullableFilter<$PrismaModel> | $Enums.QuestionDifficulty | null;
};
export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type EnumParsedQuestionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ParsedQuestionStatus | Prisma.EnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ParsedQuestionStatus[] | Prisma.ListEnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ParsedQuestionStatus[] | Prisma.ListEnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumParsedQuestionStatusFilter<$PrismaModel> | $Enums.ParsedQuestionStatus;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type JsonWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonFilter<$PrismaModel>;
};
export type EnumQuestionCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionCategory | Prisma.EnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    in?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumQuestionCategoryNullableWithAggregatesFilter<$PrismaModel> | $Enums.QuestionCategory | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionCategoryNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionCategoryNullableFilter<$PrismaModel>;
};
export type EnumQuestionDifficultyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionDifficulty | Prisma.EnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    in?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumQuestionDifficultyNullableWithAggregatesFilter<$PrismaModel> | $Enums.QuestionDifficulty | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionDifficultyNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionDifficultyNullableFilter<$PrismaModel>;
};
export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type EnumParsedQuestionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ParsedQuestionStatus | Prisma.EnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ParsedQuestionStatus[] | Prisma.ListEnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ParsedQuestionStatus[] | Prisma.ListEnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumParsedQuestionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ParsedQuestionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumParsedQuestionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumParsedQuestionStatusFilter<$PrismaModel>;
};
export type EnumTryoutTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TryoutType | Prisma.EnumTryoutTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TryoutType[] | Prisma.ListEnumTryoutTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TryoutType[] | Prisma.ListEnumTryoutTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTryoutTypeFilter<$PrismaModel> | $Enums.TryoutType;
};
export type EnumAccessTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessType | Prisma.EnumAccessTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AccessType[] | Prisma.ListEnumAccessTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccessType[] | Prisma.ListEnumAccessTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccessTypeFilter<$PrismaModel> | $Enums.AccessType;
};
export type EnumTryoutStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TryoutStatus | Prisma.EnumTryoutStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TryoutStatus[] | Prisma.ListEnumTryoutStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TryoutStatus[] | Prisma.ListEnumTryoutStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTryoutStatusFilter<$PrismaModel> | $Enums.TryoutStatus;
};
export type EnumTryoutTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TryoutType | Prisma.EnumTryoutTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TryoutType[] | Prisma.ListEnumTryoutTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TryoutType[] | Prisma.ListEnumTryoutTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTryoutTypeWithAggregatesFilter<$PrismaModel> | $Enums.TryoutType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTryoutTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTryoutTypeFilter<$PrismaModel>;
};
export type EnumAccessTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessType | Prisma.EnumAccessTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AccessType[] | Prisma.ListEnumAccessTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccessType[] | Prisma.ListEnumAccessTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccessTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccessType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAccessTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAccessTypeFilter<$PrismaModel>;
};
export type EnumTryoutStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TryoutStatus | Prisma.EnumTryoutStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TryoutStatus[] | Prisma.ListEnumTryoutStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TryoutStatus[] | Prisma.ListEnumTryoutStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTryoutStatusWithAggregatesFilter<$PrismaModel> | $Enums.TryoutStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTryoutStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTryoutStatusFilter<$PrismaModel>;
};
export type EnumRandomizationModeFilter<$PrismaModel = never> = {
    equals?: $Enums.RandomizationMode | Prisma.EnumRandomizationModeFieldRefInput<$PrismaModel>;
    in?: $Enums.RandomizationMode[] | Prisma.ListEnumRandomizationModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RandomizationMode[] | Prisma.ListEnumRandomizationModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRandomizationModeFilter<$PrismaModel> | $Enums.RandomizationMode;
};
export type EnumQuestionOrderModeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionOrderMode | Prisma.EnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionOrderMode[] | Prisma.ListEnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionOrderMode[] | Prisma.ListEnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionOrderModeFilter<$PrismaModel> | $Enums.QuestionOrderMode;
};
export type EnumRandomizationModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RandomizationMode | Prisma.EnumRandomizationModeFieldRefInput<$PrismaModel>;
    in?: $Enums.RandomizationMode[] | Prisma.ListEnumRandomizationModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RandomizationMode[] | Prisma.ListEnumRandomizationModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRandomizationModeWithAggregatesFilter<$PrismaModel> | $Enums.RandomizationMode;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRandomizationModeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRandomizationModeFilter<$PrismaModel>;
};
export type EnumQuestionOrderModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionOrderMode | Prisma.EnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionOrderMode[] | Prisma.ListEnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionOrderMode[] | Prisma.ListEnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionOrderModeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionOrderMode;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionOrderModeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionOrderModeFilter<$PrismaModel>;
};
export type EnumManualQuestionSetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ManualQuestionSetStatus | Prisma.EnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ManualQuestionSetStatus[] | Prisma.ListEnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ManualQuestionSetStatus[] | Prisma.ListEnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumManualQuestionSetStatusFilter<$PrismaModel> | $Enums.ManualQuestionSetStatus;
};
export type EnumManualQuestionSetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ManualQuestionSetStatus | Prisma.EnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ManualQuestionSetStatus[] | Prisma.ListEnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ManualQuestionSetStatus[] | Prisma.ListEnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumManualQuestionSetStatusWithAggregatesFilter<$PrismaModel> | $Enums.ManualQuestionSetStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumManualQuestionSetStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumManualQuestionSetStatusFilter<$PrismaModel>;
};
export type EnumExamSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamSessionStatus | Prisma.EnumExamSessionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExamSessionStatus[] | Prisma.ListEnumExamSessionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExamSessionStatus[] | Prisma.ListEnumExamSessionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExamSessionStatusFilter<$PrismaModel> | $Enums.ExamSessionStatus;
};
export type EnumExamSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamSessionStatus | Prisma.EnumExamSessionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExamSessionStatus[] | Prisma.ListEnumExamSessionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExamSessionStatus[] | Prisma.ListEnumExamSessionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExamSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExamSessionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumExamSessionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumExamSessionStatusFilter<$PrismaModel>;
};
export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedBoolNullableFilter<$PrismaModel> | boolean | null;
};
export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolNullableFilter<$PrismaModel>;
};
export type EnumExamIntegrityEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamIntegrityEventType | Prisma.EnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ExamIntegrityEventType[] | Prisma.ListEnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExamIntegrityEventType[] | Prisma.ListEnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExamIntegrityEventTypeFilter<$PrismaModel> | $Enums.ExamIntegrityEventType;
};
export type EnumExamIntegrityEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamIntegrityEventType | Prisma.EnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ExamIntegrityEventType[] | Prisma.ListEnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExamIntegrityEventType[] | Prisma.ListEnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExamIntegrityEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExamIntegrityEventType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumExamIntegrityEventTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumExamIntegrityEventTypeFilter<$PrismaModel>;
};
export type EnumAIRecommendationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AIRecommendationStatus | Prisma.EnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AIRecommendationStatus[] | Prisma.ListEnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AIRecommendationStatus[] | Prisma.ListEnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAIRecommendationStatusFilter<$PrismaModel> | $Enums.AIRecommendationStatus;
};
export type EnumAIRecommendationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIRecommendationStatus | Prisma.EnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AIRecommendationStatus[] | Prisma.ListEnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AIRecommendationStatus[] | Prisma.ListEnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAIRecommendationStatusWithAggregatesFilter<$PrismaModel> | $Enums.AIRecommendationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAIRecommendationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAIRecommendationStatusFilter<$PrismaModel>;
};
export type EnumPriorityLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityLevel | Prisma.EnumPriorityLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.PriorityLevel[] | Prisma.ListEnumPriorityLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PriorityLevel[] | Prisma.ListEnumPriorityLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPriorityLevelFilter<$PrismaModel> | $Enums.PriorityLevel;
};
export type DecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type EnumReasonCodeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReasonCode | Prisma.EnumReasonCodeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReasonCode[] | Prisma.ListEnumReasonCodeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReasonCode[] | Prisma.ListEnumReasonCodeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReasonCodeFilter<$PrismaModel> | $Enums.ReasonCode;
};
export type EnumTrendTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TrendType | Prisma.EnumTrendTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TrendType[] | Prisma.ListEnumTrendTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TrendType[] | Prisma.ListEnumTrendTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTrendTypeFilter<$PrismaModel> | $Enums.TrendType;
};
export type EnumPriorityLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityLevel | Prisma.EnumPriorityLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.PriorityLevel[] | Prisma.ListEnumPriorityLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PriorityLevel[] | Prisma.ListEnumPriorityLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPriorityLevelWithAggregatesFilter<$PrismaModel> | $Enums.PriorityLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPriorityLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPriorityLevelFilter<$PrismaModel>;
};
export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type EnumReasonCodeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReasonCode | Prisma.EnumReasonCodeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReasonCode[] | Prisma.ListEnumReasonCodeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReasonCode[] | Prisma.ListEnumReasonCodeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReasonCodeWithAggregatesFilter<$PrismaModel> | $Enums.ReasonCode;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReasonCodeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReasonCodeFilter<$PrismaModel>;
};
export type EnumTrendTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrendType | Prisma.EnumTrendTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TrendType[] | Prisma.ListEnumTrendTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TrendType[] | Prisma.ListEnumTrendTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTrendTypeWithAggregatesFilter<$PrismaModel> | $Enums.TrendType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTrendTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTrendTypeFilter<$PrismaModel>;
};
export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | Prisma.EnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus;
};
export type EnumActivationSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivationSource | Prisma.EnumActivationSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivationSource[] | Prisma.ListEnumActivationSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivationSource[] | Prisma.ListEnumActivationSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivationSourceFilter<$PrismaModel> | $Enums.ActivationSource;
};
export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | Prisma.EnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel>;
};
export type EnumActivationSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivationSource | Prisma.EnumActivationSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivationSource[] | Prisma.ListEnumActivationSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivationSource[] | Prisma.ListEnumActivationSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivationSourceWithAggregatesFilter<$PrismaModel> | $Enums.ActivationSource;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivationSourceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivationSourceFilter<$PrismaModel>;
};
export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
};
export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumQuestionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionCategory | Prisma.EnumQuestionCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionCategoryFilter<$PrismaModel> | $Enums.QuestionCategory;
};
export type NestedEnumQuestionDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionDifficulty | Prisma.EnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionDifficultyFilter<$PrismaModel> | $Enums.QuestionDifficulty;
};
export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | Prisma.EnumQuestionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType;
};
export type NestedEnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | Prisma.EnumSourceTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SourceType[] | Prisma.ListEnumSourceTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SourceType[] | Prisma.ListEnumSourceTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType;
};
export type NestedEnumQuestionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionStatus | Prisma.EnumQuestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionStatus[] | Prisma.ListEnumQuestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionStatus[] | Prisma.ListEnumQuestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionStatusFilter<$PrismaModel> | $Enums.QuestionStatus;
};
export type NestedEnumQuestionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionCategory | Prisma.EnumQuestionCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.QuestionCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionCategoryFilter<$PrismaModel>;
};
export type NestedEnumQuestionDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionDifficulty | Prisma.EnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.QuestionDifficulty;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionDifficultyFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionDifficultyFilter<$PrismaModel>;
};
export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | Prisma.EnumQuestionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel>;
};
export type NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | Prisma.EnumSourceTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SourceType[] | Prisma.ListEnumSourceTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SourceType[] | Prisma.ListEnumSourceTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSourceTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSourceTypeFilter<$PrismaModel>;
};
export type NestedEnumQuestionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionStatus | Prisma.EnumQuestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionStatus[] | Prisma.ListEnumQuestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionStatus[] | Prisma.ListEnumQuestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuestionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionStatusFilter<$PrismaModel>;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumImportBatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportBatchStatus | Prisma.EnumImportBatchStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ImportBatchStatus[] | Prisma.ListEnumImportBatchStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ImportBatchStatus[] | Prisma.ListEnumImportBatchStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumImportBatchStatusFilter<$PrismaModel> | $Enums.ImportBatchStatus;
};
export type NestedEnumImportBatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImportBatchStatus | Prisma.EnumImportBatchStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ImportBatchStatus[] | Prisma.ListEnumImportBatchStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ImportBatchStatus[] | Prisma.ListEnumImportBatchStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumImportBatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.ImportBatchStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumImportBatchStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumImportBatchStatusFilter<$PrismaModel>;
};
export type NestedEnumQuestionCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionCategory | Prisma.EnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    in?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumQuestionCategoryNullableFilter<$PrismaModel> | $Enums.QuestionCategory | null;
};
export type NestedEnumQuestionDifficultyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionDifficulty | Prisma.EnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    in?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumQuestionDifficultyNullableFilter<$PrismaModel> | $Enums.QuestionDifficulty | null;
};
export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type NestedEnumParsedQuestionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ParsedQuestionStatus | Prisma.EnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ParsedQuestionStatus[] | Prisma.ListEnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ParsedQuestionStatus[] | Prisma.ListEnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumParsedQuestionStatusFilter<$PrismaModel> | $Enums.ParsedQuestionStatus;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedJsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedEnumQuestionCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionCategory | Prisma.EnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    in?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.QuestionCategory[] | Prisma.ListEnumQuestionCategoryFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumQuestionCategoryNullableWithAggregatesFilter<$PrismaModel> | $Enums.QuestionCategory | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionCategoryNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionCategoryNullableFilter<$PrismaModel>;
};
export type NestedEnumQuestionDifficultyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionDifficulty | Prisma.EnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    in?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.QuestionDifficulty[] | Prisma.ListEnumQuestionDifficultyFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumQuestionDifficultyNullableWithAggregatesFilter<$PrismaModel> | $Enums.QuestionDifficulty | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionDifficultyNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionDifficultyNullableFilter<$PrismaModel>;
};
export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type NestedEnumParsedQuestionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ParsedQuestionStatus | Prisma.EnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ParsedQuestionStatus[] | Prisma.ListEnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ParsedQuestionStatus[] | Prisma.ListEnumParsedQuestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumParsedQuestionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ParsedQuestionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumParsedQuestionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumParsedQuestionStatusFilter<$PrismaModel>;
};
export type NestedEnumTryoutTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TryoutType | Prisma.EnumTryoutTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TryoutType[] | Prisma.ListEnumTryoutTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TryoutType[] | Prisma.ListEnumTryoutTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTryoutTypeFilter<$PrismaModel> | $Enums.TryoutType;
};
export type NestedEnumAccessTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessType | Prisma.EnumAccessTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AccessType[] | Prisma.ListEnumAccessTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccessType[] | Prisma.ListEnumAccessTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccessTypeFilter<$PrismaModel> | $Enums.AccessType;
};
export type NestedEnumTryoutStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TryoutStatus | Prisma.EnumTryoutStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TryoutStatus[] | Prisma.ListEnumTryoutStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TryoutStatus[] | Prisma.ListEnumTryoutStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTryoutStatusFilter<$PrismaModel> | $Enums.TryoutStatus;
};
export type NestedEnumTryoutTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TryoutType | Prisma.EnumTryoutTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TryoutType[] | Prisma.ListEnumTryoutTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TryoutType[] | Prisma.ListEnumTryoutTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTryoutTypeWithAggregatesFilter<$PrismaModel> | $Enums.TryoutType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTryoutTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTryoutTypeFilter<$PrismaModel>;
};
export type NestedEnumAccessTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessType | Prisma.EnumAccessTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AccessType[] | Prisma.ListEnumAccessTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccessType[] | Prisma.ListEnumAccessTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccessTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccessType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAccessTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAccessTypeFilter<$PrismaModel>;
};
export type NestedEnumTryoutStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TryoutStatus | Prisma.EnumTryoutStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TryoutStatus[] | Prisma.ListEnumTryoutStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TryoutStatus[] | Prisma.ListEnumTryoutStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTryoutStatusWithAggregatesFilter<$PrismaModel> | $Enums.TryoutStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTryoutStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTryoutStatusFilter<$PrismaModel>;
};
export type NestedEnumRandomizationModeFilter<$PrismaModel = never> = {
    equals?: $Enums.RandomizationMode | Prisma.EnumRandomizationModeFieldRefInput<$PrismaModel>;
    in?: $Enums.RandomizationMode[] | Prisma.ListEnumRandomizationModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RandomizationMode[] | Prisma.ListEnumRandomizationModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRandomizationModeFilter<$PrismaModel> | $Enums.RandomizationMode;
};
export type NestedEnumQuestionOrderModeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionOrderMode | Prisma.EnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionOrderMode[] | Prisma.ListEnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionOrderMode[] | Prisma.ListEnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionOrderModeFilter<$PrismaModel> | $Enums.QuestionOrderMode;
};
export type NestedEnumRandomizationModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RandomizationMode | Prisma.EnumRandomizationModeFieldRefInput<$PrismaModel>;
    in?: $Enums.RandomizationMode[] | Prisma.ListEnumRandomizationModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RandomizationMode[] | Prisma.ListEnumRandomizationModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRandomizationModeWithAggregatesFilter<$PrismaModel> | $Enums.RandomizationMode;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRandomizationModeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRandomizationModeFilter<$PrismaModel>;
};
export type NestedEnumQuestionOrderModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionOrderMode | Prisma.EnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionOrderMode[] | Prisma.ListEnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionOrderMode[] | Prisma.ListEnumQuestionOrderModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionOrderModeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionOrderMode;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionOrderModeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionOrderModeFilter<$PrismaModel>;
};
export type NestedEnumManualQuestionSetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ManualQuestionSetStatus | Prisma.EnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ManualQuestionSetStatus[] | Prisma.ListEnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ManualQuestionSetStatus[] | Prisma.ListEnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumManualQuestionSetStatusFilter<$PrismaModel> | $Enums.ManualQuestionSetStatus;
};
export type NestedEnumManualQuestionSetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ManualQuestionSetStatus | Prisma.EnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ManualQuestionSetStatus[] | Prisma.ListEnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ManualQuestionSetStatus[] | Prisma.ListEnumManualQuestionSetStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumManualQuestionSetStatusWithAggregatesFilter<$PrismaModel> | $Enums.ManualQuestionSetStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumManualQuestionSetStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumManualQuestionSetStatusFilter<$PrismaModel>;
};
export type NestedEnumExamSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamSessionStatus | Prisma.EnumExamSessionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExamSessionStatus[] | Prisma.ListEnumExamSessionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExamSessionStatus[] | Prisma.ListEnumExamSessionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExamSessionStatusFilter<$PrismaModel> | $Enums.ExamSessionStatus;
};
export type NestedEnumExamSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamSessionStatus | Prisma.EnumExamSessionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExamSessionStatus[] | Prisma.ListEnumExamSessionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExamSessionStatus[] | Prisma.ListEnumExamSessionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExamSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExamSessionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumExamSessionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumExamSessionStatusFilter<$PrismaModel>;
};
export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedBoolNullableFilter<$PrismaModel> | boolean | null;
};
export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolNullableFilter<$PrismaModel>;
};
export type NestedEnumExamIntegrityEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamIntegrityEventType | Prisma.EnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ExamIntegrityEventType[] | Prisma.ListEnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExamIntegrityEventType[] | Prisma.ListEnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExamIntegrityEventTypeFilter<$PrismaModel> | $Enums.ExamIntegrityEventType;
};
export type NestedEnumExamIntegrityEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamIntegrityEventType | Prisma.EnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ExamIntegrityEventType[] | Prisma.ListEnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExamIntegrityEventType[] | Prisma.ListEnumExamIntegrityEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExamIntegrityEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExamIntegrityEventType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumExamIntegrityEventTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumExamIntegrityEventTypeFilter<$PrismaModel>;
};
export type NestedEnumAIRecommendationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AIRecommendationStatus | Prisma.EnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AIRecommendationStatus[] | Prisma.ListEnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AIRecommendationStatus[] | Prisma.ListEnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAIRecommendationStatusFilter<$PrismaModel> | $Enums.AIRecommendationStatus;
};
export type NestedEnumAIRecommendationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIRecommendationStatus | Prisma.EnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AIRecommendationStatus[] | Prisma.ListEnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AIRecommendationStatus[] | Prisma.ListEnumAIRecommendationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAIRecommendationStatusWithAggregatesFilter<$PrismaModel> | $Enums.AIRecommendationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAIRecommendationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAIRecommendationStatusFilter<$PrismaModel>;
};
export type NestedEnumPriorityLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityLevel | Prisma.EnumPriorityLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.PriorityLevel[] | Prisma.ListEnumPriorityLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PriorityLevel[] | Prisma.ListEnumPriorityLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPriorityLevelFilter<$PrismaModel> | $Enums.PriorityLevel;
};
export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NestedEnumReasonCodeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReasonCode | Prisma.EnumReasonCodeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReasonCode[] | Prisma.ListEnumReasonCodeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReasonCode[] | Prisma.ListEnumReasonCodeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReasonCodeFilter<$PrismaModel> | $Enums.ReasonCode;
};
export type NestedEnumTrendTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TrendType | Prisma.EnumTrendTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TrendType[] | Prisma.ListEnumTrendTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TrendType[] | Prisma.ListEnumTrendTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTrendTypeFilter<$PrismaModel> | $Enums.TrendType;
};
export type NestedEnumPriorityLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityLevel | Prisma.EnumPriorityLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.PriorityLevel[] | Prisma.ListEnumPriorityLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PriorityLevel[] | Prisma.ListEnumPriorityLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPriorityLevelWithAggregatesFilter<$PrismaModel> | $Enums.PriorityLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPriorityLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPriorityLevelFilter<$PrismaModel>;
};
export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type NestedEnumReasonCodeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReasonCode | Prisma.EnumReasonCodeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReasonCode[] | Prisma.ListEnumReasonCodeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReasonCode[] | Prisma.ListEnumReasonCodeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReasonCodeWithAggregatesFilter<$PrismaModel> | $Enums.ReasonCode;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReasonCodeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReasonCodeFilter<$PrismaModel>;
};
export type NestedEnumTrendTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrendType | Prisma.EnumTrendTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TrendType[] | Prisma.ListEnumTrendTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TrendType[] | Prisma.ListEnumTrendTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTrendTypeWithAggregatesFilter<$PrismaModel> | $Enums.TrendType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTrendTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTrendTypeFilter<$PrismaModel>;
};
export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | Prisma.EnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus;
};
export type NestedEnumActivationSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivationSource | Prisma.EnumActivationSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivationSource[] | Prisma.ListEnumActivationSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivationSource[] | Prisma.ListEnumActivationSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivationSourceFilter<$PrismaModel> | $Enums.ActivationSource;
};
export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | Prisma.EnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel>;
};
export type NestedEnumActivationSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivationSource | Prisma.EnumActivationSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivationSource[] | Prisma.ListEnumActivationSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivationSource[] | Prisma.ListEnumActivationSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivationSourceWithAggregatesFilter<$PrismaModel> | $Enums.ActivationSource;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivationSourceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivationSourceFilter<$PrismaModel>;
};
export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
};
export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
};
