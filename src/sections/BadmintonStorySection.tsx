const callouts = [
  { key: 'badminton', label: 'Where it all began' },
  { key: 'chai', label: 'The little pauses they love sharing' },
  { key: 'music', label: 'The soundtrack of their togetherness' },
  { key: 'moon', label: 'Their favorite symbol of love' },
] as const;

export function BadmintonStorySection() {
  return <section id="story" className="badminton-story" aria-labelledby="story-heading">
    <div className="story-scene">
      <div className="story-copy story-reveal">
        <p className="story-eyebrow">Our Story</p>
        <h2 id="story-heading">From a Badminton Court <em>to Forever</em></h2>
        <p className="story-intro">It started with a game of badminton. Somewhere between the rallies, a beautiful love story began.</p>
      </div>
      <div className="story-art story-reveal">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/watercolor-story-desktop.webp" />
          <img src="/images/watercolor-story-mobile.webp" width="900" height="1125" alt="Watercolor illustration of a badminton racket and shuttlecock, chai, a moon and headphones connected by a winding path." loading="lazy" decoding="async" />
        </picture>
        <ol className="story-callouts" aria-label="Little moments in their story">
          {callouts.map(callout => <li className={'story-callout story-callout-' + callout.key} key={callout.key}>{callout.label}</li>)}
        </ol>
      </div>
    </div>
  </section>;
}
