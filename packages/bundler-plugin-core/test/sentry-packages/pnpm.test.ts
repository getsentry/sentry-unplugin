import { join } from "node:path";
import { getSentryPackagesInPnpm } from "../../src/sentry-packages/pnpm";

describe("pnpm", () => {
  describe("getSentryPackagesInPnpm", () => {
    it("works with lockfile", async () => {
      const actual = await getSentryPackagesInPnpm(join(__dirname, "../fixtures/lockfile-pnpm"));

      expect(actual).toEqual([
        { packageName: "@sentry-internal/tracing", actualVersion: "7.50.0" },
        { packageName: "@sentry-internal/tracing", actualVersion: "7.80.0" },
        { packageName: "@sentry/browser", actualVersion: "7.50.0" },
        {
          packageName: "@sentry/bundler-plugin-core",
          actualVersion: "2.10.0",
        },
        { packageName: "@sentry/cli", actualVersion: "2.21.4" },
        { packageName: "@sentry/core", actualVersion: "7.50.0" },
        { packageName: "@sentry/core", actualVersion: "7.80.0" },
        { packageName: "@sentry/node", actualVersion: "7.80.0" },
        { packageName: "@sentry/react", actualVersion: "7.50.0" },
        { packageName: "@sentry/replay", actualVersion: "7.50.0" },
        { packageName: "@sentry/types", actualVersion: "7.50.0" },
        { packageName: "@sentry/types", actualVersion: "7.80.0" },
        { packageName: "@sentry/utils", actualVersion: "7.50.0" },
        { packageName: "@sentry/utils", actualVersion: "7.80.0" },
        { packageName: "@sentry/webpack-plugin", actualVersion: "2.10.0" },
      ]);
    });
  });
});
