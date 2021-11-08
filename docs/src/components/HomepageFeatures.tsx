/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Compose user stories using typescript',
    image: '/img/undraw_docusaurus_mountain.svg',
    description: <>All the advantages of typescript and code to write robust user stories.</>,
  },
  {
    title: 'Export to anywhere',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>Export your stories to any format you want, and even use plugins to export directly to Google Sheets and Jira</>
    ),
  },
  {
    title: 'Generate stories',
    image: '/img/undraw_docusaurus_react.svg',
    description: <>Easily generate stories for all the CRUD operations.</>,
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
