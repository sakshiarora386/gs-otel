import { PlainObject } from "@godspeedsystems/core";
import { EventSource } from "@godspeedsystems/plugins-express-as-http";
import promClient from '@godspeedsystems/metrics';
import { PrismaClient } from "../../datasources/prisma-clients/schema";

class MyEventSource extends EventSource {
  async initClient(): Promise<PlainObject> {
    const client = await super.initClient();

    client.get('/custom-metrics', async (req: any, res: any) => {
      try {
        let prismaMetrics: string = '';
        const prismaClient = new PrismaClient();
        prismaMetrics+= await prismaClient.$metrics.prometheus();
        const expressMetrics = await promClient.register.metrics();
        res.set('Content-Type', promClient.register.contentType);
        res.end(expressMetrics + '\n' + prismaMetrics);
      } catch (err: any) {
        const error_data = err.stack || err;
        const error_code = error_data.code || 500;
        const error_message = error_data.message || error_data;
        res.status(error_code).send({ success: false, error: { code: error_code, message: error_message } });
      }
    });

    return client;
  }
}
export default MyEventSource;