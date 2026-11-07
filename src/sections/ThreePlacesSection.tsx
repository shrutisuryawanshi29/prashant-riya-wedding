const places = [
  { name: 'Mumbai', caption: 'Her beginnings', tone: 'mumbai' },
  { name: 'Nagpur', caption: 'His beginnings', tone: 'nagpur' },
  { name: 'California', caption: 'Their next chapter', tone: 'california' },
] as const;

export function ThreePlacesSection() {
  return <section id="places" className="three-places places-reveal" aria-labelledby="places-heading">
    <header className="places-heading">
      <p className="places-kicker">A story across places</p>
      <h2 id="places-heading">THREE PLACES, <em>ONE FOREVER</em></h2>
      <p>Different cities. Shared dreams. A lifetime together.</p>
    </header>
    <div className="places-journey">
      <svg className="places-route places-route-mobile" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M1 0 L1 100" strokeDasharray=".35 1.3" /></svg>
      <svg className="places-route places-route-desktop" viewBox="0 0 100 16" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 8 C18 8 31 1 50 8 S82 15 100 8" strokeDasharray=".35 .85" /></svg>
      <ol className="places-list">
        {places.map(place => <li className="places-chapter" key={place.name}>
          <div className={"places-scene places-scene-" + place.tone}><img src={`/images/three-places-${place.tone}.webp`} alt="" width="502" height="1024" loading="lazy" decoding="async" /></div>
          <div className="places-copy"><h3>{place.name}</h3><p>{place.caption}</p></div>
        </li>)}
      </ol>
    </div>
  </section>;
}
