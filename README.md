# Coach Portfolio Website

A modern, responsive portfolio website for an online coach built with React and Tailwind CSS.

## Features

- 🎨 Modern, minimal design with dark theme
- 📱 Fully responsive layout
- 🎯 Sections for services, packages, and testimonials
- 📝 Blog and resources section
- 📅 Booking system for coaching sessions
- 📧 Contact form with validation
- ⚡ Fast and optimized performance
- 🌐 Bilingual support with full English and Arabic translations
- 📦 RTL (Right-to-Left) layout support for Arabic
- 🖋 Enhanced typography with specialized Arabic font (29LT Bukra)
- 🔍 Accessibility features for screen readers

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Framer Motion
- React Hook Form
- Yup
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coach-portfolio.git
cd coach-portfolio
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
coach-portfolio/
├── public/
│   ├── favicon.svg
│   └── assets/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── Booking.jsx
│   │   ├── ContactForm.jsx
│   │   ├── Credibility.jsx
│   │   ├── FAQ.jsx
│   │   ├── Footer.jsx
│   │   ├── Landing.jsx
│   │   ├── NavBar.jsx
│   │   ├── NotFound.jsx
│   │   ├── Packages.jsx
│   │   ├── Services.jsx
│   │   ├── Testimonials.jsx
│   │   └── Transformations.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Customization

1. Update the content in each component to match your needs
2. Modify the color scheme in `tailwind.config.js`
3. Replace placeholder images in the `public/assets` directory
4. Update meta tags in `index.html`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons from [Heroicons](https://heroicons.com/)
- Images from [Unsplash](https://unsplash.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## Language Support

The site fully supports both English and Arabic languages:

- Complete translation system using React Context
- RTL layout switching
- Arabic typography using 29LT Bukra font (see [Font Installation](./FONT_INSTALLATION.md))
- Proper text spacing and alignment for Arabic content

## Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. For Arabic font support, follow the instructions in [FONT_INSTALLATION.md](./FONT_INSTALLATION.md)

## Technologies Used

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
