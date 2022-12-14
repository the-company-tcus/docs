import { Icon } from '@iconify/react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {
  bubbleCursor,
  clockCursor,
  emojiCursor,
  fairyDustCursor,
  followingDotCursor,
  ghostCursor,
  rainbowCursor,
  snowflakeCursor,
  springyEmojiCursor,
  textFlag,
  trailingCursor,
} from 'cursor-effects';
import React, { useEffect, useState } from 'react';
import { CursorEffectContext } from './cursorContext';

const cursorEffects = {
  bubbleCursor,
  clockCursor,
  emojiCursor,
  fairyDustCursor,
  followingDotCursor,
  ghostCursor,
  rainbowCursor,
  snowflakeCursor,
  springyEmojiCursor,
  textFlag,
  trailingCursor,
};

const CursorEffectDropdownNavbarItem = (props) => {
  const [cursor, setCursor] = useState(props.items[0]);
  const { cursorType, options } = cursor;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (cursorType !== 'defaultCursor') {
      const { destroy } = new cursorEffects[cursorType](options);

      return () => {
        destroy();
      };
    }
  }, [cursorType, options]);

  // Ref: https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/NavbarItem/LocaleDropdownNavbarItem/styles.module.css
  const navbarLabel = (
    <>
      <Icon
        className="mr-5px align-text-bottom"
        icon="mdi:cursor-default-gesture-outline"
        width={24}
      />
      {props.label}
    </>
  );

  return (
    <CursorEffectContext.Provider value={{ cursor, setCursor }}>
      <DropdownNavbarItem {...props} label={navbarLabel} />
    </CursorEffectContext.Provider>
  );
};

export { CursorEffectDropdownNavbarItem };
