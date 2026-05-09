# ADR-0003 — Use Style Dictionary v4 with W3C DTCG format

## Version

1.0.0

## Date

2026-03-07

## Status

Superseded by [ADR-0007](0007-upgrade-style-dictionary-v5.md)

## Context

The SealUI design system needs a single source of truth for design tokens that can generate outputs for both Flutter (Dart) and React (TypeScript/CSS/Tailwind) platforms. Manual token management or custom scripts would lead to inconsistencies, duplication of effort, and maintenance overhead. The token format must be interoperable with design tools and follow industry standards to ensure smooth workflows between designers and developers.

## Decision

We will use Style Dictionary v4 with the W3C Design Tokens Community Group (DTCG) JSON format as our token standard. Specifically:

- **Style Dictionary v4** over v3 for improved TypeScript support, better performance, and active maintenance
- **W3C DTCG format** (using `$value` and `$type` properties) over legacy Style Dictionary format for:
  - Standardization and tool interoperability (Figma Tokens, Token Studio, etc.)
  - Clear separation of token metadata from values
  - Future-proofing as the industry converges on this format

All token JSON files in the `tokens/` directory follow the DTCG format where each token has:

- `$value`: The actual token value (color, size, etc.)
- `$type`: The token category (color, dimension, typography, etc.)
- Optional `$description`: Documentation for the token

## Consequences

**Positive:**

- Single source of truth for all design tokens
- Automatic generation of platform-specific outputs (Dart, TypeScript, CSS, Tailwind)
- Interoperability with design tools that support W3C DTCG format
- Consistent token naming and structure across platforms
- Leveraging Style Dictionary's mature ecosystem of transforms and formats
- Clear separation between token definitions and platform-specific implementations

**Negative:**

- Build step required before consuming tokens (mitigated by committing generated files)
- Learning curve for Style Dictionary configuration
- Generated files must be regenerated when tokens change (addressed by commit workflow)
- Dependency on Style Dictionary and its maintenance

**Implementation Note:**
Generated files in `build/flutter/` and `build/react/` are committed to git so consumers can depend on this repo directly without running the build themselves. npm/pub.dev publication is under consideration but does not affect this decision.
