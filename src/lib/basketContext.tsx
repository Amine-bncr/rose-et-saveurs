import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { basketReducer, basketTotal, itemCount, parseStoredLines, resolveLines, type ResolvedLine } from './basket';
import { readStorage, writeStorage } from './storage';

const STORAGE_KEY = 'rs-basket-v1';

interface BasketContextValue {
  lines: ResolvedLine[];
  count: number;
  /** Null when the basket is not empty and at least one line has no price. */
  total: number | null;
  qtyFor: (key: string) => number;
  add: (itemId: string, variantId?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  drawerRequested: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  /** Increments on every add, so the basket button can replay its bounce. */
  pulse: number;
}

const BasketContext = createContext<BasketContextValue | null>(null);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [raw, dispatch] = useReducer(basketReducer, undefined, () => parseStoredLines(readStorage(STORAGE_KEY)));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerRequested, setDrawerRequested] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    writeStorage(STORAGE_KEY, JSON.stringify(raw.map(({ itemId, variantId, qty }) => ({ itemId, variantId, qty }))));
  }, [raw]);

  const lines = useMemo(() => resolveLines(raw), [raw]);
  const count = useMemo(() => itemCount(lines), [lines]);
  const total = useMemo(() => basketTotal(lines), [lines]);

  const qtyFor = useCallback((key: string) => raw.find((line) => line.key === key)?.qty ?? 0, [raw]);
  const add = useCallback((itemId: string, variantId?: string) => {
    dispatch({ type: 'add', itemId, variantId });
    setPulse((p) => p + 1);
  }, []);
  const setQty = useCallback((key: string, qty: number) => dispatch({ type: 'set', key, qty }), []);
  const remove = useCallback((key: string) => dispatch({ type: 'remove', key }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const openDrawer = useCallback(() => {
    setDrawerRequested(true);
    setDrawerOpen(true);
  }, []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<BasketContextValue>(
    () => ({ lines, count, total, qtyFor, add, setQty, remove, clear, drawerOpen, drawerRequested, openDrawer, closeDrawer, pulse }),
    [lines, count, total, qtyFor, add, setQty, remove, clear, drawerOpen, drawerRequested, openDrawer, closeDrawer, pulse],
  );

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export function useBasket(): BasketContextValue {
  const context = useContext(BasketContext);
  if (!context) throw new Error('useBasket must be used inside BasketProvider');
  return context;
}
