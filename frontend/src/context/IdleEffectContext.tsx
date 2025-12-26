// Idle Effect Context
// Provides idle state and element registration for hero components

import { createContext, useContext, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';

export interface IdleEffectContextValue {
  isIdle: boolean;
  idleProgress: number; // 0-1, how far into idle effect
  registerElement: (id: string, element: HTMLElement) => void;
  unregisterElement: (id: string) => void;
  getElement: (id: string) => HTMLElement | undefined;
  getAllElements: () => Map<string, HTMLElement>;
}

const IdleEffectContext = createContext<IdleEffectContextValue | undefined>(undefined);

export function useIdleEffectContext(): IdleEffectContextValue {
  const context = useContext(IdleEffectContext);
  if (!context) {
    throw new Error('useIdleEffectContext must be used within IdleEffectProvider');
  }
  return context;
}

interface IdleEffectProviderProps {
  children: ReactNode;
  isIdle: boolean;
  idleProgress?: number;
}

export function IdleEffectProvider({ children, isIdle, idleProgress = 0 }: IdleEffectProviderProps) {
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  const registerElement = useCallback((id: string, element: HTMLElement) => {
    elementsRef.current.set(id, element);
  }, []);

  const unregisterElement = useCallback((id: string) => {
    elementsRef.current.delete(id);
  }, []);

  const getElement = useCallback((id: string) => {
    return elementsRef.current.get(id);
  }, []);

  const getAllElements = useCallback(() => {
    return elementsRef.current;
  }, []);

  const value: IdleEffectContextValue = {
    isIdle,
    idleProgress,
    registerElement,
    unregisterElement,
    getElement,
    getAllElements,
  };

  return (
    <IdleEffectContext.Provider value={value}>
      {children}
    </IdleEffectContext.Provider>
  );
}

