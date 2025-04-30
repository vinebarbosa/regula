
import { create } from "zustand"

export interface FormMultiEtapasStore {
  etapa: number;
  totalEtapas: number;
  dadosFormulario: Array<unknown>;
  avancarEtapa: VoidFunction;
  voltarEtapa: VoidFunction;
  updateDadosEtapa: (index: number, value: unknown) => void
  setTotalEtapas: (total: number) => void
}

export const useFormMultiEtapasStore = create<FormMultiEtapasStore>()((set) => ({
  etapa: 0,
  totalEtapas: 0,
  dadosFormulario: [],
  avancarEtapa: () => set((state) => ({ etapa: state.etapa + 1 })),
  voltarEtapa: () => set((state) => ({ etapa: state.etapa - 1 })),
  updateDadosEtapa: (index: number, value: unknown) => set(state => {
    state.dadosFormulario[index] = value
    return state
  }),
  setTotalEtapas: (total: number) => set(state => {
    state.totalEtapas = total
    return state
  })
}))
