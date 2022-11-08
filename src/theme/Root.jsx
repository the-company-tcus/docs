import React from 'react';
import { MantineProvider } from '../context/MantineProvider';
// eslint-disable-next-line import/no-unresolved
import 'windi.css';

// Default implementation, that you can customize
export default function Root({ children }) {
  return <MantineProvider>{children}</MantineProvider>;
}
