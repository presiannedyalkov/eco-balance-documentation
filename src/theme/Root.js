/**
 * Swizzled Root wrapper — renders the app plus the global "chat with the docs"
 * floating widget on every page. BrowserOnly keeps it out of SSR (the widget
 * uses window/fetch and probes the Access-gated chat backend at runtime).
 */
import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Root({ children }) {
  return (
    <>
      {children}
      <BrowserOnly>
        {() => {
          const DocsChatWidget = require('@site/src/components/DocsChatWidget').default;
          return <DocsChatWidget />;
        }}
      </BrowserOnly>
    </>
  );
}
