import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import React, { useEffect, useRef } from 'react';
import { MantineProvider } from '../context/MantineProvider';
// eslint-disable-next-line import/no-unresolved
import 'windi.css';

// Default implementation, that you can customize
export default function Root({ children }) {
  const colorScheme = useRef(
    ExecutionEnvironment.canUseDOM
      ? document.documentElement.dataset.theme
      : '',
  );

  useEffect(() => {
    const root = document.documentElement;

    const observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          if (mutation.target.dataset.theme === 'dark') {
            colorScheme.current = 'dark';
          } else if (mutation.target.dataset.theme === 'light') {
            colorScheme.current = 'light';
          }
        }
      });
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (colorScheme.current === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (colorScheme.current === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [colorScheme]);

  return <MantineProvider>{children}</MantineProvider>;
}
