# ADR-0001 — Adopt shadcn as the design system foundation for Flutter and React

## Version

1.0.0

## Date

2026-03-07

## Status

Accepted

## Context

The SealUI design system needs a consistent component foundation across Flutter and React platforms to ensure visual and behavioral parity. Without a shared foundation, components would diverge in appearance, interaction patterns, and accessibility features, creating inconsistency for end-users and increased maintenance burden. The challenge is to find a solution that provides a common design language while respecting platform-specific conventions and capabilities.

## Decision

We will adopt shadcn as the design system foundation for both Flutter and React platforms. For React, we use shadcn/ui directly. For Flutter, we use the shadcn_ui package available on pub.dev, which implements the same design principles in Dart. This approach gives us:

- Shared visual language (color usage, spacing, typography, border radii)
- Consistent component APIs and composition patterns
- Platform-native implementations that follow Flutter and React best practices
- Access to shadcn's well-designed, accessible components as a starting point

## Consequences

**Positive:**

- Visual consistency across Flutter and React applications
- Reduced design drift between platforms
- Faster development through shared design principles
- Access to battle-tested, accessible component implementations
- Clear migration path if we need to evolve the foundation

**Negative:**

- Need to maintain two separate implementations (React and Flutter)
- Potential for subtle differences in component behavior due to platform differences
- Dependency on third-party packages (shadcn/ui for React, shadcn_ui for Flutter)
- May need to override or extend components for SealUI-specific requirements

This decision establishes a shared design vocabulary while allowing platform-appropriate implementations. Both platforms consume the same token set from this repository, ensuring design token consistency complements the component foundation consistency.
