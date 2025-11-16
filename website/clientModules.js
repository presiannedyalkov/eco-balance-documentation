// Sentry error tracking integration
// Only loads if SENTRY_DSN environment variable is set

export default function clientModules() {
  // Sentry will be initialized client-side if DSN is provided
  // The actual initialization happens in the browser via the ErrorBoundary component
  return [];
}

