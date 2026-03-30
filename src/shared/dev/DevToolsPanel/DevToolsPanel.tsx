import { useDevStore } from 'shared/store/devStore';
import { useConsoleInterceptor } from './useConsoleInterceptor';
import { LogsTab } from './LogsTab';
import { QueryTab } from './QueryTab';
import { StoreTab } from './StoreTab';

const TABS = [
  { id: 'logs', label: 'Logs' },
  { id: 'query', label: 'Query' },
  { id: 'store', label: 'Store' },
] as const;

export function DevToolsPanel() {
  useConsoleInterceptor();

  const { isOpen, setOpen, activeTab, setActiveTab, logs } = useDevStore();

  const errorCount = logs.filter((l) => l.level === 'error').length;
  const warnCount = logs.filter((l) => l.level === 'warn').length;

  return (
    <>
      {/* 플로팅 토글 버튼 */}
      <button
        onClick={() => setOpen(!isOpen)}
        aria-label="Toggle DevTools"
        className="fixed bottom-20 right-4 z-[9999] w-11 h-11 rounded-full bg-gray-900 border border-gray-600 shadow-lg flex items-center justify-center text-lg hover:bg-gray-800 active:scale-95 transition-transform"
      >
        {errorCount > 0 ? (
          <span className="text-red-400 text-xs font-bold">{errorCount}E</span>
        ) : warnCount > 0 ? (
          <span className="text-yellow-400 text-xs font-bold">{warnCount}W</span>
        ) : (
          <span>🛠</span>
        )}
      </button>

      {/* 패널 */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[9998] flex flex-col bg-gray-900 text-white shadow-2xl border-t border-gray-700"
          style={{ height: '55dvh' }}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700 shrink-0">
            <div className="flex gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center rounded hover:bg-gray-700"
              aria-label="Close DevTools"
            >
              ✕
            </button>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === 'logs' && <LogsTab />}
            {activeTab === 'query' && <QueryTab />}
            {activeTab === 'store' && <StoreTab />}
          </div>
        </div>
      )}
    </>
  );
}
