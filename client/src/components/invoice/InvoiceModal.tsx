import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { PDFViewer } from '@react-pdf/renderer';
import { useContext } from 'react';

import { InvoiceModel } from '@/lib/types/models/invoice';

import PDFDocument from '../pdf/PDFDocument';

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  invoiceData: InvoiceModel;
  senderSignatureImage: string;
};

const InvoiceModal = ({
  isOpen,
  onOpenChange,
  invoiceData,
  senderSignatureImage,
}: Props) => {
  const { invoiceId } = invoiceData;

  return (
    <Modal
      className='h-[84.84vh] w-[90%] max-w-md min-w-[60%] pb-2 max-h-[978px]'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1 pb-2'>
          {invoiceId}
        </ModalHeader>
        <ModalBody>
          <div className='w-full h-full'>
            <PDFViewer className='h-full w-full'>
              <PDFDocument
                invoiceData={invoiceData}
                senderSignatureImage={senderSignatureImage}
              />
            </PDFViewer>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InvoiceModal;
