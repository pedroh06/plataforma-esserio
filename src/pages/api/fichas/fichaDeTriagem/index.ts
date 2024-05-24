/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    // Process a POST request

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;

    const user = await db.ficha_De_Triagem.upsert({
      where: {
        id: body.id ? body.id : randomUUID(),
      },
      create: {
        ...body,
      },
      update: {
        ...body,
      },
    });

    res.status(201).json(user);
  }
}
