# seal_ui_tokens

Source of truth for design tokens in the **SealUI** design system. Reads JSON token files in [W3C DTCG](https://tr.designtokens.org/format/) format and generates platform-specific outputs via [Style Dictionary v4](https://styledictionary.com).

## Architecture

```
seal_ui_tokens  ←  this repo
    ├── build/flutter/  →  consumed by seal_ui_flutter (pub git dependency)
    └── build/react/    →  consumed by seal_ui_react (npm git dependency)
```

## Running the build

```bash
npm install
npm run build          # build all platforms
npm run build:flutter  # flutter only
npm run build:react    # react only
npm run clean          # remove generated files
```

Generated files in `build/flutter/` and `build/react/src/` are **committed to git** so that consumers can depend on this repo directly without running the build themselves.

## Consuming in Flutter

In `pubspec.yaml`:

```yaml
dependencies:
  seal_ui_tokens:
    git:
      url: https://github.com/naya-rangel/seal_ui_tokens.git
      path: build/flutter
```

Then import:

```dart
import 'package:seal_ui_tokens/seal_ui_tokens.dart';

final color = SealArcticLightTokens.brandPrimary; // Color(0xFF29B6F6)
final spacing = SealBaseTokens.dimensionMd;        // 16.0
```

## Consuming in React

In `package.json`:

```json
{
  "dependencies": {
    "@sealui/tokens": "github:naya-rangel/seal_ui_tokens#main"
  }
}
```

Then import:

```ts
// CSS variables (in your root CSS/entry file)
import '@sealui/tokens/css/base';
import '@sealui/tokens/css/themes/arctic-light.css';

// JS/TS constants
import { brandPrimary, dimensionMd } from '@sealui/tokens';

// Tailwind theme
import sealTokensTailwind from '@sealui/tokens/tailwind';
// tailwind.config.ts → theme: { extend: sealTokensTailwind }
```

## Folder structure

```
tokens/                     Source token JSONs (W3C DTCG format, $value / $type)
  base/                     Primitive tokens shared across all themes
    colors.json             Raw color primitives
    dimensions.json         Spacing scale (4px base unit)
    radius.json             Border-radius scale
    state-colors.json       State opacity constants
  global/                   Global tokens (not theme-specific)
    typography.json         Font family, sizes, and text style composites
  themes/                   One folder per theme, each with light + dark variants
    arctic/
    deep_ocean/
    nebula/
    terminal/

build/flutter/              Generated Dart package
  pubspec.yaml
  lib/
    seal_ui_tokens.dart     Barrel file — exports all generated Dart files
    src/
      base/tokens.dart      SealBaseTokens class
      themes/{theme}/       SealThemeModeTokens classes

build/react/                Generated TypeScript package
  package.json
  src/
    index.ts                Named JS/TS exports for all base + global tokens
    css/
      base.css              CSS custom properties for base + global tokens (:root)
      themes/               One CSS file per theme/mode (.arctic-light { ... })
    tailwind/
      index.ts              Tailwind theme.extend compatible object

sd.config.js                Style Dictionary v4 config — reads tokens/, writes build/
package.json                Build scripts and dependencies
```
