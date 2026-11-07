/** Decorative frame shared by every renderer-owned paper sheet. */
export function BookPageFrame() {
  return <div className="book-page-frame" aria-hidden="true">
    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner =>
      <svg key={corner} className={'book-frame-corner book-frame-'+corner} viewBox="0 0 44 44" fill="none">
        <path d="M3 42V18C3 8 8 3 18 3h24M7 31V18C7 10 11 7 19 7h13M7 24C10 15 15 12 22 12M12 9C11 5 12 3 15 2c2 4 1 6-3 7ZM17 12c1-5 4-7 8-6-1 4-3 6-8 6ZM10 18c4-1 6 0 7 3-4 2-6 1-7-3Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="29" cy="7" r="1.3" fill="currentColor"/><circle cx="7" cy="29" r="1.3" fill="currentColor"/>
      </svg>)}
    {['left','right'].map(side => <svg key={side} className={'book-frame-vine book-frame-vine-'+side} viewBox="0 0 24 150" fill="none">
      <path d="M12 4C4 19 20 28 12 43S4 66 12 80 20 103 12 118 6 137 12 146M12 33c-5-1-7-4-6-8 4 0 6 3 6 8ZM12 52c5-1 7-4 6-8-4 0-6 3-6 8ZM12 91c-5-1-7-4-6-8 4 0 6 3 6 8ZM12 109c5-1 7-4 6-8-4 0-6 3-6 8Z" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="70" r="2" fill="currentColor"/>
    </svg>)}
  </div>;
}
