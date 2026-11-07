import { useEffect, useState } from 'react';
import { ArrowUp, CalendarPlus, Share2 } from 'lucide-react';
import { calendarEvents, downloadCalendar, googleCalendarUrl } from '../utils/calendarUtils';
import { canonicalUrl, invitationShareText, publicSiteUrl, whatsappUrl } from '../utils/shareUtils';

export function CalendarControls({index}: {index: number}) {
  const event = calendarEvents[index];
  return <details className="calendar-control"><summary><CalendarPlus size={14}/> Add to Calendar</summary><div className="calendar-options"><a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">Google Calendar</a><button type="button" onClick={() => downloadCalendar(event)}>Download .ics <span>(Apple / Outlook)</span></button></div></details>;
}
export function ShareInvitation() {
  const [fallback, setFallback] = useState(false);
  const [message, setMessage] = useState('');
  async function share() {
    if (!canonicalUrl) { setMessage('Sharing will be available when this site has a public HTTPS address.'); return; }
    if (navigator.share) {
      try { await navigator.share({title: 'Prashant & Riya | Our Wedding Story', text: invitationShareText, url: canonicalUrl}); setFallback(false); setMessage(''); return; }
      catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return; }
    }
    setMessage('');
    setFallback(true);
  }
  async function copyLink() {
    if (!canonicalUrl) return;
    try { await navigator.clipboard.writeText(canonicalUrl); setMessage('Invitation link copied.'); }
    catch { setMessage('Copy the invitation link shown below.'); }
  }
  return <div className="share-invitation" onClick={event => event.stopPropagation()}><button type="button" onClick={share}><Share2 size={14}/> Share Invitation</button>{fallback && canonicalUrl && <div><button type="button" onClick={copyLink}>Copy invitation link</button>{publicSiteUrl(canonicalUrl) && <a href={whatsappUrl(canonicalUrl)} target="_blank" rel="noreferrer">Share on WhatsApp</a>}<p className="share-link">{canonicalUrl}</p></div>}<p role="status">{message}</p></div>;
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
