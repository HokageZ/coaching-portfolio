# DR FARES COACHING - Portfolio Website

A modern, responsive portfolio website for an online fitness coach built with React, Tailwind CSS, and Framer Motion. Featuring bilingual support for English and Arabic with RTL layout.

## Features

- 🎨 Modern, minimal design with dark theme
- 📱 Fully responsive layout
- 🎯 Sections for services, transformations, and testimonials
- 📝 Detailed information about coaching services
- 💰 Pricing packages with features comparison
- ❓ FAQ section with expandable answers
- 📊 Client transformation showcases
- 🌐 Bilingual support with full English and Arabic translations
- 📦 RTL (Right-to-Left) layout support for Arabic
- 🖋 Enhanced typography with specialized fonts
- 🔍 Accessibility features
- ⚡ Performance optimized with code splitting and lazy loading

## Tech Stack

- React 18
- Tailwind CSS
- Framer Motion
- React Intersection Observer
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dr-fares-coaching.git
cd dr-fares-coaching
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

The build files will be in the `dist` directory.

## Project Structure

```
dr-fares-coaching/
├── public/
│   ├── favicon.svg
│   └── assets/
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/
│   │   ├── animations/   # Animation components
│   │   ├── layout/       # Layout components (Navbar, Footer, etc.)
│   │   ├── sections/     # Main page sections
│   │   └── ui/           # Reusable UI components
│   ├── constants/        # Constants and configuration
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global styles and Tailwind utilities
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```

## Component Organization

### Layout Components
- `NavBar.jsx` - Main navigation with smooth scrolling
- `Footer.jsx` - Footer with social links and quick navigation
- `HeaderLogo.jsx` - Brand logo with animations
- `MobileMenu.jsx` - Responsive menu for mobile devices

### Section Components
- `Landing.jsx` - Hero section with introduction
- `About.jsx` - About the coach
- `Services.jsx` - Description of coaching services
- `Transformations.jsx` - Client before/after showcases
- `Feedback.jsx` - Client testimonials
- `Packages.jsx` - Pricing packages
- `FAQ.jsx` - Frequently asked questions

### UI Components
- `Button.jsx` - Reusable button component
- `Card.jsx` - Card component for various content
- `ScrollToTop.jsx` - Scroll to top functionality
- `Skeleton.jsx` - Loading placeholders
- `ErrorBoundary.jsx` - Error handling component

## Customization

1. Update the content in each section component
2. Modify the color scheme in `tailwind.config.js`
3. Replace placeholder images in the `src/assets` directory
4. Update meta tags in `index.html`

## Language Support

The site fully supports both English and Arabic languages:

- Complete translation system using React Context
- RTL layout switching
- Specialized typography for Arabic content
- Proper text spacing and alignment for Arabic content

## Performance Optimizations

- Lazy loading of sections and components
- Image optimization
- CSS performance enhancements
- Smooth scrolling and animations optimized for performance
- Intersection Observer for scroll-based animations

## License

This project is licensed under the MIT License.

## Acknowledgments

- Icons from [Heroicons](https://heroicons.com/)
- Images provided by Dr. Fares Coaching
- Fonts from Google Fonts
