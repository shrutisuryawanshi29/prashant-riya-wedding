import { GoldCornerMotif, FloralEmbellishment } from './Ornaments';

export function CornerOrnaments() {
  return <div className="royal-corners" aria-hidden="true"><GoldCornerMotif className="royal-corner top-left"/><GoldCornerMotif className="royal-corner top-right"/><GoldCornerMotif className="royal-corner bottom-left"/><GoldCornerMotif className="royal-corner bottom-right"/></div>;
}
export function BotanicalPair() {
  return <div className="botanical-pair" aria-hidden="true"><FloralEmbellishment className="botanical-left"/><FloralEmbellishment className="botanical-right"/></div>;
}
export function EventEmblem({type}: {type: number}) {
  return <svg className="event-emblem" viewBox="0 0 120 90" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">{type === 1 ? <><circle cx="48" cy="48" r="19"/><circle cx="72" cy="48" r="19"/><path d="m68 22 4-7 4 7-4 6-4-6ZM20 68q20-5 26-16M100 68q-20-5-26-16M20 68q-5-12 3-18 9 7 4 16M100 68q5-12-3-18-9 7-4 16"/></> : type === 2 ? <><circle cx="60" cy="45" r="12"/><circle cx="60" cy="45" r="24"/>{Array.from({length:12},(_,i)=><path key={i} transform={`rotate(${i*30} 60 45)`} d="M60 21q-12-12 0-19 12 7 0 19Z"/>)}<path d="M60 69v17M50 79q-10-11-18-6 4 12 18 13M70 79q10-11 18-6-4 12-18 13"/></> : type === 3 ? <><path d="M15 76h90M22 76V38h76v38M18 38h84M25 33q7-10 14 0 7-10 14 0 7-10 14 0 7-10 14 0 7-10 14 0M60 4l8 8-8 8-8-8 8-8ZM60 20v13M30 43v27m60-27v27M41 76V57q19-25 38 0v19"/><path d="M14 76v5m92-5v5M45 22h30"/></> : <><path d="M20 63q40-12 80 0M25 70q35-7 70 0M60 13q-14 13 0 24 14-11 0-24ZM60 37v26M45 28q-13-9-18 3 8 11 21 6M75 28q13-9 18 3-8 11-21 6"/><circle cx="60" cy="11" r="3"/><path d="M38 53q22-13 44 0"/></>}</g></svg>;
}
