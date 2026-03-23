import { Button } from "@/components/ui";
import { VIEW_MODE } from "@/config/app.config";
import { modal } from "@/store/modalStore";

export function AboutPage() {
  const openConfirm = () => {
    modal.open({
      title: "Confirm Action",
      content: "Are you sure you want to perform this action?",
      footer: (
        <>
          <Button onClick={() => modal.close()} variant="outline" size="sm">
            Cancel
          </Button>
          <Button onClick={() => modal.closeAll()} variant="danger" size="sm">
            Confirm & Close All
          </Button>
        </>
      )
    });
  };

  const testLogs = () => {
    modal.open({
      title: "Test Modal",
      content: "This is a test modal. Click 'Open Nested' to stack another modal on top.",
      footer: (
        <>
          <Button onClick={() => modal.close()} variant="outline" size="sm">
            Close
          </Button>
          <Button onClick={openConfirm} size="sm">
            Open Nested
          </Button>
        </>
      )
    });
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">About</h2>
        <p className="mt-1 text-sm text-gray-500">
          About this template project.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <h3 className="font-semibold text-gray-800">Tech Stack</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Vite + React 18 + TypeScript</li>
          <li>React Router v6</li>
          <li>Zustand (state management)</li>
          <li>TailwindCSS (styling)</li>
        </ul>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-600">
          View mode: <Button onClick={testLogs}>Button</Button>
          <span className="inline-block rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700 uppercase">
            {VIEW_MODE}
          </span>
        </p>
      </div>
    </div>
  );
}
