# Nebula Logix Documentation

Welcome to the Nebula Logix documentation! This directory contains all the documentation for the Nebula Logix application.

## Documentation Structure

- `introduction.md` - Overview of the project
- `quick-start.md` - Getting started guide
- `guides/` - Detailed guides for different features
  - `authentication.md` - Authentication setup and usage
  - `routing.md` - Application routing guide
  - `deployment.md` - Deployment instructions
- `api-reference/` - API documentation
- `architecture/` - Architecture decisions and overview

## Running the Documentation Locally

1. Install the Mintlify CLI:
   ```bash
   npm install -g @mintlify/cli
   ```

2. Navigate to the project root and run:
   ```bash
   mintlify dev
   ```

3. Open your browser to `http://localhost:3000`

## Adding New Documentation

1. Create a new Markdown file in the appropriate directory
2. Add frontmatter at the top of the file:
   ```yaml
   ---
   title: Page Title
   description: Short description
   ---
   ```
3. Update the navigation in `mint.json` if needed

## Documentation Style Guide

- Use clear, concise language
- Include code examples where helpful
- Keep lines under 100 characters
- Use proper heading hierarchy
- Add images to the `images/` directory
