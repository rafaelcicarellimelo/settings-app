import { useQuery } from '@tanstack/vue-query'

/**
 * Simula uma chamada de API para buscar o status da conta do usuário.
 * Retorna dados fictícios mas estruturados (security + alerts).
 *
 * A função é propositalmente assíncrona para demonstrar o uso de useQuery().
 */
async function fetchAccountStatus() {
  // Simula uma latência real de rede (1.2s)
  await new Promise(resolve => setTimeout(resolve, 1200))

  // Simula dados vindos do servidor
  return {
    security: 'Nenhum problema encontrado.',
    alerts: 0,
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Hook TanStack Query para o status da conta
 * ---------------------------------------------------------
 * - cacheKey: ['account-status']  -> chave única de cache
 * - staleTime: 30s (definido globalmente)
 * - retry: 1 (config global)
 *
 * Em caso real, trocar `fetchAccountStatus` por uma chamada de API:
 * fetch('/api/account/status').then(res => res.json())
 */
export function useAccountStatusQuery() {
  return useQuery({
    queryKey: ['account-status'],
    queryFn: fetchAccountStatus,
  })
}
