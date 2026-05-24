---
inclusion: auto
---

# Clean Code Standards

Pragmatic coding standards — concise, direct, no over-engineering.

## Core Principles
| Principle | Rule |
|-----------|------|
| SRP | Single Responsibility - each function/class does ONE thing |
| DRY | Don't Repeat Yourself - extract duplicates |
| KISS | Keep It Simple - simplest solution that works |
| YAGNI | You Aren't Gonna Need It - don't build unused features |

## Naming Rules
| Element | Convention |
|---------|------------|
| Variables | Reveal intent: `userCount` not `n` |
| Functions | Verb + noun: `getUserById()` |
| Booleans | Question form: `isActive`, `hasPermission` |
| Constants | SCREAMING_SNAKE: `MAX_RETRY_COUNT` |

## Function Rules
- Max 20 lines, ideally 5-10
- Does one thing, does it well
- Max 3 arguments, prefer 0-2
- No unexpected side effects

## Code Structure
- Guard Clauses: early returns for edge cases
- Flat > Nested: max 2 levels deep
- Composition: small functions composed together
- Colocation: keep related code close

## Anti-Patterns
| ❌ Don't | ✅ Do |
|----------|-------|
| Comment every line | Self-documenting names |
| Helper for one-liner | Inline the code |
| Deep nesting | Guard clauses |
| Magic numbers | Named constants |
| God functions | Split by responsibility |
| utils.ts with 1 function | Put code where used |

## Before Editing ANY File
1. What imports this file? → They might break
2. What does this file import? → Interface changes
3. What tests cover this? → Tests might fail
4. Is this a shared component? → Multiple places affected

**Rule:** Edit the file + all dependent files in the SAME task.
