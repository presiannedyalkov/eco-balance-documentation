import React from 'react';
import * as Sentry from '@sentry/react';

// This component wraps the app to catch and report errors to Sentry
// Only loaded if SENTRY_DSN is configured
export default function SentryErrorBoundary({ children }) {
  // Initialize Sentry if DSN is provided
  if (typeof window !== 'undefined' && process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'production',
      tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
      beforeSend(event, hint) {
        // Don't send errors in development
        if (process.env.NODE_ENV === 'development') {
          return null;
        }
        return event;
      },
    });
  }

  return children;
}

