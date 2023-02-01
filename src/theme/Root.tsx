import React from 'react';
import { QueryProvider } from '../context/QueryProvider';
// eslint-disable-next-line import/no-unresolved
import 'windi-components.css';
// eslint-disable-next-line import/no-unresolved
import 'windi-utilities.css';

// Default implementation, that you can customize
export default function Root({ children }: { children?: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
