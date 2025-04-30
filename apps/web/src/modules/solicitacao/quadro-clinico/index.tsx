'use client'

import { useFormMultiEtapasStore } from "@/modules/shared/components/form-multi-etapas/store"
import { DadosPaciente } from "../dados-paciente/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { quadroClinicoSchema } from "./schema"


export function EtapaQuadroClinico() {

  const { avancarEtapa, voltarEtapa, dadosFormulario, etapa, updateDadosEtapa } = useFormMultiEtapasStore()

  const { nome } = (dadosFormulario[0]) as DadosPaciente

  const form = useForm({
    resolver: zodResolver(quadroClinicoSchema),
    defaultValues: {
      teste: 'batata'
    }
  })

  const handleSubmit = form.handleSubmit((dados) => {
    updateDadosEtapa(etapa, dados)
    avancarEtapa()
  })

  return (
    <>

      <form onSubmit={handleSubmit}>


          <input type="text" {...form.register("teste")}  />


          <button onClick={voltarEtapa}>Voltar</button>

        EtapaQuadroClinico
        <button type="submit" >AVACAR</button>
      </form>

    </>
  )
}
