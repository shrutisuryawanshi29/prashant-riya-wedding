import { useEffect, useRef, useState, type ReactNode } from 'react';

function nextHiddenVenue(node: HTMLElement): HTMLElement | undefined {
  const bottom = node.getBoundingClientRect().bottom - 2;
  const venueDetails = Array.from(node.querySelectorAll<HTMLElement>('[data-scroll-detail]'));
  if (venueDetails.length) return venueDetails.find(detail => detail.getBoundingClientRect().bottom > bottom);
  return Array.from(node.querySelectorAll<HTMLElement>('[data-venue-details] .celebration-venue')).find(venue => {
    const details = venue.querySelectorAll<HTMLElement>('h3 ~ p');
    const lastDetail = details.item(details.length - 1) || venue.querySelector<HTMLElement>('h3');
    return !!lastDetail && lastDetail.getBoundingClientRect().bottom > bottom;
  });
}

type Props = { children: ReactNode; cover: boolean; active: boolean; venueCue: boolean; hintSeen: boolean; onFirstScroll: () => void };

export function BookScrollRegion({ children, cover, active, venueCue, hintSeen, onFirstScroll }: Props) {
  const region = useRef<HTMLDivElement>(null);
  const [venueBelow, setVenueBelow] = useState(false);
  const [metrics, setMetrics] = useState({ overflow: false, below: false, progress: 0 });

  useEffect(() => {
    const node = region.current;
    if (!node || cover) return;
    const update = () => {
      const distance = Math.max(0, node.scrollHeight - node.clientHeight);
      setVenueBelow(venueCue && !!nextHiddenVenue(node));
      setMetrics({ overflow: distance > 2, below: distance - node.scrollTop > 2, progress: distance ? Math.min(1, node.scrollTop / distance) : 0 });
    };
    const onScroll = () => {
      update();
      if (active && node.scrollTop > 3) onFirstScroll();
    };
    const resize = new ResizeObserver(update);
    resize.observe(node);
    Array.from(node.children).forEach(child => resize.observe(child));
    node.addEventListener('scroll', onScroll, { passive: true });
    node.addEventListener('load', update, true);
    update();
    let disposed = false;
    document.fonts?.ready.then(() => { if (!disposed) update(); });
    return () => { disposed = true; resize.disconnect(); node.removeEventListener('scroll', onScroll); node.removeEventListener('load', update, true); };
  }, [cover, active, venueCue, onFirstScroll]);

  return <div className="book-scroll-shell">
    <div ref={region} className={'book-page-scroll' + (cover ? ' book-page-scroll-cover' : '')} tabIndex={cover ? undefined : 0} aria-label={cover ? undefined : 'Chapter content'}>{children}</div>
    {metrics.overflow && <div className="book-scroll-marker" aria-hidden="true"><span style={{ top: `${metrics.progress * 100}%` }} /></div>}
    {metrics.below && <div className="book-scroll-fade" aria-hidden="true" />}
    {venueCue && <div className="book-venue-cue-slot">{active && venueBelow && <button type="button" className="book-venue-cue" onClick={event => {
      event.stopPropagation();
      const node = region.current;
      const venue = node ? nextHiddenVenue(node) : undefined;
      if (!node || !venue) return;
      venue.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
      const target = node.scrollTop + venue.getBoundingClientRect().top - node.getBoundingClientRect().top - node.clientTop - 12;
      node.scrollTo({ top: Math.max(0, target), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }}><span className="book-venue-cue-label">Discover the details <span className="book-venue-cue-ornament" aria-hidden="true">✧</span></span><span className="book-venue-cue-arrow" aria-hidden="true">⌄</span></button>}</div>}
    {active && metrics.below && !hintSeen && !(venueCue && venueBelow) && <div className="book-scroll-hint" aria-hidden="true"><span>↓</span> Swipe up to read more</div>}
  </div>;
}
