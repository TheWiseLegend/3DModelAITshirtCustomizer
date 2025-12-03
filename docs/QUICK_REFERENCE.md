# 🚀 Quick Reference: Formatting in VS Code

## File Types & Formatters

| File Type              | Formatter   | Extension Required                    |
| ---------------------- | ----------- | ------------------------------------- |
| `.js`, `.jsx`          | Prettier    | ✅ esbenp.prettier-vscode             |
| `.json`, `.css`, `.md` | Prettier    | ✅ esbenp.prettier-vscode             |
| `Jenkinsfile`          | Groovy Lint | ✅ NicolasVuillamy.vscode-groovy-lint |
| `.groovy`              | Groovy Lint | ✅ NicolasVuillamy.vscode-groovy-lint |

## Keyboard Shortcuts

### Format Commands

| Action                  | Mac     | Windows/Linux   |
| ----------------------- | ------- | --------------- |
| **Format Document**     | `⇧⌥F`   | `Shift+Alt+F`   |
| **Format Selection**    | `⌘K ⌘F` | `Ctrl+K Ctrl+F` |
| **Save (auto-formats)** | `⌘S`    | `Ctrl+S`        |

### Other Useful Commands

| Action           | Mac   | Windows/Linux  |
| ---------------- | ----- | -------------- |
| Command Palette  | `⇧⌘P` | `Shift+Ctrl+P` |
| Quick Fix        | `⌘.`  | `Ctrl+.`       |
| Go to Definition | `F12` | `F12`          |
| Rename Symbol    | `F2`  | `F2`           |

## Required VS Code Extensions

### Essential (Install These)

1. **Prettier** - Code formatter

   ```
   ext install esbenp.prettier-vscode
   ```

2. **ESLint** - JavaScript linter

   ```
   ext install dbaeumer.vscode-eslint
   ```

3. **EditorConfig** - Editor consistency

   ```
   ext install EditorConfig.EditorConfig
   ```

4. **Groovy Lint** - Jenkinsfile formatter
   ```
   ext install NicolasVuillamy.vscode-groovy-lint
   ```

### Install All at Once

When you open this workspace, VS Code will suggest installing all recommended extensions. Click **Install All**.

## Quick Format Guide

### JavaScript/JSX Files

```bash
1. Open file (e.g., src/App.jsx)
2. Press Cmd+S (saves and auto-formats)
```

### Jenkinsfile

```bash
1. Make sure Groovy Lint extension is installed
2. Open Jenkinsfile
3. Press Cmd+S (saves and auto-formats)
   OR
   Press Shift+Option+F (manual format)
```

### All Project Files

```bash
# Client
cd client
npm run format

# Server
cd server
npm run format
```

## Troubleshooting

### "No formatter available"

1. Check extension is installed
2. Check language mode (bottom-right of VS Code)
3. Reload VS Code: `Cmd+Shift+P` → "Developer: Reload Window"

### Format on save not working

1. Open Settings: `Cmd+,`
2. Search: "format on save"
3. Enable: "Editor: Format On Save"
4. Reload VS Code

### Jenkinsfile not formatting

1. Install: `NicolasVuillamy.vscode-groovy-lint`
2. Check language mode shows "Groovy"
3. Run: `Cmd+Shift+P` → "Groovy Lint: Restart Server"

## Configuration Files (Don't Move These!)

```
root/
├── .prettierrc.json      ← Prettier rules
├── .prettierignore       ← Prettier ignore
├── .editorconfig         ← Editor config
├── .groovylintrc.json    ← Groovy/Jenkins rules
└── .vscode/
    ├── settings.json     ← VS Code settings
    └── extensions.json   ← Recommended extensions
```

## Available Scripts

### Linting & Formatting

```bash
# Client
cd client
npm run lint              # Check for issues
npm run lint:fix          # Fix issues
npm run format            # Format all files
npm run format:check      # Check formatting

# Server
cd server
npm run lint              # Check for issues
npm run lint:fix          # Fix issues
npm run format            # Format all files
npm run format:check      # Check formatting
```

## Status Indicators

Look at the bottom of VS Code:

- **Language mode** (bottom-right) - Shows file type
- **Format on save** - Should be enabled in settings
- **ESLint/Prettier** - Status shown in status bar

## Need Help?

Check detailed documentation:

- [Prettier & ESLint Setup](./PRETTIER_ESLINT_SETUP.md)
- [Jenkinsfile Formatting](./JENKINSFILE_FORMATTING.md)
- [Project Organization](./PROJECT_ORGANIZATION.md)

---

**Everything set up correctly?** Try saving any file - it should auto-format! ✨
