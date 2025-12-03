# Groovy Lint Setup Guide

## Overview

This project uses the **VsCode Groovy Lint** extension to automatically format and lint Jenkinsfiles and Groovy code.

## Prerequisites

- ✅ Node.js 18+ (required)
- ✅ Java 17+ (required) - We have Java 21 installed
- ✅ npm-groovy-lint (installed globally)
- ✅ VsCode Groovy Lint extension (installed)

## Configuration Files

### 1. `.vscode/settings.json`

Contains the VS Code specific settings:

- **File associations**: Maps `Jenkinsfile` to `groovy` language
- **Language-specific settings**: Sets formatter and auto-format behavior for `[groovy]` and `[jenkinsfile]`
- **GroovyLint extension settings**: Enables formatting, linting, and auto-fix on save

Key settings:

```json
{
  "files.associations": {
    "Jenkinsfile": "groovy",
    "Jenkinsfile.*": "groovy"
  },
  "[groovy]": {
    "editor.defaultFormatter": "NicolasVuillamy.vscode-groovy-lint",
    "editor.formatOnSave": true
  },
  "groovyLint.enable": true,
  "groovyLint.format.enable": true,
  "groovyLint.lint.trigger": "onSave",
  "groovyLint.fix.enable": true,
  "groovyLint.fix.trigger": "onSave"
}
```

### 2. `.groovylintrc.json`

Contains the npm-groovy-lint configuration:

- Extends the `recommended` ruleset
- Customizes indentation (4 spaces)
- Disables certain rules that don't apply to Jenkinsfiles
- Sets line length to 120 characters

## How It Works

1. **On File Save**: When you save a Jenkinsfile or `.groovy` file:

   - GroovyLint validates the code against CodeNarc rules
   - Auto-fixes any fixable issues
   - Formats the code according to the rules in `.groovylintrc.json`

2. **On Paste**: When you paste code into a Groovy file:

   - The formatter automatically adjusts the formatting

3. **Manual Format**: You can manually format at any time:
   - Press `Shift+Option+F` (macOS) or `Shift+Alt+F` (Windows/Linux)
   - Or right-click → "Format Document"

## Important Notes

⚠️ **The extension settings in `.vscode/settings.json` are REQUIRED**. Without them, format on save won't work even if the extension is installed!

The critical settings are:

- `groovyLint.enable`: Must be `true`
- `groovyLint.format.enable`: Must be `true` (disabled by default!)
- `groovyLint.fix.trigger`: Set to `"onSave"` for auto-fix

## Troubleshooting

### 1. Format on save not working

- **Check language mode**: Bottom-right corner should show "Groovy"
- **Reload window**: Press `Cmd+Shift+P` → "Reload Window"
- **Check Output panel**: `Cmd+Shift+U` → Select "Groovy Lint" from dropdown
- **Verify extension settings**: Make sure all `groovyLint.*` settings are in `.vscode/settings.json`

### 2. Extension stuck on "GroovyLint is analyzing..."

- The first format can take 10-20 seconds (starting CodeNarc server)
- Wait for the status bar message to clear
- Check Java is running: `ps aux | grep java`

### 3. Errors in Output panel

Common issues:

- **Java not found**: Make sure Java 17+ is installed
- **npm-groovy-lint not found**: Install globally with `npm install -g npm-groovy-lint`
- **Permission errors**: Check file permissions on the workspace

### 4. Manual commands if auto-format fails

```bash
# Format a single file
npm-groovy-lint --format --path Jenkinsfile

# Format all groovy files in a directory
npm-groovy-lint --format --path server/

# Just check for issues without fixing
npm-groovy-lint --path Jenkinsfile
```

## Customizing Rules

Edit `.groovylintrc.json` to customize linting rules. See [CodeNarc rules documentation](https://codenarc.github.io/CodeNarc/) for all available rules.

Example: To disable a rule

```json
{
  "rules": {
    "LineLength": "off"
  }
}
```

## References

- [VsCode Groovy Lint Extension](https://marketplace.visualstudio.com/items?itemName=NicolasVuillamy.vscode-groovy-lint)
- [npm-groovy-lint](https://github.com/nvuillam/npm-groovy-lint)
- [CodeNarc Rules](https://codenarc.github.io/CodeNarc/)
