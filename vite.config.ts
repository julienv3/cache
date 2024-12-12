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

async function getGraphqlEndpoint({ cache }: { cache: boolean }) {
  const endpoint = await getSsrEndpoint(
    {},
    path.join(__dirname, "graphql_.template.ts")
  );
  endpoint.addRoute = true;
  endpoint.destination = cache ? "cache" : "query";
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
        await getGraphqlEndpoint({ cache: false }),
        await getGraphqlEndpoint({ cache: true }),
      ],
    },
  };
});
