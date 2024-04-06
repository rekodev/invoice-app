import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import { useState } from 'react';

import { deleteClient } from '@/api';
import { UiState } from '@/constants/uiState';
import useGetClients from '@/hooks/useGetClients';
import useGetUser from '@/hooks/useGetUser';
import { ClientModel } from '@/types/models/client';

type Props = {
  clientData: ClientModel;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const DeleteClientModal = ({
  isOpen,
  onClose,
  onSuccess,
  clientData,
}: Props) => {
  const { mutateClients } = useGetClients();
  const { user } = useGetUser();

  const [uiState, setUiState] = useState(UiState.Idle);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = async () => {
    if (!user?.id || !clientData) return;

    setUiState(UiState.Pending);

    const response = await deleteClient(user.id, clientData.id);
    setSubmissionMessage(response.data.message);

    if ('error' in response.data) {
      setUiState(UiState.Failure);

      return;
    }

    setUiState(UiState.Success);
    onSuccess();
    mutateClients();
  };

  const renderModalBody = () => (
    <ModalBody>
      <div className='flex w-full items-center justify-between'>
        {submissionMessage && (
          <Chip color={uiState === UiState.Success ? 'success' : 'danger'}>
            {submissionMessage}
          </Chip>
        )}
        <div className='flex gap-1 justify-end w-full'>
          <Button color='danger' variant='light' onPress={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={uiState === UiState.Pending}
            color='secondary'
            onPress={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </ModalBody>
  );

  return (
    <Modal isOpen={isOpen}>
      <ModalContent className='flex flex-col items-center justify-center'>
        <ModalHeader className='text-center'>
          Are you sure you want to delete ?
        </ModalHeader>
        {renderModalBody()}
      </ModalContent>
    </Modal>
  );
};

export default DeleteClientModal;