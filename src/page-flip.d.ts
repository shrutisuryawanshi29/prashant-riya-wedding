declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, settings: Record<string, unknown>);
    on(event: string, callback: (event: {data: number | string}) => void): void;
    loadFromHTML(elements: HTMLElement[]): void;
    getCurrentPageIndex(): number;
    getState(): string;
    getSettings(): {width:number; height:number};
    flipNext(corner?: string): void;
    flipPrev(corner?: string): void;
    flip(index:number, corner?:string): void;
    turnToPage(index:number): void;
    update(): void;
    destroy(): void;
  }
}
