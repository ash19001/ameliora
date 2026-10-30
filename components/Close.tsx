import Image from "next/image";
import { bookingHref, site } from "@/lib/site";
import warehouse from "@/public/photos/warehouse.jpg";
import { reveal } from "./reveal";

export function Close() {
  return (
    <section className="block" id="book" aria-labelledby="book-title">
      <div className="wrap grid close">
        <figure className="photo close-photo" {...reveal(0)}>
          <Image src={warehouse} alt="Two colleagues walking down a warehouse aisle, one holding a clipboard" placeholder="blur" sizes="(max-width: 900px) 100vw, 58vw" />
          <figcaption>A warehouse team between orders</figcaption>
        </figure>
        <div className="close-copy">
          <h2 id="book-title" {...reveal(1)}>Start with a 30&#8209;minute call.</h2>
          <p className="lead" {...reveal(2)}>
            Free, with no obligation. We will tell you honestly whether automation would pay for itself in your business.
          </p>
          <div className="actions" {...reveal(3)}>
            <a className="btn" href={bookingHref()}>Book a discovery call</a>
            <a className="link" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
