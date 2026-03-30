import { useModalStore } from 'shared/store/modalStore';
import { Modal } from './Modal';

export function ModalContainer() {
  const { stack, close } = useModalStore();

  const BASE_Z = 50;

  return (
    <>
      {stack.map((entry, index) => (
        <Modal
          key={entry.id}
          open
          title={entry.title}
          footer={entry.footer}
          size={entry.size}
          closeOnBackdrop={entry.closeOnBackdrop}
          zIndex={BASE_Z + index * 10}
          onClose={() => close(entry.id)}
        >
          {entry.content}
        </Modal>
      ))}
    </>
  );
}
