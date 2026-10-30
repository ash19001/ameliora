import type { CSSProperties } from "react";
import Image from "next/image";
import packing from "@/public/photos/packing.jpg";
import { reveal } from "./reveal";

const steps = [
  { name: "Discovery call", time: "30 minutes, free", text: "We learn how the business runs and where the time goes." },
  { name: "Diagnostic", time: "1 to 2 weeks", text: "Your processes mapped, measured and priced. The fee counts towards the build." },
  { name: "Pilot", time: "2 to 4 weeks", text: "One automation, live, against one target agreed up front, such as enquiries answered within five minutes." },
  { name: "Ongoing care", time: "Monthly", text: "Monitoring, fixes and improvements, then the next item on the roadmap." },
];

// The page's one pinned scene: the photograph holds while the scroll walks through the four steps and
// a line fills beside them (see SceneDriver). Without motion every step is shown, unpinned.
export function Process() {
  return (
    <section className="block scene is-live" id="process" data-scene="steps" style={{ "--hold": 1.5 } as CSSProperties} aria-labelledby="process-title">
      <div className="scene-stage">
        <div className="wrap grid process">
          <figure className="photo process-photo">
            <Image src={packing} alt="A long packing line with people working at their stations" placeholder="blur" sizes="(max-width: 900px) 100vw, 40vw" />
            <figcaption>A packing line</figcaption>
          </figure>
          <div className="process-copy">
            <h2 id="process-title" {...reveal(0)}>How an engagement runs</h2>
            <p className="note" {...reveal(1)}>Every step has a fixed price, agreed before it starts.</p>
            <div className="steps-wrap">
              <span className="steps-line" aria-hidden="true" />
              <ol className="steps">
                {steps.map((s) => (
                  <li key={s.name} data-step>
                    <span className="step-time">{s.time}</span>
                    <h3>{s.name}</h3>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
