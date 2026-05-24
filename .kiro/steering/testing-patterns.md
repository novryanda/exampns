---
inclusion: fileMatch
fileMatchPattern: "**/*.test.*,**/*.spec.*,**/__tests__/**,**/test/**,**/tests/**,**/*.e2e.*"
---

# Testing Patterns Skill

Principles for reliable test suites.

## Testing Pyramid
```
    E2E (Few) — Critical user flows
  Integration (Some) — API, DB queries
Unit (Many) — Functions, logic, classes
```

## AAA Pattern
1. **Arrange** — Set up test data
2. **Act** — Execute code under test
3. **Assert** — Verify outcome

## Test Type Selection
| Type | Best For | Speed |
|------|----------|-------|
| Unit | Pure functions, logic | Fast (<50ms) |
| Integration | API, DB, services | Medium |
| E2E | Critical user flows | Slow |

## What to Test
| Test | Don't Test |
|------|------------|
| Business logic | Framework code |
| Edge cases | Third-party libs |
| Error handling | Simple getters |
| Critical paths | Trivial code |

## Mocking Principles
| Mock | Don't Mock |
|------|------------|
| External APIs | The code under test |
| Database (unit) | Simple dependencies |
| Time/random | Pure functions |
| Network | In-memory stores |

## Naming Convention
- `should [behavior] when [condition]`
- `given [context], when [action], then [result]`

## Best Practices
- One assert per test (clear failure reason)
- Independent tests (no order dependency)
- Fast tests (run frequently)
- Descriptive names (self-documenting)
- Clean up (avoid side effects)
- Use factories for test data

## Anti-Patterns
| ❌ Don't | ✅ Do |
|----------|-------|
| Test implementation | Test behavior |
| Duplicate test code | Use factories |
| Complex test setup | Simplify or split |
| Ignore flaky tests | Fix root cause |
| Skip cleanup | Reset state |
