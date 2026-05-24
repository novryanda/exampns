---
inclusion: fileMatch
fileMatchPattern: "**/ARCHITECTURE*,**/ADR*,**/docs/architecture*,**/design*"
---

# Architecture Decision Framework

"Requirements drive architecture. Trade-offs inform decisions. ADRs capture rationale."

## Core Principle
**"Simplicity is the ultimate sophistication."**
- Start simple, add complexity ONLY when proven necessary
- You can always add patterns later
- Removing complexity is MUCH harder than adding it

## Context Discovery Questions
1. Apa tujuan utama sistem ini?
2. Siapa pengguna dan berapa skala yang diharapkan?
3. Apa constraint utama (budget, timeline, team size)?
4. Apa yang paling penting: performance, maintainability, atau time-to-market?
5. Apakah ada sistem existing yang harus diintegrasikan?

## Pattern Selection Decision Tree
```
Scale & Complexity:
├── Simple app, 1-2 devs → Monolith
├── Growing team, clear domains → Modular Monolith
├── Large scale, independent deploy → Microservices
├── Event-driven, async → Event Sourcing / CQRS
└── Real-time, collaborative → WebSocket + CRDT
```

## Trade-off Analysis Framework
| Factor | Option A | Option B |
|--------|----------|----------|
| Performance | ? | ? |
| Complexity | ? | ? |
| Team expertise | ? | ? |
| Time to market | ? | ? |
| Scalability | ? | ? |
| Maintainability | ? | ? |

## ADR Template
```markdown
# ADR-XXX: [Title]
## Status: [Proposed|Accepted|Deprecated]
## Context: [Why this decision is needed]
## Decision: [What we decided]
## Consequences: [Trade-offs accepted]
```

## Validation Checklist
- [ ] Requirements clearly understood
- [ ] Constraints identified
- [ ] Each decision has trade-off analysis
- [ ] Simpler alternatives considered
- [ ] ADRs written for significant decisions
- [ ] Team expertise matches chosen patterns

#[[file:skill/architecture/pattern-selection.md]]
#[[file:skill/architecture/trade-off-analysis.md]]
#[[file:skill/architecture/patterns-reference.md]]
