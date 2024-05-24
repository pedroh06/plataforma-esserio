/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;

  if (!id) {
    res.status(400).send("Missing id");
  }

  if (req.method === "GET") {
    // Process a GET request
    const user = await db.resident.findUnique({
      where: {
        id: id,
      },
      include: {
        Nutricao_Blank_Sheet: true,
        Fisioterapia_Blank_Sheet: true,
        Odontologia_Blank_Sheet: true,
        Psicologia_Blank_Sheet: true,
        Medicina_Blank_Sheet: true,
        Direito_Blank_Sheet: true,
        Nutritional_Form_GAIA_1: true,
        Dental_Anamnesis_GAIA_1: true,
        Medical_Anamnesis_GAIA_1: true,
        Medical_Care_GAIA_1: true,
        Blank_Sheet: true,
        Ficha_De_Triagem: true,
      },
    });

    res.status(200).send(user);
  }
}
