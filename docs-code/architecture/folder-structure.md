# Project Structure

This document outlines the folder structure of the Nebula Logix project and explains the purpose of each directory and file.

## Root Directory

```
/
├── .github/               # GitHub configuration and workflows
├── docs/                   # Project documentation
│   └── architecture/       # Architecture decision records and documentation
├── public/                 # Static assets
├── scripts/                # Build and utility scripts
├── src/                    # Application source code
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── components/         # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   └── ui/             # Basic UI components
│   ├── config/             # Application configuration
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Third-party library configurations
│   ├── pages/              # Page components (routes)
│   ├── services/           # API and service integrations
│   ├── styles/             # Global styles and themes
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── tests/                  # Test files
│   ├── component/          # Component tests
│   ├── e2e/                # End-to-end tests
│   └── utils/              # Test utilities
├── .env.example            # Example environment variables
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project README
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Detailed Breakdown

### `/src` - Source Code

#### `/src/components`
- Contains all reusable UI components
- Organized by feature or domain
- Each component has its own directory with:
  - `ComponentName.tsx` - Main component file
  - `ComponentName.styles.ts` - Styled-components (if used)
  - `ComponentName.test.tsx` - Component tests
  - `index.ts` - Barrel file for clean imports

#### `/src/pages`
- Each file represents a route in the application
- Pages compose multiple components together
- Follows the same structure as components for consistency

#### `/src/hooks`
- Custom React hooks for reusable logic
- Organized by feature or domain
- Each hook has its own file with tests

#### `/src/contexts`
- React context providers for global state
- Each context has its own file with provider and custom hook

#### `/src/services`
- API clients and service integrations
- Organized by feature or domain
- Handles all external communication

#### `/src/utils`
- Utility and helper functions
- Pure functions with no side effects
- Well-tested and reusable across the application

### `/tests` - Test Files

#### `/tests/component`
- Unit and integration tests for components
- Mirrors the structure of `/src/components`
- Uses React Testing Library

#### `/tests/e2e`
- End-to-end tests using Playwright
- Organized by user flows and features
- Tests complete user journeys

#### `/tests/utils`
- Test utilities and helpers
- Custom test render functions
- Test data factories

## Naming Conventions

### Files
- **React Components**: `PascalCase.tsx` (e.g., `Button.tsx`)
- **Utility Functions**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Test Files**: `ComponentName.test.tsx` or `functionName.test.ts`
- **Type Definitions**: `types.ts` or `ComponentName.types.ts`

### Folders
- **Feature Folders**: `kebab-case` (e.g., `user-profile`)
- **Component Folders**: `PascalCase` (e.g., `Button`)
- **Utility Folders**: `camelCase` (e.g., `dateUtils`)

## Import Paths

Use absolute imports for better readability and maintainability:

```typescript
// Instead of this
import { Button } from '../../../components/Button';

// Use this
import { Button } from '@/components/Button';
```

Configured in `tsconfig.json` and `vite.config.ts`.

## Asset Management

- **Images**: Store in `/public/images` for static assets or `/src/assets/images` for processed assets
- **Icons**: Use `lucide-react` for icons, or add SVGs to `/src/assets/icons`
- **Fonts**: Store in `/public/fonts` and import in CSS

## Environment Variables

- Store environment variables in `.env` files
- Prefix client-side variables with `VITE_`
- Never commit sensitive data to version control
- Document all required variables in `.env.example`

## Documentation

- Keep documentation up to date
- Add JSDoc comments to all public APIs
- Document complex business logic
- Update README files in each directory
