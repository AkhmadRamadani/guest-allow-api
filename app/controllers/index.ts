import fp from 'fastify-plugin'

import { AuthController } from './auth.controller.js'
import { UserController } from './user.controller.js'
import { EventController } from './event.controller.js'

declare module 'fastify' {
  interface FastifyInstance {
    controllers: {
      auth: AuthController
      user: UserController
      event: EventController
    }
  }
}

export default fp(async (f) => {
  const { user, session, token, mail, event, participate } = f.services

  f.decorate('controllers', {
    auth: new AuthController(user, session, token, mail),
    user: new UserController(user),
    event: new EventController(event, token, user, participate)
  })
})
