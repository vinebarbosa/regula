import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FiltrosPainelSolicitacaoState {
  procedimento: { value: number; label: string } | null;
  subGrupo: { value: number; label: string } | null;
  limparfiltros: () => void;
}

const filtrosPainelStoreDefaultValues = {
  procedimento: null,
  subGrupo: null
} as FiltrosPainelSolicitacaoState

export const filtrosPainelStore = create<FiltrosPainelSolicitacaoState>()(
  persist(
    (set) => ({
      ...filtrosPainelStoreDefaultValues,
      limparfiltros: () => set(() => ({ ...filtrosPainelStoreDefaultValues }))
    }),
    {
      name: "filtros-painel-solicitacoes-storage"
    }
  )
);
