import { ARCH_UNIT_PATH } from './arch';

export const ARCH_CLIP_ID = 'rs-arch';

/** Rendered once in App: the responsive arch clipPath used by every photo frame. */
export function ClipDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <clipPath id={ARCH_CLIP_ID} clipPathUnits="objectBoundingBox">
          <path d={ARCH_UNIT_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}
