import { ArrowDown } from 'lucide-react';
import { wedding } from '../data';
import { heroArtwork } from '../data/heroArtwork';

export function MoonlitHeroSection() {
  return <section id="home" className="moonlit-hero" aria-label="Wedding welcome">
    <picture className="moonlit-background" aria-hidden="true">
      <source media="(min-width: 1024px)" srcSet={heroArtwork.desktop.src} />
      <img src={heroArtwork.mobile.src} width={heroArtwork.mobile.width} height={heroArtwork.mobile.height} alt="" fetchPriority="high" />
    </picture>
    <div className="moonlit-shade" aria-hidden="true" />
    <nav className="moonlit-nav" aria-label="Wedding navigation">
      <a href="#invitation">Invitation</a><a href="#celebrations">Celebrations</a><a href="#venues">Venues</a>
    </nav>
    <div className="moonlit-layout">
      <div className="moonlit-portrait"><img src="/images/riya-prashant-transparent.webp" width="1122" height="1402" alt="Illustration of Riya and Prashant together" /></div>
      <div className="moonlit-copy">
        <p className="moonlit-eyebrow">UNDER THE SAME MOON</p>
        <h1>{wedding.couple.bride} <span>&amp;</span> {wedding.couple.groom}</h1>
        <p className="moonlit-story">Some stories are written in the stars.</p>
        <p className="moonlit-date">3 December 2026 <span>·</span> Nagpur</p>
        <a className="moonlit-action" href="#story">Explore Our Story <ArrowDown size={16}/></a>
      </div>
    </div>
  </section>;
}
