import type { ThemeConfig } from '@docusaurus/preset-classic';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
import { CursorEffectContext } from '@site/src/components/elements/CursorEffect/cursorContext';
import type { CursorConfig } from '@site/src/components/elements/CursorEffect/types';

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

const CursorEffectProvider = ({ children }: { children?: React.ReactNode }) => {
  const { siteConfig } = useDocusaurusContext();

  const navbarItems = (siteConfig.themeConfig as ThemeConfig).navbar.items;

  const defaultCursor: CursorConfig = navbarItems.find((item) => {
    return item.type === 'custom-cursorEffectDropdown';
  }).items[0];

  const [cursor, setCursor] = useState<CursorConfig>(defaultCursor);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (cursor?.cursorType && cursor.cursorType !== 'defaultCursor') {
      const { destroy } = new cursorEffects[cursor.cursorType](cursor.options);

      return () => {
        destroy();
      };
    }
  }, [cursor]);

  return (
    <CursorEffectContext.Provider
      value={{
        cursor,
        setCursor,
      }}
    >
      {children}
    </CursorEffectContext.Provider>
  );
};

export { CursorEffectProvider };
