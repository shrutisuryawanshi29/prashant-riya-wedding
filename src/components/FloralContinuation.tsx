/** Small floral echoes of the hero's urn arrangements; no architectural frame. */
function FloralTrail() {
  return <svg viewBox="0 0 82 150" fill="none" aria-hidden="true" focusable="false">
    <g stroke="#b69a65" strokeWidth=".8" strokeLinecap="round">
      <path d="M3 2C34 13 47 31 31 58S12 102 29 132M22 19C49 18 62 30 69 48M31 55C50 63 50 78 48 91"/>
      <g fill="#c6b383" fillOpacity=".5">
        <path d="M17 14Q11 2 1 6Q3 17 17 14ZM35 32Q50 24 51 13Q35 17 35 32ZM30 59Q14 54 13 42Q28 44 30 59ZM24 75Q38 74 41 62Q26 62 24 75ZM21 97Q9 88 7 78Q21 83 21 97ZM23 115Q36 109 37 99Q24 101 23 115ZM52 28Q53 17 62 14Q66 26 52 28Z"/>
      </g>
    </g>
    <g transform="translate(25 25)">
      <path d="M-14-4Q-18-15-6-15Q2-24 9-14Q22-14 19-2Q24 7 13 12Q9 23-1 16Q-13 20-15 9Q-24 3-14-4Z" fill="#c38991"/>
      <path d="M-10-5Q-9-14 1-10Q10-15 13-5Q18 2 9 7Q5 16-4 10Q-14 13-13 3Z" fill="#a9576c"/>
      <path d="M-7-3Q0-12 7-5Q13 2 5 7Q-4 12-8 4Q-13-1-7-3Z" fill="#7b283c"/>
      <path d="M-8-3Q-1-6 4-2Q8 3 3 6M-2-7Q7-8 10-1M-11 3Q-8 11 1 11" stroke="#e5b7b4" strokeWidth="1"/>
    </g>
    <g transform="translate(58 44) scale(.56)">
      <path d="M-14-4Q-18-15-6-15Q2-24 9-14Q22-14 19-2Q24 7 13 12Q9 23-1 16Q-13 20-15 9Q-24 3-14-4Z" fill="#dfb4ae"/>
      <path d="M-10-4Q0-15 11-5Q19 5 6 11Q-8 16-13 5Z" fill="#bd7e88"/>
      <path d="M-6-3Q3-8 7 1Q8 8-2 6Q-8 6-6-3ZM-10 1Q-13-9-3-11" stroke="#f4d9c8" strokeWidth="1.4"/>
    </g>
    <path d="M45 83Q54 74 55 85Q54 93 48 94Q43 90 45 83Z" fill="#b67a88"/>
    <path d="M28 131Q36 134 31 142Q25 139 28 131Z" fill="#d4a5a7"/>
    <path d="M59 108Q66 106 64 114Q58 116 59 108Z" fill="#dec1a1"/>
    <circle cx="7" cy="56" r="1.2" fill="#c6a15d"/>
    <circle cx="39" cy="119" r="1" fill="#c6a15d"/>
  </svg>;
}

export function FloralContinuation() {
  return <div className="floral-continuation" aria-hidden="true">
    <div className="floral-trail floral-trail-left"><FloralTrail/></div>
    <div className="floral-trail floral-trail-right"><FloralTrail/></div>
  </div>;
}
