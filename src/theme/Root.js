/**
 * Swizzled Root wrapper — renders the app plus the global floating widgets on
 * every page: the "chat with the docs" assistant and the reader annotation
 * layer. BrowserOnly keeps them out of SSR (they use window/fetch and probe the
 * Access-gated backend at runtime).
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
          const AnnotationLayer = require('@site/src/components/AnnotationLayer').default;
          return (
            <>
              <DocsChatWidget />
              <AnnotationLayer />
            </>
          );
        }}
      </BrowserOnly>
    </>
  );
}
