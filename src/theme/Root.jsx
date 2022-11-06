import React from 'react';
import 'windi.css';
import { MantineProvider } from '../context/MantineProvider';

// Default implementation, that you can customize
export default function Root({ children }) {
  return <MantineProvider>{children}</MantineProvider>;
}
