import { useAppStore } from '@/shared/store/appStore';

export function StoreTab() {
  const state = useAppStore();

  // 함수 필드 제외하고 직렬화 가능한 값만 표시
  const snapshot = Object.fromEntries(
    Object.entries(state).filter(([, v]) => typeof v !== 'function')
  );

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-xs">
      <pre className="text-green-400 whitespace-pre-wrap break-all leading-relaxed">
        {JSON.stringify(snapshot, null, 2)}
      </pre>
    </div>
  );
}
