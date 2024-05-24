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
    const userBody = req.body;

    const user = await db.resident.upsert({
      where: {
        id: userBody.id ? userBody.id : randomUUID(),
      },
      create: {
        name: userBody.name,
        rg: userBody.rg,
        cpf: userBody.cpf,
        socialName: userBody.socialName,
        birthDate: userBody.birthDate,
        deQualFuroVoceVeio: userBody.deQualFuroVoceVeio,
        casoSejaDeOutroFuro: userBody.casoSejaDeOutroFuro,
        gender: userBody.gender,
        race: userBody.race,
        religion: userBody.religion,
        birthPlace: userBody.birthPlace,
        susCard: userBody.susCard,
        phone: userBody.phone,
        isChild: userBody.isChild,
        class: userBody.class,
        responsibleId: userBody.responsibleId
          ? userBody.responsibleId
          : undefined,
        profession: userBody.profession,
        maritalStatus: userBody.maritalStatus,
        children: userBody.children,
        agesOfChildren: userBody.agesOfChildren,
        liveTogether: userBody.liveTogether,
        schooling: userBody.schooling,
        healthPlan: userBody.healthPlan,
        conditionsAccessTreatedWater: userBody.conditionsAccessTreatedWater,
        accessToTreatedWater: userBody.accessToTreatedWater,
        accessToSewage: userBody.accessToSewage,
      },
      update: {
        name: userBody.name,
        socialName: userBody.socialName,
        rg: userBody.rg,
        cpf: userBody.cpf,
        birthDate: userBody.birthDate,
        deQualFuroVoceVeio: userBody.deQualFuroVoceVeio,
        casoSejaDeOutroFuro: userBody.casoSejaDeOutroFuro,
        gender: userBody.gender,
        race: userBody.race,
        religion: userBody.religion,
        birthPlace: userBody.birthPlace,
        susCard: userBody.susCard,
        phone: userBody.phone,
        isChild: userBody.isChild,
        class: userBody.class,
        responsibleId: userBody.responsibleId,
        profession: userBody.profession,
        maritalStatus: userBody.maritalStatus,
        children: userBody.children,
        agesOfChildren: userBody.agesOfChildren,
        liveTogether: userBody.liveTogether,
        schooling: userBody.schooling,
        healthPlan: userBody.healthPlan,
        conditionsAccessTreatedWater: userBody.conditionsAccessTreatedWater,
        accessToTreatedWater: userBody.accessToTreatedWater,
        accessToSewage: userBody.accessToSewage,
      },
    });

    res.status(201).json(user);
  }

  if (req.method === "GET") {
    // Process a GET request
    const users = await db.resident.findMany();

    res.status(200).send(users);
  }
}
