export { onBeforeRender };

import "isomorphic-fetch";
import { renderToStream } from "react-streaming/server";
import type { OnBeforeRenderAsync } from "vike/types";

const onBeforeRender: OnBeforeRenderAsync = async (
  pageContext
): ReturnType<OnBeforeRenderAsync> => {
  const { Page, pageProps, userAgent } = pageContext;

  const pageHtml = await renderToStream(<Page {...pageProps} />, {
    userAgent,
    seoStrategy: "google-speed",
  });

  return {
    pageContext: {
      pageHtml,
      userAgent,
    },
  };
};
