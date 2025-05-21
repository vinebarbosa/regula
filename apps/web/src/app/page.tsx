'use client';

import { filtrosPainelStore } from '@/modules/painel-solicitacoes/filtros-painel-solicitacoes-store';
import { useStore } from '@/modules/shared/hooks/use-store';

export default function Home() {
  const filtrosPainel = useStore(filtrosPainelStore);

  return (
    <main>
      <div>
        <div>
          <pre>{JSON.stringify(filtrosPainel, null, 2)}</pre>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => filtrosPainel?.set('procedimento', { label: 'corintians', value: 2 })}
          >
            set 1
          </button>
          <button type="button" onClick={() => filtrosPainel?.reset('procedimento')}>
            reset
          </button>

          <button type="button" onClick={() => filtrosPainel?.set('dataInicio', '12/12/2021')}>
            set2
          </button>

          <button type="button" onClick={() => filtrosPainel?.clear()}>
            clear
          </button>
        </div>
      </div>
    </main>
  );
}
