# ESLint & Prettier Setup

This project is configured with ESLint and Prettier to ensure consistent code formatting across the codebase.

## Configuration Files

- **`.prettierrc.json`** - Prettier configuration
- **`.prettierignore`** - Files to ignore during formatting
- **`.editorconfig`** - Editor settings for consistency
- **`eslint.config.js`** - ESLint configuration (both client and server)
- **`.vscode/settings.json`** - VS Code workspace settings

## Prettier Rules

The project uses the following Prettier configuration:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "quoteProps": "as-needed"
}
```

## Available Scripts

### Client (`/client`)

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is formatted correctly
npm run format:check
```

### Server (`/server`)

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is formatted correctly
npm run format:check
```

## VS Code Integration

The workspace is configured to:

1. **Format on save** - Automatically format files when you save
2. **Format on paste** - Format pasted code automatically
3. **Auto-fix on save** - Automatically fix ESLint issues when saving

### Recommended VS Code Extensions

Make sure you have these extensions installed:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Pre-commit Hooks (Optional)

To ensure code quality before committing, you can add pre-commit hooks using Husky:

```bash
# Install husky and lint-staged at the root
npm install --save-dev husky lint-staged

# Initialize husky
npx husky init

# Add pre-commit hook
echo "cd client && npm run lint:fix && npm run format
cd ../server && npm run lint:fix && npm run format" > .husky/pre-commit
```

## Troubleshooting

### ESLint or Prettier not working in VS Code

1. Reload VS Code window: `Cmd+Shift+P` → "Developer: Reload Window"
2. Check that the Prettier extension is set as the default formatter
3. Verify that `editor.formatOnSave` is enabled in settings

### Conflicts between ESLint and Prettier

The setup uses `eslint-config-prettier` to disable all ESLint rules that conflict with Prettier, and `eslint-plugin-prettier` to run Prettier as an ESLint rule. This ensures they work together seamlessly.

### Format specific file or folder

```bash
# Format specific file
npx prettier --write path/to/file.js

# Format specific folder
npx prettier --write "src/**/*.{js,jsx}"
```

## CI/CD Integration

The linting and formatting checks are integrated into the test pipeline. Before running tests, linting is automatically executed:

```bash
npm test  # Runs: npm run lint && npm run test:unit && npm run test:integration
```

## Best Practices

1. **Always run lint before committing**: `npm run lint:fix`
2. **Use format check in CI/CD**: `npm run format:check`
3. **Keep dependencies updated**: Regular updates ensure you have the latest rules
4. **Don't disable rules without reason**: Document why if you must disable a rule
5. **Format entire codebase after changes**: `npm run format`

## File Organization

```
.
├── .prettierrc.json          # Prettier config (root)
├── .prettierignore           # Prettier ignore (root)
├── .editorconfig             # Editor config (root)
├── .vscode/
│   └── settings.json         # VS Code workspace settings
├── client/
│   ├── eslint.config.js      # Client ESLint config
│   └── package.json          # Client scripts
└── server/
    ├── eslint.config.js      # Server ESLint config
    └── package.json          # Server scripts
```
