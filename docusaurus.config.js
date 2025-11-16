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
  url: 'https://presiannedyalkov.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For local development, use '/' for easier access
  // For GitHub Pages deployment, this should be '/eco-balance-documentation/'
  baseUrl: process.env.BASE_URL || (process.env.NODE_ENV === 'production' ? '/eco-balance-documentation/' : '/'),

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
      }),
    ],
  ],

  // Client modules for Sentry integration
  // This file runs in the browser to initialize Sentry
  clientModules: [require.resolve('./src/clientModules.js')],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      
      // Search configuration
      // Using local search (no approval needed, works immediately)
      // Alternative: Algolia DocSearch (requires approval, faster for large sites)
      
      // Option 1: Local Search (ACTIVE - No approval needed)
      // Docusaurus will automatically use local search if Algolia is not configured
      // Local search works offline, no external dependencies, perfect for GitHub Pages
      
      // Option 2: Algolia DocSearch (COMMENTED - Requires approval)
      // Uncomment and configure after Algolia approval:
      // 1. Apply at: https://docsearch.algolia.com/apply/
      // 2. Add credentials below or via environment variables
      // 3. Uncomment the algolia config below
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

