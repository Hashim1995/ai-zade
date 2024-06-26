import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider
} from '@nextui-org/react';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';

interface IInstructionModal {
  isOpen: boolean;
  onOpenChange: () => void;
}
/**
 * Renders an instruction modal component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the modal is open or not.
 * @param {Function} props.onOpenChange - Callback function to handle open/close state changes.
 * @example <InstructionModal isOpen={true} onOpenChange={() => {}} />
 * @returns {JSX.Element} The instruction modal component.
 */
function InstructionModal({
  isOpen,
  onOpenChange
}: IInstructionModal): JSX.Element {
  const { t } = useTranslation();

  return (
    <Modal
      size="4xl"
      isDismissable={false}
      backdrop="opaque"
      className="centerModalOnMobile"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1 pr-10 text-default-800 dark:text-white">
              {t('instructionText')}
            </ModalHeader>
            <Divider className="mb-6" />

            <ModalBody>
              <iframe
                height="400"
                width="100%"
                src="https://www.youtube.com/embed/X1k5Kcki90M"
                title={t('instructionText')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </ModalBody>
            <ModalFooter>
              <AppHandledBorderedButton
                title="Close Button"
                aria-label="Close Button"
                onPress={onClose}
              >
                {t('closeBtn')}
              </AppHandledBorderedButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default InstructionModal;
