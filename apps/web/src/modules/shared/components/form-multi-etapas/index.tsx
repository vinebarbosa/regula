'use client'
import { Children, PropsWithChildren, useEffect } from "react";

import { useFormMultiEtapasStore } from "./store";

export function FormMultiEtapas({ children }: PropsWithChildren) {
  const { etapa,  setTotalEtapas } = useFormMultiEtapasStore()

  const etapaCorrespondente = Children.toArray(children)[etapa]

  useEffect(() => {
    setTotalEtapas(Children.count(children))
  }, [Children.count(children)])

  return etapaCorrespondente
}
