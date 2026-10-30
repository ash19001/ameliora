import type { CSSProperties } from "react";

// Props for an element that rises in when its section scrolls into view.
// `i` staggers siblings by 70ms each (see [data-reveal] in globals.css).
export function reveal(i = 0) {
  return { "data-reveal": "", style: { "--i": i } as CSSProperties };
}
