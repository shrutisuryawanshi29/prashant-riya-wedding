import { PageFlip } from 'page-flip';
import './page-turn-library-preview.css';

const root = document.querySelector('#flipbook');
const names = ['Page One', 'Page Two', 'Page Three'];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const originals = names.map((name, i) => {
  const page = document.createElement('article');
  page.className = 'paper-page'; page.dataset.page = String(i);
  page.innerHTML = `<div class="prototype-sheet-content"><header class="prototype-header"><p>STORYBOOK PROTOTYPE</p><h1 tabindex="-1">${name}</h1><span aria-hidden="true">✦</span></header><div class="prototype-content" tabindex="0" aria-label="${name} content"><p>A quiet chapter, one page at a time.</p>${i === 1 ? '<p class="prototype-long">This longer page demonstrates internal reading. Scroll down to the final line; the paper frame and footer stay in place while reading, and travel together when the sheet turns.</p><p>End of the chapter.</p>' : '<p>Warm paper. A little space to pause.</p>'}</div><nav class="prototype-controls" aria-label="${name} navigation"><button data-direction="-1" aria-label="Previous page">←</button><span>${name}<br>${i + 1} / 3</span><button data-direction="1" aria-label="Next page">→</button></nav></div>`;
  root.append(page); return page;
});
const linkedPage = /^#page-([1-3])$/.exec(location.hash);
const flipbook = new PageFlip(root, {
  startPage: linkedPage ? Number(linkedPage[1])-1 : 0,
  width:root.clientWidth, height:root.clientHeight, size:'fixed', minWidth:240, maxWidth:1200,
  minHeight:420, maxHeight:1000, usePortrait:true, autoSize:false,
  showCover:false, drawShadow:true, maxShadowOpacity:0.16,
  flippingTime:1100, mobileScrollSupport:false, swipeDistance:70,
  disableFlipByClick:false, useMouseEvents:false,
});
let index = 0;
const diagnostics = new URLSearchParams(location.search).has('diagnostics');
let actionNumber = 0;
function trace(event, details = {}) {
  if (diagnostics) console.info('pageflip-trace ' + JSON.stringify({event, action:actionNumber, displayed:index, library:flipbook.getCurrentPageIndex(), ...details}));
}
let locked = false;
let focusAfterTurn = false;
const scrollPositions = [0,0,0];
function update() {
  root.querySelectorAll('.paper-page').forEach(page => {
    const number = Number(page.dataset.page);
    const active = !locked && page === originals[index];
    // StPageFlip's forward portrait copy is the folded reverse, not a second text face.
    page.classList.toggle('prototype-paper-reverse', page !== originals[number]);
    page.inert = !active; page.setAttribute('aria-hidden', String(!active));
    page.querySelectorAll('button').forEach(button => {
      button.disabled = !active || number + Number(button.dataset.direction) < 0 || number + Number(button.dataset.direction) > 2;
    });
    const scroll = page.querySelector('.prototype-content');
    scroll.style.overflowY = locked ? 'hidden' : 'auto';
    if (locked || page !== originals[number]) scroll.scrollTop = scrollPositions[number];
  });
  if (!locked) {
    document.querySelector('#announcement').textContent = `${names[index]}, ${index+1} of 3`;
    if (focusAfterTurn) { originals[index].querySelector('h1').focus({preventScroll:true}); focusAfterTurn = false; }
  }
}
// Portrait mode clones the paper. Copy its scroll offset and disable its controls.
new MutationObserver(records => { if (records.some(record => record.addedNodes.length)) update(); }).observe(root,{childList:true,subtree:true});
flipbook.on('flip', event => {
  trace('destination', {destination:event.data});
  // The library owns the index. Do not activate another DOM page until READ.
  if (!locked) { index = flipbook.getCurrentPageIndex(); update(); }
});
flipbook.on('changeState', event => {
  trace(event.data === 'read' ? 'complete' : 'start', {state:event.data});
  locked = event.data !== 'read';
  if (!locked) {
    index = flipbook.getCurrentPageIndex();
    history.replaceState(null, '', location.pathname + location.search + '#page-' + (index+1));
  }
  update();
  if (!locked) trace('settled');
});
flipbook.loadFromHTML(originals);
new ResizeObserver(() => {
  if (locked) return; // Never change page geometry during a live turn.
  const settings = flipbook.getSettings();
  if (settings.width === root.clientWidth && settings.height === root.clientHeight) return;
  settings.width = root.clientWidth; settings.height = root.clientHeight;
  flipbook.update();
}).observe(root);
function navigate(direction) {
  if (locked || flipbook.getState() !== 'read') { trace('ignored', {direction}); return; }
  index = flipbook.getCurrentPageIndex();
  if (index+direction < 0 || index+direction > 2) return;
  actionNumber++; trace('navigate', {direction, destination:index+direction});
  scrollPositions[index] = originals[index].querySelector('.prototype-content').scrollTop;
  focusAfterTurn = true;
  if (reducedMotion.matches) { flipbook.turnToPage(index+direction); update(); return; }
  locked = true; update();
  if (direction > 0) flipbook.flipNext('bottom'); else flipbook.flipPrev('bottom');
}
root.addEventListener('click', event => {
  const button = event.target.closest('button[data-direction]');
  if (button && !button.disabled) navigate(Number(button.dataset.direction));
});
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('button')) return;
  if (event.key === 'ArrowLeft') {event.preventDefault(); navigate(-1);}
  if (event.key === 'ArrowRight') {event.preventDefault(); navigate(1);}
});
let touch;
root.addEventListener('touchstart', event => { touch = event.target.closest('button') ? null : {x:event.touches[0].clientX,y:event.touches[0].clientY}; },{passive:true});
root.addEventListener('touchend', event => {
  if (!touch) return;
  const dx=event.changedTouches[0].clientX-touch.x,dy=event.changedTouches[0].clientY-touch.y; touch=null;
  if (Math.abs(dx)>80 && Math.abs(dx)>Math.abs(dy)*2) navigate(dx<0?1:-1);
},{passive:true});
root.addEventListener('touchcancel',()=>{touch=null;},{passive:true});
update();
