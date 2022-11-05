import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Button, useMantineColorScheme } from '@mantine/core';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { PDFViewerButton } from '@site/src/components/PDFViewer/index';
import sample from '@site/static/pdf/sample.pdf';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg !bg-red-900"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  // const { toggleColorScheme } = useMantineColorScheme();
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        {/* <div className="w-500 h-500">
        </div> */}
        <PDFViewerButton url={sample} title="foo" embedMode="FULL_WINDOW" />
        <HomepageFeatures />
        <div className="bg-red-400 dark:bg-blue-900 h-40 w-40 animate-animated animate-infinite animate-bounce">
          Hello
        </div>
        {/* <Button onClick={() => toggleColorScheme()}>Foo</Button> */}
      </main>
    </Layout>
  );
}
