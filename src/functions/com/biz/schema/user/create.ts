import { GSContext, GSStatus, PlainObject } from "@godspeedsystems/core";
import { PrismaClient } from "../../../../../datasources/prisma-clients/schema";

module.exports = async (ctx: GSContext, args: PlainObject) => {
  const { inputs: { data: { body } }, logger, datasources } = ctx;

  const client: PrismaClient = datasources.schema.client;

  const response = await client.user.create({
                      data: {...body}
                  });
 
  return new GSStatus(true, 200, "User created", response, undefined );
}
