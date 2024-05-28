import type { FastifyJWTOptions, JWT } from '@fastify/jwt'
import { FastifyRequest, RouteGenericInterface, FastifySchema, FastifyTypeProviderDefault, FastifyBaseLogger } from 'fastify'
import { ResolveFastifyRequestType } from 'fastify/types/type-provider'
import { Server, IncomingMessage } from 'http'
import type { Transporter } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport.js'

export const prismaModel = {
  findUnique: () => <any>{},
  findFirst: () => <any>{},
  findMany: () => <any>{},
  create: () => <any>{},
  createMany: () => <any>{},
  delete: () => <any>{},
  update: () => <any>{},
  deleteMany: () => <any>{},
  updateMany: () => <any>{},
  upsert: () => <any>{},
  count: () => <any>{},
  aggregate: () => <any>{},
  groupBy: () => <any>{},
  findUniqueOrThrow: () => <any>{},
  findFirstOrThrow: () => <any>{}
}

export const jwt: JWT = {
  sign: () => <any>{},
  verify: () => <any>{},
  decode: () => <any>{},
  options: {
    decode: {},
    sign: {},
    verify: {}
  },
  lookupToken: function (request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, options?: FastifyJWTOptions['verify']): string {
    throw new Error('Function not implemented.')
  }
}

export const mailTransport: Partial<
  Transporter<SMTPTransport.SentMessageInfo>
> = {
  sendMail: () => <any>{}
}
