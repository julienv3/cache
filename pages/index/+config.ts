import type { Config } from "vike/types";

export default {
  hydrationCanBeAborted: true,
  prerender: true,
  // NOTE: this is stale-while-revalidate with no max stale age;
  // the 2nd+ requests are _always_ from cache, with a background cache update if it is considered stale.
  isr: { expiration: 10 },
} satisfies Config;
