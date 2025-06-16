import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

//import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new PrismaInstrumentation({}),
  ],
});

sdk.start();
