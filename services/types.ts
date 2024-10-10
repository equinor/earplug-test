import { ITelemetryItem } from "@microsoft/applicationinsights-web";

export type Envelope = (item: ITelemetryItem) => boolean | void;
