import { useState } from 'react';
import { VIEW_MODE } from '@/config/app.config';
import {
  Button,
  Input,
  Switch,
  Select,
  Checkbox,
  Badge,
  Spinner,
  Modal,
  Avatar,
} from '@/components/ui';
import { toast } from '@/store/toastStore';
import { useUsers, useCreateUser } from '@/api/example/example.queries';

// -- Showcase section wrapper ------------------------------------------------

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </section>
  );
}

// -- Inline SVG icons used across the showcase --------------------------------

function SearchIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="m21 21-4.35-4.35" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
    </svg>
  );
}

// -- API showcase component ---------------------------------------------------

function ApiShowcase() {
  const { data: users, isLoading, isError, error } = useUsers();
  const createUserMutation = useCreateUser();

  const handleCreateUser = () => {
    createUserMutation.mutate({
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
    });
  };

  return (
    <Section title="API Integration (React Query)">
      <p className="mb-3 text-sm text-gray-600">
        Fetches users from JSONPlaceholder via React Query. The mutation button
        demonstrates <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">useMutation</code> with
        toast feedback.
      </p>

      <div className="mb-4">
        <Button
          size="sm"
          variant="primary"
          leftIcon={<PlusIcon />}
          loading={createUserMutation.isPending}
          onClick={handleCreateUser}
        >
          Create User (Mutation)
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 py-6">
          <Spinner size="sm" />
          <span className="text-sm text-gray-500">Loading users...</span>
        </div>
      )}

      {isError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          Failed to load users: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      )}

      {users && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-500">ID</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">Company</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.slice(0, 5).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">{user.id}</td>
                  <td className="px-4 py-2 font-medium text-gray-900">{user.name}</td>
                  <td className="px-4 py-2 text-gray-600">{user.email}</td>
                  <td className="px-4 py-2 text-gray-600">{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length > 5 && (
            <p className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500">
              Showing 5 of {users.length} users
            </p>
          )}
        </div>
      )}
    </Section>
  );
}

// -- Page component -----------------------------------------------------------

export function HomePage() {
  // Switch state
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);

  // Checkbox state
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);

  // Select state
  const [selectValue, setSelectValue] = useState('');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          UI Component Showcase
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          All shared UI components at a glance.
          Current view mode:{' '}
          <span className="inline-block rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700 uppercase">
            {VIEW_MODE}
          </span>
        </p>
      </div>

      {/* ---- Button ---- */}
      <Section title="Button">
        <div className="space-y-4">
          {/* Variants */}
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Variants
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Sizes
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* States */}
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              States
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button leftIcon={<PlusIcon />}>With Icon</Button>
              <Button variant="outline" leftIcon={<MailIcon />} rightIcon={<SearchIcon />}>
                Both Icons
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Input ---- */}
      <Section title="Input">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Default" placeholder="Enter text..." />
          <Input
            label="With helper text"
            placeholder="you@example.com"
            helperText="We will never share your email."
          />
          <Input
            label="With error"
            placeholder="Enter email"
            defaultValue="invalid"
            error="Please enter a valid email address."
          />
          <Input
            label="With icons"
            placeholder="Search..."
            leftIcon={<SearchIcon />}
            rightIcon={<MailIcon />}
          />
          <Input label="Disabled" placeholder="Cannot type here" disabled />
        </div>
      </Section>

      {/* ---- Switch ---- */}
      <Section title="Switch">
        <div className="flex flex-wrap items-center gap-6">
          <Switch label="Enabled (on)" checked={switchA} onChange={setSwitchA} />
          <Switch label="Enabled (off)" checked={switchB} onChange={setSwitchB} />
          <Switch label="Disabled on" checked disabled onChange={() => {}} />
          <Switch label="Disabled off" checked={false} disabled onChange={() => {}} />
        </div>
      </Section>

      {/* ---- Select ---- */}
      <Section title="Select">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Fruit"
            placeholder="Pick a fruit..."
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
              { value: 'grape', label: 'Grape', disabled: true },
            ]}
          />
          <Select
            label="With error"
            placeholder="Select..."
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
            error="This field is required."
          />
          <Select
            label="Disabled"
            placeholder="Cannot select"
            options={[]}
            disabled
          />
        </div>
      </Section>

      {/* ---- Checkbox ---- */}
      <Section title="Checkbox">
        <div className="flex flex-wrap items-start gap-6">
          <Checkbox
            label="Checked"
            checked={check1}
            onChange={(e) => setCheck1(e.target.checked)}
          />
          <Checkbox
            label="Unchecked"
            checked={check2}
            onChange={(e) => setCheck2(e.target.checked)}
          />
          <Checkbox label="Indeterminate" indeterminate checked readOnly />
          <Checkbox label="Disabled" disabled checked readOnly />
          <Checkbox
            label="With error"
            error="You must agree to the terms."
            checked={false}
            readOnly
          />
        </div>
      </Section>

      {/* ---- Badge ---- */}
      <Section title="Badge">
        <div className="space-y-3">
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Variants (sm)
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Size md
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" size="md">Active</Badge>
              <Badge variant="error" size="md">Inactive</Badge>
              <Badge variant="info" size="md">Pending</Badge>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Spinner ---- */}
      <Section title="Spinner">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <Spinner size="sm" />
            <span className="text-xs text-gray-500">sm</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Spinner size="md" />
            <span className="text-xs text-gray-500">md</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Spinner size="lg" />
            <span className="text-xs text-gray-500">lg</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Spinner size="lg" color="text-blue-600" />
            <span className="text-xs text-gray-500">colored</span>
          </div>
        </div>
      </Section>

      {/* ---- Avatar ---- */}
      <Section title="Avatar">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Sizes with initials
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Avatar name="Alice Kim" size="sm" />
              <Avatar name="Bob Lee" size="md" />
              <Avatar name="Charlie Park" size="lg" />
              <Avatar name="Diana Cho" size="xl" />
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Online status
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Avatar name="Online User" size="md" online />
              <Avatar name="Offline User" size="md" online={false} />
              <Avatar name="No Status" size="md" />
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Image (broken src fallback)
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Avatar
                src="https://i.pravatar.cc/150?u=showcase1"
                name="Image User"
                size="lg"
                online
              />
              <Avatar
                src="https://broken-url.invalid/nope.jpg"
                name="Fallback"
                size="lg"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Toast ---- */}
      <Section title="Toast / Notification">
        <p className="mb-3 text-sm text-gray-600">
          Click a button to trigger a toast notification in the bottom-right corner.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => toast.success('Operation completed successfully!')}
          >
            Success Toast
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => toast.error('Something went wrong. Please try again.')}
          >
            Error Toast
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast.warning('Please review your changes before saving.')}
          >
            Warning Toast
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info('A new version is available.')}
          >
            Info Toast
          </Button>
        </div>
      </Section>

      {/* ---- API Integration (React Query) ---- */}
      <ApiShowcase />

      {/* ---- Modal ---- */}
      <Section title="Modal / Dialog">
        <p className="mb-3 text-sm text-gray-600">
          Open a modal dialog. Press Escape or click the backdrop to close.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => {
              setModalSize('sm');
              setModalOpen(true);
            }}
          >
            Small Modal
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setModalSize('md');
              setModalOpen(true);
            }}
          >
            Medium Modal
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setModalSize('lg');
              setModalOpen(true);
            }}
          >
            Large Modal
          </Button>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`Modal (${modalSize})`}
          size={modalSize}
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setModalOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p className="text-sm text-gray-600">
            This is a <strong>{modalSize}</strong> modal dialog. It supports a title,
            scrollable body content, and a footer with action buttons.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            You can close it by pressing <kbd className="rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 text-xs font-mono">Esc</kbd>,
            clicking the backdrop, or using the close button in the header.
          </p>
        </Modal>
      </Section>
    </div>
  );
}
