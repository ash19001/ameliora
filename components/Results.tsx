import { verifiedResults } from "@/content/results";
import { reveal } from "./reveal";

// Renders nothing until content/results.ts holds at least one verified entry.
export function Results() {
  if (verifiedResults.length === 0) return null;
  return (
    <section className="block" id="results" aria-labelledby="results-title">
      <div className="wrap">
        <div className="res-head">
          <h2 id="results-title" {...reveal(0)}>Results from our past work</h2>
          <p className="lead" {...reveal(1)}>
            Before Ameliora, we built AI and automation systems inside other businesses. A few of the results, with names removed.
          </p>
        </div>
        <table className="res" {...reveal(2)}>
          <thead>
            <tr>
              <th scope="col">Organisation</th>
              <th scope="col">What was automated</th>
              <th scope="col">Before</th>
              <th scope="col">After</th>
            </tr>
          </thead>
          <tbody>
            {verifiedResults.map((r) => (
              <tr key={r.automated}>
                <td className="who">{r.organisation}</td>
                <td className="what">{r.automated}</td>
                <td className="v" data-label="Before">{r.before}</td>
                <td className="v v--after" data-label="After">{r.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
