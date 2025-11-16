// Sentry initialization for Docusaurus
// This runs in the browser to initialize Sentry error tracking

import * as Sentry from '@sentry/react';

// Initialize Sentry if DSN is provided via environment variable
// In production, this should be set as a build-time environment variable
if (typeof window !== 'undefined') {
  const sentryDsn = process.env.SENTRY_DSN || window.SENTRY_DSN;
  
  if (sentryDsn && sentryDsn !== 'YOUR_SENTRY_DSN') {
    Sentry.init({
      dsn: sentryDsn,
      environment: process.env.NODE_ENV || 'production',
      tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: 0.1,
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      beforeSend(event, hint) {
        // Don't send errors in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Sentry error (not sent in dev):', event);
          return null;
        }
        return event;
      },
    });
    
    console.log('Sentry initialized for error tracking');
  }
}

