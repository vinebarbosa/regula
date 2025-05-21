import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Option {
  value: number;
  label: string;
}

interface FiltrosPainelSolicitacaoState {
  procedimento: Option | null;
  subGrupo: Option | null;
  dataInicio: string | null;
}

interface FiltrosPainelSolicitacaoStore extends FiltrosPainelSolicitacaoState {
  clear: () => void;
  set: <K extends keyof FiltrosPainelSolicitacaoState>(
    key: K,
    value: FiltrosPainelSolicitacaoState[K]
  ) => void;
  reset: (key: keyof FiltrosPainelSolicitacaoState) => void;
}

const filtrosPainelStoreDefaultValues: FiltrosPainelSolicitacaoState = {
  procedimento: null,
  subGrupo: null,
  dataInicio: null
};

export const filtrosPainelStore = create<FiltrosPainelSolicitacaoStore>()(
  persist(
    (set) => ({
      ...filtrosPainelStoreDefaultValues,
      clear: () => set((state) => ({ ...state, ...filtrosPainelStoreDefaultValues })),
      set: (key, value) => set((state) => ({ ...state, [key]: value })),
      reset: (key) => set((state) => ({ ...state, [key]: filtrosPainelStoreDefaultValues[key] }))
    }),
    {
      name: 'filtros-painel-solicitacoes-storage'
    }
  )
);
