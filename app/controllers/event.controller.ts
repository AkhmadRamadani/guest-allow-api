import type { RouteHandler } from 'fastify'
import type { FromSchema } from 'json-schema-to-ts'

import { create, detail, list, update } from '../validations/event.schema.js'

import type { EventService, TokenService, UserService } from '../services'
import { ParticipateService } from 'app/services/participate.service.js'

export class EventController {
    constructor(
        private eventService: EventService,
        private tokenService: TokenService,
        private userService: UserService,
        private participateService: ParticipateService,
    ) { }

    list: RouteHandler<{
        Querystring: FromSchema<typeof list.queryString>,
        Reply: FromSchema<typeof list.response>
    }> = async (req, rep) => {
        let limit = req.query.limit || 10
        let page = req.query.page || 1

        // if limit or page is not a number
        // then parse it to number
        if (typeof limit === 'string') {
            limit = parseInt(limit)
        }
        if (typeof page === 'string') {
            page = parseInt(page)
        }


        const events = await this.eventService.queryEvents({
            select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                latitude: true,
                longitude: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        photoProfile: true,
                    }
                },
                createdAt: true,
                createdById: true,
                fee: true,
                _count: {
                    select: {
                        attendees: true,
                        eventAttendees: true,
                    }
                },
                address: true,
            },
            where: {
                deletedAt: null
            },
            skip: (page - 1) * limit,
            take: limit,
        })

        const total = await this.eventService.eventTotal()

        const meta = {
            page,
            limit,
            total: total,
            nextLink: total > page * limit ? `${req.url}?page=${page + 1}&limit=${limit}` : null,
            prevLink: page > 1 ? `${req.url}?page=${page - 1}&limit=${limit}` : null,
        }
        const eventsJson = JSON.parse(JSON.stringify(events))
        const response = {
            status: 200,
            message: 'Events retrieved successfully',
            data: eventsJson,
            meta,
        }
        rep.send(response)
    }

    create: RouteHandler<{
        Body: FromSchema<typeof create.body>,
        Headers: { authorization: string }
    }> = async (req, rep) => {
        const user = req.user.sub

        let data: FromSchema<typeof create.body> = req.body
        data.photo = data.photo || ''
        data.radius = data.radius || 50
        data.createdById = user

        let receptionList: string[] = []

        if (data.receptionList) {
            for (let i = 0; i < data.receptionList.length; i++) {
                receptionList.push(data.receptionList[i])
            }
        }

        delete data.receptionList

        const event = await this.eventService.createEvent(data, receptionList)
        const eventJson = JSON.parse(JSON.stringify(event))

        const response = {
            status: 201,
            message: 'Event created successfully',
            data: eventJson
        }

        rep.send(response)
    }

    detail: RouteHandler<{
        Params: { eventId: string },
        Reply: FromSchema<typeof detail.response>
    }> = async (req, rep) => {
        const eventId = req.params.eventId
        const event = await this.eventService.getEventById(eventId, {
            select: {
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                latitude: true,
                longitude: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        photoProfile: true,
                    }
                },
                receptionists: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                photoProfile: true,
                            }
                        }
                    }
                },
                createdAt: true,
                createdById: true,
                fee: true,
                _count: {
                    select: {
                        attendees: true,
                        eventAttendees: true,
                    }
                },
                address: true,
            }
        })

        console.log(event)

        if (!event) {
            rep.notFound('Event not found')
            return
        }

        const eventJson = JSON.parse(JSON.stringify(event))
        const response = {
            status: 200,
            message: 'Event retrieved successfully',
            data: eventJson
        }

        rep.send(response)
    }

    update: RouteHandler<{
        Params: { eventId: string },
        Headers: { authorization: string },
        Body: FromSchema<typeof update.body>
    }> = async (req, rep) => {
        const eventId = req.params.eventId
        const user = req.user

        const event = await this.eventService.getEventById(eventId)
        if (!event) {
            rep.notFound('Event not found')
            return
        }

        if (event.createdById !== user.sub) {
            rep.forbidden('You are not authorized to update this event')
            return
        }

        const data: FromSchema<typeof update.body> = req.body
        await this.eventService.updateEventById(eventId, { data })

        const response = {
            status: 200,
            message: 'Event updated successfully',
        }

        rep.send(response)
    }

    remove: RouteHandler<{
        Params: { eventId: string },
        Headers: { authorization: string }
    }> = async (req, rep) => {
        const eventId = req.params.eventId
        const user = req.user

        const event = await this.eventService.getEventById(eventId)
        if (!event) {
            rep.notFound('Event not found')
            return
        }

        if (event.createdById !== user.sub) {
            rep.forbidden('You are not authorized to delete this event')
            return
        }

        await this.eventService.deleteEventById(eventId)

        const response = {
            status: 200,
            message: 'Event deleted successfully',
        }

        rep.send(response)
    }

    join: RouteHandler<{
        Params: { eventId: string },
        Headers: { authorization: string }
    }> = async (req, rep) => {
        try {
            const eventId = req.params.eventId
            const user = req.user

            const event = await this.eventService.getEventById(eventId)
            if (!event) {
                rep.notFound('Event not found')
                return
            }

            const isJoined = await this.participateService.isJoined(eventId, user.sub)

            if (isJoined) {
                rep.conflict('User already joined this event')
                return
            }

            await this.participateService.joinEvent(eventId, user.sub)

            const response = {
                status: 200,
                message: 'User joined event successfully',
            }

            rep.send(response)
        } catch (error) {
            rep.internalServerError('Internal server error')
        }
    }

    leave: RouteHandler<{
        Params: { eventId: string },
        Headers: { authorization: string }
    }> = async (req, rep) => {
        const eventId = req.params.eventId
        const user = req.user

        const event = await this.eventService.getEventById(eventId)
        if (!event) {
            rep.notFound('Event not found')
            return
        }

        const isJoined = await this.participateService.isJoined(eventId, user.sub)
        if (!isJoined) {
            rep.conflict('User not joined this event')
            return
        }

        await this.participateService.leaveEvent(eventId, user.sub)
        const response = {
            status: 200,
            message: 'User leaved event successfully',
        }

        rep.send(response)
    }

    participants: RouteHandler<{
        Params: { eventId: string },
        Reply: FromSchema<typeof detail.response>
    }> = async (req, rep) => {
        const eventId = req.params.eventId

        const event = await this.eventService.getEventById(eventId)
        if (!event) {
            rep.notFound('Event not found')
            return
        }

        const participants = await this.participateService.getEventParticipants(eventId)

        const response = {
            status: 200,
            message: 'Participants retrieved successfully',
            data: participants
        }

        rep.send(response)
    }

    updateEventReceptionists: RouteHandler<{
        Params: { eventId: string },
        Body: { receptionList: string[] },
        Headers: { authorization: string }
    }> = async (req, rep) => {
        const eventId = req.params.eventId
        const user = req.user

        const event = await this.eventService.getEventById(eventId)
        if (!event) {
            rep.notFound('Event not found')
            return
        }

        if (event.createdById !== user.sub) {
            rep.forbidden('You are not authorized to update receptionists')
            return
        }

        const data = req.body

        await this.eventService.updateEventReceptionists(eventId, data.receptionList)

        const response = {
            status: 200,
            message: 'Receptionists updated successfully',
        }

        rep.send(response)
    }
}
