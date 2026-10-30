import { reveal } from "./reveal";

// The visitor's problem in their own words, before anything about us.
export function Problem() {
  return (
    <section className="block" aria-label="The problem">
      <div className="wrap grid problem">
        <p className="statement" {...reveal(0)}>The work still lands on your people.</p>
        <p className="problem-note" {...reveal(1)}>
          You have tried the AI tools. Most firms stall between buying software and changing how the work gets done. That gap is where we work.
        </p>
      </div>
    </section>
  );
}
