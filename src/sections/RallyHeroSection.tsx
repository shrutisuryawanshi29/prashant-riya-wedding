import { ArrowDown } from 'lucide-react';
import { BadmintonJourney } from '../components/BadmintonJourney';
import { wedding } from '../data';

export function RallyHeroSection({ preview = false }: { preview?: boolean }) {
  return <section id="home" className="rally-hero" aria-label="Wedding welcome">
    <img className="rally-backdrop" src="/images/riya-prashant-photograph.webp" width="576" height="1024" alt="Riya and Prashant together by the sea at sunset" fetchPriority="high"/>
    <nav className="rally-nav" aria-label="Wedding navigation">
      <a href={preview ? "/#invitation" : "#invitation"}>Invitation</a><a href={preview ? "/#celebrations" : "#celebrations"}>Celebrations</a><a href={preview ? "/#venues" : "#venues"}>Venues</a>
    </nav>
    <BadmintonJourney/>
    <div className="rally-layout">
      <div className="rally-copy">
        <p className="rally-eyebrow">UNDER THE SAME MOON</p>
        <p className="rally-headline">It started with a game.<br/><em>And turned into forever.</em></p>
        <h1>{wedding.couple.bride} <span>&amp;</span> {wedding.couple.groom}</h1>
        <p className="rally-date">3 December 2026 <span>·</span> Nagpur</p>
        <a className="rally-action" href="#story">Explore Our Story <ArrowDown size={16}/></a>
      </div>
    </div>
  </section>;
}
