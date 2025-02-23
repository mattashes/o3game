# Project Structure Documentation

## Directory Structure

```
o3game/
├── config/               # Configuration files
│   ├── babel.config.js  # Babel configuration
│   ├── jest.config.js   # Jest configuration
│   └── vite.config.js   # Vite configuration
├── docs/                # Documentation
│   ├── api/            # API documentation
│   ├── changelog.md    # Change log
│   └── knowledge-base.md # Project knowledge base
├── public/              # Static assets
│   └── assets/         # Game assets (sprites, audio, etc.)
├── scripts/             # Build and utility scripts
│   ├── assets/         # Asset management scripts
│   ├── build/          # Build scripts
│   └── deploy/         # Deployment scripts
├── src/                 # Source code
│   ├── components/     # React components
│   ├── config/         # App configuration
│   ├── constants/      # Game constants
│   ├── hooks/          # React hooks
│   ├── scenes/         # Game scenes
│   ├── services/       # API/service layer
│   ├── systems/        # Game systems
│   ├── types/          # TypeScript types/interfaces
│   ├── utils/          # Utility functions
│   └── index.js        # Main entry point
└── test/               # Test files
    ├── config/         # Test configuration
    └── utils/          # Test utilities
```

## Key Directories

### `config/`
Contains all configuration files for the build tools and development environment.

### `docs/`
Project documentation, including API docs, changelog, and knowledge base.

### `public/`
Static assets and files that are served directly.

### `scripts/`
Utility scripts for various tasks like asset management and deployment.

### `src/`
Main source code directory with a clean separation of concerns:
- `components/`: React components
- `config/`: Application configuration
- `constants/`: Game constants and enums
- `hooks/`: React custom hooks
- `scenes/`: Phaser game scenes
- `services/`: API and service layer
- `systems/`: Game systems and mechanics
- `types/`: TypeScript type definitions
- `utils/`: Utility functions and helpers

### `test/`
Test files and utilities, organized to mirror the src/ structure. 