# ADR-0006 — Adopt Renovate Bot for automated dependency updates

## Version

1.0.0

## Date

2026-05-03

## Status

Accepted

## Context

Dependencies across the SealUI repositories (`seal_ui_tokens`, `seal_ui_react`, `seal_ui_flutter`) drift over time without a systematic update process. Manual dependency management at small team scale is error-prone: updates are batched infrequently, security patches are delayed, and changelogs are rarely reviewed before merging.

A dedicated dependency update tool reduces that toil by opening PRs automatically whenever upstream packages release new versions, providing context (changelog, release notes, breaking change indicators) directly in the PR description.

Alternative approaches considered:

- **Manual updates** — maintainer runs `npm outdated` / `flutter pub outdated` periodically and upgrades by hand. No overhead, but update cadence depends entirely on maintainer discipline and is the current status quo.
- **Dependabot** — native GitHub feature, zero infrastructure required. Opens individual PRs per package. Limited grouping support, no cross-ecosystem coordination, and weaker configuration expressiveness compared to Renovate.
- **Renovate (Community plan)** — free tier hosted by Mend. Highly configurable, supports grouping related updates, automerge rules, schedule windows, and all ecosystems used across the SealUI repos (npm, pub, GitHub Actions). Requires a `renovate.json` config file per repository and opt-in via the Mend Renovate GitHub App.

## Decision

We will adopt Renovate Bot on the **Mend Community (free) plan** for all SealUI repositories. The GitHub App is installed at the organisation/user level and applies to all current and future repositories.

Configuration is managed through the following settings in the Mend dashboard:

| Setting               | Value    |
| --------------------- | -------- |
| Dependency Updates    | Enabled  |
| Silent mode           | Disabled |
| Automated PRs         | Enabled  |
| Require config file   | Enabled  |
| Create onboarding PRs | Enabled  |

Key implications of this configuration:

- **Require config file** — Renovate only activates on a repository once a `renovate.json` file is committed to its default branch. This prevents unsolicited PRs on repositories not yet ready for automated updates.
- **Create onboarding PRs** — when Renovate detects a repository without a `renovate.json`, it opens an onboarding PR proposing a baseline config. The maintainer reviews and merges to activate Renovate for that repo.
- **Silent mode off** — Renovate opens real PRs rather than just logging what it would do, enabling the actual dependency update workflow.
- **Automated PRs on** — Renovate creates PRs on its scheduled cadence without requiring manual triggers.

Each repository is responsible for its own `renovate.json` to tune grouping, automerge rules, and schedule to its specific ecosystem and release cadence.

## Consequences

Dependency PRs will be created automatically across all SealUI repositories, keeping the dependency graph current and surfacing security patches promptly. Maintainers review and merge Renovate PRs like any other PR; CI must pass before merging. The `renovate.json` requirement acts as an explicit opt-in gate per repository, so no repo receives unsolicited changes. The Community plan is free with no SLA; if rate limits or plan restrictions become a constraint, migration to a self-hosted Renovate instance is a viable upgrade path without changing the `renovate.json` configs.
