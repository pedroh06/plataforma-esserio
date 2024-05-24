/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { RecordLayout } from "@/components/layouts/RecordLayout";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function ResidentePage() {
  const router = useRouter();
  const [users, setUsers] = useState<CardUserProps[]>([]);

  useEffect(() => {
    const getResidents = async () => {
      const response = await fetch("/api/residente");
      const residents = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setUsers(residents);
    };

    getResidents();
  }, []);

  return (
    <RecordLayout>
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
        <h1 className="bold text-xl">Residentes</h1>
        <button
          className="flex h-10 w-full items-center justify-center gap-1 rounded-md bg-purple-800 text-sm font-bold text-white"
          onClick={() => router.push("/residente/cadastrar")}
        >
          <Plus className="h-6 w-6" />
          Adicionar residente
        </button>

        <ListUser
          users={users}
          onClick={(user) => router.push(`/fichas/direitoBlank/${user.id}`)}
        />
      </div>
    </RecordLayout>
  );
}

type ListUserProps = {
  users: CardUserProps[];
  onClick?: (user: CardUserProps) => void;
};

function ListUser({ users, onClick }: ListUserProps) {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchNormalized = search
        .normalize("NFD")
        .replace(/\s+/g, "-")
        .split(".")
        .join("")
        .split("-")
        .join("")
        .trim()
        .toLowerCase();

      const nameNormalized = user.name
        .normalize("NFD")
        .replace(/\s+/g, "-")
        .split(".")
        .join("")
        .split("-")
        .join("")
        .trim()
        .toLowerCase();

      return nameNormalized.includes(searchNormalized);
    });
  }, [search, users]);

  return (
    <>
      <input
        type="text"
        placeholder="Buscar por NOME"
        className="h-10 w-full rounded-md border-2 border-gray-300 px-2 focus:border-blue-400 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex max-h-72 w-full flex-col gap-4 overflow-auto">
        {users.length > 0 ? (
          filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <CardUser
                key={index}
                {...user}
                onClick={() => (onClick ? onClick(user) : null)}
              />
            ))
          ) : (
            <span className="self-center text-sm text-gray-400">
              Nenhum usuário encontrado
            </span>
          )
        ) : (
          <span className="self-center text-sm text-gray-400">
            Nenhum usuário cadastrado
          </span>
        )}
      </div>
    </>
  );
}

export type CardUserProps = {
  id: string;
  name: string;
  onClick?: () => void;
};

function CardUser(user: CardUserProps) {
  return (
    <div
      className="flex w-full cursor-pointer flex-wrap justify-between rounded-md bg-gray-300 px-6 py-4 shadow-sm transition-all hover:bg-gray-400 hover:shadow-lg"
      onClick={user.onClick}
    >
      <div className="flex flex-col">
        <span className="text-sm">{user.name}</span>
      </div>

      <div className="flex items-center">
        <ChevronRightIcon className="h-6 w-6" />
      </div>
    </div>
  );
}