import Image from "next/image";
import { bookingHref } from "@/lib/site";
import office from "@/public/photos/office.jpg";

// The photograph owns the right two-thirds of the first screen; the copy sits on a white panel that
// overlaps its left edge. On load the photograph settles from a slight scale while the copy rises.
export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <figure className="hero-photo">
        <Image src={office} alt="People at work in an open-plan office with tall windows and brick walls" priority placeholder="blur" sizes="(max-width: 900px) 100vw, 68vw" />
        <figcaption>An operations office in a converted mill</figcaption>
      </figure>
      <div className="wrap hero-inner">
        <div className="hero-panel">
          <h1 id="hero-title">AI that pays for itself.</h1>
          <p className="lead">
            We find where your business loses time and money, then design, build and run the AI and automation that wins it back, measured in your own numbers.
          </p>
          <div className="actions">
            <a className="btn" id="hero-cta" href={bookingHref()}>Book a discovery call</a>
            <a className="link" href="#process">How we work</a>
          </div>
        </div>
      </div>
    </section>
  );
}
