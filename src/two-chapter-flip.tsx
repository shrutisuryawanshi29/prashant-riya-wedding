import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { PageFlip } from 'page-flip';
import { LittleThings } from './sections/StoryBook';
import { PlacesChapter } from './sections/BookChapters';
import './style.css';
import './two-chapter-flip.css';

const host = document.querySelector<HTMLElement>('#flipbook')!;
const originals = [0,1].map(index => {
  const paper = document.createElement('article'); paper.className='paper-page'; paper.dataset.page=String(index); host.append(paper);
  flushSync(() => createRoot(paper).render(<div className="prototype-sheet-content">
    <div className="book-page-scroll" tabIndex={0} aria-label="Chapter content">{index===0?<LittleThings/>:<PlacesChapter/>}</div>
    <div className="book-controls"><button data-direction="-1" aria-label="Previous page">←</button><span className="book-page-number"><small>Chapter {index+1} of 7</small>0{index+2} / 12</span><button data-direction="1" aria-label="Next page">→</button></div>
  </div>));
  return paper;
});
const renderer = new PageFlip(host, {
  width:host.clientWidth,height:host.clientHeight,size:'fixed',minWidth:240,maxWidth:1200,minHeight:420,maxHeight:1000,
  usePortrait:true,autoSize:false,showCover:false,drawShadow:true,maxShadowOpacity:0.16,flippingTime:1100,
  mobileScrollSupport:false,swipeDistance:70,disableFlipByClick:false,useMouseEvents:false,
});
let locked=false, ready=false, shouldFocus=false;
const offsets=[0,0];
function sync() {
  const active=renderer.getCurrentPageIndex();
  host.querySelectorAll<HTMLElement>('.paper-page').forEach(paper=>{
    const index=Number(paper.dataset.page), live=ready&&!locked&&paper===originals[active];
    paper.inert=!live;paper.setAttribute('aria-hidden',String(!live));
    paper.classList.toggle('prototype-paper-reverse',paper!==originals[index]);
    paper.querySelectorAll<HTMLButtonElement>('button').forEach(button=>{button.disabled=!live||index+Number(button.dataset.direction)<0||index+Number(button.dataset.direction)>1;});
    const scroll=paper.querySelector<HTMLElement>('.book-page-scroll')!;
    scroll.style.overflowY=locked?'hidden':'auto';
    if(locked)scroll.scrollTop=offsets[index];
  });
  if(!locked&&ready){
    document.querySelector('#announcement')!.textContent=active===0?'The Little Things':'Three Places, One Forever';
    if(shouldFocus){originals[active].querySelector<HTMLElement>('.book-page-scroll')!.focus({preventScroll:true});shouldFocus=false;}
  }
}
renderer.on('flip',()=>{if(!locked)sync();});
renderer.on('changeState',event=>{locked=event.data!=='read';sync();});
renderer.loadFromHTML(originals);
new MutationObserver(records=>{if(records.some(record=>record.addedNodes.length))sync();}).observe(host,{childList:true,subtree:true});
// Both real illustrations are decoded before allowing this comparison test.
const images=Array.from(host.querySelectorAll('img'));images.forEach(image=>{image.loading='eager';});
Promise.allSettled(images.map(image=>image.decode())).then(()=>{ready=true;sync();});
function navigate(direction:number){
  const current=renderer.getCurrentPageIndex();
  if(!ready||locked||renderer.getState()!=='read'||current+direction<0||current+direction>1)return;
  offsets[current]=originals[current].querySelector<HTMLElement>('.book-page-scroll')!.scrollTop;
  shouldFocus=true;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){renderer.turnToPage(current+direction);sync();return;}
  locked=true;sync();if(direction>0)renderer.flipNext('bottom');else renderer.flipPrev('bottom');
}
host.addEventListener('click',event=>{const button=(event.target as HTMLElement).closest<HTMLButtonElement>('button[data-direction]');if(button&&!button.disabled)navigate(Number(button.dataset.direction));});
host.addEventListener('keydown',event=>{if((event.target as HTMLElement).closest('button,a,summary,input,select'))return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();navigate(event.key==='ArrowRight'?1:-1);}});
new ResizeObserver(()=>{if(locked)return;const settings=renderer.getSettings();if(settings.width===host.clientWidth&&settings.height===host.clientHeight)return;settings.width=host.clientWidth;settings.height=host.clientHeight;renderer.update();}).observe(host);
sync();
