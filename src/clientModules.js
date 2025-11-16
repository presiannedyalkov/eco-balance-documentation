// Sentry initialization for Docusaurus
// This file runs in the browser to initialize Sentry error tracking

import * as Sentry from '@sentry/react';

// Initialize Sentry if DSN is provided
// In production, SENTRY_DSN should be set as a build-time environment variable
// or injected via window.SENTRY_DSN in the HTML
if (typeof window !== 'undefined') {
  // Check for DSN in multiple places
  const sentryDsn = 
    process.env.SENTRY_DSN || 
    window.SENTRY_DSN || 
    (window.__SENTRY_DSN__ ? window.__SENTRY_DSN__ : null);
  
  if (sentryDsn && sentryDsn !== 'YOUR_SENTRY_DSN' && sentryDsn.startsWith('http')) {
    Sentry.init({
      dsn: sentryDsn,
      environment: process.env.NODE_ENV || 'production',
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      // Performance Monitoring - 10% of transactions
      tracesSampleRate: 0.1,
      // Session Replay - 10% of sessions, 100% of error sessions
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
    
    console.log('✅ Sentry initialized for error tracking');
  } else if (process.env.NODE_ENV === 'production') {
    console.log('ℹ️ Sentry not initialized - DSN not configured');
  }
}

