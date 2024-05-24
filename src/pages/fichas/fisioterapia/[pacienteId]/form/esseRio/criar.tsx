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
    complaintMain: "",
    complaintSecondary: "",
    hda: "",
    medicinesUse: "",
    personalBackground: "",
    painAssessment: "",
    painAssessmentIntensity: "",
    painLocation: "",
    painIntensity: "",
    painFrequency: "",
    painFeature: "",
    specific_inspection: [""],
    specificInspectionObs: "",
    pain_characteristics: [""],
    pastExercises: "",
    pain_interference: [""],
    pain_assessment: [""],

    posturalEvaluation: "",
    posturalEvaluationObs: "",

    thinFeel: "",
    fineStop: "",
    movementRestriction: "",
    perception: "",

    // 12
    jointMovement1: "",
    preserved1E: "",
    preserved1D: "",
    diminished1E: "",
    diminished1D: "",

    jointMovement2: "",
    preserved2E: "",
    preserved2D: "",
    diminished2E: "",
    diminished2D: "",

    jointMovement3: "",
    preserved3E: "",
    preserved3D: "",
    diminished3E: "",
    diminished3D: "",

    jointMovement4: "",
    preserved4E: "",
    preserved4D: "",
    diminished4E: "",
    diminished4D: "",

    jointMovement5: "",
    preserved5E: "",
    preserved5D: "",
    diminished5E: "",
    diminished5D: "",

    jointMovement6: "",
    preserved6E: "",
    preserved6D: "",
    diminished6E: "",
    diminished6D: "",

    jointMovement7: "",
    preserved7E: "",
    preserved7D: "",
    diminished7E: "",
    diminished7D: "",

    jointMovement8: "",
    preserved8E: "",
    preserved8D: "",
    diminished8E: "",
    diminished8D: "",

    jointMovement9: "",
    preserved9E: "",
    preserved9D: "",
    diminished9E: "",
    diminished9D: "",

    jointMovement10: "",
    preserved10E: "",
    preserved10D: "",
    diminished10E: "",
    diminished10D: "",

    jointMovement11: "",
    preserved11E: "",
    preserved11D: "",
    diminished11E: "",
    diminished11D: "",

    jointMovement12: "",
    preserved12E: "",
    preserved12D: "",
    diminished12E: "",
    diminished12D: "",

    memberTested1: "",
    degreeOfStrength1: "",
    memberTested2: "",
    degreeOfStrength2: "",
    memberTested3: "",
    degreeOfStrength3: "",
    memberTested4: "",
    degreeOfStrength4: "",
    memberTested5: "",
    degreeOfStrength5: "",

    generalObservation: "",
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
      await axios.post("/api/fichas/fisioterapia", {
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
        <h1 className="bold text-xl">Fisioterapia - Ficha de Triagem</h1>

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
              <Text>Queixa funcional?</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.complaintSecondary}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    complaintSecondary: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>HDA:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.hda}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    hda: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Medicamentos em uso?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.medicinesUse}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    medicinesUse: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Antecendentes pessoais?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.personalBackground}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    personalBackground: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>AVALIAÇÃO DA DOR</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="REPOUSO"
                  checked={formData.pain_assessment.includes("REPOUSO")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_assessment: [...formData.pain_assessment, "REPOUSO"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_assessment: formData.pain_assessment.filter((item) => item !== "REPOUSO"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="REPOUSO"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  REPOUSO
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="MOVIMENTO" 
                  checked={formData.pain_assessment.includes("MOVIMENTO")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_assessment: [...formData.pain_assessment, "MOVIMENTO"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_assessment: formData.pain_assessment.filter((item) => item !== "MOVIMENTO"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="MOVIMENTO"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  MOVIMENTO
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="PALPACAO"
                  checked={formData.pain_assessment.includes("PALPACAO")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_assessment: [...formData.pain_assessment, "PALPACAO"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_assessment: formData.pain_assessment.filter((item) => item !== "PALPACAO"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="PALPACAO"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  PALPAÇÃO
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Avalie de 0 à 10</label>
              </Text>

              <RadioGroup
                value={formData.painAssessmentIntensity}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    painAssessmentIntensity: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="0" control={<Radio />} label="0" />
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
                <FormControlLabel value="6" control={<Radio />} label="6" />
                <FormControlLabel value="7" control={<Radio />} label="7" />
                <FormControlLabel value="8" control={<Radio />} label="8" />
                <FormControlLabel value="9" control={<Radio />} label="9" />
                <FormControlLabel value="10" control={<Radio />} label="10" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text>Localização da dor?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.painLocation}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    painLocation: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Frequência da dor?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.painFrequency}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    painFrequency: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Característica</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Pulsatil" 
                  checked={formData.pain_characteristics.includes("Pulsatil")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_characteristics: [...formData.pain_characteristics, "Pulsatil"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_characteristics: formData.pain_characteristics.filter((item) => item !== "Pulsatil"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Pulsatil"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pulsátil
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Empeso" 
                  checked={formData.pain_characteristics.includes("Empeso")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_characteristics: [...formData.pain_characteristics, "Empeso"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_characteristics: formData.pain_characteristics.filter((item) => item !== "Empeso"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Empeso"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Em peso
                </label>
              </div>

               <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Latejante" 
                  checked={formData.pain_characteristics.includes("Latejante")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_characteristics: [...formData.pain_characteristics, "Latejante"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_characteristics: formData.pain_characteristics.filter((item) => item !== "Latejante"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Latejante"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Latejante
                </label>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Queimacao" 
                  checked={formData.pain_characteristics.includes("Queimacao")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_characteristics: [...formData.pain_characteristics, "Queimacao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_characteristics: formData.pain_characteristics.filter((item) => item !== "Queimacao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Queimacao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Queimação
                </label>
              </div>

                
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Profunda" 
                  checked={formData.pain_characteristics.includes("Profunda")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_characteristics: [...formData.pain_characteristics, "Profunda"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_characteristics: formData.pain_characteristics.filter((item) => item !== "Profunda"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Profunda"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Profunda
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="Empressao"
                  checked={formData.pain_characteristics.includes("Empressao")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_characteristics: [...formData.pain_characteristics, "Empressao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_characteristics: formData.pain_characteristics.filter((item) => item !== "Empressao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Empressao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Em pressão
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Interfere:</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Ativ.diarias"
                  checked={formData.pain_interference.includes("Ativ.diarias")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_interference: [...formData.pain_interference, "Ativ.diarias"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_interference: formData.pain_interference.filter((item) => item !== "Ativ.diarias"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Ativ.diarias"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ativ. diárias
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Exercicio" 
                  checked={formData.pain_interference.includes("Exercicio")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_interference: [...formData.pain_interference, "Exercicio"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_interference: formData.pain_interference.filter((item) => item !== "Exercicio"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Exercicio"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Exercício
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="Humor"
                  checked={formData.pain_interference.includes("Humor")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        pain_interference: [...formData.pain_interference, "Humor"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        pain_interference: formData.pain_interference.filter((item) => item !== "Humor"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Humor"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Humor
                </label>
              </div>

            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Inspeção específica:</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Edema" checked={formData.specific_inspection.includes("Edema")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        specific_inspection: [...formData.specific_inspection, "Edema"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        specific_inspection: formData.specific_inspection.filter((item) => item !== "Edema"),
                      })
                    }
                  }}
                
                />
                <label
                  htmlFor="Edema"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Edema
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Rubor"
                  checked={formData.specific_inspection.includes("Rubor")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        specific_inspection: [...formData.specific_inspection, "Rubor"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        specific_inspection: formData.specific_inspection.filter((item) => item !== "Rubor"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Rubor"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Rubor
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Hematomas" 
                  checked={formData.specific_inspection.includes("Hematomas")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        specific_inspection: [...formData.specific_inspection, "Hematomas"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        specific_inspection: formData.specific_inspection.filter((item) => item !== "Hematomas"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Hematomas"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hematomas
                </label>
              </div>

              
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Manchas"
                  checked={formData.specific_inspection.includes("Manchas")} 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        specific_inspection: [...formData.specific_inspection, "Manchas"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        specific_inspection: formData.specific_inspection.filter((item) => item !== "Manchas"),
                      })
                    }
                  }}
                
                />
                <label
                  htmlFor="Manchas"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Manchas
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Text>Exercícios passados:</Text>
              <TextField
                label=""
                variant="filled"
                multiline
                value={formData.pastExercises}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    pastExercises: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>OBS:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.specificInspectionObs}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    specificInspectionObs: e.target.value,
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
