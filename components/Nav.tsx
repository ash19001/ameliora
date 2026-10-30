import { bookingHref, site } from "@/lib/site";
import { verifiedResults } from "@/content/results";

export const navLinks = [
  { href: "#approach", label: "Approach" },
  { href: "#process", label: "How we work" },
  ...(verifiedResults.length ? [{ href: "#results", label: "Results" }] : []),
  { href: "#commitments", label: "Commitments" },
];

// The wordmark's full stop is the one place the signal orange appears at rest.
export function Wordmark() {
  return (
    <>
      {site.name}
      <span className="dot" aria-hidden="true">.</span>
    </>
  );
}

export function Nav() {
  return (
    <header className="nav wrap" data-nav>
      <a className="wordmark" href="#top" aria-label={`${site.name}, back to top`}>
        <Wordmark />
      </a>
      <nav aria-label="Main">
        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="btn btn--small" href={bookingHref()}>
        Book a discovery call
      </a>
    </header>
  );
}
