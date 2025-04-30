'use client'

import { useFormMultiEtapasStore } from "@/modules/shared/components/form-multi-etapas/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { dadosPacienteSchema } from "./schema"
import { z } from "zod"


type FormValues = z.infer<typeof dadosPacienteSchema>


export function EtapaDadosPaciente() {
  const { avancarEtapa, updateDadosEtapa, etapa, dadosFormulario } = useFormMultiEtapasStore()

  const dadosEtapa = dadosFormulario[0] as FormValues

  const form = useForm<FormValues>({
    resolver: zodResolver(dadosPacienteSchema),
    defaultValues: {
      nome: dadosEtapa?.nome
    }
  })

  const handleSubmit = form.handleSubmit((dados) => {
    updateDadosEtapa(etapa, dados)
    avancarEtapa()
  })

  return (
    <form onSubmit={handleSubmit}>
      dados paciente

      <div className="h-[200px] flex flex-col justify-center">
        <input {...form.register("nome")} placeholder="digite um nome" className="border-blue-500 border"/>
        <span className="text-red-400">{form.formState.errors.nome?.message}</span>
      </div>
      <button type="submit">AVACAR</button>
    </form>
  )
}
