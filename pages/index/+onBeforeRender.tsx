export { onBeforeRender };

import "isomorphic-fetch";
import { renderToStream } from "react-streaming/server";
import { render as abortRender } from "vike/abort";
import type { OnBeforeRenderAsync } from "vike/types";

const onBeforeRender: OnBeforeRenderAsync = async (
  pageContext
): ReturnType<OnBeforeRenderAsync> => {
  const { Page, pageProps, userAgent, urlPathname } = pageContext;

  if (urlPathname.startsWith("/status")) {
    const statuses = [401, 403, 404, 410, 429, 500, 503];
    const chosen = statuses.find((status) =>
      urlPathname.endsWith(`/${status}`)
    );
    if (chosen) {
      console.warn(`Aborting render with status ${chosen}`);
      throw abortRender(chosen as 401 | 403 | 404 | 410 | 429 | 500 | 503);
    }
  }

  const pageHtml = await renderToStream(<Page {...pageProps} />, {
    userAgent,
    seoStrategy: "google-speed",
  });

  return {
    pageContext: {
      pageHtml,
    },
  };
};
