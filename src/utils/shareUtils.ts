export function publicSiteUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || /^(localhost|127\.|0\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[::1\])/i.test(url.hostname) || url.hostname.endsWith('.local')) return null;
    url.hash = ''; url.search = ''; return url.href;
  } catch { return null; }
}
export const canonicalUrl = publicSiteUrl(import.meta.env.VITE_SITE_URL);
export const invitationShareText = "You're warmly invited to celebrate the wedding of Riya & Prashant! Join us as we begin our forever on 3 December 2026. View our invitation:";
export function whatsappUrl(url: string) {
  return 'https://wa.me/?text=' + encodeURIComponent(`${invitationShareText} ${url}`);
}
