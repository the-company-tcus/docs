import { createContext } from 'react';
import { CursorConfig } from './types';

type CursorEffectContextType = {
  cursor: Pick<CursorConfig, 'label' | 'cursorType' | 'options'>;
  setCursor: React.Dispatch<
    React.SetStateAction<Pick<CursorConfig, 'label' | 'cursorType' | 'options'>>
  >;
};

export const CursorEffectContext = createContext<CursorEffectContextType>(null);
