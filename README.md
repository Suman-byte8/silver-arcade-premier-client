# Silver Arcade Premiere Client

A modern React-based frontend application for the Silver Arcade Premiere hotel management system, featuring responsive design, real-time communication, and seamless user experience.

## Overview

This client application provides a comprehensive user interface for hotel guests and members, including room browsing, membership management, reservations, and real-time features.

## Technologies Used

### Core Framework & Libraries
- **React 18**: Modern JavaScript library for building user interfaces
- **React DOM**: React rendering library for web applications
- **React Router DOM**: Declarative routing for React applications
- **Axios**: HTTP client for making API requests with interceptors

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Material-UI (MUI)**: React components implementing Google's Material Design
- **Emotion**: CSS-in-JS library for styling React components
- **Lucide React**: Beautiful & consistent icon toolkit
- **React Icons**: Popular icon library with multiple icon packs

### Image & Media Handling
- **React Image**: Optimized image component with lazy loading
- **Browser Image Compression**: Client-side image compression library
- **Cloudinary**: Real-time image optimization and transformation

### Carousel & Interactive Components
- **Swiper**: Modern mobile touch slider with hardware accelerated transitions
- **React Responsive Carousel**: Responsive carousel component
- **GSAP**: High-performance JavaScript animation library

### Real-time Communication
- **Socket.io Client**: Real-time bidirectional event-based communication

### Form & Data Handling
- **React Hot Toast**: Beautiful toast notifications
- **React Toastify**: Toast notifications library
- **QRCode**: QR code generation library
- **jsPDF**: Client-side PDF generation

### Development & Build Tools
- **Vite**: Fast build tool and development server
- **ESLint**: JavaScript linting utility
- **Autoprefixer**: PostCSS plugin for CSS vendor prefixing

## Client-side Features

### Authentication System
- **JWT-based Authentication**: Secure token-based user authentication
- **Remember Me Functionality**: Optional email persistence in localStorage
- **Auto Logout**: Graceful handling of expired tokens
- **Protected Routes**: Route-level authentication guards

### Caching Strategy
- **Local Storage**: Email persistence for "Remember Me" functionality
- **Session Management**: Automatic token cleanup on logout
- **State Persistence**: User preferences and session data management

### Real-time Features
- **Live Updates**: Real-time notifications and updates via Socket.io
- **Interactive Components**: Dynamic UI updates based on server events

### Responsive Design
- **Mobile-First**: Optimized for mobile devices with progressive enhancement
- **Cross-Browser Compatibility**: Consistent experience across modern browsers
- **Adaptive Layouts**: Responsive components that work on all screen sizes

## Architecture

### Component Structure
- **Pages**: Route-based page components (Home, Login, Profile, etc.)
- **Components**: Reusable UI components (Carousel, Navbar, Forms, etc.)
- **Services**: API service layer with Axios interceptors
- **Context**: React Context for global state management
- **Utils**: Utility functions and helpers

### State Management
- **React Context**: Global state management for authentication and user data
- **Local State**: Component-level state with React hooks
- **Persistent State**: localStorage for user preferences and cached data

### API Integration
- **Axios Interceptors**: Automatic token attachment and error handling
- **Request/Response Interceptors**: Centralized API request and response processing
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Key Features

### User Interface
- **Modern Design**: Clean, intuitive interface with Material Design principles
- **Dark/Light Themes**: Theme support with system preference detection
- **Smooth Animations**: GSAP-powered animations for enhanced UX
- **Loading States**: Skeleton screens and loading indicators

### Image Management
- **Optimized Loading**: Lazy loading and progressive image loading
- **Compression**: Automatic client-side image compression
- **CDN Integration**: ImageKit for real-time image optimization

### Navigation & Routing
- **Declarative Routing**: React Router for client-side navigation
- **Protected Routes**: Authentication-based route protection
- **Breadcrumb Navigation**: Clear navigation hierarchy

### Forms & Validation
- **Form Components**: Reusable form components with validation
- **Real-time Validation**: Instant feedback on user input
- **Error Handling**: Comprehensive form error handling

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Environment Configuration

### Environment Variables
- `VITE_BACKEND_URL`: Backend API base URL
- `VITE_SOCKET_URL`: Socket.io server URL

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimizations

- **Code Splitting**: Route-based code splitting with React.lazy
- **Image Optimization**: Automatic image compression and WebP conversion
- **Bundle Analysis**: Optimized bundle sizes with tree shaking
- **Caching**: Intelligent caching strategies for improved load times

## Contributing

1. Follow the established code style and conventions
2. Use ESLint for code quality
3. Test components thoroughly
4. Follow Git commit conventions
5. Create feature branches for new developments

## Recent Updates

### Carousel and UI Enhancements
- Migrated to Swiper.js for advanced carousel functionality
- Implemented GSAP animations for smooth transitions
- Enhanced responsive design across all components

### Authentication Improvements
- Added "Remember Me" functionality with secure localStorage usage
- Fixed auto-logout issues with proper token validation
- Improved error handling for authentication flows

### Performance Improvements
- Implemented lazy loading for images and components
- Added client-side image compression
- Optimized bundle sizes and loading strategies

## Distinctive Brands Section

- **Interactive Brand Showcase**: Implemented an interactive section to display the company's distinctive hotel brands.
- **Dynamic Content Display**: When a user clicks on a brand link, the corresponding description and image gallery are displayed dynamically.
- **Overlapping Layout**: Created a visually appealing overlapping layout for the description and image gallery using Tailwind CSS.
- **Image Slider Integration**: Integrated the Swiper.js slider to display a gallery of images for each brand.
- **State Management**: Used React's `useState` hook to manage the state of the selected brand.
- **Component Reusability**: The `DescLayout` and `Slider` components are designed to be reusable.
- **Responsive Layout (`DescLayout.jsx`)**: Ensured the `DescLayout` component is responsive, with the image section moving to the top and text below it on smaller screens.

## Why Book With Us Section

- **Component:** `src/components/Home Page/Curated Offers/WhyBookWIthUS.jsx`
- **Description:** This component highlights the key benefits of booking directly with the company. It is designed to build trust and incentivize users to book through the platform.
- **Features:**
  - Displays a clear "Why Book With Us" title.
  - Integrates the company's `FullLogo`.
  - Showcases key advantages with corresponding icons from `react-icons`:
    - **Best Rates Guaranteed**: Emphasized with a rupee sign icon.
    - **Member Rates**: Indicated with a user icon.
    - **Special Offers**: Highlighted with a tags icon.
    - **Wi-Fi**: Represented with a Wi-Fi icon.
- **Styling:** The component uses Tailwind CSS for styling, featuring a clean, modern look with a shadow effect to make it stand out.
- **Responsive Layout**: Made the component responsive, ensuring it displays as a one-liner flex layout that wraps appropriately on smaller screens.

# Booking Confirmation Page Documentation

## Overview

The booking confirmation page provides a comprehensive summary of completed reservations with detailed booking information, guest details, and payment summary.

## Features

- **Complete Booking Summary**: Displays all reservation details
- **Guest Information**: Shows guest details and contact information
- **Payment Summary**: Itemized breakdown of charges
- **Action Buttons**: Options to modify or cancel bookings
- **Responsive Design**: Optimized for all device sizes

### Usage

The booking confirmation page is automatically displayed after successful reservation completion. It can be accessed via:

- Direct URL: `/booking-confirmation`
- After successful form submission
- From reservation management dashboard

## Footer Section

- **Component:** `src/components/Footer.jsx`
- **Description:** A comprehensive footer for the website, providing social media links, navigation, and copyright information.
- **Features:**
  - **Social Media Integration:** Includes icons for major social platforms like Twitter, YouTube, Instagram, and Facebook, using `react-icons`.
  - **Brand Logo:** Displays the company's `FullLogo`.
  - **Navigation Links:** Provides quick links to important pages like "About," "Contact," "Privacy Policy," and "Terms of Service."
  - **Copyright Information:** Shows the current year and company name for copyright purposes.

## Responsive Design Enhancements

This section details the comprehensive responsive design improvements implemented across various components and pages to ensure optimal viewing and interaction on diverse devices.

- **Offers Display Logic (`Offers.jsx`)**:

  - Modified the `Offers.jsx` component to dynamically display offers based on screen size.
  - On mobile, only the first offer is shown.
  - On medium screens and above, up to three offers are displayed.
  - The "View All Offers" button now correctly redirects to the `/our-offers` route, where all available offers are listed.
  - Updated `Card.jsx` to accept and apply responsive classes.

- **Main Navbar (`Navbar.jsx`)**:

  - Implemented a responsive design for the main navigation bar.
  - On smaller screens, a mobile menu (hamburger icon) is used to toggle the visibility of navigation links.
  - Integrated a smooth slide-in animation for the mobile menu using GSAP (`gsap` library).

- **Semi-Navbar (`SemiNavbar.jsx`)**:

  - Made the semi-navbar responsive without relying on a hamburger menu.
  - All navigation links are now always visible and wrap responsively on smaller screens.
  - The hamburger icon and associated mobile menu logic have been removed.

- **Reservation Page (`ReservationPage.jsx` and related components)**:

  - **`ReservationPage.jsx`**: Updated the main layout to use `flex-col md:flex-row` for the sidebar and main content, and `flex-col lg:flex-row` for the form and info panel.
  - **`ReservationSidebar.jsx`**: Adjusted the sidebar's width to be `w-full md:w-64` for responsiveness.
  - **`InfoPanel.jsx`**: Modified the info panel's width to be `w-full lg:w-80`.
  - **Form Components (`AccommodationForm.jsx`, `RestaurantForm.jsx`, `MeetingWeddingForm.jsx`)**:
    - Converted side-by-side form field layouts to stack vertically on smaller screens using `flex-col md:flex-row` or `grid-cols-1 md:grid-cols-2`.

- **Our Rooms Page (`OurRooms.jsx`)**:

  - Enhanced responsiveness by adding horizontal padding (`px-4`) to the main container.
  - Adjusted the search bar and filter dropdown to take full width on small screens (`w-full`) and adapt appropriately on larger screens (`sm:max-w-md`, `sm:w-auto`).

- **Facilities Page (`Facilities.jsx`)**:

  - Improved responsiveness by removing redundant Material-UI `Grid` components and relying solely on Tailwind CSS grid classes (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
  - Adjusted horizontal padding to `px-4 md:px-12` for better mobile display.

- **About Us Page (`AboutUs.jsx`)**:

  - Enhanced responsiveness by adjusting the main container's horizontal padding to `px-4 md:px-12`.
  - Made the hero video's height responsive (`h-[200px] sm:h-[300px] md:h-[400px]`).

- **Our Heart Malda Page (`HeartMalda.jsx`)**:
  - Improved responsiveness of the hero video's height (`h-64 sm:h-80 md:h-96`).
  - Made text sizes in the introduction section responsive (`text-3xl sm:text-4xl` for `h2`, `text-lg sm:text-xl` for `p`).
  - Adjusted image height within feature cards (`h-48 sm:h-56 md:h-64`) and removed fixed min/max heights from content areas.

## Deployment & Bug Fixes

This section documents critical fixes and updates made to ensure successful deployment and enhance functionality.

- **Netlify Build Errors:**

  - **Issue:** The application failed to build on Netlify due to case-sensitivity issues in import paths. This is a common problem when developing on a case-insensitive OS (like Windows) and deploying to a case-sensitive OS (like Linux).
  - **Resolution:** Corrected the casing in the following import statements:
    - In `src/pages/Home.jsx`, changed `../components/Home Page/Curated Offers/offers` to `../components/Home Page/Curated Offers/Offers`.
    - In `src/components/Home Page/Distinctive/DescLayout.jsx`, changed `../../Fulllogo` to `../../FullLogo`.

- **Contact Us Map:**
  - **Issue:** The map in the "Contact Us" section was displaying a default location.
  - **Resolution:** Updated the `iframe` `src` in `src/components/Home Page/Contact Us/Contact.jsx` to use a Google Maps embed URL with the specific coordinates provided by the user, ensuring the correct location is displayed.

## Authentication Improvements: Client-Side Caching and Auto Logout Fixes

This section details the recent enhancements made to the authentication system to improve user experience by implementing client-side caching for login credentials and fixing automatic logout issues.

### Changes Made

- **UserContext.jsx Updates**:
  - Removed the periodic token validation check (every 5 seconds) that was causing unnecessary redirects and potential auto-logouts.
  - Improved the app mount logic to properly validate tokens by fetching the user profile on load. If the fetch fails (e.g., due to an expired token), the token is cleared, and the user is redirected to the login page.
  - This ensures that only invalid tokens trigger logout, not temporary network issues or other API errors.

- **LoginPage.jsx Enhancements**:
  - Added a "Remember Me" checkbox to allow users to opt-in to email caching.
  - Implemented pre-filling of the email field on page load if a remembered email exists in localStorage.
  - On successful login, if "Remember Me" is checked, the email is stored in localStorage for future sessions.
  - On logout, the remembered email is cleared to prevent persistence across different users.

### Benefits

- **Improved User Experience**: Users no longer need to re-enter their email every time they visit the site if they choose "Remember Me".
- **Reduced Auto-Logouts**: The removal of aggressive periodic checks prevents users from being logged out during normal site usage.
- **Proper Token Validation**: Tokens are now validated only when necessary (on app load), and invalid tokens are handled gracefully without disrupting the user experience.
- **Security**: Remembered emails are cleared on logout, and passwords are never stored locally.

### Technical Details

- **Storage**: Uses localStorage for email persistence, ensuring data survives browser sessions but is cleared on logout.
- **Token Handling**: Axios interceptor continues to handle 401 responses by clearing tokens and redirecting, providing a fallback for API-level authentication failures.
- **State Management**: The UserContext now properly manages authentication state based on actual token validity rather than presence alone.
