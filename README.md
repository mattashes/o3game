# O3 Game

A browser-based game built with Phaser and React.

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The pipeline:

1. Runs on every push to `main` and pull requests
2. Executes all tests including regression prevention tests
3. Builds the game for production
4. Deploys to staging (when merged to main)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Testing

The project includes:
- Unit tests
- Integration tests
- Regression prevention tests
- Performance benchmarks

Run all tests with:
```bash
npm test
```