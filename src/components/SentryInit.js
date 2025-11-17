/**
 * Sentry initialization for Docusaurus
 * 
 * This module initializes Sentry error tracking for the documentation site.
 * It runs in the browser and tracks JavaScript errors, performance, and user sessions.
 */

import * as Sentry from '@sentry/react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function initSentry() {
  // Only initialize in browser (not during SSR)
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }

  // Get DSN from environment (injected at build time via webpack DefinePlugin)
  const dsn = process.env.SENTRY_DSN;

  if (!dsn) {
    console.log('ℹ️ [Sentry] DSN not configured, Sentry disabled');
    return;
  }

  // Get environment
  const environment = process.env.NODE_ENV || 'development';
  
  // Only track in production
  if (environment !== 'production') {
    console.log('ℹ️ [Sentry] Not in production mode, Sentry disabled');
    return;
  }

  try {
    Sentry.init({
      dsn: dsn,
      environment: environment,
      
      // Performance monitoring
      tracesSampleRate: 0.1, // 10% of transactions
      
      // Session replay (optional - helps debug issues)
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of error sessions
      
      // Release tracking (set during build)
      release: process.env.SENTRY_RELEASE || undefined,
      
      // Integrations
      integrations: [
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
        Sentry.browserTracingIntegration(),
      ],
      
      // Filter out known non-critical errors
      ignoreErrors: [
        // Browser extensions
        'top.GLOBALS',
        'originalCreateNotification',
        'canvas.contentDocument',
        'MyApp_RemoveAllHighlights',
        'atomicFindClose',
        'fb_xd_fragment',
        'bmi_SafeAddOnload',
        'EBCallBackMessageReceived',
        // Network errors that are not actionable
        'NetworkError',
        'Network request failed',
        // Known browser issues
        'ResizeObserver loop limit exceeded',
      ],
      
      // Filter out URLs from browser extensions
      denyUrls: [
        /extensions\//i,
        /^chrome:\/\//i,
        /^chrome-extension:\/\//i,
        /^moz-extension:\/\//i,
      ],
      
      // Set user context if available
      beforeSend(event, hint) {
        // Add custom context
        event.tags = {
          ...event.tags,
          component: 'docusaurus-docs',
        };
        
        return event;
      },
    });

    console.log('✅ [Sentry] Initialized successfully');
  } catch (error) {
    console.error('❌ [Sentry] Initialization failed:', error);
  }
}

// Initialize when module loads
initSentry();

export default initSentry;

