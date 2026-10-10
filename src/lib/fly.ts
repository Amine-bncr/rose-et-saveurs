const SVG_NS = 'http://www.w3.org/2000/svg';

/** A small gold heart that flies from an element to the basket button. */
export function flyToBasket(from: Element): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const target = document.querySelector('[data-basket-target]');
  if (!target) return;
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', 'M12 21C5 16 3 11 5.5 8c2.2-2.6 5.5-1.4 6.5 1 1-2.4 4.3-3.6 6.5-1C21 11 19 16 12 21Z');
  path.setAttribute('fill', '#E6B873');
  path.setAttribute('stroke', '#B88A44');
  path.setAttribute('stroke-width', '1');
  svg.appendChild(path);
  Object.assign(svg.style, { position: 'fixed', left: '0', top: '0', width: '22px', height: '22px', zIndex: '70', pointerEvents: 'none' });
  document.body.appendChild(svg);

  const startX = a.left + a.width / 2 - 11;
  const startY = a.top + a.height / 2 - 11;
  const endX = b.left + b.width / 2 - 11;
  const endY = b.top + b.height / 2 - 11;
  const animation = svg.animate(
    [
      { transform: `translate(${startX}px, ${startY}px) scale(0.6)`, opacity: 0.2 },
      { transform: `translate(${startX}px, ${startY - 36}px) scale(1.25)`, opacity: 1, offset: 0.3 },
      { transform: `translate(${endX}px, ${endY}px) scale(0.5)`, opacity: 0.9 },
    ],
    { duration: 720, easing: 'cubic-bezier(.4,.1,.3,1)' },
  );
  animation.addEventListener('finish', () => svg.remove());
}
