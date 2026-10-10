import { Rose } from './Rose';
import { StitchedSvg, Stroke } from './Stitched';

const STEM_A = 'M6 6V84C6 112 30 128 54 122C74 117 78 94 62 90C50 87 46 100 54 104';
const STEM_B = 'M6 6H84C112 6 128 30 122 54C117 74 94 78 90 62C87 50 100 46 104 54';
const LEAVES = ['M30 6C34 18 44 24 56 24', 'M6 30C18 34 24 44 24 56', 'M6 6C26 26 44 44 66 66'];

/** Hero corner embroidery. Place it in a corner; mirror it with CSS transforms for the other corners. */
export function CornerEmbroidery({ className = 'h-40 w-40 text-gold' }: { className?: string }) {
  return (
    <StitchedSvg viewBox="0 0 160 160" className={className} strokeWidth={1.4} duration="3s">
      <Stroke d={STEM_A} />
      <Stroke d={STEM_B} delay="0.2s" />
      {LEAVES.map((d, i) => (
        <Stroke key={d} d={d} delay={`${0.6 + i * 0.2}s`} />
      ))}
      <Rose x={46} y={46} scale={1.15} delay="1s" />
    </StitchedSvg>
  );
}
