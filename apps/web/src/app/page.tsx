import { Etapa } from "@/modules/shared/components/etapa-form";
import { FormMultiEtapas } from "@/modules/shared/components/form-multi-etapas";
import { EtapaDadosPaciente } from "@/modules/solicitacao/dados-paciente/dados-paciente";
import { EtapaQuadroClinico } from "@/modules/solicitacao/quadro-clinico";

export default function Home() {
  return (
    <div>
      <FormMultiEtapas>
        <Etapa>
          <EtapaDadosPaciente/>
        </Etapa>
        <Etapa>
          <EtapaQuadroClinico/>
        </Etapa>
      </FormMultiEtapas>
    </div>
  );
}
