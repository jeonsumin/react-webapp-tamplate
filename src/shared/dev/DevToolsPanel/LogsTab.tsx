import { useDevStore, type LogLevel } from '@/shared/store/devStore';

const levelStyle: Record<LogLevel, string> = {
  log: 'text-gray-300',
  info: 'text-blue-400',
  warn: 'text-yellow-400',
  error: 'text-red-400',
};

const levelBadge: Record<LogLevel, string> = {
  log: 'bg-gray-700 text-gray-300',
  info: 'bg-blue-900 text-blue-300',
  warn: 'bg-yellow-900 text-yellow-300',
  error: 'bg-red-900 text-red-300',
};

export function LogsTab() {
  const { logs, clearLogs } = useDevStore();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-700">
        <span className="text-xs text-gray-400">{logs.length} entries</span>
        <button
          onClick={clearLogs}
          className="text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded hover:bg-gray-700"
        >
          Clear
        </button>
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-xs">
        {logs.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No logs yet</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={`px-3 py-1.5 border-b border-gray-800 ${levelStyle[log.level]}`}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`px-1 rounded text-[10px] uppercase font-bold ${levelBadge[log.level]}`}>
                  {log.level}
                </span>
                <span className="text-gray-500 text-[10px]">
                  {log.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <pre className="whitespace-pre-wrap break-all leading-relaxed">{log.message}</pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
