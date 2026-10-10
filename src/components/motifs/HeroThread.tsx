import { HEART_LOOP_PATH } from './HeartLoop';
import { archPath } from './arch';
import { Rose } from './Rose';
import { StitchedSvg, Stroke } from './Stitched';

const ARCH_THREAD = archPath(10, 8, 380, 475, false);
const TAIL_LEFT = 'M44 506C84 494 112 514 152 504';
const TAIL_RIGHT = 'M356 506C316 494 288 514 248 504';

/**
 * Gold thread that draws around the hero arch, with three embroidered roses and a looping
 * heart ligature underneath. Sized for a 400x520 box; the photo frame sits at 6.5% / 5%.
 */
export function HeroThread({ className = '' }: { className?: string }) {
  return (
    <StitchedSvg viewBox="0 0 400 520" className={`pointer-events-none absolute inset-0 h-full w-full text-gold ${className}`} strokeWidth={1.6} duration="3.2s">
      <Stroke d={ARCH_THREAD} />
      <Stroke d={TAIL_LEFT} delay="1.2s" />
      <Stroke d={TAIL_RIGHT} delay="1.2s" />
      <g transform="translate(168 480) scale(0.95)">
        <Stroke d={HEART_LOOP_PATH} delay="1.6s" />
      </g>
      <g className="fade">
        <Rose x={200} y={10} scale={1.1} />
        <Rose x={13} y={262} scale={1} />
        <Rose x={387} y={262} scale={1} />
      </g>
    </StitchedSvg>
  );
}
