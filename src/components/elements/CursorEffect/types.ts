export type CursorConfig = {
  type?: string;
  label?: string;
  cursorType?:
    | 'bubbleCursor'
    | 'clockCursor'
    | 'emojiCursor'
    | 'fairyDustCursor'
    | 'followingDotCursor'
    | 'ghostCursor'
    | 'rainbowCursor'
    | 'snowflakeCursor'
    | 'springyEmojiCursor'
    | 'textFlag'
    | 'trailingCursor'
    | 'defaultCursor';
  options?: Record<string, unknown>;
  position?: 'left' | 'right';
};
