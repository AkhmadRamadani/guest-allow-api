import { Prisma, PrismaClient } from '@prisma/client'

export class EventService {
    constructor(
        private event: PrismaClient['event'],
        private user: PrismaClient['user'],
        private attendee: PrismaClient['eventAttendees'],
        private receptionist: PrismaClient['receptionist']
    ) { }

    getEventById = (
        eventId: string,
        opts: Omit<Prisma.EventFindUniqueArgs, 'where'> = {}
    ) => this.event.findUnique({ where: { id: eventId }, ...opts })

    updateEventById = (
        eventId: string,
        opts: Omit<Prisma.EventUpdateArgs, 'where'>
    ) => this.event.update({ where: { id: eventId }, ...opts })

    queryEvents = (args?: Prisma.EventFindManyArgs) => this.event.findMany(args)

    eventTotal = (args?: Prisma.EventCountArgs) => this.event.count(args)

    createEvent = async (data: Prisma.EventCreateArgs['data'], receptionList: string[]) => {
        try {
            const event = await this.event.create({ data })
            if (receptionList) {
                let receptionData = receptionList.map((reception) => {
                    return {
                        eventId: event.id,
                        userId: reception as string
                    }
                })

                await this.receptionist.createMany({ data: receptionData })
            }

            return event
        } catch (error) {
            console.error(error)
        }
    }

    deleteEventById = (eventId: string) => this.event.update({
        where: { id: eventId },
        data: { deletedAt: new Date() }
    })

    updateEventReceptionists = async (eventId: string, receptionList: string[]) => {
        try {
            await this.receptionist.deleteMany({ where: { eventId } })
            let receptionData = receptionList.map((reception) => {
                return {
                    eventId,
                    userId: reception as string
                }
            })

            await this.receptionist.createMany({ data: receptionData })
        } catch (error) {
            console.error(error)
        }
    }

}

export default EventService