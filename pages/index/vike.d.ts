import type { renderToStream } from "react-streaming/server";

declare global {
  namespace Vike {
    interface PageContext {
      Page: (pageProps: PageProps) => React.ReactElement;
      pageProps: PageProps;
      pageHtml: Awaited<ReturnType<typeof renderToStream>>;
      userAgent: string;
    }
  }
}

export = {};
