import { Icon } from '@iconify/react';
import type { Props } from '@theme/NavbarItem/DropdownNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import React, { useContext } from 'react';
import { CursorEffectContext } from './cursorContext';
import type { CursorConfig } from './types';

const CursorEffectDropdownNavbarItem = ({
  mobile = false,
  ...props
}: {
  items: CursorConfig[];
} & Props) => {
  const context = useContext(CursorEffectContext);

  // Ref: https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/NavbarItem/LocaleDropdownNavbarItem/styles.module.css
  const navbarLabel = (
    <>
      <Icon
        className="mr-5px align-text-bottom"
        icon="mdi:cursor-default-gesture-outline"
        width={24}
      />
      {mobile ? props.label : context?.cursor?.label}
    </>
  );

  return <DropdownNavbarItem mobile={mobile} {...props} label={navbarLabel} />;
};

export { CursorEffectDropdownNavbarItem };
