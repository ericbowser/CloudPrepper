# CompTIA Prepper

🚀 **Your Ultimate Cloud Certification Prep Tool**

A comprehensive exam preparation application designed for Cloud Technology Professional certification path, featuring
CompTIA Cloud+ (CV0-003) and AWS Solutions Architect - Associate (SAA-C03) practice questions.

![Cloud Prepper Dashboard](https://img.shields.io/badge/Cloud-Prepper-blue?style=for-the-badge&logo=amazonaws&logoColor=white)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)

## 🎯 Features

### 📚 **Comprehensive Question Bank**

- **CompTIA Cloud+** practice questions covering all exam domains
- **AWS Solutions Architect Associate** questions with real-world scenarios
- Questions organized by domain, category, and difficulty level
- Detailed explanations with breakdown of concepts

### 🧠 **Smart Study Tools**

- **Multiple Study Modes**: Practice, Timed Quiz, and Review modes
- **Progress Tracking**: Monitor your performance across domains
- **Adaptive Learning**: Focus on weak areas with targeted questions
- **Performance Analytics**: Detailed statistics and improvement suggestions

### 🔧 **Advanced Features**

- **OCR Integration**: Extract questions from images using Tesseract.js
- **Question Management**: Add, edit, and update questions through the interface
- **RESTful API**: Full CRUD operations with Swagger documentation
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📊 **Certification Domains Covered**

#### CompTIA Cloud+ (CV0-003)

- ☁️ **Cloud Architecture and Models** (25%)
- 🚀 **Cloud Deployment** (20%)
- ⚙️ **Operations and Support** (20%)
- 🛡️ **Security** (25%)
- 🔄 **DevOps and Automation** (10%)

#### AWS Solutions Architect Associate (SAA-C03)

- 🏗️ **Design Resilient Architectures** (26%)
- 🔧 **Design High-Performing Architectures** (24%)
- 🔒 **Design Secure Applications and Architectures** (30%)
- 💰 **Design Cost-Optimized Architectures** (20%)

## 🛠 Tech Stack

### Frontend

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Axios** for API communication

### Backend

- **Node.js** with Express.js
- **PostgreSQL** database
- **Swagger UI** for API documentation
- **Winston** logging

### Additional Tools

- **Tesseract.js** for OCR processing
- **ESBuild** for optimized builds
- **CORS** enabled for cross-origin requests

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ericbowser/CompTIAPrepper.git
   cd CompTIAPrepper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
    - Create a PostgreSQL database named `cloud_prepper`
    - Create schema: `CREATE SCHEMA prepper;`
    - Import the provided CSV files:
        - `comptia_cloud_plus_questions.csv`
        - `aws_certified_architect_associate_questions.csv`

4. **Environment Configuration**
   The application uses `env.json` for configuration:
   ```json
   {
     "HOST": "localhost",
     "PORT": "32637",
     "CLOUD_PREPPER_BASE_URL": "http://localhost:32636",
     "CLOUD_PREPPER_GET_QUESTIONS": "/getExamQuestions",
     "CLOUD_PREPPER_ADD_QUESTION": "/addQuestion",
     "CLOUD_PREPPER_UPDATE_QUESTION": "/updateQuestion"
   }
   ```

5. **Start the application**
   ```bash
   # Development mode with hot reload
   npm run dev
   
   # Build for production
   npm run build
   
   # Preview production build
   npm run preview
   ```

## 📖 Usage

### 🎮 Study Modes

#### Practice Mode

- Unlimited practice with immediate feedback
- No time pressure, perfect for learning
- Access detailed explanations after each question

#### Timed Quiz Mode

- Simulate real exam conditions
- Track completion time and accuracy
- Comprehensive results with performance breakdown

#### Review Mode

- Review previously answered questions
- Focus on incorrect answers
- Study explanations and improve understanding

### 📱 Question Management

#### Adding Questions

1. Navigate to the Question Management section
2. Fill out the question form with:
    - Question text
    - Multiple choice options
    - Correct answer(s)
    - Detailed explanation
    - Domain and category classification

#### OCR Integration

1. Click "Extract from Image" in Question Management
2. Upload an image containing quiz questions
3. Review and edit extracted text
4. Save to question bank

### 📊 Progress Tracking

Monitor your preparation with:

- **Domain-wise accuracy** percentages
- **Time spent** per domain
- **Weak areas** identification
- **Performance trends** over time

## 🔌 API Documentation

The application includes a complete REST API with Swagger documentation.

### Available Endpoints

| Method | Endpoint              | Description                 |
|--------|-----------------------|-----------------------------|
| GET    | `/getExamQuestions`   | Retrieve all exam questions |
| POST   | `/addQuestion`        | Add a new question          |
| PUT    | `/updateQuestion/:id` | Update an existing question |

### API Documentation

Access interactive API docs at: `http://localhost:32636/api-docs`

## 🏗 Architecture

```
CompTIAPrepper/
├── src/                    # React frontend source
│   ├── components/         # React components
│   ├── types/             # TypeScript type definitions
│   ├── config/            # Domain and configuration files
│   └── assets/            # Styling and static assets
├── api/                   # API layer and repository pattern
├── documentdb/            # Database connection and models
├── logs/                  # Application logging
├── email/                 # Email functionality
├── server.js             # Express server entry point
├── swagger.js            # API documentation configuration
└── package.json          # Dependencies and scripts
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding Questions

1. Use the in-app Question Management tool
2. Ensure questions follow the established format
3. Include detailed explanations with concept breakdowns
4. Verify accuracy against official certification guides

### Bug Reports

1. Open an issue on GitHub
2. Include steps to reproduce
3. Provide system information and error logs

### Feature Requests

1. Check existing issues for similar requests
2. Describe the use case and expected behavior
3. Consider contributing the implementation

## 📋 Development Scripts

```bash
# Frontend development
npm run dev              # Start Vite dev server
npm run build           # Production build
npm run preview         # Preview production build

# Styling
npm run tail            # Build Tailwind CSS
npm run tail:watch      # Watch mode for Tailwind

# Alternative builds
npm run build:vite      # Vite-only build
npm run build:esbuild   # ESBuild alternative
npm run clean           # Clean install dependencies
```

## 📈 Roadmap

### Version 2.0 Features

- [ ] **Adaptive Learning Algorithm**: AI-powered question recommendations
- [ ] **Study Groups**: Collaborative learning features
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **More Certifications**: Azure, Google Cloud, and other cloud platforms
- [ ] **Video Explanations**: Multimedia learning content
- [ ] **Practice Labs**: Hands-on simulation environments

### Immediate Improvements

- [ ] Enhanced analytics dashboard
- [ ] Export study progress reports
- [ ] Offline mode support
- [ ] Custom study plans
- [ ] Integration with certification scheduling platforms

## 🐛 Known Issues

- OCR accuracy depends on image quality
- Large question sets may impact initial load time
- Mobile responsiveness needs optimization for tablets

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- CompTIA for comprehensive certification guidelines
- AWS for detailed architecture documentation
- The open-source community for excellent tooling and libraries

## 📞 Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check the `/api-docs` endpoint for API reference
- **Community**: Share your study progress and help others prepare

---

**Happy studying! 🎓 Good luck on your cloud certification journey!**

*Built with ❤️ for the cloud computing community*