import { useInView } from '../../lib/useInView';
import { HEART_LOOP_PATH } from './HeartLoop';

const COAST =
  'M0 118C40 104 70 128 110 116C150 104 170 98 205 110C240 122 262 100 300 104C340 108 380 126 420 112C450 102 470 108 480 104';

interface Pin {
  name: string;
  x: number;
  y: number;
  labelY: number;
}

const PINS: Pin[] = [
  { name: 'Tipaza', x: 72, y: 119, labelY: 92 },
  { name: 'Alger', x: 205, y: 110, labelY: 82 },
  { name: 'Boumerdès', x: 345, y: 110, labelY: 84 },
  { name: 'Blida', x: 168, y: 246, labelY: 276 },
];
const ORIGIN = { x: 218, y: 158 };

/** Stylised, non-cartographic schematic of the delivery zones. */
export function CoastMap() {
  const [ref, visible] = useInView<SVGSVGElement>({ threshold: 0.25 });
  return (
    <svg ref={ref} viewBox="0 0 480 310" role="img" aria-labelledby="coast-title coast-desc" className="h-auto w-full" data-visible={visible}>
      <title id="coast-title">Delivery zones schematic</title>
      <desc id="coast-desc">
        A stylised map, not to scale. The Mediterranean coast runs west to east with Tipaza, Alger and Boumerdès along it, and Blida inland to the south. Pickup is at Bir Mourad Rais, in Alger.
      </desc>
      <rect width="480" height="310" rx="18" style={{ fill: 'var(--map-land)' }} />
      <path d={`${COAST}L480 0L0 0Z`} style={{ fill: 'var(--map-sea)' }} />
      <path d={COAST} fill="none" strokeWidth="2" strokeLinecap="round" style={{ stroke: 'var(--hairline)' }} />
      <text x="400" y="38" textAnchor="end" fontStyle="italic" fontSize="15" className="fill-fg-muted" fontFamily="var(--font-display)">
        Mediterranean Sea
      </text>

      <g fill="none" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 6" style={{ stroke: 'var(--hairline)' }}>
        {PINS.map((pin) => (
          <path key={pin.name} d={`M${ORIGIN.x} ${ORIGIN.y}L${pin.x} ${pin.y + 8}`} />
        ))}
      </g>

      {PINS.map((pin) => (
        <g key={pin.name} className="map-pin">
          <circle cx={pin.x} cy={pin.y} r="8" fill="#E6B873" stroke="#B88A44" strokeWidth="1.5" />
          <circle cx={pin.x} cy={pin.y} r="2.8" fill="#3B0A33" />
          <text x={pin.x} y={pin.labelY} textAnchor="middle" fontSize="18" fontWeight="500" className="fill-fg" fontFamily="var(--font-body)">
            {pin.name}
          </text>
        </g>
      ))}

      <g className="map-pin" transform={`translate(${ORIGIN.x - 15} ${ORIGIN.y - 14}) scale(0.48)`}>
        <path d={HEART_LOOP_PATH} fill="#D98CA5" stroke="#6B1B5B" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <text x={ORIGIN.x + 16} y={ORIGIN.y + 34} textAnchor="start" fontSize="15" className="fill-fg-muted" fontFamily="var(--font-body)">
        Bir Mourad Rais · pickup
      </text>

      <text x="464" y="296" textAnchor="end" fontSize="13" className="fill-fg-muted" fontFamily="var(--font-body)" letterSpacing="1.5">
        SCHEMATIC · NOT TO SCALE
      </text>
    </svg>
  );
}
