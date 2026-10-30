import { bookingHref, site } from "@/lib/site";
import { navLinks, Wordmark } from "./Nav";

export function Footer() {
  const legal = [
    site.companyNumber && `${site.name} Ltd, registered in England and Wales, company number ${site.companyNumber}.`,
    site.icoReference && `Registered with the ICO, reference ${site.icoReference}.`,
  ].filter(Boolean);
  return (
    <footer className="foot wrap">
      <div className="foot-grid">
        <div className="foot-brand">
          <a className="wordmark" href="#top"><Wordmark /></a>
          <p>{site.tagline}.</p>
        </div>
        <nav aria-labelledby="foot-company">
          <h2 className="foot-h" id="foot-company">Company</h2>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="foot-h">Contact</h2>
          <ul>
            <li><a href={bookingHref()}>Book a discovery call</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-base">
        <p>
          © {new Date().getFullYear()} {site.name}. {legal.length ? legal.join(" ") : "Based in the UK, working to UK GDPR."}
        </p>
        <p>
          Photographs are illustrative. Some are AI-generated; others are from Unsplash, by Centre for Ageing Better and Remy Gieling.
        </p>
      </div>
    </footer>
  );
}
