import { BadRequestException, ConflictException } from '@nestjs/common';
import {
  QuestionOrderMode,
  RandomizationMode,
  TryoutType,
} from '../../generated/prisma/client.js';
import {
  assertGenerationRuleRules,
  assertManualQuestionSetRules,
} from './tryout-management.rules.js';

describe('TryoutManagement rules', () => {
  it('rejects generation rule when section totals do not match totalQuestions', () => {
    expect(() =>
      assertGenerationRuleRules(
        { totalQuestions: 10, tryoutType: TryoutType.generated },
        {
          randomizationMode: RandomizationMode.random_by_category,
          questionOrderMode: QuestionOrderMode.category_order,
          avoidRecentQuestions: false,
          avoidRecentExamCount: 0,
          sections: [
            {
              categoryCode: 'TWK',
              questionCount: 4,
            },
            {
              categoryCode: 'TIU',
              questionCount: 4,
            },
          ],
        },
      ),
    ).toThrow(BadRequestException);
  });

  it('rejects duplicate question ids in manual question set', () => {
    expect(() =>
      assertManualQuestionSetRules(
        { totalQuestions: 5, tryoutType: TryoutType.generated },
        {
          status: 'draft',
          questionIds: ['a', 'a'],
        },
      ),
    ).toThrow(ConflictException);
  });
});
