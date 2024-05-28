import { PrismaClient } from "@prisma/client";

export class ParticipateService {
    constructor(
        private event: PrismaClient['event'],
        private user: PrismaClient['user'],
        private participate: PrismaClient['eventAttendees']
    ) { }
    isJoined = async (eventId: string, userId: string) => {
        const data = await this.participate.findFirst({
            where: {
                eventId,
                userId
            }
        })

       return !!data
    }

    joinEvent = async (eventId: string, userId: string) => {
        try {
            await this.participate.create({
                data: {
                    eventId,
                    userId
                }
            })
        } catch (error) {
            return error
        }
    }

    leaveEvent = async (eventId: string, userId: string) => {
        try {
            await this.participate.delete({
                where: {
                    eventId_userId: {
                        eventId,
                        userId
                    }
                },
            })
        } catch (error) {
            console.error(error)
        }
    }

    getEventParticipants = async (eventId: string) => {
        return await this.participate.findMany({
            where: {
                eventId
            },
            select: {
                user: true
            }
        })
    }

}