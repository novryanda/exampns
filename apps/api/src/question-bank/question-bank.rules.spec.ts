import { BadRequestException } from '@nestjs/common';
import { QuestionCategory } from '../../generated/prisma/client.js';
import { assertQuestionOptionRules } from './question-bank.rules.js';

describe('QuestionBank rules', () => {
  it('accepts TWK options with exactly one correct answer', () => {
    expect(() =>
      assertQuestionOptionRules(QuestionCategory.TWK, [
        { label: 'A', text: 'A', isCorrect: true },
        { label: 'B', text: 'B', isCorrect: false },
        { label: 'C', text: 'C', isCorrect: false },
        { label: 'D', text: 'D', isCorrect: false },
        { label: 'E', text: 'E', isCorrect: false },
      ]),
    ).not.toThrow();
  });

  it('rejects TKP options without tkpWeight', () => {
    expect(() =>
      assertQuestionOptionRules(QuestionCategory.TKP, [
        { label: 'A', text: 'A', tkpWeight: 5 },
        { label: 'B', text: 'B', tkpWeight: 4 },
        { label: 'C', text: 'C', tkpWeight: 3 },
        { label: 'D', text: 'D', tkpWeight: 2 },
        { label: 'E', text: 'E' },
      ]),
    ).toThrow(BadRequestException);
  });
});
