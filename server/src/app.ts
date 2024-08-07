import dotenv from 'dotenv';
import fastify from 'fastify';
import multer from 'fastify-multer';
import cors from '@fastify/cors';

import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { getPgVersion } from './database/db';
import {
  clientRoutes,
  invoiceRoutes,
  userRoutes,
  bankingInformationRoutes,
} from './routes';
import { transformErrors } from './utils/validation';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from './config/cloudinary';

dotenv.config();
cloudinary.config(cloudinaryConfig);

const port = parseInt(process.env.PORT);
const server = fastify({
  ajv: {
    customOptions: {
      allErrors: true,
    },
    plugins: [require('ajv-errors')],
  },
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(cors);
server.register(multer.contentParser);
server.register(invoiceRoutes);
server.register(clientRoutes);
server.register(userRoutes);
server.register(bankingInformationRoutes);

server.setErrorHandler(function (error, _request, reply) {
  if (error.validation) {
    return reply.status(400).send({
      message: 'Review fields and retry',
      errors: transformErrors(error.validation),
      code: error.code,
    });
  }

  return reply
    .status(error.statusCode || 500)
    .send({ errors: [], message: error.message, code: error.code });
});

getPgVersion();

server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
