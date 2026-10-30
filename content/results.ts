// Anonymised results from past roles. The Results section and its nav link
// only appear once at least one entry has `verified: true`.
// Never mark an entry verified unless the figures are real.
export type Result = {
  organisation: string; // e.g. "Financial services firm, 200 staff"
  automated: string; // what was automated
  before: string;
  after: string;
  verified: boolean;
};

export const results: Result[] = [
  {
    organisation: "Financial services firm, 200 staff",
    automated: "Reading and routing incoming documents",
    before: "35 hours a week",
    after: "6 hours a week",
    verified: false,
  },
  {
    organisation: "Recruitment business, 60 staff",
    automated: "Summarising CVs for consultants",
    before: "15 minutes a CV",
    after: "2 minutes a CV",
    verified: false,
  },
  {
    organisation: "Online retailer, 40 staff",
    automated: "Sorting and answering customer emails",
    before: "Next-day replies",
    after: "Replies within the hour",
    verified: false,
  },
];

export const verifiedResults = results.filter((r) => r.verified);
