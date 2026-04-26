# ADR-0002 — Multirepo architecture over monorepo

## Version

1.0.0

## Date

2026-03-07

## Status

Accepted

## Context

The SealUI design system consists of three interrelated packages: token generation (`seal_ui_tokens`), Flutter components (`seal_ui_flutter`), and React components (`seal_ui_react`). Initially, managing these as separate repositories raises questions about development overhead, versioning complexity, and cross-repository changes. A monorepo approach (using tools like Melos for Flutter and npm workspaces for JavaScript) could simplify some aspects but introduces its own challenges, particularly for a portfolio project where teams and release cycles may differ.

## Decision

We will maintain a multirepo architecture with three separate repositories:
- `seal_ui_tokens`: Source of truth for design tokens
- `seal_ui_flutter`: Flutter component library consuming tokens
- `seal_ui_react`: React component library consuming tokens

This approach provides:
- Independent versioning for each package
- Focused git history per repository
- Ability to publish and consume each package independently
- Simplified tooling (no need to reconcile Melos with npm workspaces)
- Clear boundaries between concerns

## Consequences

**Positive:**
- Independent release cycles for tokens, Flutter, and React packages
- Simplified development workflows with focused repositories
- Easier to understand contribution paths for newcomers
- No complex monorepo tooling configuration to maintain
- Each repo can opt into different publishing strategies

**Negative:**
- Cross-repository changes require coordinated commits across multiple repos
- Duplication of common configurations (linting, testing, etc.)
- Slightly more complex dependency management when consuming
- Need to publish/update multiple repos for synchronized releases

**Current Status:**
All packages are currently consumed via git references:
- `seal_ui_tokens` via git subpath in `pubspec.yaml` and package.json
- `seal_ui_flutter` via git dependency in `pubspec.yaml`
- `seal_ui_react` via git dependency in package.json
NPM/Pub.dev publication is being considered but is not a current constraint driving architecture decisions.