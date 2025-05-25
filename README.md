# Nebula Logix

A modern cloud solutions platform built with React, TypeScript, and Supabase.

## Features

- **Authentication**: Email/password and social login (GitHub, Google)
- **Responsive Design**: Works on all devices
- **Modern Stack**: React, TypeScript, Tailwind CSS, Vite
- **Documentation**: Comprehensive guides and API reference

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 8.x or later
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Atemndobs/nebula-x.git
   cd nebula-x
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Documentation

Documentation is available in the `docs-site` directory. To view it locally:

1. Navigate to the `docs-site` directory:
   ```bash
   cd docs-site
   ```

2. Install Mintlify CLI (if not already installed):
   ```bash
   npm install -g @mintlify/cli
   ```

3. Start the documentation server:
   ```bash
   mintlify dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

Or use the provided script:
```bash
./scripts/start-docs.sh
```

## Project Structure

```
nebula-logix/
├── docs-site/          # Documentation website
├── public/             # Static files
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── styles/         # Global styles
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run type-check` - Check TypeScript types

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
