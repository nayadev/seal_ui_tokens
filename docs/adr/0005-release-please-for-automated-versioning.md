# ADR-0005 — Adopt release-please for automated versioning

## Version

1.0.0

## Date

2026-05-02

## Status

Accepted

## Context

The repository had no versioning or release automation. Tags and GitHub Releases would have to be created manually, which is error-prone and inconsistent at small team scale.

The project already enforces Conventional Commits via `commitlint`. This structured commit history is a reliable source of truth for determining version bumps and generating changelogs automatically, so a tool that reads commit types can remove any manual step from the release flow.

release-please is already adopted in both `seal_ui_react` (ADR-0006) and `seal_ui_flutter` (ADR-0004), making it the consistent versioning strategy across all SealUI repositories.

Alternative approaches considered:

- **Manual tagging** — full control, but requires the maintainer to remember to tag every release, calculate the correct semver bump, and write a CHANGELOG entry by hand.
- **semantic-release** — fully automated end-to-end; publishes on every qualifying commit to `main` with no human review step before the release.
- **Changesets** — requires contributors to author a changeset file per PR, which adds friction and does not leverage the existing Conventional Commits enforcement.
- **release-please** — reads Conventional Commits, opens a release PR with the generated CHANGELOG and proposed version bump, and only creates the tag and GitHub Release when the PR is merged. Releases happen on the maintainer's schedule, not automatically.

## Decision

We will use release-please (via the `googleapis/release-please-action` GitHub Action) as the versioning and release automation tool. The workflow:

1. On every push to `main`, release-please inspects commits since the last release and, if there are releasable changes, opens or updates a release PR with the calculated version bump and CHANGELOG entry.
2. The release PR stays open and accumulates changes until the maintainer merges it.
3. On merge of the release PR, release-please creates the git tag and GitHub Release automatically.

Configuration lives in `release-please-config.json` (release type `node`, `bump-minor-pre-major` and `bump-patch-for-minor-pre-major` enabled for the pre-1.0 phase) and `.release-please-manifest.json` (current version pointer).

## Consequences

No manual tagging or CHANGELOG maintenance is required. The release cadence remains under maintainer control — the release PR accumulates releasable commits and is merged when ready. Version bump type is inferred from commit types (`fix` → patch, `feat` → patch pre-1.0, `feat!` / `BREAKING CHANGE` → minor pre-1.0) rather than explicitly declared; this is acceptable given the commitlint enforcement already in place.
