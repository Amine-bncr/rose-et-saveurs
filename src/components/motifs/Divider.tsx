import { Rose } from './Rose';
import { StitchedSvg, Stroke } from './Stitched';

const SIDE = ['M162 14H96C88 14 84 8 76 8C68 8 66 16 73 16C78 16 78 11 74 11', 'M132 14C128 23 117 25 109 20', 'M112 14C108 6 98 5 92 9'];

/** Section divider: gold vines stitching out from a small rose at the centre. */
export function Divider({ className = 'mx-auto h-7 w-72 text-hairline' }: { className?: string }) {
  return (
    <StitchedSvg viewBox="0 0 360 28" className={className} strokeWidth={1.4} duration="1.8s">
      {SIDE.map((d, i) => (
        <Stroke key={d} d={d} delay={`${0.2 + i * 0.15}s`} />
      ))}
      <g transform="translate(360 0) scale(-1 1)">
        {SIDE.map((d, i) => (
          <Stroke key={d} d={d} delay={`${0.2 + i * 0.15}s`} />
        ))}
      </g>
      <Rose x={180} y={14} scale={0.95} />
    </StitchedSvg>
  );
}
