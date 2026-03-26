import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

function statusColor(state: string) {
  if (state === 'success') return 'text-green-400';
  if (state === 'error') return 'text-red-400';
  if (state === 'pending') return 'text-yellow-400';
  return 'text-gray-400';
}

export function QueryTab() {
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState<string | null>(null);
  const cache = qc.getQueryCache().getAll();

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-1.5 border-b border-gray-700">
        <span className="text-xs text-gray-400">{cache.length} queries cached</span>
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-xs">
        {cache.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No cached queries</p>
        ) : (
          cache.map((query) => {
            const key = JSON.stringify(query.queryKey);
            const state = query.state.status;
            const isExpanded = expanded === key;
            return (
              <div key={key} className="border-b border-gray-800">
                <button
                  className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-800"
                  onClick={() => setExpanded(isExpanded ? null : key)}
                >
                  <span className={`text-[10px] uppercase font-bold w-14 shrink-0 ${statusColor(state)}`}>
                    {state}
                  </span>
                  <span className="text-gray-300 truncate">{key}</span>
                  <span className="ml-auto text-gray-600">{isExpanded ? '▲' : '▼'}</span>
                </button>
                {isExpanded && (
                  <pre className="px-3 pb-2 text-gray-400 whitespace-pre-wrap break-all bg-gray-900 text-[10px] leading-relaxed">
                    {JSON.stringify(query.state.data ?? query.state.error, null, 2)}
                  </pre>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
