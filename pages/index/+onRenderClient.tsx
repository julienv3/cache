export { onRenderClient };

import { hydrateRoot } from "react-dom/client";
import { OnRenderClientAsync } from "vike/types";

const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps } = pageContext;
  hydrateRoot(document.getElementById("react-root")!, <Page {...pageProps} />);
};
