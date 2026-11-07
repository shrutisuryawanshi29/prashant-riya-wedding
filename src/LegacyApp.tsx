import React, { useEffect } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { wedding as w } from './data';
import './style.css';
import { HennaMedallion } from './components/Ornaments';
import { EventEmblem } from './components/RoyalDetails';
import { WeddingCountdown } from './components/WeddingCountdown';
import { ThreePlacesSection } from './sections/ThreePlacesSection';
import { BadmintonStorySection } from './sections/BadmintonStorySection';
import { StoryBook } from './sections/StoryBook';
import { BackToTop, CalendarControls, ShareInvitation } from './components/GuestControls';
import { RoyalSectionTransition } from './components/RoyalSectionTransition';

function Flourish({light = false}: {light?: boolean}) { return <div className={'flourish ' + (light ? 'light' : '')} aria-hidden="true"><span></span><svg viewBox="0 0 100 24"><path d="M2 12h27c8 0 12-9 21-10 9 1 13 10 21 10h27M2 12h27c8 0 12 9 21 10 9-1 13-10 21-10h27M50 3c-7 4-7 14 0 18 7-4 7-14 0-18Z" fill="none" stroke="currentColor" strokeWidth="1"/></svg><span></span></div> }
function Kicker({children}: {children: React.ReactNode}) { return <p className="kicker">{children}</p> }
function FamilyInvitation(){return <div className="countdown-family"><p>With the blessings of<br/><strong>{w.grandparents}</strong></p><p className="countdown-request">Together with their families,<br/>we joyfully invite you to celebrate the wedding of</p><div className="countdown-parents"><div><h3>{w.couple.brideFull}</h3><p>Daughter of<br/><strong>{w.parents.bride}</strong></p></div><div><h3>{w.couple.groomFull}</h3><p>Son of<br/><strong>{w.parents.groom}</strong></p></div></div></div>}
export function LegacyApp(){
useEffect(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll<HTMLElement>('.places-reveal, .story-reveal, .countdown-invitation .kicker, .venues .kicker, .flourish, .countdown-invitation h2, .countdown-units, .countdown-complete, .section-heading, .timeline-entry, .venue, .closing-frame h2, .closing-message, .closing-frame .families, .closing-names, .royal-transition');
  let observer: IntersectionObserver | undefined;
  function watch() {
    observer?.disconnect();
    if (preference.matches || !('IntersectionObserver' in window)) return;
    let nearbyTimelineIndex = 0;
    let lastTimelineReveal = -Infinity;
    observer = new IntersectionObserver((entries) => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        const element = entry.target as HTMLElement;
        if (element.classList.contains('timeline-entry')) {
          const now = performance.now();
          if (now - lastTimelineReveal > 200) nearbyTimelineIndex = 0;
          lastTimelineReveal = now;
          element.style.setProperty('--entry-delay', `${Math.min(nearbyTimelineIndex++, 3) * 150}ms`);
        }
        element.classList.add('motion-revealed');
        observer?.unobserve(element);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -12px 0px' });
    targets.forEach(element => { if (!element.classList.contains('motion-revealed')) observer?.observe(element); });
  }
  function visibility() { document.documentElement.toggleAttribute('data-motion-paused', document.hidden); }
  watch(); visibility();
  preference.addEventListener('change', watch);
  document.addEventListener('visibilitychange', visibility);
  return () => {
    observer?.disconnect(); preference.removeEventListener('change', watch);
    document.removeEventListener('visibilitychange', visibility);
    document.documentElement.removeAttribute('data-motion-paused');
  };
}, []);
return <>
<div className="petal-layer" aria-hidden="true">{Array.from({length: 8}, (_, index) => <span className="petal" key={index}/>)}</div>
<main>
<StoryBook/>
<div className="palace-continuation"><nav className="invitation-nav" aria-label="Main navigation"><a href="#invitation">Invitation</a><a href="#celebrations">Celebrations</a><a href="#venues">Venues</a></nav>
<section id="invitation" className="invitation section-pad"><div className="invitation-sheet countdown-invitation"><p className="courtyard-invocations">{w.invocations[0]}<br/>{w.invocations[1]}</p><Kicker>A moment we have been waiting for</Kicker><h2>Until Forever Begins</h2><WeddingCountdown/><p className="countdown-wedding-date">3 December 2026 <span>·</span> 10:15 AM IST</p><p className="countdown-couple">{w.couple.bride} <span>&</span> {w.couple.groom}</p><Flourish/><div className="desktop-family"><FamilyInvitation/></div><div className="mobile-invitation"><p className="family-preview">With divine blessings and the love of our families, we joyfully invite you to celebrate our wedding.</p><div className="mobile-family-invitation"><FamilyInvitation/></div></div></div></section></div>

<BadmintonStorySection/>
<ThreePlacesSection/>
<RoyalSectionTransition/>
<section id="celebrations" className="celebrations section-pad"><div className="section-heading"><h2>Our Wedding Celebrations</h2><p>Five cherished occasions, one beautiful beginning.</p><Flourish/></div><ol className="celebration-timeline">{w.events.map((e, i) => <li className={'timeline-entry' + (i === 3 ? ' timeline-wedding' : '')} key={e.name}><div className="timeline-marker" aria-hidden="true">{i === 0 ? <HennaMedallion/> : <EventEmblem type={i}/>}</div><div className="timeline-content"><p className="timeline-date">{e.date.replace(/^(\w+), (\w+) (\d+), (\d+)$/, '$1, $3 $2 $4')}</p><h3>{i === 4 ? 'Reception' : e.name}</h3>{e.tagline && <p className="timeline-tagline">{e.tagline}</p>}<p className="timeline-time">{e.time}</p>{'muhurat' in e && <p className="timeline-muhurat">{e.muhurat}</p>}{'extra' in e && <p className="timeline-extra">{e.extra}</p>}</div></li>)}</ol></section>

<RoyalSectionTransition/>
<div className="royal-darbar"><section id="venues" className="venues section-pad"><div className="section-heading"><Kicker>Join us in celebration</Kicker><h2>Where Our Celebrations<br/><i>Unfold</i></h2><Flourish/></div><div className="venue-grid">{w.venues.map((v, index)=><article className="venue" key={v.label}><MapPin size={19} strokeWidth={1.3}/><Kicker>{v.label}</Kicker><h3>{v.name}</h3><p>{v.lines.map(line=><React.Fragment key={line}>{line}<br/></React.Fragment>)}</p><p className="venue-date">{v.date}</p><a className="direction" href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(v.query)} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16}/></a><CalendarControls index={index}/></article>)}</div></section>
<RoyalSectionTransition dark/>
<section className="closing"><div className="closing-frame"><h2>With Love & Blessings</h2><Flourish light/><p className="closing-message">We look forward to celebrating this special journey with you.</p><p className="families">Kalburgi & Mahant Families</p><p className="blessings">Presents Only in Blessings</p><p className="closing-names">Riya <span>&</span> Prashant</p></div></section></div>
</main><BackToTop/><footer><ShareInvitation/>Made with love · December 2026</footer></>}
