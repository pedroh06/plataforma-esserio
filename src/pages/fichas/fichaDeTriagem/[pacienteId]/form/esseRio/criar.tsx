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
    sua_casa_possui_energia_eletrica: [""],
    sua_casa_possui_energia_solar: [""],
    sua_casa_possui_fossa_de_alvenaria: [""],
    como_o_lixo_da_sua_casa_e_descartado: [""],
    se_a_opcao_for_outra: "",
    sua_casa_possui_conexao_a_internet: [""],
    qual_o_tipo_de_internet: "",
    em_sua_casa_voces_cultivam_acai: [""],
    em_sua_casa_voces_cultivam_outras_culturas: [""],
    se_sim_especifique: "",
    em_sua_casa_ha_agua_potavel: [""],
    se_sim_como_voce_tem_acesso: [""],
    se_for_de_outra_maneira_especifique: "",
    qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo: [""],
    como_voce_classifica_o_turismo_na_sua_regiao: [""],
    ha_incentivo_para_empreender_na_sua_regiao: [""],
    existem_empreendimentos_na_sua_regiao: [""],
    em_sua_casa_voces_possuem_transporte_proprio: [""],
    existem_cooperativas_na_sua_regiao: [""],
    qual_sua_opniao_sobre_cooperativismo: [""],
    qual_sua_renda_familiar: [""],
    voce_tem_vontade_de_empreender: [""],
    voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo: [""],
    voce_teria_interesse_em_participar_se_fizessemos: [""],
    observacoes: ""
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
      await axios.post("/api/fichas/fichaDeTriagem", {
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
        <h1 className="bold text-xl">Ficha de Triagem Geral</h1>

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
                <label>1. Sua casa possui energia elétrica?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.sua_casa_possui_energia_eletrica.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_energia_eletrica: [...formData.sua_casa_possui_energia_eletrica, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_energia_eletrica: formData.sua_casa_possui_energia_eletrica.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.sua_casa_possui_energia_eletrica.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_energia_eletrica: [...formData.sua_casa_possui_energia_eletrica, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_energia_eletrica: formData.sua_casa_possui_energia_eletrica.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <Text size="lg" asChild>
                <label>2. Sua casa possui energia solar (fotovoltaica)?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.sua_casa_possui_energia_solar.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_energia_solar: [...formData.sua_casa_possui_energia_solar, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_energia_solar: formData.sua_casa_possui_energia_solar.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.sua_casa_possui_energia_solar.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_energia_solar: [...formData.sua_casa_possui_energia_solar, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_energia_solar: formData.sua_casa_possui_energia_solar.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <Text size="lg" asChild>
                <label>3. Sua casa possui fossa de alvenaria?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.sua_casa_possui_fossa_de_alvenaria.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_fossa_de_alvenaria: [...formData.sua_casa_possui_fossa_de_alvenaria, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_fossa_de_alvenaria: formData.sua_casa_possui_fossa_de_alvenaria.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.sua_casa_possui_fossa_de_alvenaria.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_fossa_de_alvenaria: [...formData.sua_casa_possui_fossa_de_alvenaria, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_fossa_de_alvenaria: formData.sua_casa_possui_fossa_de_alvenaria.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <Text size="lg" asChild>
                <label>4. Como o lixo da sua casa é descartado?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Coleta_regular_pela_prefeitura"
                  checked={formData.como_o_lixo_da_sua_casa_e_descartado.includes("Coleta_regular_pela_prefeitura")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        como_o_lixo_da_sua_casa_e_descartado: [...formData.como_o_lixo_da_sua_casa_e_descartado, "Coleta_regular_pela_prefeitura"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        como_o_lixo_da_sua_casa_e_descartado: formData.como_o_lixo_da_sua_casa_e_descartado.filter((item) => item !== "Coleta_regular_pela_prefeitura"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Coleta_regular_pela_prefeitura"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Coleta regular pela prefeitura
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Queimado"
                  checked={formData.como_o_lixo_da_sua_casa_e_descartado.includes("Queimado")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        como_o_lixo_da_sua_casa_e_descartado: [...formData.como_o_lixo_da_sua_casa_e_descartado, "Queimado"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        como_o_lixo_da_sua_casa_e_descartado: formData.como_o_lixo_da_sua_casa_e_descartado.filter((item) => item !== "Queimado"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Queimado"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Queimado
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Enterrado"
                  checked={formData.como_o_lixo_da_sua_casa_e_descartado.includes("Enterrado")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        como_o_lixo_da_sua_casa_e_descartado: [...formData.como_o_lixo_da_sua_casa_e_descartado, "Enterrado"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        como_o_lixo_da_sua_casa_e_descartado: formData.como_o_lixo_da_sua_casa_e_descartado.filter((item) => item !== "Enterrado"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Enterrado"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Enterrado
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Outro"
                  checked={formData.como_o_lixo_da_sua_casa_e_descartado.includes("Outro")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        como_o_lixo_da_sua_casa_e_descartado: [...formData.como_o_lixo_da_sua_casa_e_descartado, "Outro"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        como_o_lixo_da_sua_casa_e_descartado: formData.como_o_lixo_da_sua_casa_e_descartado.filter((item) => item !== "Outro"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Outro"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Outro
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <Text>Se a opção for “outro”, especifique. </Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.se_a_opcao_for_outra}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      se_a_opcao_for_outra: e.target.value,
                    })
                  }
                />
              </div>

              <Text size="lg" asChild>
                <label>5. Sua casa possui conexão à internet?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.sua_casa_possui_conexao_a_internet.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_conexao_a_internet: [...formData.sua_casa_possui_conexao_a_internet, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_conexao_a_internet: formData.sua_casa_possui_conexao_a_internet.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.sua_casa_possui_conexao_a_internet.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_conexao_a_internet: [...formData.sua_casa_possui_conexao_a_internet, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        sua_casa_possui_conexao_a_internet: formData.sua_casa_possui_conexao_a_internet.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <Text>Qual o tipo de internet? </Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.qual_o_tipo_de_internet}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      qual_o_tipo_de_internet: e.target.value,
                    })
                  }
                />
              </div>

              <Text size="lg" asChild>
                <label>6. Em sua casa, vocês cultivam açaí?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.em_sua_casa_voces_cultivam_acai.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_cultivam_acai: [...formData.em_sua_casa_voces_cultivam_acai, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_cultivam_acai: formData.em_sua_casa_voces_cultivam_acai.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.em_sua_casa_voces_cultivam_acai.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_cultivam_acai: [...formData.em_sua_casa_voces_cultivam_acai, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_cultivam_acai: formData.em_sua_casa_voces_cultivam_acai.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <Text size="lg" asChild>
                <label>7. Em sua casa, vocês cultivam outra cultura que não seja o açaí?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.em_sua_casa_voces_cultivam_outras_culturas.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_cultivam_outras_culturas: [...formData.em_sua_casa_voces_cultivam_outras_culturas, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_cultivam_outras_culturas: formData.em_sua_casa_voces_cultivam_outras_culturas.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.em_sua_casa_voces_cultivam_outras_culturas.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_cultivam_outras_culturas: [...formData.em_sua_casa_voces_cultivam_outras_culturas, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_cultivam_outras_culturas: formData.em_sua_casa_voces_cultivam_outras_culturas.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <Text>Se sim, especifique.</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.se_sim_especifique}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      se_sim_especifique: e.target.value,
                    })
                  }
                />
              </div>

              <Text size="lg" asChild>
                <label>8. Em sua casa, há água potável?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.em_sua_casa_ha_agua_potavel.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        em_sua_casa_ha_agua_potavel: [...formData.em_sua_casa_ha_agua_potavel, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        em_sua_casa_ha_agua_potavel: formData.em_sua_casa_ha_agua_potavel.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.em_sua_casa_ha_agua_potavel.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        em_sua_casa_ha_agua_potavel: [...formData.em_sua_casa_ha_agua_potavel, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        em_sua_casa_ha_agua_potavel: formData.em_sua_casa_ha_agua_potavel.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <Text size="lg" asChild>
                <label>Se sim, como você tem acesso a ela?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Poço_artesiano"
                  checked={formData.se_sim_como_voce_tem_acesso.includes("Poço_artesiano")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        se_sim_como_voce_tem_acesso: [...formData.se_sim_como_voce_tem_acesso, "Poço_artesiano"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        se_sim_como_voce_tem_acesso: formData.se_sim_como_voce_tem_acesso.filter((item) => item !== "Poço_artesiano"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Poço_artesiano"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Poço artesiano
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nascente"
                  checked={formData.se_sim_como_voce_tem_acesso.includes("Nascente")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        se_sim_como_voce_tem_acesso: [...formData.se_sim_como_voce_tem_acesso, "Nascente"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        se_sim_como_voce_tem_acesso: formData.se_sim_como_voce_tem_acesso.filter((item) => item !== "Nascente"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nascente"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Nascente
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Rede_publica"
                  checked={formData.se_sim_como_voce_tem_acesso.includes("Rede_publica")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        se_sim_como_voce_tem_acesso: [...formData.se_sim_como_voce_tem_acesso, "Rede_publica"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        se_sim_como_voce_tem_acesso: formData.se_sim_como_voce_tem_acesso.filter((item) => item !== "Rede_publica"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Rede_publica"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Rede pública
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <Text>Se for de outra maneira, especifique.</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.se_for_de_outra_maneira_especifique}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      se_for_de_outra_maneira_especifique: e.target.value,
                    })
                  }
                />
              </div>

              <Text size="lg" asChild>
                <label>9. Qual água é utilizada para atividades domésticas, além do consumo?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Agua_da_chuva"
                  checked={formData.qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo.includes("Agua_da_chuva")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo: [...formData.qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo, "Agua_da_chuva"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo: formData.qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo.filter((item) => item !== "Agua_da_chuva"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Agua_da_chuva"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Água da chuva
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Rio"
                  checked={formData.qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo.includes("Rio")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo: [...formData.qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo, "Rio"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo: formData.qual_agua_e_utilizada_para_ativ_domestica_alem_do_consumo.filter((item) => item !== "Rio"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Rio"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Rio
                </label>
              </div>

              <Text size="lg" asChild>
                <label>10. Como você classificaria o turismo na sua região?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Excelente"
                  checked={formData.como_voce_classifica_o_turismo_na_sua_regiao.includes("Excelente")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        como_voce_classifica_o_turismo_na_sua_regiao: [...formData.como_voce_classifica_o_turismo_na_sua_regiao, "Excelente"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        como_voce_classifica_o_turismo_na_sua_regiao: formData.como_voce_classifica_o_turismo_na_sua_regiao.filter((item) => item !== "Excelente"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Excelente"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Excelente
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Bom"
                  checked={formData.como_voce_classifica_o_turismo_na_sua_regiao.includes("Bom")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        como_voce_classifica_o_turismo_na_sua_regiao: [...formData.como_voce_classifica_o_turismo_na_sua_regiao, "Bom"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        como_voce_classifica_o_turismo_na_sua_regiao: formData.como_voce_classifica_o_turismo_na_sua_regiao.filter((item) => item !== "Bom"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Bom"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Bom
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Regular"
                  checked={formData.como_voce_classifica_o_turismo_na_sua_regiao.includes("Regular")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        como_voce_classifica_o_turismo_na_sua_regiao: [...formData.como_voce_classifica_o_turismo_na_sua_regiao, "Regular"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        como_voce_classifica_o_turismo_na_sua_regiao: formData.como_voce_classifica_o_turismo_na_sua_regiao.filter((item) => item !== "Regular"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Regular"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Regular
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Ruim"
                  checked={formData.como_voce_classifica_o_turismo_na_sua_regiao.includes("Ruim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        como_voce_classifica_o_turismo_na_sua_regiao: [...formData.como_voce_classifica_o_turismo_na_sua_regiao, "Ruim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        como_voce_classifica_o_turismo_na_sua_regiao: formData.como_voce_classifica_o_turismo_na_sua_regiao.filter((item) => item !== "Ruim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Ruim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ruim
                </label>
              </div>

              <Text size="lg" asChild>
                <label>11. Há incentivos para se empreender na sua região?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.ha_incentivo_para_empreender_na_sua_regiao.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        ha_incentivo_para_empreender_na_sua_regiao: [...formData.ha_incentivo_para_empreender_na_sua_regiao, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        ha_incentivo_para_empreender_na_sua_regiao: formData.ha_incentivo_para_empreender_na_sua_regiao.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.ha_incentivo_para_empreender_na_sua_regiao.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        ha_incentivo_para_empreender_na_sua_regiao: [...formData.ha_incentivo_para_empreender_na_sua_regiao, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        ha_incentivo_para_empreender_na_sua_regiao: formData.ha_incentivo_para_empreender_na_sua_regiao.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao_sei"
                  checked={formData.ha_incentivo_para_empreender_na_sua_regiao.includes("Nao_sei")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        ha_incentivo_para_empreender_na_sua_regiao: [...formData.ha_incentivo_para_empreender_na_sua_regiao, "Nao_sei"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        ha_incentivo_para_empreender_na_sua_regiao: formData.ha_incentivo_para_empreender_na_sua_regiao.filter((item) => item !== "Nao_sei"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao_sei"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não sei
                </label>
              </div>

              <Text size="lg" asChild>
                <label>12. Existem empreendimentos na sua região?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.existem_empreendimentos_na_sua_regiao.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        existem_empreendimentos_na_sua_regiao: [...formData.existem_empreendimentos_na_sua_regiao, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        existem_empreendimentos_na_sua_regiao: formData.existem_empreendimentos_na_sua_regiao.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.existem_empreendimentos_na_sua_regiao.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        existem_empreendimentos_na_sua_regiao: [...formData.existem_empreendimentos_na_sua_regiao, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        existem_empreendimentos_na_sua_regiao: formData.existem_empreendimentos_na_sua_regiao.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao_sei"
                  checked={formData.existem_empreendimentos_na_sua_regiao.includes("Nao_sei")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        existem_empreendimentos_na_sua_regiao: [...formData.existem_empreendimentos_na_sua_regiao, "Nao_sei"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        existem_empreendimentos_na_sua_regiao: formData.existem_empreendimentos_na_sua_regiao.filter((item) => item !== "Nao_sei"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao_sei"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não sei
                </label>
              </div>

              <Text size="lg" asChild>
                <label>13. Em sua casa, vocês possuem transporte próprio?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.em_sua_casa_voces_possuem_transporte_proprio.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_possuem_transporte_proprio: [...formData.em_sua_casa_voces_possuem_transporte_proprio, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_possuem_transporte_proprio: formData.em_sua_casa_voces_possuem_transporte_proprio.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.em_sua_casa_voces_possuem_transporte_proprio.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_possuem_transporte_proprio: [...formData.em_sua_casa_voces_possuem_transporte_proprio, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        em_sua_casa_voces_possuem_transporte_proprio: formData.em_sua_casa_voces_possuem_transporte_proprio.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <Text size="lg" asChild>
                <label>14. Existem cooperativas na sua região?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.existem_cooperativas_na_sua_regiao.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        existem_cooperativas_na_sua_regiao: [...formData.existem_cooperativas_na_sua_regiao, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        existem_cooperativas_na_sua_regiao: formData.existem_cooperativas_na_sua_regiao.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.existem_cooperativas_na_sua_regiao.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        existem_cooperativas_na_sua_regiao: [...formData.existem_cooperativas_na_sua_regiao, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        existem_cooperativas_na_sua_regiao: formData.existem_cooperativas_na_sua_regiao.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao_sei"
                  checked={formData.existem_cooperativas_na_sua_regiao.includes("Nao_sei")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        existem_cooperativas_na_sua_regiao: [...formData.existem_cooperativas_na_sua_regiao, "Nao_sei"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        existem_cooperativas_na_sua_regiao: formData.existem_cooperativas_na_sua_regiao.filter((item) => item !== "Nao_sei"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao_sei"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não sei
                </label>
              </div>

              <Text size="lg" asChild>
                <label>15. Qual sua opinião sobre o cooperativismo?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Positiva"
                  checked={formData.qual_sua_opniao_sobre_cooperativismo.includes("Positiva")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        qual_sua_opniao_sobre_cooperativismo: [...formData.qual_sua_opniao_sobre_cooperativismo, "Positiva"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        qual_sua_opniao_sobre_cooperativismo: formData.qual_sua_opniao_sobre_cooperativismo.filter((item) => item !== "Positiva"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Positiva"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Positiva
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Negativa"
                  checked={formData.qual_sua_opniao_sobre_cooperativismo.includes("Negativa")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        qual_sua_opniao_sobre_cooperativismo: [...formData.qual_sua_opniao_sobre_cooperativismo, "Negativa"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        qual_sua_opniao_sobre_cooperativismo: formData.qual_sua_opniao_sobre_cooperativismo.filter((item) => item !== "Negativa"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Negativa"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Negativa
                </label>
              </div>

              <Text size="lg" asChild>
                <label>16. Qual sua renda familiar?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="De_1_a_3_salarios_minimos"
                  checked={formData.qual_sua_renda_familiar.includes("De_1_a_3_salarios_minimos")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        qual_sua_renda_familiar: [...formData.qual_sua_renda_familiar, "De_1_a_3_salarios_minimos"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        qual_sua_renda_familiar: formData.qual_sua_renda_familiar.filter((item) => item !== "De_1_a_3_salarios_minimos"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="De_1_a_3_salarios_minimos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  De 1 a 3 salários mínimos
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="De_3_a_5_salarios_minimos"
                  checked={formData.qual_sua_renda_familiar.includes("De_3_a_5_salarios_minimos")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        qual_sua_renda_familiar: [...formData.qual_sua_renda_familiar, "De_3_a_5_salarios_minimos"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        qual_sua_renda_familiar: formData.qual_sua_renda_familiar.filter((item) => item !== "De_3_a_5_salarios_minimos"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="De_3_a_5_salarios_minimos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  De 3 a 5 salários mínimos
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Menos_de_1_salario_minimo"
                  checked={formData.qual_sua_renda_familiar.includes("Menos_de_1_salario_minimo")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        qual_sua_renda_familiar: [...formData.qual_sua_renda_familiar, "Menos_de_1_salario_minimo"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        qual_sua_renda_familiar: formData.qual_sua_renda_familiar.filter((item) => item !== "Menos_de_1_salario_minimo"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Menos_de_1_salario_minimo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Menos de 1 salário mínimo
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao_sabe_quanto_ganha"
                  checked={formData.qual_sua_renda_familiar.includes("Nao_sabe_quanto_ganha")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        qual_sua_renda_familiar: [...formData.qual_sua_renda_familiar, "Nao_sabe_quanto_ganha"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        qual_sua_renda_familiar: formData.qual_sua_renda_familiar.filter((item) => item !== "Nao_sabe_quanto_ganha"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao_sabe_quanto_ganha"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não sabe quanto ganha
                </label>
              </div>

              <Text size="lg" asChild>
                <label>17. Você tem vontade de empreender?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.voce_tem_vontade_de_empreender.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        voce_tem_vontade_de_empreender: [...formData.voce_tem_vontade_de_empreender, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        voce_tem_vontade_de_empreender: formData.voce_tem_vontade_de_empreender.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.voce_tem_vontade_de_empreender.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        voce_tem_vontade_de_empreender: [...formData.voce_tem_vontade_de_empreender, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        voce_tem_vontade_de_empreender: formData.voce_tem_vontade_de_empreender.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Ja_tenho_meu_proprio_negocio"
                  checked={formData.voce_tem_vontade_de_empreender.includes("Ja_tenho_meu_proprio_negocio")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        voce_tem_vontade_de_empreender: [...formData.voce_tem_vontade_de_empreender, "Ja_tenho_meu_proprio_negocio"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        voce_tem_vontade_de_empreender: formData.voce_tem_vontade_de_empreender.filter((item) => item !== "Ja_tenho_meu_proprio_negocio"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Ja_tenho_meu_proprio_negocio"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Já tenho meu próprio negócio
                </label>
              </div>

              <Text size="lg" asChild>
                <label>18. Você já participou de algum programa de capacitação ou treinamento em empreendedorismo?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo: [...formData.voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo: formData.voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo: [...formData.voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo: formData.voce_ja_participou_de_algum_programa_de_capacitacao_ou_treinamento_em_empreendedorismo.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>

              <Text size="lg" asChild>
                <label>19. Caso fizéssemos ações de capacitações, você teria interesse em participar?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Sim"
                  checked={formData.voce_teria_interesse_em_participar_se_fizessemos.includes("Sim")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        voce_teria_interesse_em_participar_se_fizessemos: [...formData.voce_teria_interesse_em_participar_se_fizessemos, "Sim"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        voce_teria_interesse_em_participar_se_fizessemos: formData.voce_teria_interesse_em_participar_se_fizessemos.filter((item) => item !== "Sim"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Sim"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nao"
                  checked={formData.voce_teria_interesse_em_participar_se_fizessemos.includes("Nao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        voce_teria_interesse_em_participar_se_fizessemos: [...formData.voce_teria_interesse_em_participar_se_fizessemos, "Nao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        voce_teria_interesse_em_participar_se_fizessemos: formData.voce_teria_interesse_em_participar_se_fizessemos.filter((item) => item !== "Nao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não
                </label>
              </div>
              <div className="flex flex-col gap-1">
                <Text>Observações: </Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.observacoes}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      observacoes: e.target.value,
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
