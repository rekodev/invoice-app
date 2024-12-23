import { MultipartFile } from '@fastify/multipart';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  deleteInvoiceFromDb,
  findInvoiceById,
  findInvoiceByInvoiceId,
  getInvoiceFromDb,
  getInvoicesFromDb,
  insertInvoiceInDb,
  updateInvoiceInDb,
} from '../database';
import { InvoiceModel } from '../types/models';
import {
  AlreadyExistsError,
  BadRequestError,
  NotFoundError,
} from '../utils/errors';

export const getInvoices = async (
  req: FastifyRequest<{ Params: { userId: number } }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;
  const invoices = await getInvoicesFromDb(userId);

  reply.status(200).send(invoices);
};

export const getInvoice = async (
  req: FastifyRequest<{ Params: { userId: number; id: number } }>,
  reply: FastifyReply
) => {
  const { userId, id } = req.params;
  const invoice = await getInvoiceFromDb(userId, id);

  if (!invoice) throw new NotFoundError('Invoice not found');

  reply.status(200).send({ invoice });
};

export const postInvoice = async (
  req: FastifyRequest<{
    Params: { userId: number };
    Body: InvoiceModel & { file: MultipartFile };
  }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;
  const invoiceData = req.body;
  const signatureFile = req.body.file;

  let uploadedSignature: UploadApiResponse;

  if (signatureFile) {
    const fileBuffer = await signatureFile.toBuffer();

    uploadedSignature = await cloudinary.uploader.upload(
      `data:${signatureFile.mimetype};base64,${fileBuffer.toString('base64')}`
    );

    if (!uploadedSignature)
      throw new BadRequestError('Unable to upload signature');
  }

  const foundInvoice = await findInvoiceByInvoiceId(
    userId,
    invoiceData.invoiceId
  );

  if (foundInvoice)
    throw new AlreadyExistsError(
      'Invoice with provided invoice ID already exists'
    );

  const insertedInvoice = await insertInvoiceInDb(
    invoiceData,
    uploadedSignature ? uploadedSignature.url : invoiceData.senderSignature
  );

  if (!insertedInvoice) throw new BadRequestError('Unable to add invoice');

  reply.status(200).send({
    invoice: insertedInvoice,
    message: 'Invoice added successfully',
  });
};

export const updateInvoice = async (
  req: FastifyRequest<{
    Params: { userId: number; id: number };
    Body: InvoiceModel & { file: MultipartFile };
  }>,
  reply: FastifyReply
) => {
  const { userId, id } = req.params;
  const invoiceData = req.body;
  const signatureFile = req.body.file;

  let uploadedSignature: UploadApiResponse;

  if (signatureFile) {
    const fileBuffer = await signatureFile.toBuffer();

    uploadedSignature = await cloudinary.uploader.upload(
      `data:${signatureFile.mimetype};base64,${fileBuffer.toString('base64')}`
    );

    if (!uploadedSignature)
      throw new BadRequestError('Unable to upload signature');
  }

  const foundInvoice = await findInvoiceById(userId, invoiceData.id);

  if (!foundInvoice) throw new NotFoundError('Invoice not found');

  const updatedInvoice = await updateInvoiceInDb(
    userId,
    id,
    invoiceData,
    signatureFile ? uploadedSignature.url : invoiceData.senderSignature
  );

  if (!updatedInvoice) throw new BadRequestError('Unable to update invoice');

  reply.status(200).send({
    invoice: updatedInvoice,
    message: 'Invoice updated successfully',
  });
};

export const deleteInvoice = async (
  req: FastifyRequest<{ Params: { userId: number; id: number } }>,
  reply: FastifyReply
) => {
  const { userId, id } = req.params;
  const deletedInvoice = await deleteInvoiceFromDb(userId, id);

  if (!deletedInvoice) throw new BadRequestError('Unable to delete invoice');

  reply.status(200).send({ message: 'Invoice deleted successfully' });
};
