---
inclusion: manual
---

# Systematic Debugging Skill

4-phase systematic debugging methodology.

## Phase 1: Reproduce
- Exact steps to reproduce
- Expected vs actual result
- Reproduction rate (always/often/sometimes/rare)

## Phase 2: Isolate
- When did this start happening?
- What changed recently?
- Does it happen in all environments?
- What's the smallest change that triggers it?

## Phase 3: Understand (Root Cause)
### The 5 Whys
1. Why: [First observation]
2. Why: [Deeper reason]
3. Why: [Still deeper]
4. Why: [Getting closer]
5. Why: [Root cause]

## Phase 4: Fix & Verify
- [ ] Bug no longer reproduces
- [ ] Related functionality still works
- [ ] No new issues introduced
- [ ] Test added to prevent regression

## Anti-Patterns
- ❌ Random changes — "Maybe if I change this..."
- ❌ Ignoring evidence — "That can't be the cause"
- ❌ Assuming without proof
- ❌ Not reproducing first
- ❌ Stopping at symptoms, not finding root cause
