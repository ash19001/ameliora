import Image from "next/image";
import mapping from "@/public/photos/mapping.jpg";
import { reveal } from "./reveal";

const parts = [
  {
    name: "Find",
    text: "A paid diagnostic maps two to four of your processes, measures the hours and errors in each, and prices what fixing them is worth.",
  },
  {
    name: "Build",
    text: "A feature you already pay for, a no-code workflow or custom software: we build either way, so nothing is forced into one tool.",
  },
  {
    name: "Run",
    text: "We host, monitor and improve what we build every month, and fix it when suppliers change things.",
  },
];

export function Approach() {
  return (
    <section className="block" id="approach" aria-labelledby="approach-title">
      <div className="wrap grid approach">
        <figure className="photo approach-photo" {...reveal(0)}>
          <Image src={mapping} alt="Two people at a table working through a hand-drawn process map" placeholder="blur" sizes="(max-width: 900px) 100vw, 50vw" />
          <figcaption>An owner and their operations lead mapping how an order really moves</figcaption>
        </figure>
        <div className="approach-copy">
          <h2 id="approach-title" {...reveal(1)}>We start with the work, not the tools.</h2>
          <ul className="parts">
            {parts.map((p, i) => (
              <li key={p.name} {...reveal(i + 2)}>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
