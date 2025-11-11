import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// Simple placeholder component for SVGs
const PlaceholderSvg = ({title}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" style={{width: '200px', height: '200px'}}>
    <rect width="400" height="200" fill="#2e8555" opacity="0.1" rx="10"/>
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" 
          fontFamily="Arial, sans-serif" fontSize="24" fill="#2e8555" fontWeight="bold">
      {title}
    </text>
  </svg>
);

const FeatureList = [
  {
    title: 'Vision & Strategy',
    description: (
      <>
        Explore our core vision, mission, and strategic approach to ecological restoration
        and wildlife habitat creation. Learn about our adaptive framework and success factors.
      </>
    ),
    link: '/docs/vision-strategy/project-vision',
  },
  {
    title: 'Operations & Methodology',
    description: (
      <>
        Learn about our holistic restoration methodology, technology integration, and how we
        address challenges in ecological restoration through evidence-based approaches.
      </>
    ),
    link: '/docs/operations/restoration-methodology',
  },
  {
    title: 'Business & Growth',
    description: (
      <>
        Understand our sustainable business model, funding strategy, and plans for expansion
        and growth across Southern Europe. See our financial projections and risk assessment.
      </>
    ),
    link: '/docs/business/business-model',
  },
];

function Feature({title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <PlaceholderSvg title={title} className={styles.featureSvg} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} className="button button--secondary">Learn More →</a>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

