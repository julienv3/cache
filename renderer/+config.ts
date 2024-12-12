import * as config from "@vite-plugin-vercel/vike/config";
import type { Config } from "vike/types";

export default {
  extends: [config],
  passToClient: ["pageProps"],
  clientRouting: true,
} satisfies Config;
