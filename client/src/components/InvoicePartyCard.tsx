'use client';

import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { ReactNode } from 'react';

import { ClientModel } from '@/types/models/client';
import { InvoiceParty } from '@/types/models/invoice';

import TrashIcon from './icons/TrashIcon';

type Props = {
  partyData: InvoiceParty;
  insideForm?: boolean;
  actions?: ReactNode;
  onEdit: (partyData: InvoiceParty) => void;
  onDelete: (partyData: InvoiceParty) => void;
};

const InvoicePartyCard = ({
  partyData,
  insideForm = false,
  actions,
  onEdit,
  onDelete,
}: Props) => {
  const { id, address, businessNumber, businessType, name, type, email } =
    partyData;
  const smallText = type === 'receiver' ? 'From:' : 'To:';

  const handleEditClient = () => {
    onEdit(partyData);
  };

  const handleDeleteClient = () => {
    onDelete(partyData);
  };

  const renderActions = () => (
    <div className='absolute right-2 top-2 flex gap-1.5 z-10'>
      {actions ? (
        actions
      ) : (
        <>
          <Button
            className='min-w-unit-10 w-unit-16 h-unit-8 cursor-pointer'
            variant='bordered'
            onPress={handleEditClient}
          >
            Edit
          </Button>
          <Button
            isIconOnly
            variant='bordered'
            color='danger'
            className='min-w-unit-8 w-unit-8 h-unit-8 cursor-pointer'
            onPress={handleDeleteClient}
          >
            <TrashIcon height={4} width={4} />
          </Button>
        </>
      )}
    </div>
  );

  return (
    <Card className='p-2 relative'>
      <CardHeader className='pb-0 flex-col items-start'>
        {insideForm && <small className='text-default-500'>{smallText}</small>}
        <h4 className='font-bold text-large'>{name}</h4>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <p className='text-tiny uppercase font-bold'>
          {businessType} No. {businessNumber}
        </p>
        <small className='text-default-500'>{address}</small>
        {email && <small className='text-default-500'>{email}</small>}
      </CardBody>
      {renderActions()}
    </Card>
  );
};

export default InvoicePartyCard;
