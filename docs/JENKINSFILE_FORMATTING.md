# Jenkinsfile Formatting Guide

## 🎯 Problem & Solution

**Problem**: Jenkinsfile doesn't auto-format on save in VS Code

**Solution**: Install and configure the VS Code Groovy Lint extension

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Install VS Code Extension

Install the **Groovy Lint** extension:

**Option A - Via VS Code:**
1. Open VS Code
2. Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)
3. Search for: `vscode-groovy-lint`
4. Click **Install** on "Groovy Lint, Format and Fix" by Nicolas Vuillamy

**Option B - Via Command Line:**
```bash
code --install-extension NicolasVuillamy.vscode-groovy-lint
```

**Option C - Auto-Install (Recommended):**
When you open this workspace in VS Code, you'll see a notification asking to install recommended extensions. Click **Install All**.

### Step 2: Verify Extension is Active

1. Open your `Jenkinsfile`
2. Look at the bottom-right corner of VS Code
3. You should see "Groovy" as the language mode
4. If not, click the language selector and choose "Groovy"

### Step 3: Format Your Jenkinsfile

**Auto-format on save** (already configured ✅):
- Just save the file: `Cmd+S` or `Ctrl+S`

**Manual format command**:
- Mac: `Shift+Option+F`
- Windows/Linux: `Shift+Alt+F`
- Or: Right-click → "Format Document"

---

## 📝 Configuration Files

### `.groovylintrc.json` (Root)
```json
{
  "extends": "recommended",
  "rules": {
    "Indentation": {
      "spacesPerIndentLevel": 4,
      "enabled": true
    },
    "LineLength": {
      "length": 120,
      "enabled": true
    },
    // ... more rules
  }
}
```

### `.vscode/settings.json` (Already configured ✅)
```json
{
  "[groovy]": {
    "editor.defaultFormatter": "NicolasVuillamy.vscode-groovy-lint",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[jenkinsfile]": {
    "editor.defaultFormatter": "NicolasVuillamy.vscode-groovy-lint",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  }
}
```

---

## 🎨 Formatting Rules Explained

### Current Configuration

| Rule | Setting | Description |
|------|---------|-------------|
| **Indentation** | 4 spaces | Jenkins/Groovy convention |
| **Line Length** | 120 chars | Maximum line width |
| **Braces** | Off | Flexible brace style |
| **Blank Lines** | Enabled | Remove excess blank lines |
| **Trailing Whitespace** | Enabled | Remove trailing spaces |
| **CompileStatic** | Off | No type checking |
| **NoDef** | Off | Allow `def` keyword |

### Example: Before & After Formatting

**Before (messy):**
```groovy
pipeline {
agent any
  stages {
stage('Build') {
    steps {
  echo 'Building...'
        sh 'npm install'
    }
  }
  }
}
```

**After (formatted):**
```groovy
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
    }
}
```

---

## 🔧 Manual Formatting Commands

### VS Code Command Palette (`Cmd+Shift+P`)

Available commands:
- **Format Document** - Format entire file
- **Format Selection** - Format selected code
- **Groovy Lint: Lint file** - Check for issues
- **Groovy Lint: Fix file issues** - Auto-fix problems

### Keyboard Shortcuts

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Format Document | `Shift+Option+F` | `Shift+Alt+F` |
| Format Selection | `Cmd+K Cmd+F` | `Ctrl+K Ctrl+F` |
| Save & Format | `Cmd+S` | `Ctrl+S` |

---

## 🐛 Troubleshooting

### Issue 1: "No formatter for Groovy files"

**Solution:**
1. Check extension is installed: `Cmd+Shift+X` → Search "vscode-groovy-lint"
2. Reload VS Code: `Cmd+Shift+P` → "Developer: Reload Window"
3. Open Jenkinsfile and check language mode (bottom-right)

### Issue 2: Format on save not working

**Solution:**
1. Open Settings: `Cmd+,`
2. Search for "format on save"
3. Ensure "Editor: Format On Save" is checked
4. Check file-specific settings in `.vscode/settings.json`

### Issue 3: Jenkinsfile detected as plain text

**Solution:**
1. Click language selector (bottom-right of VS Code)
2. Select "Groovy" or "Configure File Association for 'Jenkinsfile'"
3. Choose "Groovy"

OR add to `.vscode/settings.json`:
```json
{
  "files.associations": {
    "Jenkinsfile": "groovy",
    "Jenkinsfile.*": "groovy"
  }
}
```

### Issue 4: Extension not formatting correctly

**Solution:**
1. Check `.groovylintrc.json` exists in root
2. Restart Groovy Lint server:
   - `Cmd+Shift+P` → "Groovy Lint: Restart GroovyLint Server"
3. Clear cache:
   - `Cmd+Shift+P` → "Groovy Lint: Clear cache"

---

## 📚 Additional Features

### Linting (Error Detection)

The extension will show errors/warnings inline:
- 🔴 Red squiggly = Error
- 🟡 Yellow squiggly = Warning
- 💡 Lightbulb = Quick fix available

### Quick Fixes

Click the lightbulb or press `Cmd+.` to see quick fixes:
- Auto-indent code
- Remove unused imports
- Fix spacing issues
- Remove trailing whitespace

### Code Actions

Right-click in Jenkinsfile:
- **Format Document** - Format entire file
- **Format Selection** - Format selected code
- **Organize Imports** - Sort imports
- **Source Action** - Additional refactorings

---

## 🎯 Best Practices

### 1. Format Before Committing
```bash
# Manual format via command
code Jenkinsfile  # Opens in VS Code
# Then: Shift+Option+F to format
# Then: Cmd+S to save
```

### 2. Consistent Indentation
- Use 4 spaces (not tabs)
- Already configured in `.groovylintrc.json`
- EditorConfig enforces this too

### 3. Keep Lines Under 120 Characters
```groovy
// ✅ Good
withCredentials([
    usernamePassword(credentialsId: 'id', usernameVariable: 'USER')
]) {
    // code
}

// ❌ Bad (too long)
withCredentials([usernamePassword(credentialsId: 'id', usernameVariable: 'USER', passwordVariable: 'PASS')]) { // code }
```

### 4. Consistent Brace Style
```groovy
// ✅ Good (our style)
stage('Build') {
    steps {
        echo 'Building...'
    }
}

// Also acceptable (but be consistent)
stage('Build')
{
    steps
    {
        echo 'Building...'
    }
}
```

---

## 📖 Related Documentation

- [VS Code Groovy Lint Extension](https://marketplace.visualstudio.com/items?itemName=NicolasVuillamy.vscode-groovy-lint)
- [npm-groovy-lint (CLI tool)](https://www.npmjs.com/package/npm-groovy-lint)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Groovy Style Guide](https://groovy-lang.org/style-guide.html)

---

## ✅ Verification Checklist

After setup, verify these work:

- [ ] Extension installed and enabled
- [ ] Jenkinsfile opens with "Groovy" language mode
- [ ] Format Document command works (`Shift+Option+F`)
- [ ] Format on save works (`Cmd+S`)
- [ ] Linting shows warnings/errors inline
- [ ] `.groovylintrc.json` exists and is valid
- [ ] VS Code settings configured for Groovy/Jenkinsfile

---

## 🎉 You're All Set!

Your Jenkinsfile will now:
- ✅ Auto-format on save
- ✅ Show linting errors inline
- ✅ Support quick fixes
- ✅ Follow consistent style rules

**Try it now**: Open your `Jenkinsfile` and press `Cmd+S` - it should auto-format! 🚀
