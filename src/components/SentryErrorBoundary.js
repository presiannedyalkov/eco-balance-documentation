/**
 * Sentry Error Boundary for React
 * 
 * Catches React component errors and sends them to Sentry.
 * Wrap your app or components with this to catch rendering errors.
 */

import React from 'react';
import * as Sentry from '@sentry/react';

class SentryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          color: 'var(--ifm-color-danger)',
        }}>
          <h2>Something went wrong</h2>
          <p>An error occurred while rendering this page.</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            The error has been reported. Please try refreshing the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SentryErrorBoundary;

