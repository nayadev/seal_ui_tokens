import StyleDictionary from 'style-dictionary'
import { readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToFlutterColor(hex) {
  const h = hex.replace('#', '')
  if (h.length === 8) {
    const r = h.slice(0, 2)
    const g = h.slice(2, 4)
    const b = h.slice(4, 6)
    const a = h.slice(6, 8)
    return `Color(0x${a.toUpperCase()}${r.toUpperCase()}${g.toUpperCase()}${b.toUpperCase()})`
  }
  return `Color(0xFF${h.toUpperCase()})`
}

function pxToDouble(val) {
  if (typeof val === 'string') return parseFloat(val.replace('px', ''))
  return val
}

function gradientToCss(val) {
  if (!val || !val.stops) return ''
  const dirMap = {
    'top-left': 'to bottom right',
    'top-right': 'to bottom left',
    'bottom-left': 'to top right',
    'bottom-right': 'to top left',
    top: 'to bottom',
    bottom: 'to top',
    left: 'to right',
    right: 'to left',
  }
  const dir = (val.direction && dirMap[val.direction.from]) || 'to bottom right'
  const stops = val.stops.map((s) => `${s.color} ${Math.round(s.position * 100)}%`).join(', ')
  return `linear-gradient(${dir}, ${stops})`
}

function toPascalCase(str) {
  return str
    .replace(/([-_])(.)/g, (_, __, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase())
}

function toCamelCase(str) {
  return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase())
}

function tokenType(token) {
  return token.type ?? token.$type
}

function tokenValue(token) {
  return token.value ?? token.$value
}

// Flutter Alignment mapping (summary A4 + Note 2)
const alignmentMap = {
  'top-left': 'Alignment.topLeft',
  'top-right': 'Alignment.topRight',
  'bottom-left': 'Alignment.bottomLeft',
  'bottom-right': 'Alignment.bottomRight',
  top: 'Alignment.topCenter',
  bottom: 'Alignment.bottomCenter',
  'center-left': 'Alignment.centerLeft',
  'center-right': 'Alignment.centerRight',
  center: 'Alignment.center',
}

// Ensures a number is serialized as a Dart double literal (e.g. 1 → 1.0)
function dartDouble(n) {
  const f = Number(n)
  return Number.isInteger(f) ? `${f}.0` : String(f)
}

function serializeGradientDart(name, val) {
  if (!val || !val.stops) return [`  // gradient: ${name} (missing stops)`]
  const begin = alignmentMap[val.direction?.from] ?? 'Alignment.topLeft'
  const end = alignmentMap[val.direction?.to] ?? 'Alignment.bottomRight'
  const colors = val.stops.map((s) => `      ${hexToFlutterColor(s.color)},`)
  const stops = val.stops.map((s) => `      ${dartDouble(s.position)},`)
  return [
    `  static const LinearGradient ${name} = LinearGradient(`,
    `    begin: ${begin},`,
    `    end: ${end},`,
    `    colors: [`,
    ...colors,
    `    ],`,
    `    stops: [`,
    ...stops,
    `    ],`,
    `  );`,
  ]
}

function serializeTypographyDart(name, val) {
  if (!val || typeof val !== 'object') return [`  // typography: ${name}`]
  const props = []
  if (val.fontFamily !== undefined) props.push(`    fontFamily: '${val.fontFamily}',`)
  if (val.fontSize !== undefined)
    props.push(`    fontSize: ${dartDouble(pxToDouble(String(val.fontSize)))},`)
  if (val.fontWeight !== undefined) props.push(`    fontWeight: FontWeight.w${val.fontWeight},`)
  if (val.letterSpacing !== undefined)
    props.push(`    letterSpacing: ${dartDouble(pxToDouble(String(val.letterSpacing)))},`)
  if (val.lineHeight !== undefined) props.push(`    height: ${dartDouble(val.lineHeight)},`)
  if (val.fontStyle === 'italic') props.push(`    fontStyle: FontStyle.italic,`)
  return [`  static const TextStyle ${name} = TextStyle(`, ...props, `  );`]
}

// ─── Custom Transforms ────────────────────────────────────────────────────────

StyleDictionary.registerTransform({
  name: 'color/flutter-hex',
  type: 'value',
  filter: (token) => tokenType(token) === 'color',
  transform: (token) => hexToFlutterColor(String(tokenValue(token))),
})

StyleDictionary.registerTransform({
  name: 'size/flutter-double',
  type: 'value',
  filter: (token) => ['dimension', 'fontSize'].includes(tokenType(token)),
  transform: (token) => pxToDouble(tokenValue(token)),
})

StyleDictionary.registerTransform({
  name: 'gradient/css-string',
  type: 'value',
  filter: (token) => tokenType(token) === 'gradient',
  transform: (token) => gradientToCss(tokenValue(token)),
})

StyleDictionary.registerTransformGroup({
  name: 'seal/flutter',
  transforms: ['attribute/cti', 'name/camel', 'color/flutter-hex', 'size/flutter-double'],
})

StyleDictionary.registerTransformGroup({
  name: 'seal/css',
  transforms: ['attribute/cti', 'name/kebab', 'color/css', 'size/px', 'gradient/css-string'],
})

StyleDictionary.registerTransformGroup({
  name: 'seal/js',
  transforms: ['attribute/cti', 'name/camel', 'color/css', 'size/px', 'gradient/css-string'],
})

// ─── Custom Formats ───────────────────────────────────────────────────────────

StyleDictionary.registerFormat({
  name: 'dart/tokens-class',
  format: ({ dictionary, file }) => {
    const className = file.className || 'SealTokens'
    const lines = [
      '// AUTO-GENERATED — DO NOT EDIT',
      '// ignore_for_file: constant_identifier_names',
      "import 'package:flutter/painting.dart';",
      '',
      '// ignore: avoid_classes_with_only_static_members',
      `class ${className} {`,
      `  ${className}._();`,
      '',
    ]

    for (const token of dictionary.allTokens) {
      const name = token.name
      const type = tokenType(token)
      const val = tokenValue(token)

      if (type === 'color') {
        lines.push(`  static const Color ${name} = ${val};`)
      } else if (type === 'dimension' || type === 'fontSize') {
        lines.push(`  static const double ${name} = ${val};`)
      } else if (type === 'number') {
        lines.push(`  static const double ${name} = ${val};`)
      } else if (type === 'fontFamily') {
        lines.push(`  static const String ${name} = '${val}';`)
      } else if (type === 'gradient') {
        lines.push(...serializeGradientDart(name, val))
      } else if (type === 'typography') {
        lines.push(...serializeTypographyDart(name, val))
      } else {
        lines.push(`  static const String ${name} = ${JSON.stringify(String(val))};`)
      }
    }

    lines.push('}')
    return lines.join('\n') + '\n'
  },
})

StyleDictionary.registerFormat({
  name: 'css/seal-variables',
  format: ({ dictionary, file }) => {
    const selector = file.selector || ':root'
    const lines = [`${selector} {`]

    for (const token of dictionary.allTokens) {
      const name = token.name
      const type = tokenType(token)
      const val = tokenValue(token)

      if (type === 'typography' && val && typeof val === 'object') {
        for (const [k, v] of Object.entries(val)) {
          const propKey = k.replace(/([A-Z])/g, '-$1').toLowerCase()
          lines.push(`  --seal-${name}-${propKey}: ${v};`)
        }
      } else {
        lines.push(`  --seal-${name}: ${val};`)
      }
    }

    lines.push('}')
    return lines.join('\n') + '\n'
  },
})

StyleDictionary.registerFormat({
  name: 'typescript/seal-constants',
  format: ({ dictionary }) => {
    const lines = ['// AUTO-GENERATED — DO NOT EDIT', '']

    for (const token of dictionary.allTokens) {
      const name = toCamelCase(token.name)
      const type = tokenType(token)
      const val = tokenValue(token)

      if (type === 'typography' && val && typeof val === 'object') {
        const obj = JSON.stringify(val)
        lines.push(`export const ${name} = ${obj} as const;`)
      } else if (type === 'number') {
        lines.push(`export const ${name} = ${val};`)
      } else {
        const serialized = typeof val === 'string' ? `'${val.replace(/'/g, "\\'")}'` : val
        lines.push(`export const ${name} = ${serialized};`)
      }
    }

    return lines.join('\n') + '\n'
  },
})

StyleDictionary.registerFormat({
  name: 'tailwind/seal-theme',
  format: ({ dictionary }) => {
    const colors = {}
    const spacing = {}
    const borderRadius = {}
    const fontFamily = {}
    const fontSize = {}
    const fontWeight = {}

    for (const token of dictionary.allTokens) {
      const name = token.name // kebab from seal/css group
      const type = tokenType(token)
      const val = tokenValue(token)

      if (type === 'color') {
        colors[name] = val
      } else if (type === 'dimension') {
        if (name.startsWith('radius')) {
          borderRadius[name.replace(/^radius-?/, '') || name] = val
        } else {
          spacing[name] = val
        }
      } else if (type === 'fontFamily') {
        fontFamily[name] = [String(val)]
      } else if (type === 'fontSize') {
        fontSize[name] = val
      } else if (type === 'typography' && val && typeof val === 'object') {
        if (val.fontWeight !== undefined) fontWeight[name] = String(val.fontWeight)
        if (val.fontSize !== undefined) fontSize[name] = val.fontSize
      }
    }

    const theme = { colors, spacing, borderRadius, fontFamily, fontSize, fontWeight }

    return (
      [
        '// AUTO-GENERATED — DO NOT EDIT',
        '',
        `export const sealTokensTailwind = ${JSON.stringify(theme, null, 2)} as const;`,
        '',
        'export default sealTokensTailwind;',
      ].join('\n') + '\n'
    )
  },
})

// ─── Build Functions ──────────────────────────────────────────────────────────

async function buildBase() {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: ['tokens/base/**/*.json', 'tokens/global/**/*.json'],
    platforms: {
      flutter: {
        transformGroup: 'seal/flutter',
        buildPath: 'build/flutter/lib/src/base/',
        files: [
          {
            destination: 'tokens.dart',
            format: 'dart/tokens-class',
            className: 'SealBaseTokens',
          },
        ],
      },
      react_css: {
        transformGroup: 'seal/css',
        buildPath: 'build/react/src/css/',
        files: [
          {
            destination: 'base.css',
            format: 'css/seal-variables',
            selector: ':root',
          },
        ],
      },
      react_ts: {
        transformGroup: 'seal/js',
        buildPath: 'build/react/src/',
        files: [
          {
            destination: 'index.ts',
            format: 'typescript/seal-constants',
          },
        ],
      },
      react_tailwind: {
        transformGroup: 'seal/css',
        buildPath: 'build/react/src/tailwind/',
        files: [
          {
            destination: 'index.ts',
            format: 'tailwind/seal-theme',
          },
        ],
      },
    },
  })
  await sd.buildAllPlatforms()
}

async function buildTheme(theme, mode) {
  const palette = `tokens/themes/${theme}/${mode}-color-palette.json`
  const gradients = `tokens/themes/${theme}/${mode}-gradients.json`
  const sources = [palette, gradients].filter((f) => existsSync(f))
  if (!sources.length) return

  const themeSlug = `${theme.replace(/_/g, '-')}-${mode}`
  const dartClass = `Seal${toPascalCase(theme)}${toPascalCase(mode)}Tokens`

  const sd = new StyleDictionary({
    usesDtcg: true,
    source: sources,
    platforms: {
      flutter: {
        transformGroup: 'seal/flutter',
        buildPath: `build/flutter/lib/src/themes/${theme}/`,
        files: [
          {
            destination: `${mode}.dart`,
            format: 'dart/tokens-class',
            className: dartClass,
          },
        ],
      },
      react_css: {
        transformGroup: 'seal/css',
        buildPath: 'build/react/src/css/themes/',
        files: [
          {
            destination: `${themeSlug}.css`,
            format: 'css/seal-variables',
            selector: `.${themeSlug}`,
          },
        ],
      },
    },
  })
  await sd.buildAllPlatforms()
}

async function writeFlutterBarrel(themes) {
  const exports = [`export 'src/base/tokens.dart';`]
  for (const theme of themes) {
    for (const mode of ['light', 'dark']) {
      if (existsSync(`tokens/themes/${theme}/${mode}-color-palette.json`)) {
        exports.push(`export 'src/themes/${theme}/${mode}.dart';`)
      }
    }
  }
  const content = `// AUTO-GENERATED — DO NOT EDIT\nlibrary seal_ui_tokens;\n\n${exports.join('\n')}\n`
  mkdirSync('build/flutter/lib', { recursive: true })
  writeFileSync('build/flutter/lib/seal_ui_tokens.dart', content)
  console.log('✓ build/flutter/lib/seal_ui_tokens.dart')
}

async function writeFlutterPubspec() {
  const content = `name: seal_ui_tokens
description: Design tokens for the SealUI design system.
version: 0.0.1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
`
  mkdirSync('build/flutter', { recursive: true })
  writeFileSync('build/flutter/pubspec.yaml', content)
  console.log('✓ build/flutter/pubspec.yaml')
}

async function writeReactPackageJson() {
  const pkg = {
    name: '@sealui/tokens',
    version: '0.0.1',
    description: 'Design tokens for the SealUI design system.',
    main: 'dist/index.js',
    module: 'dist/index.mjs',
    types: 'dist/index.d.ts',
    exports: {
      '.': {
        import: './dist/index.mjs',
        require: './dist/index.js',
        types: './dist/index.d.ts',
      },
      './css/base': './src/css/base.css',
      './css/themes/*': './src/css/themes/*.css',
      './tailwind': {
        import: './dist/tailwind/index.mjs',
        require: './dist/tailwind/index.js',
        types: './dist/tailwind/index.d.ts',
      },
    },
    scripts: {
      build: 'tsup src/index.ts src/tailwind/index.ts --format esm,cjs --dts --out-dir dist',
    },
    sideEffects: ['**/*.css'],
    devDependencies: {
      tsup: '*',
      typescript: '*',
    },
  }
  mkdirSync('build/react', { recursive: true })
  writeFileSync('build/react/package.json', JSON.stringify(pkg, null, 2) + '\n')
  console.log('✓ build/react/package.json')
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const themes = readdirSync('tokens/themes', { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

const args = process.argv.slice(2)
const platformFilter = args.find((a) => a.startsWith('--platform=') || a === '--platform')
  ? (args[args.indexOf('--platform') + 1] ??
    args.find((a) => a.startsWith('--platform='))?.split('=')[1])
  : null

async function main() {
  const runFlutter = !platformFilter || platformFilter === 'flutter'
  const runReact = !platformFilter || platformFilter === 'react'

  console.log(`Building themes: ${themes.join(', ')}`)

  await buildBase()

  for (const theme of themes) {
    for (const mode of ['light', 'dark']) {
      await buildTheme(theme, mode)
    }
  }

  if (runFlutter) {
    await writeFlutterBarrel(themes)
    await writeFlutterPubspec()
  }

  if (runReact) {
    await writeReactPackageJson()
  }

  console.log('\nBuild complete!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
