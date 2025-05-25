import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const docsDir = join(__dirname, '../docs');

// Map of file paths to their frontmatter
const titleMap = {
  'architecture/overview.md': {
    title: 'Architecture Overview',
    description: 'Overview of the Nebula Logix system architecture and design principles'
  },
  'architecture/components.md': {
    title: 'System Components',
    description: 'Detailed breakdown of the main components in the Nebula Logix system'
  },
  'architecture/data-flow.md': {
    title: 'Data Flow',
    description: 'How data moves through the Nebula Logix application'
  },
  'guides/authentication.md': {
    title: 'Authentication Guide',
    description: 'How authentication works in Nebula Logix'
  },
  'guides/routing.md': {
    title: 'Routing Guide',
    description: 'Client-side routing in Nebula Logix'
  },
  'introduction.md': {
    title: 'Introduction',
    description: 'Introduction to Nebula Logix and its features'
  },
  'quick-start.md': {
    title: 'Quick Start',
    description: 'Get started with Nebula Logix in minutes'
  }
};

// Process each file
Object.entries(titleMap).forEach(([filePath, frontmatter]) => {
  const fullPath = join(docsDir, filePath);
  
  if (existsSync(fullPath)) {
    const content = readFileSync(fullPath, 'utf8');
    
    // Skip if already has frontmatter
    if (!content.startsWith('---\n')) {
      const frontmatterStr = `---\ntitle: ${frontmatter.title}\ndescription: ${frontmatter.description}\n---\n\n`;
      writeFileSync(fullPath, frontmatterStr + content);
      console.log(`Updated: ${filePath}`);
    } else {
      console.log(`Skipped (already has frontmatter): ${filePath}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('Frontmatter update complete!');
