import { useEffect, useState } from 'react';
import { wedding } from '../data';

const target = Date.parse(wedding.muhuratTimestamp);
export function remainingTime(now: number) {
  const totalSeconds = Math.max(0, Math.ceil((target - now) / 1000));
  return {
    completed: now >= target,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
  };
}

export function WeddingCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);
  const remaining = remainingTime(now);
  if (remaining.completed) return <p className="countdown-complete">A beautiful new chapter has begun</p>;
  const units = [ ['Days', remaining.days], ['Hours', remaining.hours], ['Minutes', remaining.minutes], ['Seconds', remaining.seconds] ] as const;
  return <div className="countdown-units" role="timer" aria-label="Time remaining until the wedding muhurat" aria-live="off">{units.map(([label, value]) => <div className="countdown-unit" key={label}><span className="countdown-number">{String(value).padStart(2, '0')}</span><span className="countdown-label">{label}</span></div>)}</div>;
}
