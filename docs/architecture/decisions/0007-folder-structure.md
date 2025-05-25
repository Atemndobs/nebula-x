# 7. Folder Structure Convention

## Status

ACCEPTED

## Context

We needed a consistent and scalable folder structure that would:
- Make the codebase easy to navigate
- Scale well as the application grows
- Follow React best practices
- Support feature-based organization
- Make it easy to find related files
- Work well with TypeScript

## Decision

We chose a **hybrid folder structure** that combines feature-based and type-based organization:

```
src/
  assets/              # Static assets (images, fonts, etc.)
  components/          # Reusable UI components
    common/            # Truly reusable components (Button, Input, etc.)
    features/          # Feature-specific components
  config/             # App configuration
  constants/          # App-wide constants
  contexts/           # React context providers
  features/           # Feature modules
    auth/             # Authentication feature
      components/     # Auth-specific components
      hooks/          # Auth-specific hooks
      services/       # Auth API services
      types/          # Auth type definitions
      index.ts        # Public API
  hooks/              # Reusable custom hooks
  lib/                # Third-party library configurations
  pages/              # Page components (routes)
  routes/            # Route configurations
  services/           # API services and client
  styles/             # Global styles and themes
  types/              # Global type definitions
  utils/              # Utility functions
```

### Key Principles

1. **Feature-Based Organization**
   - Group related files by feature, not by type
   - Each feature is self-contained with its own components, hooks, and services
   - Features can be easily enabled/disabled

2. **Co-location**
   - Keep related files close together
   - Example: Component + styles + tests in the same directory

3. **Public API**
   - Each feature exposes a clean public API via `index.ts`
   - Internal implementation details are hidden

4. **Flat Structure**
   - Avoid deep nesting
   - Keep imports shallow

## Consequences

### Positive
- Better code organization
- Easier to find related files
- Better code splitting opportunities
- More maintainable as the app grows
- Clear separation of concerns

### Negative
- More files to manage
- Need to be disciplined about imports
- Some duplication across features

### Alternatives Considered
- **Grouping by file type**: Harder to maintain as the app grows
- **Domain-driven design**: More complex than needed for our use case
- **Atomic design**: Too rigid for our needs
