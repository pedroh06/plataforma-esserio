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
    bloodType: "",
    priorIllness: "",
    priorIllnessOther: "", //sem coluna na base de dados

    previousHospitalizations: "",
    reasonForPreviousHospitalizations: "",
    previousSurgeries: "",
    reasonForPreviousSurgeries: "",

    injuries: "",

    allergies: "",
    allergy: "",

    familyDiseases: "",
    familyDiseasesOther: "", //sem coluna na base de dados

    physicalActivity: "",
    smoking: "",
    smokersOf: "",

    etilismo: "",
    vaccineScheduleUpdate: "",
    typeOfHouse: "",
    typeOfHouseOther: "", //sem coluna na base de dados
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
    const _priorIllnessOther =
      formData.priorIllness === "OUTRO"
        ? formData.priorIllnessOther
        : formData.priorIllness;
    const _typeOfHouseOther =
      formData.typeOfHouse === "Outro"
        ? formData.typeOfHouseOther
        : formData.typeOfHouse;
    const _familyDiseases =
      formData.familyDiseases === "OUTRO"
        ? formData.familyDiseasesOther
        : formData.familyDiseases;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    try {
      setIsLoadingCreateForm(true);
      await axios.post("/api/fichas/medicina", {
        userId: pacienteId,
        priorIllness: _priorIllnessOther,
        typeOfHouse: _typeOfHouseOther,
        familyDiseases: _familyDiseases,

        bloodType: formData.bloodType,
        previousHospitalizations: formData.previousHospitalizations,
        reasonForPreviousSurgeries: formData.reasonForPreviousSurgeries,
        reasonForPreviousHospitalizations:
          formData.reasonForPreviousHospitalizations,
        previousSurgeries: formData.previousSurgeries,
        injuries: formData.injuries,
        allergies: formData.allergies,
        allergy: formData.allergy,
        physicalActivity: formData.physicalActivity,
        smoking: formData.smoking,
        smokersOf: formData.smokersOf,
        etilismo: formData.etilismo,
        vaccineScheduleUpdate: formData.vaccineScheduleUpdate,
      });

      toast.success("Realizado com sucesso!");

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
        <h1 className="bold text-xl">Medicina</h1>

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
              <Text size="lg" asChild>
                <label>Tipo sanguíneo</label>
              </Text>

              <Select
                label="Tipo sanguíneo"
                variant="filled"
                value={formData.bloodType}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    bloodType: event.target.value,
                  });
                }}
              >
                <MenuItem value="A_POSITIVO">A+</MenuItem>
                <MenuItem value="A_NEGATIVO">A- </MenuItem>
                <MenuItem value="B_POSITIVO">B+</MenuItem>
                <MenuItem value="B_NEGATIVO">B- </MenuItem>
                <MenuItem value="AB_POSITIVO">AB+</MenuItem>
                <MenuItem value="AB_NEGATIVO">AB- </MenuItem>
                <MenuItem value="O_POSITIVO">O+</MenuItem>
                <MenuItem value="O_NEGATIVO">O- </MenuItem>
                <MenuItem value="NAO_SABE">Não sabe</MenuItem>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Doença prévia</label>
              </Text>

              <RadioGroup
                aria-label="Doença prévia"
                name="Doença prévia"
                value={formData.priorIllness}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    priorIllness: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="Hipertensão arterial sistêmica"
                  control={<Radio />}
                  label="Hipertensão arterial sistêmica"
                />
                <FormControlLabel
                  value="Diabetes Mellitus"
                  control={<Radio />}
                  label="Diabetes Mellitus"
                />
                <FormControlLabel
                  value="Dislipidemia"
                  control={<Radio />}
                  label="Dislipidemia"
                />
                <FormControlLabel
                  value="Câncer"
                  control={<Radio />}
                  label="Câncer"
                />
                <FormControlLabel
                  value="OUTRO"
                  control={<Radio />}
                  label="Outro"
                />
              </RadioGroup>
            </div>

            {formData.priorIllness === "OUTRO" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={formData.priorIllnessOther}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    priorIllnessOther: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Internações prévias</label>
              </Text>

              <RadioGroup
                aria-label="Internações prévias"
                name="Internações prévias"
                value={formData.previousHospitalizations}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    previousHospitalizations: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            {formData.previousHospitalizations === "SIM" && (
              <TextField
                label="Motivo?"
                variant="filled"
                value={formData.reasonForPreviousHospitalizations}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    reasonForPreviousHospitalizations: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Cirurgias prévias</label>
              </Text>

              <RadioGroup
                aria-label="Cirurgias prévias"
                name="Cirurgias prévias"
                value={formData.previousSurgeries}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    previousSurgeries: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>
            {formData.previousSurgeries === "SIM" && (
              <TextField
                label="Motivo?"
                variant="filled"
                value={formData.reasonForPreviousSurgeries}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    reasonForPreviousSurgeries: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Traumatismos</label>
              </Text>

              <RadioGroup
                aria-label="Traumatismos"
                name="Traumatismos"
                value={formData.injuries}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    injuries: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Alergias</label>
              </Text>

              <RadioGroup
                aria-label="Alergias"
                name="Alergias"
                value={formData.allergies}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    allergies: event.target.value,
                  });
                }}
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
            {formData.allergies === "SIM" && (
              <TextField
                label="A que?"
                variant="filled"
                value={formData.allergy}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    allergy: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Doenças familiares:</label>
              </Text>

              <RadioGroup
                aria-label="Doenças familiares"
                name="Doenças familiares"
                value={formData.familyDiseases}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    familyDiseases: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="Hipertensão arterial sistêmica"
                  control={<Radio />}
                  label="Hipertensão arterial sistêmica"
                />
                <FormControlLabel
                  value="Diabetes Mellitus"
                  control={<Radio />}
                  label="Diabetes Mellitus"
                />
                <FormControlLabel
                  value="Dislipidemia"
                  control={<Radio />}
                  label="Dislipidemia"
                />
                <FormControlLabel
                  value="Câncer"
                  control={<Radio />}
                  label="Câncer"
                />
                <FormControlLabel
                  value="OUTRO"
                  control={<Radio />}
                  label="Outro"
                />
              </RadioGroup>
            </div>

            {formData.familyDiseases === "OUTRO" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={formData.familyDiseasesOther}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    familyDiseasesOther: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Atividade física</label>
              </Text>

              <RadioGroup
                aria-label="Atividade física"
                name="Atividade física"
                value={formData.physicalActivity}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    physicalActivity: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="SEDENTARIO"
                  control={<Radio />}
                  label="Sedentário"
                />
                <FormControlLabel
                  value="NAO_SEDENTARIO"
                  control={<Radio />}
                  label="Não sedentário"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Tabagismo</label>
              </Text>

              <RadioGroup
                aria-label="Tabagismo"
                name="Tabagismo"
                value={formData.smoking}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    smoking: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>
            {formData.smoking === "SIM" && (
              <TextField
                label="Qual? (Cigarro, maconha, tabaco...)"
                variant="filled"
                value={formData.smokersOf}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    smokersOf: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label id="Genero" className="max-w-[70%]">
                  possui etilismo:
                </label>
              </Text>

              <RadioGroup
                value={formData.etilismo}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    etilismo: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Tipo de casa</label>
              </Text>

              <RadioGroup
                aria-label="Tipo de casa"
                name="Tipo de casa"
                value={formData.typeOfHouse}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    typeOfHouse: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="Alvenaria"
                  control={<Radio />}
                  label="Alvenaria"
                />
                <FormControlLabel
                  value="Madeira"
                  control={<Radio />}
                  label="Madeira"
                />
                <FormControlLabel
                  value="Palafita"
                  control={<Radio />}
                  label="Palafita"
                />
                <FormControlLabel
                  value="Pau a pique/taipa"
                  control={<Radio />}
                  label="Pau a pique/taipa"
                />
                <FormControlLabel
                  value="Outro"
                  control={<Radio />}
                  label="Outro"
                />
              </RadioGroup>
            </div>

            {formData.typeOfHouse === "Outro" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={formData.typeOfHouseOther}
                onChange={(event) => {
                  setFormDate({
                    ...formData,
                    typeOfHouseOther: event.target.value,
                  });
                }}
              />
            )}

            <Button type="submit" disabled={isLoadingCreateForm}>
              {isLoadingCreateForm ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                "Enviar"
              )}
            </Button>
          </form>
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
