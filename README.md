# OTP Auto-fill React App (Vite)

A modern React application built with Vite featuring a sign-up form with OTP (One-Time Password) auto-fill functionality.

## Features

- **Modern React Setup**: Built with Vite for fast development and optimized builds
- **Sign-up Form**: Complete form with first name, last name, email, and phone number fields
- **OTP Field**: 6-digit OTP input with individual digit boxes
- **Auto-fill OTP**: Simulated OTP auto-fill functionality that mimics SMS detection
- **Modern UI**: Clean, responsive design with gradient backgrounds and smooth animations
- **Form Validation**: Client-side validation for all required fields
- **Paste Support**: Support for pasting OTP codes from clipboard
- **Hot Module Replacement**: Instant updates during development

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting
- **CSS3** - Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## How to Use

1. Fill in the sign-up form with your details
2. Click "Send OTP" to generate a verification code
3. The OTP will be auto-filled after 2 seconds (simulating SMS delivery)
4. You can also manually enter the OTP or use the "Simulate OTP Auto-fill" button
5. Click "Create Account" to complete the sign-up process

## OTP Auto-fill Features

- **Real SMS Detection**: Uses WebOTP API (OTPCredential) for actual SMS auto-fill
- **Browser Fallback**: Automatically falls back to simulation on unsupported browsers
- **Manual Entry**: Users can manually type or paste OTP codes
- **Visual Feedback**: Filled OTP digits are highlighted
- **Keyboard Navigation**: Use arrow keys and backspace to navigate between fields
- **Paste Support**: Paste a 6-digit code to auto-fill all fields
- **HTTPS Ready**: Works with real SMS when deployed over HTTPS

## Project Structure

```
otp-auto-fill/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── SignUpForm.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Development Features

- **Hot Module Replacement**: Changes reflect instantly
- **ESLint Integration**: Automatic code quality checks
- **Modern JavaScript**: ES6+ features and React hooks
- **Component-based Architecture**: Modular and reusable components
- **CSS Organization**: Centralized styling with modern CSS features

## Production Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Browser Compatibility

- Modern browsers that support ES6+ features
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## WebOTP API Implementation

This app now uses the **WebOTP API (OTPCredential)** for real SMS-based OTP auto-fill:

### Browser Support:

- ✅ **Chrome/Edge**: Version 84+ (Android)
- ✅ **Chrome**: Version 84+ (Desktop with Android device)
- ❌ **Safari**: Not currently supported
- ❌ **Firefox**: Not currently supported

### SMS Format Required:

```
Your OTP is: 123456

@yourdomain.com #123456
```

### Testing:

1. **Real SMS**: Deploy to HTTPS and test with supported browsers
2. **Fallback**: Automatically uses simulation mode on unsupported browsers

See `WebOTP-Implementation.md` for detailed implementation guide.

## Future Enhancements

- Backend integration for form submission
- Database storage for user accounts
- Email verification workflow
- TypeScript migration for better type safety
- Unit and integration tests
- PWA capabilities
- Enhanced error handling for WebOTP API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to check code quality
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development.
