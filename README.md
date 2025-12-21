[![Coverage](http://localhost:9000/api/project_badges/measure?project=tshirt-customizer&metric=coverage&token=sqb_db439063bd270b3d5e604162d3b20dd8b77a4888)](http://localhost:9000/dashboard?id=tshirt-customizer)

[![Security Rating](http://localhost:9000/api/project_badges/measure?project=tshirt-customizer&metric=software_quality_security_rating&token=sqb_db439063bd270b3d5e604162d3b20dd8b77a4888)](http://localhost:9000/dashboard?id=tshirt-customizer)


# 3D Model AI T-Shirt Customizer

A 3D interactive t-shirt customization application with AI-powered design generation.

## 🚀 Quick Start

### Client (Frontend)

```bash
cd client
npm install
npm run dev
```

### Server (Backend)

```bash
cd server
npm install
npm start
```

## 📁 Project Structure

```
.
├── client/                 # React frontend with Three.js
├── server/                 # Node.js backend with AI integration
├── docs/                   # Project documentation
├── .vscode/               # VS Code workspace settings
└── docker-compose.yaml    # Docker configuration
```

## 🛠️ Development

### Code Quality Tools

This project uses ESLint and Prettier for consistent code formatting:

```bash
# In client or server directory
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
npm run format        # Format all files
npm run format:check  # Verify formatting
```

### Testing

```bash
# Client
cd client
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report

# Server
cd server
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 📚 Documentation

- [Prettier & ESLint Setup](./docs/PRETTIER_ESLINT_SETUP.md) - Code formatting configuration
- [Jenkinsfile Formatting](./docs/JENKINSFILE_FORMATTING.md) - **How to format Jenkinsfile**
- [Formatting Documentation](./docs/FormatingDoc.md) - Additional formatting info

## 🔧 Configuration Files

### Root Configuration

- `.prettierrc.json` - Prettier formatting rules
- `.prettierignore` - Files to ignore in formatting
- `.editorconfig` - Editor consistency settings
- `.gitignore` - Git ignore rules
- `.groovylintrc.json` - Groovy/Jenkins linting
- `docker-compose.yaml` - Docker setup

### Why Configs Are in Root

Configuration files are kept in the root directory (not in a subfolder) because:

- ✅ Tools automatically discover them here
- ✅ Industry standard convention
- ✅ Easier for team members to find
- ✅ Required by most build tools and CI/CD

## 🐳 Docker

```bash
docker-compose up
```

## 📝 Git Workflow

```bash
# Before committing
npm run lint:fix      # Fix linting issues
npm run format        # Format code
npm test             # Run tests
```

## 📄 License

@amribrahim.tech
