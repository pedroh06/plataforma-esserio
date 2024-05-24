/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await db.physiotherapyAnamnesis.create({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        ...body,
        id: randomUUID(),
      },
    });

    res.status(201).json(user);
  }
}
