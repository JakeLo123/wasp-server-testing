import { configureQueryClient } from "wasp/client/operations";

export default async function mySetupFunction(): Promise<void> {
  // ... some setup
  configureQueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  // ... some more setup
}
