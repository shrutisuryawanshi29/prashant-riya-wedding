import './editorial-reveal-preview.css';

const pages = [
  {number:'PAGE ONE', title:'The Beginning', text:'Every story starts somewhere.'},
  {number:'PAGE TWO', title:'The Journey', text:'A collection of little moments.'},
  {number:'PAGE THREE', title:'Forever', text:'A beautiful chapter still to come.'},
];
const base = document.querySelector('#base');
const bookWindow = document.querySelector('#window');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const status = document.querySelector('#status');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let active = 0;
let turning = false;
let animationId = 0;
let fallback;

function render(page, index) {
  const content = pages[index];
  page.replaceChildren();
  const kicker = document.createElement('p'); kicker.className = 'editorial-label'; kicker.textContent = content.number;
  const title = document.createElement('h1'); title.textContent = content.title;
  const ornament = document.createElement('span'); ornament.className = 'editorial-ornament'; ornament.setAttribute('aria-hidden', 'true'); ornament.textContent = '✦';
  const description = document.createElement('p'); description.className = 'editorial-description'; description.textContent = content.text;
  page.append(kicker,title,ornament,description);
}
function updateControls() {
  previous.disabled = turning || active === 0;
  next.disabled = turning || active === pages.length - 1;
  status.textContent = `${pages[active].number} · ${active + 1} / ${pages.length}`;
}
function navigate(direction) {
  const destination = active + direction;
  if (turning || destination < 0 || destination >= pages.length) return;
  if (reducedMotion.matches) { active = destination; render(base, active); updateControls(); return; }
  turning = true; updateControls();
  const id = ++animationId;
  const moving = document.createElement('div');
  moving.className = `editorial-page editorial-moving ${direction > 0 ? 'editorial-forward' : 'editorial-backward'}`;
  moving.setAttribute('aria-hidden', 'true'); moving.inert = true;
  // Forward: the old page leaves. Backward: the returning page travels from the stack.
  render(moving, direction > 0 ? active : destination);
  render(base, direction > 0 ? destination : active);
  base.setAttribute('aria-hidden', 'true');
  bookWindow.append(moving);
  const finish = () => {
    if (!turning || id !== animationId) return;
    clearTimeout(fallback);
    active = destination; render(base, active); base.removeAttribute('aria-hidden');
    moving.remove(); turning = false; updateControls();
  };
  moving.addEventListener('animationend', event => { if (event.target === moving) finish(); }, {once:true});
  fallback = setTimeout(finish, 1100);
}
previous.addEventListener('click', () => navigate(-1));
next.addEventListener('click', () => navigate(1));
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('button')) return;
  if (event.key === 'ArrowLeft') {event.preventDefault(); navigate(-1);}
  if (event.key === 'ArrowRight') {event.preventDefault(); navigate(1);}
});
render(base, active); updateControls();
