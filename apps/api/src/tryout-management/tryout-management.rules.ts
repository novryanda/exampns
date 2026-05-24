import {
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import {
  ManualQuestionSetStatus,
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
  if (payload.status === TryoutStatus.published || payload.status === TryoutStatus.archived) {
    throw new BadRequestException(
      'Tryout catalog must be created as draft or review before publish/archive actions',
    );
  }
};

export const assertGenerationRuleRules = (
  catalog: { totalQuestions: number; tryoutType: TryoutType },
  input: GenerationRuleInput,
) => {
  const categories = new Set(input.sections.map((section) => section.category));
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
    input.randomizationMode === RandomizationMode.manual_question_set &&
    catalog.tryoutType !== TryoutType.manual
  ) {
    throw new BadRequestException(
      'manual_question_set randomization mode is only valid for manual tryout type',
    );
  }

  if (
    input.questionOrderMode === QuestionOrderMode.manual_order &&
    input.randomizationMode !== RandomizationMode.manual_question_set
  ) {
    throw new BadRequestException(
      'manual_order question order requires manual_question_set randomization mode',
    );
  }

  for (const section of input.sections) {
    const difficultyTotal = section.difficultyDistribution
      ? Object.values(section.difficultyDistribution).reduce((sum, value) => sum + value, 0)
      : undefined;

    if (difficultyTotal !== undefined && difficultyTotal !== section.questionCount) {
      throw new BadRequestException(
        `Difficulty distribution total for category ${section.category} must equal questionCount`,
      );
    }

    const topicTotal = section.topicDistribution
      ? section.topicDistribution.reduce((sum, item) => sum + item.questionCount, 0)
      : undefined;

    if (topicTotal !== undefined && topicTotal > section.questionCount) {
      throw new BadRequestException(
        `Topic distribution total for category ${section.category} cannot exceed questionCount`,
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

  if (catalog.tryoutType === TryoutType.generated && input.status === ManualQuestionSetStatus.approved) {
    throw new BadRequestException(
      'Generated tryout catalog cannot approve manual question sets without hybrid/manual type',
    );
  }

  if (input.questionIds && input.questionIds.length > catalog.totalQuestions) {
    throw new BadRequestException(
      'Manual question set cannot contain more questions than tryout catalog totalQuestions',
    );
  }
};
