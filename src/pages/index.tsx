/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { RecordLayout } from "@/components/layouts/RecordLayout";
import { Input } from "@mui/material";
import { url } from "inspector";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { use, useMemo, useState } from "react";

const fichas = [
  {
    nome: "Adicionar ou Editar Residente",
    urlDestino: "/residente",
  },
  {
    nome: "Nutrição - Triagem",
    urlDestino: "/fichas/nutricao",
  },
  {
    nome: "Nutrição - Ficha em Branco",
    urlDestino: "/fichas/nutricaoBlank",
  },

  {
    nome: "Fisioterapia - Triagem",
    urlDestino: "/fichas/fisioterapia",
  },

  {
    nome: "Fisioterapia - Ficha em Branco",
    urlDestino: "/fichas/fisioterapiaBlank",
  },

  {
    nome: "Odontologia - Triagem",
    urlDestino: "/fichas/odontologia",
  },
  {
    nome: "Odontologia - Ficha em Branco",
    urlDestino: "/fichas/odontologiaBlank",
  },
  {
    nome: "Psicologia - Triagem",
    urlDestino: "/fichas/psicologia",
  },
  {
    nome: "Psicologia - Ficha em Branco",
    urlDestino: "/fichas/psicologiaBlank",
  },
  {
    nome: "Direito - Ficha em Branco",
    urlDestino: "/fichas/direitoBlank",
  },

  {
    nome: "Medicina/Enfermagem - Ficha em Branco",
    urlDestino: "/fichas/medicinaBlank",
  },
  
];

export default function ResidentePage() {
  const [pesquisa, setPesquisa] = useState("");

  const fichasFiltradas = useMemo(() => {
    return fichas.filter((ficha) => {
      const pesquisaNormalizada = pesquisa.normalize("NFD").toLowerCase();

      const nomeNormalizado = ficha.nome.normalize("NFD").toLowerCase();

      if (pesquisa === "") {
        return true;
      }

      return nomeNormalizado.includes(pesquisaNormalizada);
    });
  }, [pesquisa]);

  return (
    <RecordLayout>
      <div className="flex w-full flex-col  justify-center gap-4 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
        <h1 className="bold text-xl">Boas Vindas a Plataforma Niej</h1>
        <p>Desenvolvida pelo Hefesto, qualquer dúvida estamos a disposição!</p>
        <p>Selecione ou pesquise a ficha que deseja usar</p>

        <Input
          placeholder="Pesquisar"
          title="Pesquisar Ficha"
          value={pesquisa}
          onChange={(event) => setPesquisa(event.target.value)}
        />

        <div className="flex flex-col gap-4">
          {fichasFiltradas.map((ficha) => {
            return (
              <Link
                className="flex min-h-[2.5rem] w-full items-center justify-between gap-1 rounded-md bg-blue-800 px-5 text-sm text-white"
                key={ficha.urlDestino}
                href={ficha.urlDestino}
              >
                {ficha.nome}
                <ArrowRight className="h-6 w-6" />
              </Link>
            );
          })}
        </div>
      </div>
    </RecordLayout>
  );
}
