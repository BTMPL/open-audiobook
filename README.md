# Audio Book Player

A modern, feature-rich audiobook player built with React Native and Expo. This application provides a seamless listening experience with a beautiful user interface and powerful features.

## Features

- 📚 Library Management

  - Browse and organize your audiobook collection
  - Track reading progress
  - Mark books as not started, in progress, or finished
  - Download books for offline listening
  - Sort books by activity, duration, or alphabetically

- 🎧 Audio Player

  - Chapter navigation
  - Playback speed control (0.7x - 2x)
  - 30-second skip forward/backward
  - Background audio playback
  - Progress tracking and resume capability
  - Integrates with iOS lockscreen widget

- 💫 Modern UI
  - Dark/Light mode support
  - Cover art display
  - Chapter progress visualization

## Technologies

- React Native with Expo
- TypeScript for type safety
- React Native Track Player for audio playback
- Expo Router for navigation
- SQLite for local storage
- Custom theming system

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- iOS Simulator (for iOS development)
- Android Studio and Android SDK (for Android development)
- Xcode (for iOS development, macOS only)

## Getting Started

1. Clone the repository

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` to run on iOS Simulator
   - Press `a` to run on Android Emulator
   - Scan the QR code with Expo Go on your device

## Development

### Project Structure

- `/app` - Main application screens and navigation
- `/components` - Reusable React components
- `/constants` - Theme and configuration constants
- `/utils` - Helper functions and utilities
- `/hooks` - Custom React hooks
- `/ios` & `/android` - Native platform configurations

### Key Commands

- `npm start` - Start the Expo development server
- `npm run ios` - Run the app in iOS Simulator
- `npm run android` - Run the app in Android Emulator
- `npm run web` - Run the app in web browser
- `npm test` - Run tests
- `npm run lint` - Run linter

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Track Player](https://react-native-track-player.js.org/)
