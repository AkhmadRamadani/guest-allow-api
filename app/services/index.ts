import fp from 'fastify-plugin'

import { SessionService } from './session.service.js'
import { TokenService } from './token.service.js'
import { UserService } from './user.service.js'
import { MailService } from './mail.service.js'
import { EventService } from './event.service.js'
import { ParticipateService } from './participate.service.js'

export type { UserService, SessionService, TokenService, MailService, EventService }

declare module 'fastify' {
  interface FastifyInstance {
    services: {
      mail: MailService
      session: SessionService
      token: TokenService
      user: UserService
      event: EventService
      participate: ParticipateService
    }
  }
}

export default fp(async (f) => {
  f.decorate('services', {
    mail: new MailService(f.mailer),
    session: new SessionService(f.prisma.session),
    token: new TokenService(f.jwt),
    user: new UserService(f.prisma.user),
    event: new EventService(f.prisma.event, f.prisma.user, f.prisma.eventAttendees, f.prisma.receptionist),
    participate: new ParticipateService(f.prisma.event, f.prisma.user, f.prisma.eventAttendees)
  })
})
