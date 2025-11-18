// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Eco Balance Documentation',
  tagline: 'Ecological Restoration for Wildlife Habitat and Biodiversity',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env.SITE_URL || 'https://docs.eco-balance.cc',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain (docs.eco-balance.cc): use '/'
  // For GitHub Pages project site: use '/eco-balance-documentation/'
  // If SITE_URL contains custom domain, use '/', otherwise use project pages path
  baseUrl: process.env.BASE_URL || (
    (process.env.SITE_URL && process.env.SITE_URL.includes('docs.eco-balance.cc')) 
      ? '/' 
      : (process.env.NODE_ENV === 'production' ? '/eco-balance-documentation/' : '/')
  ),

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'presiannedyalkov', // Usually your GitHub org/user name.
  projectName: 'eco-balance-documentation', // Usually your repo name.

  onBrokenLinks: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is in Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/presiannedyalkov/eco-balance-documentation/tree/main/',
          routeBasePath: '/', // Serve docs at root instead of /docs
        },
        blog: false, // Disable blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // Load clientModules for Meilisearch search bar
        // Docusaurus 3.x automatically loads src/clientModules.js if it exists
      }),
    ],
  ],

  // Plugins configuration
  plugins: [
    // Meilisearch plugin for search
    [
      require.resolve('./src/plugins/meilisearch-plugin.js'),
      {
        // Production: https://search.eco-balance.cc (via Cloudflare)
        // Local development: Set MEILISEARCH_HOST to local network address
        host: process.env.MEILISEARCH_HOST || 'https://search.eco-balance.cc',
        // Search-only key (safe to use in frontend)
        // Set via environment variable: MEILISEARCH_SEARCH_KEY
        searchKey: process.env.MEILISEARCH_SEARCH_KEY || 'e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489',
        // Master key for indexing (write permissions) - only used during build
        // Set via environment variable: MEILISEARCH_MASTER_KEY
        // This should be kept secret and only used in CI/CD, not in frontend
        masterKey: process.env.MEILISEARCH_MASTER_KEY,
        indexName: 'eco-balance-docs',
        batchSize: 100,
      },
    ],
    // Sentry webpack plugin to inject environment variables
    function(context, options) {
      return {
        name: 'sentry-env-injector',
        configureWebpack(config, isServer, utils) {
          if (isServer) {
            return {};
          }
          const {getJSLoader} = utils;
          return {
            plugins: [
              new (require('webpack')).DefinePlugin({
                'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN || ''),
                'process.env.SENTRY_RELEASE': JSON.stringify(process.env.SENTRY_RELEASE || ''),
              }),
            ],
          };
        },
      };
    },
  ],

  // Sentry integration
  // Configured via environment variables: SENTRY_DSN, SENTRY_RELEASE
  // See SENTRY_SETUP_COMPLETE.md for setup instructions

  // Client-side modules - explicitly configure clientModules.js
  // Docusaurus 3.x requires explicit configuration (does NOT auto-load src/clientModules.js)
  // Use relative path - require.resolve() may cause issues in production builds
  clientModules: [
    './src/clientModules.js',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      
      // Search configuration
      // Using Meilisearch (self-hosted, no approval needed, better than local search)
      // 
      // Option 1: Meilisearch (ACTIVE - Recommended)
      // - Typo tolerance
      // - Faster than local search
      // - Better relevancy
      // - Self-hosted (full control)
      // Configure via environment variables:
      //   MEILISEARCH_HOST - Your Meilisearch URL
      //   MEILISEARCH_SEARCH_KEY - Search-only API key
      //
      // Option 2: Local Search (Fallback)
      // Docusaurus will use local search if Meilisearch is not configured
      //
      // Option 3: Algolia DocSearch (Requires approval)
      // Uncomment and configure after Algolia approval
      /*
      algolia: {
        appId: process.env.ALGOLIA_APP_ID || 'YOUR_APP_ID',
        apiKey: process.env.ALGOLIA_API_KEY || 'YOUR_SEARCH_API_KEY',
        indexName: process.env.ALGOLIA_INDEX_NAME || 'YOUR_INDEX_NAME',
        contextualSearch: true,
        searchParameters: {},
        searchPagePath: 'search',
      },
      */
      
      navbar: {
        title: 'Eco Balance',
        logo: {
          alt: 'Eco Balance',
          src: 'img/logo.svg',
          href: '/',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'html',
            position: 'right',
            value: '<div id="meilisearch-search-wrapper"></div>',
          },
          {
            href: 'https://github.com/presiannedyalkov/eco-balance-documentation',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Quick Reference',
                to: '/resources/quick-reference',
              },
              {
                label: 'Roadmap',
                to: '/resources/roadmap',
              },
              {
                label: 'Feature Wishlist',
                to: '/resources/feature-wishlist',
              },
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'Executive Summary',
                to: '/vision-strategy/executive-summary',
              },
              {
                label: 'Project Vision',
                to: '/vision-strategy/project-vision',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/presiannedyalkov/eco-balance-documentation',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Restoration Methodology',
                to: '/operations/restoration-methodology',
              },
              {
                label: 'Business Model',
                to: '/business/business-model',
              },
              {
                label: 'Case Studies',
                to: '/learning/case-studies',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Eco Balance Project. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

