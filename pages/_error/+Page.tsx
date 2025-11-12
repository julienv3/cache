/*
Copyright 2025 Chainguard, Inc.
SPDX-License-Identifier: Apache-2.0
*/

import { FunctionComponent } from "react";

/* eslint-disable chainguard/no-color-literals -- this is a standalone error page */
export const Page: FunctionComponent<{
  error?: {
    _pageContextAbort?: {
      abortStatusCode: number;
      is404: boolean | null;
      abortReason: unknown;
    };
  };
}> = (props) => {
  return (
    <html>
      <body>
        Error: {props.error?._pageContextAbort?.abortStatusCode || "unknown"}
      </body>
    </html>
  );
};
