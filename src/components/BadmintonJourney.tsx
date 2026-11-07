import { useEffect, useState } from 'react';

const trajectories = {
  mobile: 'M 22 115 C 100 38 175 48 235 102 C 294 155 355 148 383 108 C 407 75 432 77 444 98 C 458 77 483 79 492 98 C 507 126 472 143 444 164 C 412 144 392 128 397 108 C 424 35 532 34 621 95 C 699 147 779 132 826 79 C 860 40 894 38 930 67',
  desktop: 'M 22 115 C 100 38 175 48 235 102 C 294 155 355 148 383 108 C 407 75 432 77 444 98 C 458 77 483 79 492 98 C 507 126 472 143 444 164 C 412 144 392 128 397 108 C 424 35 532 34 621 95 C 699 147 779 132 826 79 C 860 40 894 38 930 67',
};

function JourneyPath({variant, reduced}: {variant: keyof typeof trajectories; reduced: boolean}) {
  const path = trajectories[variant];
  const maskId = `rally-trail-mask-${variant}`;
  return <svg className={`rally-path rally-path-${variant}`} viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="-20" y="-20" width="1040" height="220"><path className="rally-path-mask" d={path} pathLength="1" fill="none" stroke="white" strokeWidth="12" /></mask></defs>
    <path d={path} fill="none" stroke="#a87a3d" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1 8" mask={`url(#${maskId})`} />
    {!reduced && <g className="rally-shuttle">
      <animateMotion path={path} begin="0.3s" dur="2.6s" fill="freeze" rotate="auto" />
      <g transform="translate(-12 -9) scale(.85)" fill="#f7f0e3" stroke="#795a39" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M3 6 25 2 21 17 3 14Z"/><path d="M6 7 22 5M6 10l16 0M6 13l14 2" fill="none"/><path d="M2 6c-4 0-4 8 0 8h3V6Z" fill="#c8a476"/>
      </g>
    </g>}
  </svg>;
}

export function BadmintonJourney() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  return <div className="rally-atmosphere" aria-hidden="true">
    <JourneyPath variant="mobile" reduced={reduced}/><JourneyPath variant="desktop" reduced={reduced}/>
    <span className="rally-moon"><span/></span>
    <i className="rally-star rally-star-one"/><i className="rally-star rally-star-two"/><i className="rally-star rally-star-three"/>
  </div>;
}
