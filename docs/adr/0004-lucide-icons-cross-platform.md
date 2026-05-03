# ADR-0004 — Adopt Lucide Icons as the cross-platform icon library

## Version

1.0.0

## Date

2026-03-07

## Status

Accepted

## Context

The SealUI design system requires a consistent icon vocabulary across Flutter and React platforms to ensure visual parity in user interfaces. Without a shared icon set, platforms would inevitably diverge in iconography, leading to inconsistent user experiences. The challenge is selecting an icon library that provides: comprehensive coverage of common UI icons, consistent visual style, active maintenance, and platform-specific implementations that feel native to each ecosystem.

## Decision

We will adopt Lucide Icons as our cross-platform icon library with platform-specific implementations:

- **React**: `lucide-react` package
- **Flutter**: `lucide_icons_flutter` package

Both packages provide access to the same Lucide icon set, ensuring visual consistency. We do not use a generic abstraction layer (`SealIcon`) because:

1. The `IconData` type in Flutter is a general-purpose type that can represent any icon, not just Lucide icons
2. Using `IconData` parameters maintains flexibility to use icons from any source
3. The seal_ui_flutter package exports `lucide_icons_flutter` for convenience, but components accept any `IconData`
4. This approach provides immediate access to the Lucide icon set while preserving future flexibility

## Consequences

**Positive:**

- Visual icon consistency across Flutter and React applications
- Access to a comprehensive, actively maintained icon set (Lucide regularly adds new icons)
- Platform-native packages that follow Flutter and React conventions
- No need to bundle or manage icon assets manually
- Clear upgrade path when new Lucide versions are released
- No coupling to Lucide in Flutter (IconData accepts any icon)
- Ability to use non-Lucide icons if needed in the future

**Negative:**

- Dependency on two separate packages (`lucide-react` and `lucide_icons_flutter`)
- Potential for slight rendering differences between platforms due to different rendering engines
- Different API styles between platforms (IconData in Flutter vs string names in React)
- If we ever need to switch the primary icon library, we would need to update where Lucide icons are referenced

**Implementation Note:**
In seal_ui_flutter, the `lucide_icons_flutter` package is exported from `lib/seal_ui.dart`, providing easy access to Lucide icons as `IconData` constants. Components like `SealIconButton` accept `IconData` parameters, which can be any valid Flutter icon (not limited to Lucide). In seal_ui_react, we use `lucide-react` with string-based icon names that map to the same Lucide icon set. While the API differs slightly between platforms (IconData vs string), both provide access to the complete Lucide icon set without locking us into the library in Flutter.
