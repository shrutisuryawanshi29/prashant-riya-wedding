import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './page-turn-preview.css';

type Turn = { from: number; to: number; direction: 'forward' | 'backward'; id: number };
const names = ['Page One', 'Page Two', 'Page Three'];

function Page({number}: {number: number}) {
  return <div className="proof-page-content"><p>STORYBOOK PROTOTYPE</p><h1>{names[number]}</h1><div className="proof-rule" aria-hidden="true">✦</div><p>Page {number + 1} of 3</p></div>;
}

function Prototype() {
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const lock = useRef(false);
  const id = useRef(0);
  const timeout = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timeout.current), []);
  function finish(turnId: number, destination: number) {
    if (!lock.current || id.current !== turnId) return;
    window.clearTimeout(timeout.current);
    setIndex(destination);
    setTurn(null);
    lock.current = false;
  }
  function navigate(next: number) {
    if (lock.current || next < 0 || next >= names.length || next === index) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setIndex(next); return; }
    lock.current = true;
    const nextTurn: Turn = {from:index, to:next, direction:next > index ? 'forward' : 'backward', id:++id.current};
    setTurn(nextTurn);
    timeout.current = window.setTimeout(() => finish(nextTurn.id, next), 1250);
  }
  const underPage = turn ? turn.to : index;
  const sheetPage = turn ? turn.from : index;
  return <main className="proof-outer"><section className="proof-book" aria-label="Three-page book prototype">
    <div className="proof-spine" aria-hidden="true"/><div className="proof-stack" aria-hidden="true"/>
    <div className="proof-base" aria-hidden={turn ? true : undefined}><Page number={underPage}/></div>
    {turn && <div key={turn.id} className={'curl-turn curl-' + turn.direction} aria-hidden="true" onAnimationEnd={e => {if(e.target === e.currentTarget) finish(turn.id, turn.to);}}>
      <div className="curl-shadow" />
      <div className="curl-sheet"><Page number={sheetPage}/></div>
      <div className="curl-underside" />
      <div className="curl-edge" />
    </div>}
    <nav className="proof-controls" aria-label="Prototype page navigation"><button onClick={()=>navigate(index-1)} disabled={!!turn || index===0} aria-label="Previous page">←</button><span aria-live="polite">{names[index]} · {index+1} / 3</span><button onClick={()=>navigate(index+1)} disabled={!!turn || index===2} aria-label="Next page">→</button></nav>
  </section></main>;
}
createRoot(document.getElementById('root')!).render(<Prototype/>);
