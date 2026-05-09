# ADR-0007 — Upgrade Style Dictionary to v5

## Version

1.0.0

## Date

2026-05-09

## Status

Accepted

## Context

[ADR-0003](0003-style-dictionary-v4-with-dtcg-format.md) established Style Dictionary v4 as the build tool for design tokens. Style Dictionary v5 was released as a major version with breaking changes but also with improvements that are relevant to this project.

Breaking changes in v5 that were evaluated:

- Minimum Node.js version raised to v22.0.0
- Reference syntax locked to DTCG spec (no longer configurable)
- References to non-token leaf nodes are no longer allowed

## Decision

Upgrade Style Dictionary from `^4.3.3` to `^5.0.0`.

All breaking changes were verified against this codebase:

- The project already runs Node.js ≥22 in CI and locally
- No custom reference syntax was configured — the locked DTCG syntax has no impact
- Token files do not use references to non-leaf nodes — build output is identical to v4

## Consequences

**Positive:**

- Security fixes: vulnerabilities in bundled `glob` → `minimatch` and transitive `lodash` dependencies are resolved
- `patch-package` removed from the dependency tree (v5 no longer requires it)
- Support for DTCG v2025.10 features (structured color, dimension object values) available when needed

**Negative:**

- None identified — build output and public API are unchanged
