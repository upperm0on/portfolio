// Route definitions for the application
// This will be useful when implementing routing (e.g., React Router)

export const ROUTES = {
  HOME: '/',
  // Add more routes as needed:
  // ABOUT: '/about',
  // CONTACT: '/contact',
  // PROFILE: '/profile',
} as const;

// Route path type for type safety
export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

