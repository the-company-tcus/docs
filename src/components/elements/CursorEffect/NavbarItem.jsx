import clsx from 'clsx';
import React, { useContext } from 'react';
import { CursorEffectContext } from './cursorContext';

const DefaultCursorEffectNavbarItem = ({
  label,
  className,
  isDropdownItem = false,
  activeClassName,
  isActive,
  mobile,
  ...props
}) => {
  const element = (
    <div
      className={clsx(
        isDropdownItem && (mobile ? 'menu__link' : 'dropdown__link'),
        className,
        isActive && activeClassName,
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

const CursorEffectNavbarItem = ({ cursorType, options, mobile, ...props }) => {
  const { cursor: activeCursor, setCursor } = useContext(CursorEffectContext);

  const handleClick = () => {
    setCursor({ cursorType, options });
  };

  return (
    <DefaultCursorEffectNavbarItem
      {...props}
      isActive={activeCursor.cursorType === cursorType}
      activeClassName={
        props.activeClassName ??
        (mobile ? 'menu__link--active' : 'dropdown__link--active')
      }
      mobile={mobile}
      onClick={handleClick}
    />
  );
};

export { CursorEffectNavbarItem };
