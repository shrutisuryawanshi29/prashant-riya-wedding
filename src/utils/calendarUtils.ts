import { wedding, celebrationArrangements as arrangements } from '../data';

const maharajaAddress = [wedding.venues[0].name, ...wedding.venues[0].lines].join(', ');
const receptionAddress = [wedding.venues[1].name, ...wedding.venues[1].lines].join(', ');
// Preserve the wedding/reception indexes used by the existing venues chapter.
export const calendarEvents = [
  { id:'wedding', title:'Riya & Prashant — Wedding Ceremony', start:'2026-12-03T09:00:00+05:30', location:maharajaAddress, description:`Wedding programme: 9:00 AM onwards IST. Vivah Muhurat: 10:15 AM IST. ${arrangements[4].venue}, ${arrangements[4].floor}. End time has not been specified.` },
  { id:'reception', title:'Riya & Prashant — Wedding Reception', start:'2026-12-06T18:00:00+05:30', location:receptionAddress, description:`Reception: 6:00 PM onwards IST. Followed by dinner. ${arrangements[5].venue}, ${arrangements[5].floor}. End time has not been specified.` },
  { id:'mehendi', title:"Riya & Prashant — Bride's Mehendi", start:'2026-12-01T11:15:00+05:30', location:maharajaAddress, description:`Bride's Mehendi: 11:15 AM onwards IST. ${maharajaAddress}, ${arrangements[0].floor}. End time has not been specified.` },
  { id:'engagement', title:'Riya & Prashant — Engagement', start:'2026-12-02T10:30:00+05:30', location:maharajaAddress, description:`Engagement: 10:30 AM onwards IST. ${arrangements[2].venue}, ${arrangements[2].floor}. End time has not been specified.` },
  { id:'haldi', title:'Riya & Prashant — Haldi', start:'2026-12-02T16:00:00+05:30', location:maharajaAddress, description:`Haldi: 4:00 PM onwards IST. ${arrangements[3].venue}, ${arrangements[3].floor}. End time has not been specified.` },
];
export type CalendarEvent = typeof calendarEvents[number];
export const utcStamp = (date: string | Date) => new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
export function googleCalendarUrl(event: CalendarEvent) {
  const start = utcStamp(event.start);
  // A zero-duration slot is a technical placeholder, never a claimed end time.
  return 'https://calendar.google.com/calendar/render?' + new URLSearchParams({
    action: 'TEMPLATE', text: event.title, dates: `${start}/${start}`,
    ctz: 'Asia/Kolkata', details: event.description, location: event.location,
  });
}
const escapeICS = (value: string) => value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
function foldLine(line: string) {
  const result: string[] = []; let current = ''; let bytes = 0;
  for (const character of line) {
    const size = new TextEncoder().encode(character).length;
    if (bytes + size > 75) { result.push(current); current = ' '; bytes = 1; }
    current += character; bytes += size;
  }
  result.push(current); return result.join('\r\n');
}
export function createICS(event: CalendarEvent, now = new Date()) {
  // RFC 5545 permits DTSTART without DTEND/DURATION when no end is known.
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Riya and Prashant//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', `UID:${event.id}-2026@riya-prashant-invitation.invalid`,
    `DTSTAMP:${utcStamp(now)}`, `DTSTART:${utcStamp(event.start)}`,
    `SUMMARY:${escapeICS(event.title)}`, `DESCRIPTION:${escapeICS(event.description)}`,
    `LOCATION:${escapeICS(event.location)}`, 'END:VEVENT', 'END:VCALENDAR'].map(foldLine).join('\r\n') + '\r\n';
}
export function downloadCalendar(event: CalendarEvent) {
  const url = URL.createObjectURL(new Blob([createICS(event)], {type: 'text/calendar;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = `riya-prashant-${event.id}.ics`;
  document.body.append(link); link.click(); link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
