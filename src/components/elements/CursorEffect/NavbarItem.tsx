import type { Props } from '@theme/NavbarItem/DefaultNavbarItem';
import clsx from 'clsx';
import React, { ComponentProps, useContext } from 'react';
import { CursorEffectContext } from './cursorContext';
import type { CursorConfig } from './types';

type CursorEffectNavbarItemProps = Omit<Props, keyof ComponentProps<'a'>> &
  ComponentProps<'div'>;

const DefaultCursorEffectNavbarItem = ({
  label,
  className,
  isDropdownItem = false,
  activeClassName,
  isLinkActive,
  mobile,
  ...props
}: {
  isLinkActive: boolean;
} & CursorEffectNavbarItemProps) => {
  const element = (
    <div
      className={clsx(
        isDropdownItem && (mobile ? 'menu__link' : 'dropdown__link'),
        className,
        isLinkActive && activeClassName,
      )}
      {...props}
    >
      {label}
    </div>
  );

  if (isDropdownItem) {
    return <li className={clsx(mobile && 'menu__list-item')}>{element}</li>;
  }

  return element;
};

const CursorEffectNavbarItem = ({
  label,
  cursorType,
  options,
  mobile,
  ...props
}: CursorConfig & CursorEffectNavbarItemProps) => {
  const context = useContext(CursorEffectContext);

  const handleClick = () => {
    context?.setCursor({ label, cursorType, options });
  };

  return (
    <DefaultCursorEffectNavbarItem
      {...props}
      activeClassName={
        props.activeClassName ??
        (mobile ? 'menu__link--active' : 'dropdown__link--active')
      }
      isLinkActive={context?.cursor?.cursorType === cursorType}
      label={label}
      mobile={mobile}
      onClick={handleClick}
    />
  );
};

export { CursorEffectNavbarItem };
