import { reveal } from "./reveal";

const commitments = [
  { lead: "You own everything we build.", rest: "The accounts, the code and the workflows. No lock-in." },
  { lead: "Your data stays yours.", rest: "Built in your own accounts, under UK GDPR, with a data processing agreement as standard." },
  { lead: "People approve what customers see,", rest: "until an automation has earned your trust." },
  { lead: "We are independent.", rest: "We take no referral fees from software vendors." },
  { lead: "Every piece of work is measured.", rest: "One target, agreed before we start and checked after." },
];

export function Commitments() {
  return (
    <section className="block" id="commitments" aria-labelledby="commitments-title">
      <div className="wrap grid commitments">
        <h2 id="commitments-title" {...reveal(0)}>On your terms</h2>
        <ul className="commit-list">
          {commitments.map((c, i) => (
            <li key={c.lead} {...reveal(i + 1)}>
              <p>{c.lead} <span>{c.rest}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
