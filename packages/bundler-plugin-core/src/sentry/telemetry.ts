import SentryCli from "@sentry/cli";
import { defaultStackParser, Hub, makeNodeTransport, NodeClient } from "@sentry/node";
import { NormalizedOptions, SENTRY_SAAS_URL } from "../options-mapping";

const SENTRY_SAAS_HOSTNAME = "sentry.io";

export function createSentryInstance(
  options: NormalizedOptions,
  shouldSendTelemetry: Promise<boolean>,
  bundler: string
) {
  const client = new NodeClient({
    dsn: "https://4c2bae7d9fbc413e8f7385f55c515d51@o1.ingest.sentry.io/6690737",

    tracesSampleRate: 1,
    sampleRate: 1,

    release: __PACKAGE_VERSION__,
    integrations: [],
    tracePropagationTargets: ["sentry.io/api"],

    stackParser: defaultStackParser,

    beforeSend: (event) => {
      event.exception?.values?.forEach((exception) => {
        delete exception.stacktrace;
      });

      delete event.server_name; // Server name might contain PII
      return event;
    },

    beforeSendTransaction: (event) => {
      delete event.server_name; // Server name might contain PII
      return event;
    },

    // We create a transport that stalls sending events until we know that we're allowed to (i.e. when Sentry CLI told
    // us that the upload URL is the Sentry SaaS URL)
    transport: (nodeTransportOptions) => {
      const nodeTransport = makeNodeTransport(nodeTransportOptions);
      return {
        flush: (timeout) => nodeTransport.flush(timeout),
        send: async (request) => {
          if (await shouldSendTelemetry) {
            return nodeTransport.send(request);
          } else {
            return undefined;
          }
        },
      };
    },
  });

  const hub = new Hub(client);

  setTelemetryDataOnHub(options, hub, bundler);

  return { sentryHub: hub, sentryClient: client };
}

export function setTelemetryDataOnHub(options: NormalizedOptions, hub: Hub, bundler: string) {
  const {
    org,
    project,
    cleanArtifacts,
    finalize,
    setCommits,
    dryRun,
    errorHandler,
    deploy,
    include,
    sourcemaps,
  } = options;

  hub.setTag("include", include.length > 1 ? "multiple-entries" : "single-entry");

  // Optional release pipeline steps
  if (cleanArtifacts) {
    hub.setTag("clean-artifacts", true);
  }
  if (setCommits) {
    hub.setTag("set-commits", setCommits.auto === true ? "auto" : "manual");
  }
  if (finalize) {
    hub.setTag("finalize-release", true);
  }
  if (deploy) {
    hub.setTag("add-deploy", true);
  }

  // Miscelaneous options
  if (dryRun) {
    hub.setTag("dry-run", true);
  }
  if (errorHandler) {
    hub.setTag("error-handler", "custom");
  }
  if (sourcemaps?.assets) {
    hub.setTag("debug-id-upload", true);
  }

  hub.setTag("node", process.version);

  hub.setTags({
    organization: org,
    project,
    bundler,
  });

  hub.setUser({ id: org });
}

export async function allowedToSendTelemetry(options: NormalizedOptions): Promise<boolean> {
  const { silent, org, project, authToken, url, vcsRemote, headers, telemetry, dryRun } = options;

  // `options.telemetry` defaults to true
  if (telemetry === false) {
    return false;
  }

  if (dryRun) {
    return false;
  }

  if (url === SENTRY_SAAS_URL) {
    return true;
  }

  const cli = new SentryCli(options.configFile, {
    url,
    authToken,
    org,
    project,
    vcsRemote,
    silent,
    headers,
  });

  let cliInfo;
  try {
    // Makes a call to SentryCLI to get the Sentry server URL the CLI uses.
    // We need to check and decide to use telemetry based on the CLI's respone to this call
    // because only at this time we checked a possibly existing .sentryclirc file. This file
    // could point to another URL than the default URL.
    cliInfo = await cli.execute(["info"], false);
  } catch (e) {
    return false;
  }

  const cliInfoUrl = cliInfo
    .split(/(\r\n|\n|\r)/)[0]
    ?.replace(/^Sentry Server: /, "")
    ?.trim();

  if (cliInfoUrl === undefined) {
    return false;
  }

  return new URL(cliInfoUrl).hostname === SENTRY_SAAS_HOSTNAME;
}
