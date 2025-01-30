import { getSsrEndpoint } from "@vite-plugin-vercel/vike";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import vike from "vike/plugin";
import { ConfigEnv, ServerOptions, defineConfig, loadEnv } from "vite";
import vercel from "vite-plugin-vercel";

const envDir = path.join(__dirname, "./env");

function getServerOptions(
  env: Record<string, string>
): ServerOptions | undefined {
  return {
    open: env.OPEN === "true",
    host: !!env.HOST && env.HOST,
  };
}

async function getGraphqlEndpoint({
  name,
  cache,
  file = "graphql_.template.ts",
}: {
  name: string;
  cache: boolean;
  file?: string;
}) {
  const endpoint = await getSsrEndpoint({}, path.join(__dirname, file));
  endpoint.addRoute = true;
  endpoint.destination = name;
  endpoint.isr = cache ? { expiration: 10 } : undefined;
  return endpoint;
}

export default defineConfig(async (config: ConfigEnv) => {
  const env = loadEnv(config.mode, envDir, "");

  return {
    plugins: [
      react({
        plugins: [],
      }),
      vike({ prerender: { partial: true } }),
      vercel(),
    ],
    server: getServerOptions(env),
    envDir,
    envPrefix: ["VITE_", "VERCEL_ANALYTICS_ID"],
    vercel: {
      additionalEndpoints: [
        await getSsrEndpoint({}, path.join(__dirname, "ssr_.template.ts")),
        await getGraphqlEndpoint({ name: "query", cache: false }),
        await getGraphqlEndpoint({ name: "cache", cache: true }),
        await getGraphqlEndpoint({
          name: "large",
          cache: true,
          file: "large.ts",
        }),
        await getGraphqlEndpoint({
          name: "largeplusone",
          cache: true,
          file: "large.ts",
        }),
        await getGraphqlEndpoint({
          name: "largenocache",
          cache: false,
          file: "large.ts",
        }),
        await getGraphqlEndpoint({
          name: "largenocacheplusone",
          cache: false,
          file: "large.ts",
        }),
      ],
    },
  };
});
