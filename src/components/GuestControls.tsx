import { useEffect, useState } from 'react';
import { ArrowUp, CalendarPlus, Share2 } from 'lucide-react';
import { calendarEvents, downloadCalendar, googleCalendarUrl } from '../utils/calendarUtils';
import { canonicalUrl, invitationShareText, whatsappUrl } from '../utils/shareUtils';

export function CalendarControls({index}: {index: number}) {
  const event = calendarEvents[index];
  return <details className="calendar-control"><summary><CalendarPlus size={14}/> Add to Calendar</summary><div className="calendar-options"><a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">Google Calendar</a><button type="button" onClick={() => downloadCalendar(event)}>Download .ics <span>(Apple / Outlook)</span></button></div></details>;
}
export function ShareInvitation() {
  const [fallback, setFallback] = useState(false);
  async function share() {
    if (!canonicalUrl) return;
    if (navigator.share) {
      try { await navigator.share({title: 'Riya & Prashant — Our Wedding Story', text: invitationShareText, url: canonicalUrl}); return; }
      catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return; }
    }
    setFallback(true);
  }
  return <div className="share-invitation"><button type="button" onClick={share} disabled={!canonicalUrl} title={!canonicalUrl ? 'Sharing will be available once the public website URL is configured.' : undefined}><Share2 size={14}/> Share Invitation</button>{fallback && canonicalUrl && <a href={whatsappUrl(canonicalUrl)} target="_blank" rel="noreferrer">Share on WhatsApp</a>}</div>;
}
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('home'); if (!hero || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom < 0));
    observer.observe(hero); return () => observer.disconnect();
  }, []);
  return visible ? <a href="#home" className="back-to-top" aria-label="Back to top"><ArrowUp size={18}/></a> : null;
}
