/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { RecordLayout } from "@/components/layouts/RecordLayout";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Medicina() {
  const router = useRouter();
  const { pacienteId } = router.query;

  const [residents, setResidents] = useState([]);
  const [resident, setResident] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreateForm, setIsLoadingCreateForm] = useState(false);

  const [formData, setFormDate] = useState({
    father_name: "",
    father_age: "",
    father_job: "",
    father_scholarship: "",
    mother_name: "",
    mother_age: "",
    mother_job: "",
    mother_scholarship: "",
    sons: "",
    partner_age: "",
    partner_scholarship: "",
    partner_name: "",
    complaintMain: "",
    choice_pain: [""],
    extern_stress: [""],
    which_stress: "",
    syntoms_signals:"",
    event_childhood:"",
    family:"",
    other_observation:"",
    psi_before: "",
    desease:"",
    use_medicine: "",
    historical_family_desease:"",
    family_substance_abuse:"",
    family_suicide_history:"",
    notes:"",





  });

  React.useEffect(() => {
    if (!pacienteId) {
      return;
    }

    const getResident = async () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      try {
        const residentsRaw = await fetch("/api/residente");
        const residents = await residentsRaw.json();
        setResidents(residents);

        const response = await fetch(`/api/residente/${pacienteId}`);

        if (!response.ok) {
          console.log("deu erro");
          return;
        }

        const resident = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument

        setResident({
          ...resident,
          birthDate: new Date(resident.birthDate),
          responsible: {
            id: resident.responsibleId,
            name: resident.responsibleId,
          },
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getResident();
  }, [pacienteId]);

  if (isLoading) {
    return (
      <RecordLayout>
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
          <Loader2 className=" h-32 w-32 animate-spin" color="purple" />
        </div>
      </RecordLayout>
    );
  }

  const handleSubmit = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    // e.preventDefault();

    try {
      setIsLoadingCreateForm(true);
      await axios.post("/api/fichas/psicologia", {
        userId: pacienteId,
        ...formData,
      });

      toast.success("Realizado com sucesso com sucesso!");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error("Erro ao registrar!");
    } finally {
      setIsLoadingCreateForm(false);
    }
  };

  return (
    <RecordLayout>
      <div className="my-4 flex w-full flex-col items-center justify-center gap-4 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
        <h1 className="bold text-xl">Psicologia - Ficha de Triagem</h1>

        <div className="relative flex w-full flex-col gap-4 px-2 pt-8">
          <button
            className="absolute left-0 top-0 flex items-center
              gap-1 text-sm text-gray-400"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className="h-6 w-6" />
            Voltar
          </button>

          <ProfileUser user={resident} residents={residents} />
          

          <form className="flex w-full flex-col gap-7" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
              <Text>Nome do pai: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.father_name}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    father_name: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Idade do pai: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.father_age}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    father_age: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Ocupação do pai: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.father_job}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    father_job: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Escolariade do pai: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.father_scholarship}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    father_scholarship: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Nome da mãe: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.mother_name}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    mother_name: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Idade da mãe: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.mother_age}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    mother_age: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Ocupação da mãe: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.mother_job}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    mother_job: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Escolaridade da mãe: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.mother_scholarship}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    mother_scholarship: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Nome do cônjuge: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.partner_name}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    partner_name: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Idade do cônjuge: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.partner_age}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    partner_age: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Ocupação do cônjuge: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.partner_scholarship}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    partner_scholarship: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Filhos:  </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.sons}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    sons: e.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text>Queixa principal?</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.complaintMain}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    complaintMain: e.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>INICIO:</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="SUBITO"
                  checked={formData.choice_pain.includes("SUBITO")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        choice_pain: [...formData.choice_pain, "SUBITO"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        choice_pain: formData.choice_pain.filter((item) => item !== "SUBITO"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="SUBITO"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Súbito
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="PROGRESSIVO" 
                  checked={formData.choice_pain.includes("PROGRESSIVO")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        choice_pain: [...formData.choice_pain, "PROGRESSIVO"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        choice_pain: formData.choice_pain.filter((item) => item !== "PROGRESSIVO"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="PROGRESSIVO"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Progressivo
                </label>
              </div>

              
            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Ocorreram mudanças no período(Extressores externos):</label>
              </Text>

              <div className="flex items-center space-x-2">
                <Checkbox id="SIM"
                  checked={formData.extern_stress.includes("SIM")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        extern_stress: [...formData.extern_stress, "SIM"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        extern_stress: formData.extern_stress.filter((item) => item !== "SIM"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="SIM"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  SIM
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="NÃO"
                  checked={formData.extern_stress.includes("NÃO")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        extern_stress: [...formData.extern_stress, "NÃO"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        extern_stress: formData.extern_stress.filter((item) => item !== "NÃO"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="NÃO"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  NÃO
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Text>Quais?</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.which_stress}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    which_stress: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Sintomas e Sinais: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.syntoms_signals}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    syntoms_signals: e.target.value,
                  })
                }
              />
            </div>

              
            </div>

            <div className="flex flex-col gap-1">
              <Text>Houve algum acontecimento marcante durante a sua infância/adolescência(separações,acidentes,doenças graves)?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.event_childhood}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    event_childhood: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Como você classificaria o relacionamento com seus familiares</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.family}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    family: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Outras observações:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.other_observation}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    other_observation: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Histórico Médico</label>
              </Text>

              <div className="flex flex-col gap-1">
              <Text>Já fez tratamento psicológico ou psiquiátrico anteriormente?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.psi_before}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    psi_before: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Possui alguma doença?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.desease}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    desease: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Faz uso de medicamento?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.use_medicine}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    use_medicine: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Algum familiar tem histórico de doença mental?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.historical_family_desease}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    historical_family_desease: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Algum familiar tem histórico de abuso de álcool ou outra substância?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.family_substance_abuse}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    family_substance_abuse: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Existe histórico de suicídio ou tentativa de suicído na sua família?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.family_suicide_history}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    family_suicide_history: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Anotações: </Text>
              <TextField
                label=""
                variant="filled"
                value={formData.notes}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    notes: e.target.value,
                  })
                }
              />
            </div>
            </div>
          </form>

          <Button
            type="submit"
            disabled={isLoadingCreateForm}
            onClick={() => handleSubmit()}
          >
            {isLoadingCreateForm ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
      </div>
    </RecordLayout>
  );
}

type ProfileUserProps = {
  user: { name: string; cpf: string };
};

function ProfileUser({ user, residents }: ProfileUserProps) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-md border border-gray-300 bg-gray-100 px-4 py-2">
      <span className="text-sm">Nome: {user.name}</span>
      {user.socialName !== "" && (
        <span className="text-sm">Nome Social: {user.socialName}</span>
      )}

      <span className="text-sm">
        Data de Nascimento:{" "}
        {user.birthDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </span>
      <span className="text-sm">
        Idade: {new Date().getFullYear() - user.birthDate.getFullYear()}
      </span>
      {user.responsibleId && (
        <span className="text-sm">
          Responsável:{" "}
          {
            residents.find((resident) => resident.id === user.responsibleId)
              ?.name
          }
        </span>
      )}
    </div>
  );
}

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import * as React from "react";

import { Text } from "@/components/elements/Text";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";

const frameworks = [
  {
    value: "ilhasLegais",
    label: "Ilhas Legais",
  },
  {
    value: "gaia",
    label: "Gaia 1",
  },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Selecione o tipo..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Selecione o tipo..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
