# SealUI Tokens

> Design token source of truth for the SealUI system — generates CSS, TypeScript, Tailwind, and Dart outputs from a single W3C DTCG token set.

[![License](https://img.shields.io/badge/license-MIT-32b88c)](./LICENSE)
[![Style Dictionary](https://img.shields.io/badge/Style_Dictionary-v4-7c3aed)](https://styledictionary.com)
[![Build](https://github.com/nayadev/seal_ui_tokens/actions/workflows/build.yml/badge.svg)](https://github.com/nayadev/seal_ui_tokens/actions/workflows/build.yml)

---

## Overview

SealUI Tokens is the single source of truth for all design decisions in the SealUI system. Token definitions are written once in [W3C DTCG](https://tr.designtokens.org/format/) JSON format and compiled by [Style Dictionary v4](https://styledictionary.com) into platform-specific outputs consumed by both the React and Flutter implementations.

Generated build artifacts are committed to git so consumers can depend on this repository directly without running the build themselves.

### Architecture

```
seal_ui_tokens  (this repo)
    │
    ├── build/react/    ──►  seal_ui_react   (npm git dependency)
    └── build/flutter/  ──►  seal_ui_flutter (pub git dependency)
```

Tokens are the single source of truth. Both the React and Flutter implementations consume them independently, ensuring visual consistency across platforms.

---

## Getting Started

### Consuming in React

Add to `package.json`:

```json
{
  "dependencies": {
    "@sealui/tokens": "github:nayadev/seal_ui_tokens#main"
  }
}
```

Then import:

```ts
// CSS custom properties (in your root CSS or entry file)
import '@sealui/tokens/css/base';
import '@sealui/tokens/css/themes/nebula-dark.css';

// TypeScript/JS constants
import { dimensionMd, styleBody } from '@sealui/tokens';

// Tailwind theme extension
import sealTokensTailwind from '@sealui/tokens/tailwind';
// tailwind.config.ts → theme: { extend: sealTokensTailwind }
```

### Consuming in Flutter

Add to `pubspec.yaml`:

```yaml
dependencies:
  seal_ui_tokens:
    git:
      url: https://github.com/nayadev/seal_ui_tokens.git
      path: build/flutter
      ref: main
```

Then import:

```dart
import 'package:seal_ui_tokens/seal_ui_tokens.dart';

final color = SealArcticLightTokens.brandPrimary; // Color(0xFF29B6F6)
final spacing = SealBaseTokens.dimensionMd;        // 16.0
```

---

## Token Categories

Token definitions live in `tokens/` and are organized into three layers. Style Dictionary compiles all layers together and writes platform-specific output files.

### Base tokens

Primitive values shared across all themes and modes. These are building blocks — they are not used directly in components.

| File | Category | Contents |
| ---- | -------- | -------- |
| `base/colors.json` | Color primitives | Raw color values: white, black, transparent, and semantic primitives (red, teal, orange, indigo, pink) |
| `base/dimensions.json` | Spacing scale | 9-step scale with a 4px base unit: `xxxs` (2px) → `xxxl` (64px). Responsive — multiplied by a scale factor at runtime (mobile ×1.0, tablet ×1.125, desktop ×1.333) |
| `base/radius.json` | Border-radius scale | 7-step scale: `none` (0px) → `full` (9999px — pill shape) |
| `base/state-colors.json` | State opacity | `disabled-opacity: 0.4` — the alpha multiplier applied to produce disabled color variants |

### Global tokens

Theme-independent tokens that apply across all themes.

| File | Category | Contents |
| ---- | -------- | -------- |
| `global/typography.json` | Typography | Font family (Inter via Google Fonts), layout constants (line-height multiplier, body/small font sizes, button icon size), and 13 named text styles: `display`, `headline`, `heading`, `title`, `subtitle`, `body-large`, `lead`, `body`, `small`, `caption`, `blockquote`, `table`, `list` |

### Theme tokens

Four themes, each with `dark` and `light` variants — 8 sets total. Each set contains two files:

| File | Category | Contents |
| ---- | -------- | -------- |
| `{theme}/{mode}-color-palette.json` | Color palette | `brand` (primary, tint, shade), `accent` (accent, accent-secondary, on-accent), `surface` (background, surface, surface-alt), `text` (primary, secondary, on-primary), `border` (default), `semantic` (success, warning, error, info), `state` (foreground and fill active/disabled) |
| `{theme}/{mode}-gradients.json` | Gradients | `primary`, `accent`, `surface`, `surface-primary`, `surface-accent` — all linear gradients with two color stops |

Available themes: `arctic`, `deep_ocean`, `nebula`, `terminal`.

### Build outputs

| Output | Path | Format | Consumers |
| ------ | ---- | ------ | --------- |
| CSS custom properties | `build/react/src/css/base.css` | CSS (`:root` block) | React |
| CSS theme classes | `build/react/src/css/themes/*.css` | CSS (e.g. `.nebula-dark { ... }`) | React |
| TypeScript/JS constants | `build/react/src/index.ts` | Named exports | React |
| Tailwind config | `build/react/src/tailwind/index.ts` | `theme.extend` object | React |
| Dart classes | `build/flutter/lib/src/` | Dart classes (`SealBaseTokens`, `Seal<Theme><Mode>Tokens`) | Flutter |

---

## Commands

| Command | Purpose |
| ------- | ------- |
| `npm run build` | Build all platforms (React + Flutter) |
| `npm run build:react` | Build React outputs only |
| `npm run build:flutter` | Build Flutter outputs only |
| `npm run clean` | Remove all generated files |

---

## Quality & Tooling

### Style Dictionary

[Style Dictionary v4](https://styledictionary.com) reads all JSON files from `tokens/`, applies platform-specific transforms, and writes output files to `build/`. Configuration lives in `sd.config.js`.

Token JSON files follow the [W3C DTCG format](https://tr.designtokens.org/format/) — each token has `$value`, `$type`, and optional `$description` fields. This format is compatible with Figma Tokens, Token Studio, and similar design tooling.

### TypeScript build

The React output is bundled into ESM and CJS formats via [tsup](https://tsup.egoist.dev/), producing declaration files alongside the JS constants. This is handled automatically by `npm run build`.

### Committed artifacts

Generated files in `build/flutter/` and `build/react/src/` are committed to git. Consumers depend on this repository directly without running the build — this avoids publishing to npm or pub.dev and keeps the consumption model simple.

---

## Architecture Decisions

Architectural decisions are documented as ADRs in [`docs/adr/`](./docs/adr/). Recorded decisions:

- **ADR-0001** — Adopt shadcn as the cross-platform design system foundation for both React and Flutter.
- **ADR-0002** — Maintain a multirepo architecture (tokens, Flutter, React as separate repositories) over a monorepo.
- **ADR-0003** — Use Style Dictionary v4 with the W3C DTCG JSON format as the token standard.
- **ADR-0004** — Adopt Lucide Icons as the cross-platform icon library, with platform-specific packages on each side.

---

## CI/CD

### Build smoke test

Every push to `main` and every pull request triggers a build smoke test that runs `npm run build` and verifies that the key output files are present. This catches broken token definitions or transformer regressions before they reach consumers.

Workflow: `.github/workflows/build.yml`

---

## Related Packages

| Package | Description |
| ------- | ----------- |
| [`seal_ui_react`](https://github.com/nayadev/seal_ui_react) | React implementation of SealUI — token-driven components built on shadcn/ui |
| [`seal_ui_flutter`](https://github.com/nayadev/seal_ui_flutter) | Flutter implementation of SealUI — token-driven components built on shadcn_ui |

---

## License

MIT
