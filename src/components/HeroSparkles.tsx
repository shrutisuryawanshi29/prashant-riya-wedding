/** Positions stay on the illustrated margins, clear of faces and live text. */
export function HeroSparkles() {
  return <div className="hero-sparkles" aria-hidden="true">{Array.from({length: 6}, (_, index) => <span className="hero-sparkle" key={index}/>)}</div>;
}
