import ColorModeToggle from '@theme-original/ColorModeToggle';
import React, { useEffect } from 'react';

export default function ColorModeToggleWrapper(props) {
  const { value: colorMode } = props;

  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (colorMode === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

  return (
    <>
      <ColorModeToggle {...props} />
    </>
  );
}
