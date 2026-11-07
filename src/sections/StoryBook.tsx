import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PageFlip } from 'page-flip';
import { wedding } from '../data';
import { BookPageFrame } from '../components/BookPageFrame';
import { BookScrollRegion } from '../components/BookScrollRegion';
import { CelebrationPage, type CelebrationId } from './CelebrationPage';
import { MomentsChapter, InvitationChapter, VenuesChapter, EpilogueChapter } from './BookChapters';

type Page = 'cover' | 'moments' | 'invitation' | CelebrationId | 'venues' | 'venue-reception' | 'epilogue';
const pages: Page[] = ['cover', 'moments', 'invitation', 'mehendi', 'engagement', 'haldi', 'wedding', 'reception', 'venues', 'venue-reception', 'epilogue'];
const labels = ['Cover', 'Our Moments', 'Until Forever', 'Mehendi', 'Engagement', 'Haldi', 'Wedding', 'Reception', 'Join Us · Nagpur', 'Join Us · Thane', 'Our Story, Our Forever'];
function pageFromHash(): Page { const key = window.location.hash.slice(1); return pages.includes(key as Page) ? key as Page : key === 'celebrations' ? 'mehendi' : ['little','places','story','chapter'].includes(key) ? 'epilogue' : 'cover'; }

function BookCover({ open }: { open: () => void }) {
  return <div className="book-cover-content">
    <div className="book-cover-heading"><h1>{wedding.couple.bride} <span>&amp;</span><br />{wedding.couple.groom}</h1><svg className="book-cover-name-flourish" viewBox="0 0 180 18" fill="none" aria-hidden="true"><path d="M2 12c25-10 42-9 64-3m48 0c22-6 39-7 64 3M84 8c0-6 6-6 6-2 0-4 6-4 6 2 0 4-6 8-6 8s-6-4-6-8Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg><p className="book-cover-subtitle">A love story blossoming into forever.</p><p className="book-cover-date">3 December 2026 · Nagpur</p></div>
    <div className="book-cover-photo"><div className="book-photo-mat"><img src="/images/cover-indoor.webp" width="1204" height="1600" alt="Riya and Prashant standing together indoors" style={{objectPosition:'center 12%'}} /><img className="cover-floral-overlay" src="/images/watercolor-floral-gold-arch.webp" width="1086" height="1448" alt="" aria-hidden="true" /><img className="cover-floral-arch" src="/images/cover-blush-floral-arch.webp" width="2172" height="724" alt="" aria-hidden="true" /></div></div>
    <svg className="book-cover-trail" viewBox="0 0 400 100" fill="none" aria-hidden="true"><path d="M15 83C80 0 151 61 225 55c38-3 41-42 55-34 12 7-2 25-12 34 16 5 45 5 93-32" stroke="currentColor" strokeDasharray="3 4" strokeWidth="1.4"/><path d="M19 80l-7-12 12 5-5 7Zm-7-12-6-8 12 3 6 10" stroke="currentColor" strokeWidth="1.2"/></svg>
    <button className="book-open" onClick={open}>Open our story <span aria-hidden="true">→</span></button>
  </div>;
}

export function LittleThings() {
  return <article className="book-chapter-content book-little">
    <p className="book-label">Bonus chapter one</p><div className="book-chapter-divider" aria-hidden="true">✦</div>
    <h2>The Little<br />Things</h2><p className="little-intro">It’s the little things that make our story our own.</p>
    <div className="little-art"><img src="/images/watercolor-story-mobile.webp" alt="" width="1122" height="1402"/><svg className="little-trail" viewBox="0 0 320 390" fill="none" aria-hidden="true"><path d="M30 90C55 20 152 25 164 100S60 210 115 270 260 260 276 360" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5"/></svg>
      <p className="little-note little-badminton"><strong>Badminton</strong>Where our story began.</p>
      <p className="little-note little-moon"><strong>Moon</strong>Our favorite symbol of love.</p>
      <p className="little-note little-chai"><strong>Chai</strong>The little moments we love sharing.</p>
      <p className="little-note little-music"><strong>Music</strong>The soundtrack of our togetherness.</p>
    </div>

  </article>;
}

export function StoryBook() {
  const [page, setPage] = useState<Page>(pageFromHash);
  const [turning, setTurning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollHintSeen, setScrollHintSeen] = useState(() => { try { return sessionStorage.getItem('storybook-scroll-discovered') === 'yes'; } catch { return false; } });
  const dismissScrollHint = useMemo(() => () => { setScrollHintSeen(true); try { sessionStorage.setItem('storybook-scroll-discovered', 'yes'); } catch { /* Storage can be unavailable. */ } }, []);
  const menuArea = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const turnAction = useRef<(page: Page) => void>(() => {});
  // React owns each page's contents; StPageFlip owns only its outer paper node.
  const sheets = useMemo(() => pages.map((id, index) => {
    const element = document.createElement('article');
    element.className = 'book-library-page';
    element.dataset.bookPage = String(index);
    element.dataset.chapter = id;
    return element;
  }), []);
  function turn(target: Page) { if (target) { setMenuOpen(false); turnAction.current(target); } }
  useEffect(() => {
    if (!menuOpen) return;
    menuArea.current?.querySelector<HTMLButtonElement>('.chapter-menu-panel button')?.focus({preventScroll:true});
    const dismiss = (event: PointerEvent) => { if (!menuArea.current?.contains(event.target as Node)) setMenuOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('pointerdown', dismiss); document.addEventListener('keydown', escape);
    return () => {document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape);};
  }, [menuOpen]);
  useLayoutEffect(() => {
    const host = document.createElement('div');
    host.className = 'book-flip-engine';
    viewport.current!.append(host);
    sheets.forEach(sheet => host.append(sheet));
    const renderer = new PageFlip(host, {
      width:host.clientWidth, height:host.clientHeight, size:'fixed',
      minWidth:240, maxWidth:1600, minHeight:420, maxHeight:1600,
      usePortrait:true, autoSize:false, showCover:false,
      drawShadow:true, maxShadowOpacity:0.16, flippingTime:1100,
      mobileScrollSupport:false, swipeDistance:70, disableFlipByClick:false, useMouseEvents:false,
      startPage:pages.indexOf(pageFromHash()),
    });
    let locked = false, focusAfter = false, historyTurn = false;
    let queuedHistory: Page | null = null;
    let pendingResize = false;
    const offsets = pages.map(() => 0);
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const region = (sheet: HTMLElement) => sheet.querySelector<HTMLElement>('.book-page-scroll')!;
    function syncSurfaces() {
      const active = renderer.getCurrentPageIndex();
      host.querySelectorAll<HTMLElement>('.book-library-page').forEach(sheet => {
        const number = Number(sheet.dataset.bookPage);
        const live = !locked && sheet === sheets[active];
        sheet.inert = !live;
        sheet.setAttribute('aria-hidden', String(!live));
        sheet.classList.toggle('book-library-reverse', sheet !== sheets[number]);
        const scroll = region(sheet);
        if (scroll) {
          scroll.style.overflowY = locked ? 'hidden' : number === 0 ? 'hidden' : 'auto';
          if (locked || sheet !== sheets[number]) scroll.scrollTop = offsets[number];
        }
      });
    }
    function resize() {
      if (locked) {pendingResize = true; return;}
      const settings = renderer.getSettings();
      if (settings.width !== host.clientWidth || settings.height !== host.clientHeight) {
        settings.width = host.clientWidth; settings.height = host.clientHeight;
        renderer.update();
      }
      pendingResize = false;
    }
    function complete() {
      const index = renderer.getCurrentPageIndex();
      const target = pages[index];
      setPage(target); setTurning(false); syncSurfaces();
      requestAnimationFrame(() => { if (!locked) region(sheets[index]).scrollTop = offsets[index]; });
      if (focusAfter) {
        if (!historyTurn) history.pushState(null, '', '#' + target);
        const focus = sheets[index].querySelector<HTMLElement>(index === 0 ? '.book-open' : '.book-page-scroll');
        focus?.focus({preventScroll:true});
      }
      focusAfter = false; historyTurn = false;
      if (pendingResize) resize();
      if (queuedHistory) { const target = queuedHistory; queuedHistory = null; go(target, true); }
    }
    renderer.on('flip', () => { if (!locked) complete(); });
    renderer.on('changeState', event => {
      locked = event.data !== 'read'; setTurning(locked);
      if (!locked) complete(); else syncSurfaces();
    });
    renderer.loadFromHTML(sheets);
    const clones = new MutationObserver(records => {if (records.some(record => record.addedNodes.length)) syncSurfaces();});
    clones.observe(host, {childList:true, subtree:true});
    const observer = new ResizeObserver(resize); observer.observe(host);
    function go(target: Page, fromHistory = false) {
      if (locked || renderer.getState() !== 'read') {if (fromHistory) queuedHistory = target; return;}
      const current = renderer.getCurrentPageIndex(), next = pages.indexOf(target);
      if (next < 0 || current === next) return;
      offsets[current] = region(sheets[current]).scrollTop;
      // Load only the requested chapter artwork ahead of its turn.
      sheets[next].querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
      focusAfter = true; historyTurn = fromHistory;
      if (motion.matches) {renderer.turnToPage(next); return;}
      locked = true; setTurning(true); syncSurfaces();
      if (next === current+1) renderer.flipNext('bottom');
      else if (next === current-1) renderer.flipPrev('bottom');
      else renderer.flip(next, 'bottom');
    }
    turnAction.current = target => go(target);
    const historyChange = () => go(pageFromHash(), true);
    window.addEventListener('popstate', historyChange); window.addEventListener('hashchange', historyChange);
    const keydown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || (event.target as HTMLElement).closest('button,a,summary,select,input,textarea')) return;
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      const target = pages[renderer.getCurrentPageIndex()+direction];
      if (direction && target) {event.preventDefault(); go(target);}
    };
    host.addEventListener('keydown', keydown);
    let touch: {x:number;y:number} | null = null;
    const touchStart = (event: TouchEvent) => {
      touch = (event.target as HTMLElement).closest('button,a,summary,select,input,img,photo') ? null : {x:event.touches[0].clientX,y:event.touches[0].clientY};
    };
    const touchEnd = (event: TouchEvent) => {
      if (!touch) return;
      const dx=event.changedTouches[0].clientX-touch.x, dy=event.changedTouches[0].clientY-touch.y; touch=null;
      const target = pages[renderer.getCurrentPageIndex()+(dx<0?1:-1)];
      if (target && Math.abs(dx)>80 && Math.abs(dx)>Math.abs(dy)*2) go(target);
    };
    const touchCancel = () => {touch=null;};
    host.addEventListener('touchstart',touchStart,{passive:true});host.addEventListener('touchend',touchEnd,{passive:true});host.addEventListener('touchcancel',touchCancel,{passive:true});
    sheets.forEach((sheet, i) => sheet.querySelectorAll('img').forEach(img => { if (i !== renderer.getCurrentPageIndex()) img.loading='lazy'; }));
    syncSurfaces();
    return () => {
      turnAction.current = () => {}; clones.disconnect(); observer.disconnect();
      window.removeEventListener('popstate',historyChange);window.removeEventListener('hashchange',historyChange);
      host.removeEventListener('keydown',keydown);host.removeEventListener('touchstart',touchStart);host.removeEventListener('touchend',touchEnd);host.removeEventListener('touchcancel',touchCancel);
      // Keep React portal containers alive while the renderer removes its wrappers.
      sheets.forEach(sheet => sheet.remove()); renderer.destroy();
    };
  }, [sheets]);
  function content(which: Page) {switch(which) {
    case 'cover': return <BookCover open={() => turn('moments')}/>;
    case 'moments': return <MomentsChapter/>;
    case 'invitation': return <InvitationChapter/>;
    case 'mehendi': case 'engagement': case 'haldi': case 'wedding': case 'reception': return <CelebrationPage id={which}/>;
    case 'venues': return <VenuesChapter venueIndex={0}/>;
    case 'venue-reception': return <VenuesChapter venueIndex={1}/>;
    case 'epilogue': return <EpilogueChapter/>;
  }}
  // Keep the chapter React elements stable while the renderer animates cloned paper.
  const chapterContent = useMemo(() => pages.map(content), []);
  return <section className="storybook" aria-label="Our storybook">
    <div className="book-stage book-library-stage">
      <div className="book-spine" aria-hidden="true"/><div className="book-resting-sheets" aria-hidden="true"/>
      <div className={'chapter-menu'+(page==='cover'?' chapter-menu-cover':'')} ref={menuArea}>
        <button ref={menuButton} className="chapter-menu-trigger" aria-label="Chapter menu" aria-expanded={menuOpen} aria-controls="mobile-chapter-menu" disabled={turning} onClick={()=>setMenuOpen(!menuOpen)}><span aria-hidden="true">☰</span></button>
        {menuOpen && <nav className="chapter-menu-panel" id="mobile-chapter-menu" aria-label="Choose a chapter">{pages.map((id,i)=><button key={id} aria-current={id===page?'page':undefined} onClick={()=>{if(id===page){setMenuOpen(false);menuButton.current?.focus();}else turn(id);}}>{labels[i]}</button>)}</nav>}
      </div>
      <div className="book-flip-viewport" ref={viewport}/>

    </div>
    {sheets.map((sheet,i)=>createPortal(<div className={"book-sheet-content"+(i===0?" book-sheet-cover":"")}>
      <BookPageFrame/>
      <BookScrollRegion cover={i===0} active={page===pages[i] && !turning} venueCue={['mehendi','engagement','haldi','wedding','reception','venues','venue-reception'].includes(pages[i])} hintSeen={scrollHintSeen} onFirstScroll={dismissScrollHint}>{chapterContent[i]}</BookScrollRegion>
      {i>0 && <div className="book-controls"><button aria-label="Previous page" onClick={()=>turn(pages[i-1])}>←</button><span className="book-page-number"><small>{pages[i]==='epilogue'?'Epilogue':`Chapter ${i===1?1:i===2?2:i<=7?3:4} of 4`}</small>{String(i+1).padStart(2,'0')} / {pages.length}</span><button aria-label="Next page" disabled={i===pages.length-1} onClick={()=>turn(pages[i+1])}>→</button></div>}
    </div>,sheet,pages[i]))}
    <p className="book-status" aria-live="polite">{labels[pages.indexOf(page)]} · {pages.indexOf(page)+1} of {pages.length}</p>
  </section>;
}
