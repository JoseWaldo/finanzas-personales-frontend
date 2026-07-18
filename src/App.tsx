import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Provider as JotaiProvider } from "jotai";

import { ThemeProvider } from "@/components/shared/theme-provider";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <JotaiProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </JotaiProvider>
  );
}
