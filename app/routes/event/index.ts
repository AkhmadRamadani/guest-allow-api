import type { FastifyPluginAsync } from 'fastify'
import eventSchema from '../../validations/event.schema.js'

const routes: FastifyPluginAsync = async (f) => {
    const { event } = f.controllers

    f.route({
        method: 'GET',
        url: '/',
        schema: eventSchema.list,
        onRequest: f.authenticate(),
        handler: event.list
    })

    f.route({
        method: 'POST',
        url: '/',
        schema: eventSchema.create,
        onRequest: f.authenticate(),
        handler: event.create
    })

    f.route({
        method: 'GET',
        url: '/:eventId',
        schema: eventSchema.detail,
        onRequest: f.authenticate(),
        handler: event.detail,
    })

    f.route({
        method: 'PUT',
        url: '/:eventId',
        schema: eventSchema.update,
        onRequest: f.authenticate(),
        handler: event.update
    })

    f.route({
        method: 'DELETE',
        url: '/:eventId',
        schema: eventSchema.remove,
        onRequest: f.authenticate(),
        handler: event.remove
    })

    f.route({
        method: 'POST',
        url: '/:eventId/join',
        schema: eventSchema.join,
        onRequest: f.authenticate(),
        handler: event.join
    })

    f.route({
        method: 'POST',
        url: '/:eventId/leave',
        schema: eventSchema.leave,
        onRequest: f.authenticate(),
        handler: event.leave
    })

    f.route({
        method: 'GET',
        url: '/:eventId/participants',
        schema: eventSchema.participants,
        onRequest: f.authenticate(),
        handler: event.participants
    })

    f.route({
        method: 'PUT',
        url: '/:eventId/receptionists',
        schema: eventSchema.updateEventReceptionists,
        onRequest: f.authenticate(),
        handler: event.updateEventReceptionists
    })

}

export default routes