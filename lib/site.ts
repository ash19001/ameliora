// Business details used across the site. Replace the nulls before launch.
export const site = {
  name: "Ameliora",
  tagline: "AI and automation for UK businesses",
  description:
    "Ameliora finds where your business loses time and money, then designs, builds and runs the AI and automation that wins it back, measured in your own numbers.",
  email: "hello@ameliora.co.uk", // placeholder until the domain is live
  // Cal.com or Calendly link for the free discovery call. Until it is set,
  // "Book a discovery call" opens a pre-written email instead.
  bookingUrl: null as string | null,
  companyNumber: null as string | null, // Companies House number
  icoReference: null as string | null, // ICO registration reference
};

export function bookingHref(note?: string): string {
  if (site.bookingUrl) return site.bookingUrl;
  const subject = "Discovery call";
  const body = [
    "Hello Ameliora,",
    "",
    "I'd like to book a 30-minute discovery call.",
    note ? `\n${note}` : "",
    "",
    "Best times to call me:",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
