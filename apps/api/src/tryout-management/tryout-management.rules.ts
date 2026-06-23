import {
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import {
  QuestionOrderMode,
  RandomizationMode,
  TryoutStatus,
  TryoutType,
} from '../../generated/prisma/client.js';
import type {
  CreateTryoutCatalogInput,
  GenerationRuleInput,
  ManualQuestionSetInput,
  UpdateManualQuestionSetInput,
} from './tryout-management.schemas.js';

export const assertTryoutCatalogRules = (payload: CreateTryoutCatalogInput) => {
  if (payload.status !== TryoutStatus.draft) {
    throw new BadRequestException(
      'Tryout catalog must be created as draft before publish/archive actions',
    );
  }
};

export const assertGenerationRuleRules = (
  catalog: { totalQuestions: number; tryoutType: TryoutType },
  input: GenerationRuleInput,
) => {
  const categories = new Set(input.sections.map((section) => section.categoryCode));
  if (categories.size !== input.sections.length) {
    throw new ConflictException('Generation rule sections must use unique categories');
  }

  const totalSectionQuestions = input.sections.reduce(
    (sum, section) => sum + section.questionCount,
    0,
  );

  if (totalSectionQuestions !== catalog.totalQuestions) {
    throw new BadRequestException(
      'Generation rule question total must match tryout catalog totalQuestions',
    );
  }

  if (
    input.randomizationMode === RandomizationMode.manual_question_set ||
    input.randomizationMode === RandomizationMode.hybrid_manual_and_random
  ) {
    throw new BadRequestException(
      'Manual and hybrid randomization modes are no longer available',
    );
  }

  if (
    catalog.tryoutType === TryoutType.generated &&
    input.randomizationMode === RandomizationMode.adaptive_weak_area
  ) {
    throw new BadRequestException(
      'adaptive_weak_area randomization mode is only valid for adaptive tryout type',
    );
  }

  if (
    catalog.tryoutType === TryoutType.adaptive &&
    input.randomizationMode !== RandomizationMode.adaptive_weak_area
  ) {
    throw new BadRequestException(
      'Adaptive tryout must use adaptive_weak_area randomization mode',
    );
  }

  if (input.questionOrderMode === QuestionOrderMode.manual_order) {
    throw new BadRequestException(
      'manual_order question order is no longer available',
    );
  }

  for (const section of input.sections) {
    const difficultyTotal = section.difficultyDistribution
      ? Object.values(section.difficultyDistribution).reduce((sum, value) => sum + value, 0)
      : undefined;

    if (difficultyTotal !== undefined && difficultyTotal !== section.questionCount) {
      throw new BadRequestException(
        `Difficulty distribution total for category ${section.categoryCode} must equal questionCount`,
      );
    }

    const topicTotal = section.topicDistribution
      ? section.topicDistribution.reduce((sum, item) => sum + item.questionCount, 0)
      : undefined;

    if (topicTotal !== undefined && topicTotal > section.questionCount) {
      throw new BadRequestException(
        `Topic distribution total for category ${section.categoryCode} cannot exceed questionCount`,
      );
    }
  }
};

const assertQuestionIdsUnique = (questionIds: string[]) => {
  if (new Set(questionIds).size !== questionIds.length) {
    throw new ConflictException('Manual question set questionIds must be unique');
  }
};

export const assertManualQuestionSetRules = (
  catalog: { totalQuestions: number; tryoutType: TryoutType },
  input: ManualQuestionSetInput | UpdateManualQuestionSetInput,
) => {
  if (input.questionIds) {
    assertQuestionIdsUnique(input.questionIds);
  }

  if (input.questionIds && input.questionIds.length > catalog.totalQuestions) {
    throw new BadRequestException(
      'Manual question set cannot contain more questions than tryout catalog totalQuestions',
    );
  }
};
