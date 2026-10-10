import { findItem, type MenuItem, type MenuVariant } from '../data/menu';

export interface BasketLine {
  key: string;
  itemId: string;
  variantId?: string;
  qty: number;
}

export interface ResolvedLine {
  key: string;
  item: MenuItem;
  variant?: MenuVariant;
  name: string;
  qty: number;
  unitPrice: number | null;
  lineTotal: number | null;
}

export type BasketAction =
  | { type: 'add'; itemId: string; variantId?: string }
  | { type: 'set'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'clear' };

export const MAX_QTY = 99;

export function lineKey(itemId: string, variantId?: string): string {
  return variantId ? `${itemId}:${variantId}` : itemId;
}

export function basketReducer(lines: BasketLine[], action: BasketAction): BasketLine[] {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.itemId, action.variantId);
      const existing = lines.find((line) => line.key === key);
      if (existing) return lines.map((line) => (line.key === key ? { ...line, qty: Math.min(MAX_QTY, line.qty + 1) } : line));
      return [...lines, { key, itemId: action.itemId, variantId: action.variantId, qty: 1 }];
    }
    case 'set':
      if (action.qty <= 0) return lines.filter((line) => line.key !== action.key);
      return lines.map((line) => (line.key === action.key ? { ...line, qty: Math.min(MAX_QTY, action.qty) } : line));
    case 'remove':
      return lines.filter((line) => line.key !== action.key);
    case 'clear':
      return [];
  }
}

export function resolveLines(lines: BasketLine[]): ResolvedLine[] {
  const resolved: ResolvedLine[] = [];
  for (const line of lines) {
    const item = findItem(line.itemId);
    if (!item || !item.available) continue;
    const variant = line.variantId ? item.variants?.find((v) => v.id === line.variantId) : undefined;
    if (line.variantId && !variant) continue;
    const unitPrice = variant ? variant.price : item.price;
    resolved.push({
      key: line.key,
      item,
      variant,
      name: variant ? `${item.name} (${variant.label})` : item.name,
      qty: line.qty,
      unitPrice,
      lineTotal: unitPrice === null ? null : unitPrice * line.qty,
    });
  }
  return resolved;
}

/** A total only exists when every line has a price. */
export function basketTotal(lines: ResolvedLine[]): number | null {
  let total = 0;
  for (const line of lines) {
    if (line.lineTotal === null) return null;
    total += line.lineTotal;
  }
  return total;
}

export function itemCount(lines: ResolvedLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Parses stored basket JSON defensively; anything malformed is dropped. */
export function parseStoredLines(raw: string | null): BasketLine[] {
  if (!raw) return [];
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];
  const lines: BasketLine[] = [];
  for (const entry of data) {
    if (!isRecord(entry)) continue;
    const { itemId, variantId, qty } = entry;
    if (typeof itemId !== 'string' || typeof qty !== 'number' || !Number.isInteger(qty) || qty < 1) continue;
    if (variantId !== undefined && typeof variantId !== 'string') continue;
    lines.push({ key: lineKey(itemId, variantId), itemId, variantId, qty: Math.min(MAX_QTY, qty) });
  }
  return resolveLines(lines).map((resolved) => ({ key: resolved.key, itemId: resolved.item.id, variantId: resolved.variant?.id, qty: resolved.qty }));
}
