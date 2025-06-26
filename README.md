# React + TailwindCSS + Babel + Webpack Template

A modern React application template with TailwindCSS, Babel, and Webpack pre-configured.

## Features

- ⚛️ **React 18** - The latest version of React
- 🎨 **TailwindCSS 3** - A utility-first CSS framework
- 📦 **Webpack 5** - Module bundling
- 🔄 **Babel** - JavaScript compiler
- 🔥 **Hot Module Replacement** - See changes instantly

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/react-tailwind-template.git
   cd react-tailwind-template
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `dist` directory.

## Project Structure

```
react-tailwind-template/
├── .babelrc                # Babel configuration
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration for TailwindCSS
├── README.md               # Project documentation
├── tailwind.config.js      # TailwindCSS configuration
├── webpack.config.js       # Webpack configuration
├── public/                 # Static files
│   ├── index.html          # HTML template
│   └── favicon.ico         # Favicon
└── src/                    # Source code
    ├── assets/             # Assets (images, fonts, etc.)
    │   └── styles/         # CSS styles
    │       └── index.css   # Main CSS file with TailwindCSS imports
    ├── components/         # React components
    │   ├── App.jsx         # Main App component
    │   └── Header.jsx      # Header component
    ├── index.js            # Application entry point
    └── utils/              # Utility functions
        └── helpers.js      # Helper functions
```

## Customization

### TailwindCSS

You can customize the TailwindCSS configuration in the `tailwind.config.js` file. See the [TailwindCSS documentation](https://tailwindcss.com/docs/configuration) for more details.

### Webpack

The Webpack configuration is in the `webpack.config.js` file. You can customize it to fit your needs.

## License

This project is licensed under the MIT License.