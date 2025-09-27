# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Frontend Development
npm run dev              # Start Vite dev server on localhost:32637
npm run build           # Production build (includes Tailwind compilation)
npm run preview         # Preview production build

# Styling
npm run tail            # Build Tailwind CSS once
npm run tail:watch      # Watch mode for Tailwind CSS development

# Alternative Build Options
npm run build:vite      # Vite-only build (without Tailwind)
npm run build:esbuild   # ESBuild alternative build
npm run build:dev       # Development build with Vite

# Maintenance
npm run clean           # Clean install (remove node_modules and package-lock.json)
```

## Architecture Overview

### Project Structure
- **Frontend**: React 19 + TypeScript with Vite build system
- **API Layer**: Repository pattern in `/api` directory for data access
- **Database**: PostgreSQL with `prepper` schema
- **Styling**: Tailwind CSS with custom configuration
- **State Management**: React Context API for question and theme management

### Key Directories
```
src/
├── components/         # React components (forms, quiz interface, OCR)
├── contexts/          # React context providers (QuestionContext, ThemeContext)
├── types/             # TypeScript type definitions (preptypes.ts)
├── config/            # Domain configuration and question mapping
├── assets/            # Tailwind CSS files and static assets
└── helpers/           # Utility functions

api/                   # Data access layer
├── questions_repository.ts  # CRUD operations for questions
```

### Core Architecture Patterns

#### Domain-Based Question System
The app organizes questions by certification domains defined in `src/config/domainConfig.ts`:
- **CompTIA Cloud+**: 5 domains (Architecture, Deployment, Operations, Security, DevOps)
- **AWS Solutions Architect**: 4 domains (Resilient, High-Performing, Secure, Cost-Optimized)

Questions are dynamically mapped to domains based on their `domain` and `category` fields.

#### State Management
- **QuestionContext**: Centralized state for question management, editing, and CRUD operations
- **App.tsx**: Main application state including quiz flow, selected answers, and section navigation
- State persistence using localStorage with `CACHE_KEY = 'cloudPrepQuizState'`

#### API Integration
Repository pattern in `/api/questions_repository.ts` with endpoints:
- `GET /getExamQuestions` - Fetch all questions by certification
- `POST /addQuestion` - Add new question
- `PUT /updateQuestion/:id` - Update existing question

Base URL and endpoints configured in `env.json`.

### Key Components

#### Question Management
- **AddQuestionForm.tsx**: Form for creating new questions with domain/category selection
- **EditQuestionForm.tsx**: Edit existing questions with validation
- **QuestionPost.tsx**: Question management interface

#### Quiz System
- **PracticeSetup.tsx**: Quiz configuration (domains, question count, difficulty)
- **QuestionPost.tsx**: Question display with multiple choice options
- **QuizResults.tsx**: Results display with performance analytics

#### Specialized Features
- **OcrProcessor.tsx**: Tesseract.js integration for extracting questions from images
- **ExplanationCard.tsx**: Detailed answer explanations with concept breakdowns

### Database Schema
PostgreSQL database `cloud_prepper` with `prepper` schema containing question tables for CompTIA and AWS certifications. Questions include fields for domain, category, difficulty, explanations, and multiple choice options.

### Environment Configuration
Configuration stored in `env.json`:
- Frontend dev server: `localhost:32637`
- API base URL: `localhost:32636`
- API endpoints for questions CRUD operations

### Build System
- **Vite**: Primary build tool with React plugin
- **TypeScript**: Strict mode with path aliases (`@/*` maps to `./src/*`)
- **Tailwind CSS**: Custom configuration with forms and typography plugins
- **Node Polyfills**: Included for browser compatibility

### Testing & Development
- No test framework currently configured
- Development server runs on port 32637 with hot reload
- Tailwind CSS requires separate compilation step (`npm run tail:watch` during development)