import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import useGetClients from '@/hooks/client/useGetClients';
import { ClientModel } from '@/types/models/client';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onReceiverSelect: (client: ClientModel) => void;
};

const InvoiceFormPartyModal = ({
  isOpen,
  onClose,
  onReceiverSelect,
}: Props) => {
  const { clients } = useGetClients();

  const handleClick = () => {
    console.log('clickerino');
  };

  const renderClientOption = (client: ClientModel) => (
    <div key={client.id} onClick={() => onReceiverSelect(client)}>
      <Card
        isHoverable
        className='cursor-pointer'
        onClick={() => console.log('HAAAWW')}
      >
        <CardHeader className='pb-0.5 uppercase font-bold'>
          {client.name}
        </CardHeader>
        <CardBody className='pt-0'>
          <div className='flex gap-2 text-small text-default-500'>
            <span>{client.address}</span>
            <span>{client.email}</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Select Client</ModalHeader>
        <ModalBody onClick={() => console.log('YEET')}>
          {clients?.map((client) => renderClientOption(client))}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvoiceFormPartyModal;
