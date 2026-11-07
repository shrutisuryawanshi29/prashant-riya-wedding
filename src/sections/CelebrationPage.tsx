import { wedding, celebrationArrangements as arrangements, groomResidenceAddressLines, groomResidenceDirections } from '../data';
import { CalendarControls } from '../components/GuestControls';
import { ScheduleBlock } from '../components/ScheduleBlock';

export const celebrationIds = ['mehendi', 'engagement', 'haldi', 'wedding', 'reception'] as const;
export type CelebrationId = typeof celebrationIds[number];
const calendarIndexes = [2, 3, 4, 0, 1];

function Directions({ index }: { index: number }) {
  const venue = wedding.venues[index];
  return <a className="book-direction celebration-direction" href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(venue.query)} target="_blank" rel="noreferrer">Get directions ↗</a>;
}

export function CelebrationPage({ id }: { id: CelebrationId }) {
  const index = celebrationIds.indexOf(id);
  const event = wedding.events[index];
  const venues = id === 'mehendi' ? [arrangements[0], arrangements[1]] : [arrangements[index + 1]];
  const date = event.date.replace(/^(\w+), (\w+) (\d+), (\d+)$/, '$1, $3 $2 $4');
  const title = id === 'wedding' ? 'The Wedding' : id === 'reception' ? 'Reception' : event.name;
  return <article className={'book-event-page book-event-'+id}>
    <header><p className="book-label">Our Wedding Celebrations</p><div className="book-chapter-divider" aria-hidden="true">✦</div><h2>{title}</h2>{event.tagline && <p className="celebration-tagline">{event.tagline}</p>}</header>
    <ScheduleBlock date={date} time={id === 'wedding' ? '10:15 AM IST' : event.time.replace(/\s+onwards$/i, '')} timeNote={id === 'wedding' ? 'Vivah Muhurat' : 'Onwards · IST'} programme={id === 'wedding' ? 'Programme begins · 9:00 AM' : undefined} extra={'extra' in event ? event.extra : undefined}/>
    <img className="celebration-art" src={'/images/celebration-'+id+'.webp'} alt={'Watercolor illustration for '+title} width="900" height="1125" loading="eager" decoding="async"/>
    <div className="celebration-details">
      <div className="celebration-venues" data-venue-details>{venues.map(venue=><section className="celebration-venue" key={venue.label}>{id === 'mehendi' && <p className="book-label">{venue.label}</p>}<h3 tabIndex={-1}>{venue.venue}</h3>{venue.floor && <p>{venue.floor}</p>}{venue.locality && (id === 'mehendi' && venue.directionsIndex === null ? <p>{groomResidenceAddressLines.map((line,i)=><span key={line}>{i > 0 && <br/>}{line}</span>)}</p> : <p>{venue.locality}</p>)}{venue.directionsIndex !== null ? <Directions index={venue.directionsIndex}/> : id === 'mehendi' && <a className="book-direction celebration-direction" href={groomResidenceDirections} target="_blank" rel="noreferrer">Get directions ↗</a>}{id === 'mehendi' && venue.directionsIndex !== null && <CalendarControls index={calendarIndexes[index]}/>}</section>)}</div>
      {id !== 'mehendi' && <CalendarControls index={calendarIndexes[index]}/>}
    </div>
  </article>;
}
