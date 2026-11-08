import { forwardRef } from 'react';

/** Paint surface stays inside the turning book and never captures interactions. */
export const HorizontalPageTurnStardust = forwardRef<HTMLCanvasElement>(function HorizontalPageTurnStardust(_, ref) {
  return <canvas className="stardust-layer" ref={ref} aria-hidden="true"/>;
});

/** Paint the same book-relative sweep positions as a decorative trail. */
export class StardustTrail {
  private frame = 0;
  private cleanupTimer: ReturnType<typeof setTimeout> | undefined;
  private leader: number | null = null;
  private width = 0;
  private height = 0;
  private ctx: CanvasRenderingContext2D | null;
  private history: number[] = [];
  private active = false;
  private scale = 1;

  constructor(private canvas: HTMLCanvasElement) { this.ctx = canvas.getContext('2d'); }

  start(_forward: boolean, width: number, height: number) {
    this.destroy();
    this.width = width; this.height = height; this.active = true;
    this.scale = Math.max(.8, Math.min(1.2, width / 360));
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(width * ratio); this.canvas.height = Math.round(height * ratio);
    this.ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  update(x: number, now: number) {
    if (!this.ctx) return;
    this.leader = Math.max(0, Math.min(this.width, x));
    this.history.push(this.leader);
    if (this.history.length > 512) this.history.shift();
    this.paint(now, 1);
  }

  finish() {
    if (!this.active) return;
    this.active = false;
    cancelAnimationFrame(this.frame);
    const start = performance.now();
    // If animation frames are throttled (for example in a background tab),
    // never leave the final painted frame behind indefinitely.
    this.cleanupTimer = setTimeout(() => this.destroy(), 300);
    const fade = (now: number) => {
      const opacity = Math.max(0, 1 - (now - start) / 260);
      this.paint(now, opacity);
      if (opacity > 0) this.frame = requestAnimationFrame(fade);
      else this.destroy();
    };
    this.frame = requestAnimationFrame(fade);
  }

  destroy() {
    cancelAnimationFrame(this.frame); this.frame = 0;
    clearTimeout(this.cleanupTimer); this.cleanupTimer = undefined;
    this.ctx?.clearRect(0, 0, this.width, this.height);
    this.history = []; this.leader = null; this.active = false;
  }

  private star(x: number, y: number, size: number, color: string, outline = false) {
    const c = this.ctx!; c.beginPath();
    for (let i = 0; i < 8; i++) {
      const radius = size * (i % 2 ? .15 : .5), a = i * Math.PI / 4 - Math.PI / 2;
      const px = x + Math.cos(a) * radius, py = y + Math.sin(a) * radius;
      i ? c.lineTo(px, py) : c.moveTo(px, py);
    }
    c.closePath(); c.fillStyle = color; c.fill();
    if (outline) { c.strokeStyle = '#e8c98d'; c.lineWidth = 1; c.stroke(); }
  }

  private paint(now: number, opacity: number) {
    const c = this.ctx; if (!c) return;
    c.clearRect(0, 0, this.width, this.height);
    if (this.leader === null || !this.history.length) return;
    const y = this.height / 2, count = this.history.length;
    const center = Math.max(0, 1 - Math.abs(this.leader - this.width / 2) / (this.width * .16));
    const flourish = center * center * (3 - 2 * center);
    c.save(); c.globalAlpha = opacity;
    // Draw beneath the particles using only consecutive recorded positions.
    // Per-segment opacity follows sample age in either travel direction, and
    // shares the same fade and canvas cleanup as the rest of the trail.
    c.lineCap = 'round';
    for (let i = 1; i < count; i++) {
      const age = i / (count - 1);
      const shimmer = .94 + .06 * Math.sin(now / 450 + i * .17);
      c.beginPath(); c.moveTo(this.history[i - 1], y); c.lineTo(this.history[i], y);
      c.strokeStyle = '#fff2da'; c.lineWidth = 4 * this.scale;
      c.globalAlpha = opacity * .13 * age * shimmer; c.stroke();
      c.strokeStyle = '#c6a16a'; c.lineWidth = 1.2 * this.scale;
      c.globalAlpha = opacity * .65 * age * shimmer; c.stroke();
      // A gentle highlight stays attached to the newest fifth of the path.
      const nearLeader = Math.max(0, (age - .8) / .2);
      if (nearLeader > 0) {
        c.strokeStyle = '#fff2da'; c.lineWidth = 1 * this.scale;
        c.globalAlpha = opacity * .4 * nearLeader * shimmer; c.stroke();
      }
    }
    // A fixed, irregular selection samples the real sweep history; every x
    // remains a visited position while the small offsets create a soft band.
    for (let i = 0; i < 48 && count > 1; i++) {
      const fraction = Math.min(.99, Math.max(0, (i + .5 + .35 * Math.sin(i * 8.7)) / 48));
      const index = Math.floor(fraction * (count - 1));
      const x = this.history[index], age = index / Math.max(1, count - 1);
      const offset = Math.sin(i * 2.37) * (3 + (i % 5) * 2.4) * this.scale;
      const twinkle = .8 + .2 * Math.sin(now / 330 + i * 1.7);
      c.globalAlpha = opacity * Math.min(1, (.24 + .7 * age + .15 * flourish * age * age) * twinkle);
      c.fillStyle = i % 4 === 0 ? '#fff2da' : i % 3 === 0 ? '#b77b27' : '#e8c98d';
      c.beginPath(); c.arc(x, y + offset, (.55 + (i % 4) * .28) * this.scale, 0, Math.PI * 2); c.fill();
    }
    for (let i = 0; i < 7 && count > 2; i++) {
      const fraction = [.12, .24, .37, .49, .65, .79, .91][i];
      const index = Math.floor(fraction * (count - 1));
      const twinkle = .8 + .2 * Math.sin(now / 310 + i * 2.1);
      c.globalAlpha = opacity * Math.min(1, (.42 + .48 * fraction + .18 * flourish * fraction) * twinkle);
      const wine = i === 2 || i === 5;
      this.star(this.history[index], y + Math.sin(i * 2.4) * 9 * this.scale,
        (wine ? 10 : 6 + i % 3) * this.scale, wine ? '#63223a' : '#e8c98d', wine);
    }
    c.globalAlpha = opacity; c.shadowColor = '#fff2da'; c.shadowBlur = 8 + 5 * flourish;
    this.star(this.leader, y, 24 * this.scale, '#63223a', true);
    c.restore();
  }
}
