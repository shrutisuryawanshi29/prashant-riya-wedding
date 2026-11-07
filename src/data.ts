export const wedding = {
  couple: { bride: 'Riya', groom: 'Prashant', brideFull: 'Riya Kalburgi', groomFull: 'Prashant Mahant' },
  parents: { bride: 'Smt. Maya and Shri Vinod Venkatsa Kalburgi', groom: 'Smt. Alka and Shri Ramesh Bhagwandas Mahant' },
  grandparents: 'Smt. and Late Shri Venkatsa Ramchandrasa Kalburgi',
  invocations: ['॥ Shree Ganeshay Namah ॥', '॥ Shree Tulja Bhavani Prasanna ॥'],
  story: 'From the City of Dreams to the City of Oranges, with a little California in between — forever begins in Nagpur.',
  muhuratTimestamp: '2026-12-03T10:15:00+05:30',
  invitation: 'We joyfully invite you to celebrate our wedding.',
  closing: 'Your presence and blessings will make our celebrations truly special.',
  events: [
    { name: 'Mehendi', date: 'Tuesday, December 1, 2026', time: '11:15 AM onwards', tagline: 'Embracing the Art of Love', venue: null, symbol: '✽' },
    { name: 'Engagement', date: 'Wednesday, December 2, 2026', time: '10:30 AM onwards', tagline: 'Exchanging the Shine', venue: 'Maharaja Celebrations, Second Floor, Wanadongri, Nagpur', symbol: '◇' },
    { name: 'Haldi', date: 'Wednesday, December 2, 2026', time: '4:00 PM onwards', tagline: 'Activating the Golden Glow', venue: 'Maharaja Celebrations, Ground Floor & Terrace, Wanadongri, Nagpur', symbol: '✺' },
    { name: 'Wedding', date: 'Thursday, December 3, 2026', time: 'Wedding programme · 9:00 AM onwards', muhurat: 'Vivah Muhurat · 10:15 AM', tagline: 'Happily Ever After Starts Here', venue: 'Maharaja Celebrations, Ground Floor, Besides DMart, Hingna Road, Wanadongri, Nagpur – 441110, Maharashtra, India', symbol: '♧' },
    { name: 'Wedding Reception', date: 'Sunday, December 6, 2026', time: '6:00 PM onwards', extra: 'Followed by dinner', tagline: '', venue: 'Nova Banquet Hall, Building No. 4, Infinity Avenue, Sunder Angan Layout, Beverly Park Road, Near Cinemax, Mira Road East, Thane – 401107, Maharashtra, India', symbol: '✧' },
  ],
  venues: [
    { label: 'Wedding Ceremony', date: 'Thursday, December 3, 2026', name: 'Maharaja Celebrations', lines: ['Besides DMart, Hingna Road', 'Wanadongri, Nagpur – 441110', 'Maharashtra, India'], query: 'Maharaja Celebrations, Besides DMart, Hingna Road, Wanadongri, Nagpur 441110, Maharashtra, India' },
    { label: 'Wedding Reception', date: 'Sunday, December 6, 2026', name: 'Nova Banquet Hall', lines: ['Building No. 4, Infinity Avenue', 'Sunder Angan Layout', 'Beverly Park Road, Near Cinemax', 'Mira Road East, Thane – 401107', 'Maharashtra, India'], query: 'Nova Banquet Hall, Building No. 4, Infinity Avenue, Sunder Angan Layout, Beverly Park Road, Near Cinemax, Mira Road East, Thane 401107, Maharashtra, India' },
  ],
  // Add public paths for photographs here; null keeps the invitation placeholders.
  portraits: { bride: null as string | null, groom: null as string | null },
  gallery: [null, null, null] as (string | null)[],
};

export const groomResidenceAddressLines = ['Row House C-06, Rai Town Society', 'Lokmanya Nagar, Hingna Road', 'Nagpur, Maharashtra – 440016'] as const;
export const groomResidenceDirections = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(groomResidenceAddressLines.join(', '));

// Confirmed celebration locations.
export const celebrationArrangements = [
  { label: "Bride's Mehendi", venue: 'Maharaja Celebrations', floor: 'Third Floor', locality: 'Wanadongri, Nagpur', directionsIndex: 0 },
  { label: "Groom's Mehendi", venue: "Prashant's Residence", floor: '', locality: groomResidenceAddressLines.join(', '), directionsIndex: null },
  { label: 'Engagement', venue: 'Maharaja Celebrations', floor: 'Second Floor', locality: 'Wanadongri, Nagpur', directionsIndex: 0 },
  { label: 'Haldi', venue: 'Maharaja Celebrations', floor: 'Ground Floor & Terrace', locality: 'Wanadongri, Nagpur', directionsIndex: 0 },
  { label: 'Wedding', venue: 'Maharaja Celebrations', floor: 'Ground Floor', locality: 'Wanadongri, Nagpur', directionsIndex: 0 },
  { label: 'Reception', venue: 'Nova Banquet Hall', floor: 'Building No. 4', locality: 'Mira Road East, Thane', directionsIndex: 1 },
] as const;
