/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const [data, setData] = useState([]);

  const [formData, setFormDate] = useState({
    complaint: "",
    isToothache: "",
    isGumPain: "",
    isGumsBleedWhenBrushing: "",
    isUseToothpaste: "",
    isUseDentalFloss: "",
    brushingFrequency: "",
    brushType: "",
    brushChange: "",
    isUsePacifier: "",
    eatingHabits: "",
    isAllergic: "",
    allergy: "",
    dentalTreatmentStatus: "",
    dentalTreatment: "",

    gum: "",
    gumObs: "",
    jugalMucosa: "",
    jugalObs: "",
    palate: "",
    palateObs: "",
    floor: "",
    floorObs: "",
    tongue: "",
    tongueObs: "",
    fluorosis: "",
    fluorosisObs: "",
    observacoesOdonto: "",
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

    try {
      setIsLoadingCreateForm(true);
      await axios.post("/api/fichas/odontologia", {
        userId: pacienteId,
        ...formData,
        teeth: data,
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
        <h1 className="bold text-xl">Odontologia - Ficha de Triagem</h1>

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
            <Text size="lg">1- HISTÓRICO CLÍNICO</Text>
            <TextField
              label="Queixa principal"
              multiline
              rows={2}
              variant="filled"
              value={formData.complaint}
              onChange={(e) =>
                setFormDate({
                  ...formData,
                  complaint: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Dor nos dentes?</label>
              </Text>

              <RadioGroup
                value={formData.isToothache}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    isToothache: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Dor na gengiva?</label>
              </Text>

              <RadioGroup
                value={formData.isGumPain}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    isGumPain: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Gengiva sangra ao escovar?</label>
              </Text>

              <RadioGroup
                value={formData.isGumsBleedWhenBrushing}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    isGumsBleedWhenBrushing: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Usa fio dental?</label>
              </Text>

              <RadioGroup
                value={formData.isUseToothpaste}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    isUseToothpaste: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Usa creme dental?</label>
              </Text>

              <RadioGroup
                value={formData.isUseDentalFloss}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    isUseDentalFloss: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Escovação quantas vezes/dia?</label>
              </Text>

              <RadioGroup
                value={formData.brushingFrequency}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    brushingFrequency: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="UMA_VEZ"
                  control={<Radio />}
                  label="1 vezes"
                />
                <FormControlLabel
                  value="DUAS_VEZES"
                  control={<Radio />}
                  label="2 vezes"
                />
                <FormControlLabel
                  value="TRES_VEZES_OU_MAIS_VEZES"
                  control={<Radio />}
                  label="3 vezes +"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Tipo de escova</label>
              </Text>

              <RadioGroup
                value={formData.brushType}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    brushType: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="INDIVIDUAL"
                  control={<Radio />}
                  label="Individual"
                />
                <FormControlLabel
                  value="COLETIVA"
                  control={<Radio />}
                  label="Coletiva"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Troca da escova</label>
              </Text>

              <RadioGroup
                value={formData.brushChange}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    brushChange: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="TODO_MES"
                  control={<Radio />}
                  label="Todo mês"
                />
                <FormControlLabel
                  value="DOIS_EM_DOIS_MESES"
                  control={<Radio />}
                  label="2 em 2 meses"
                />
                <FormControlLabel
                  value="TRES_EM_TRES_MESES_OU_MAIS"
                  control={<Radio />}
                  label="3 em 3 meses +"
                />
                <FormControlLabel
                  value="NAO_SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Usa chupeta?</label>
              </Text>

              <RadioGroup
                value={formData.isUsePacifier}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    isUsePacifier: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <TextField
              label="Hábitos alimentares"
              multiline
              rows={4}
              variant="filled"
              value={formData.eatingHabits}
              onChange={(e) =>
                setFormDate({
                  ...formData,
                  eatingHabits: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Alergias</label>
              </Text>

              <RadioGroup
                value={formData.isAllergic}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    isAllergic: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NAO_SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            {/* RENDERIZAR APENAS QUANDO FOR SIM */}
            {formData.isAllergic === "SIM" && (
              <TextField
                label="A que?"
                variant="filled"
                value={formData.allergy}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    allergy: e.target.value,
                  })
                }
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Tratamento odontológico</label>
              </Text>

              <RadioGroup
                value={formData.dentalTreatmentStatus}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    dentalTreatmentStatus: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="CONCLUIDO"
                  control={<Radio />}
                  label="Concluído"
                />
                <FormControlLabel
                  value="PENDENTE"
                  control={<Radio />}
                  label="Pendente"
                />
                <FormControlLabel
                  value="EM_ANDAMENTO"
                  control={<Radio />}
                  label="Em andamento"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={formData.dentalTreatment}
              onChange={(e) =>
                setFormDate({
                  ...formData,
                  dentalTreatment: e.target.value,
                })
              }
            />

            <Text size="lg">2- EXAME CLÍNICO</Text>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Gengiva</label>
              </Text>

              <RadioGroup
                value={formData.gum}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    gum: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={formData.gumObs}
              onChange={(e) =>
                setFormDate({
                  ...formData,
                  gumObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Mucosa jugal</label>
              </Text>

              <RadioGroup
                value={formData.jugalMucosa}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    jugalMucosa: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={formData.jugalObs}
              onChange={(e) =>
                setFormDate({
                  ...formData,
                  jugalObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Palato</label>
              </Text>

              <RadioGroup
                value={formData.palate}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    palate: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={formData.palateObs}
              onChange={(e) =>
                setFormDate({
                  ...formData,
                  palateObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Assoalho</label>
              </Text>

              <RadioGroup
                value={formData.floor}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    floor: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={formData.floorObs}
              onChange={(e) =>
                setFormDate({
                  ...formData,
                  floorObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Língua</label>
              </Text>

              <RadioGroup
                value={formData.tongue}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    tongue: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={formData.tongueObs}
              onChange={(e) =>
                setFormDate({
                  ...formData,
                  tongueObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Fluorose</label>
              </Text>

              <RadioGroup
                value={formData.fluorosis}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    fluorosis: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={formData.fluorosisObs}
              onChange={(e) =>
                setFormDate({
                  ...formData,
                  fluorosisObs: e.target.value,
                })
              }
            />

            <Text size="lg">2- ODONTOGRAMA</Text>
            <Odontogram
              tooth={(labelT: any, zoneT: any, idT: any) => {
                // @ts-expect-error - odontograa não tipado corretamente
                setData((oldArray) => [
                  ...oldArray,
                  {
                    label: labelT,
                    zone: zoneT,
                    id: idT,
                  },
                ]);
              }}
              rtooth={(id: any) => {
                setData((current) =>
                  current.filter((obj) => {
                    // @ts-expect-error - odontograa não tipado corretamente
                    return obj.id !== id;
                  }),
                );
              }}
            />
            {data.map((obj) => {
              const dataWihoutThis = data.filter((item) => {
                // @ts-expect-error - odontograa não tipado corretamente
                return item.id !== obj.id;
              });

              return (
                // @ts-expect-error - odontograa não tipado corretamente
                <div key={obj.id} className="flex flex-col">
                  {/* @ts-expect-error - odontograa não tipado corretamente */}
                  <Text size="lg">{`${obj.label} - ${obj.zone}`}</Text>
                  <Select
                    variant="filled"
                    onChange={(e) => {
                      // @ts-expect-error - odontograa não tipado corretamente
                      setData(() => [
                        ...dataWihoutThis,
                        {
                          // @ts-expect-error - odontograa não tipado corretamente
                          id: obj.id,
                          // @ts-expect-error - odontograa não tipado corretamente
                          label: obj.label,
                          // @ts-expect-error - odontograa não tipado corretamente
                          zone: obj.zone,

                          observation: e.target.value,
                        },
                      ]);
                    }}
                  >
                    <MenuItem value="CARIADO">CARIADO</MenuItem>
                    <MenuItem value="HÍGIDO">HÍGIDO</MenuItem>
                    <MenuItem value="AUSENTE">AUSENTE</MenuItem>
                    <MenuItem value="RESTAURADO">RESTAURADO</MenuItem>
                    <MenuItem value="MANCHA BRANCA">MANCHA BRANCA</MenuItem>
                  </Select>
                </div>
              );
            })}

            <div className="flex flex-col gap-1">
              <Text>Observações: </Text>
              <TextField
                label=""
                multiline
                rows={10}
                variant="filled"
                value={formData.observacoesOdonto}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    observacoesOdonto: e.target.value,
                  })
                }
              />
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
      <span className="text-sm">CPF: {user.cpf}</span>
      <span className="text-sm">RG: TODO:</span>
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
import Odontogram from "@/components/elements/odontograma/Odontogram";
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
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

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
