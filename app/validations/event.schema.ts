export const create = {
    body: {
        type: 'object',
        required: [
            'title',
            'description',
            'startDate',
            'endDate',
            'address',
            'latitude',
            'longitude',
            'fee'
        ],
        properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            address: { type: 'string' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            radius: { type: 'number' },
            photo: { type: 'string' },
            createdById: { type: 'string' },
            fee: { type: 'number' },
            receptionList: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        }
    },
    response: {
        default: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                error: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        startDate: { type: 'string' },
                        endDate: { type: 'string' },
                        address: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        radius: { type: 'number' },
                        photo: { type: 'string' },
                        createdById: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        deletedAt: { type: 'string' },
                        fee: { type: 'number' },
                        createdBy: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                                photoProfile: { type: 'string' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                                deletedAt: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    }
} as const

export const list = {
    response: {
        default: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                error: { type: 'string' },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            startDate: { type: 'string' },
                            endDate: { type: 'string' },
                            address: { type: 'string' },
                            latitude: { type: 'number' },
                            longitude: { type: 'number' },
                            radius: { type: 'number' },
                            photo: { type: 'string' },
                            createdById: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                            deletedAt: { type: 'string' },
                            fee: { type: 'number' },
                            createdBy: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    email: { type: 'string' },
                                    name: { type: 'string' },
                                    photoProfile: { type: 'string' },
                                    createdAt: { type: 'string' },
                                    updatedAt: { type: 'string' },
                                    deletedAt: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                meta: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' },
                        nextLink: { type: 'string' },
                        prevLink: { type: 'string' }
                    }
                }
            }
        }
    },
    queryString: {
        type: 'object',
        properties: {
            limit: { type: 'number' },
            page: { type: 'number' }
        }
    }
} as const

export const detail = {
    response: {
        default: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                error: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        startDate: { type: 'string' },
                        endDate: { type: 'string' },
                        address: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        radius: { type: 'number' },
                        photo: { type: 'string' },
                        createdById: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        deletedAt: { type: 'string' },
                        fee: { type: 'number' },
                        createdBy: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                                photoProfile: { type: 'string' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                                deletedAt: { type: 'string' }
                            }
                        },
                        receptionists: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    eventId: { type: 'string' },
                                    userId: { type: 'string' },
                                    createdAt: { type: 'string' },
                                    updatedAt: { type: 'string' },
                                    deletedAt: { type: 'string' },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            email: { type: 'string' },
                                            name: { type: 'string' },
                                            photoProfile: { type: 'string' },
                                            createdAt: { type: 'string' },
                                            updatedAt: { type: 'string' },
                                            deletedAt: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            }
        }
    }
} as const

export const update = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            address: { type: 'string' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            radius: { type: 'number' },
            photo: { type: 'string' },
            fee: { type: 'number' },
        }
    },
    response: {
        default: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                error: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        startDate: { type: 'string' },
                        endDate: { type: 'string' },
                        address: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        radius: { type: 'number' },
                        photo: { type: 'string' },
                        createdById: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        deletedAt: { type: 'string' },
                        fee: { type: 'number' },
                        createdBy: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                                photoProfile: { type: 'string' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                                deletedAt: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    }
} as const

export const remove = {
    params: {
        type: 'object',
        properties: {
            eventId: { type: 'string' }
        }
    },
    response: {
        default: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                error: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        startDate: { type: 'string' },
                        endDate: { type: 'string' },
                        address: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        radius: { type: 'number' },
                        photo: { type: 'string' },
                        createdById: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        deletedAt: { type: 'string' },
                        fee: { type: 'number' },
                        createdBy: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                                photoProfile: { type: 'string' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                                deletedAt: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    }
} as const

export const join = {
    params: {
        type: 'object',
        properties: {
            eventId: { type: 'string' }
        }
    },
    response: {
        default: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                error: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        startDate: { type: 'string' },
                        endDate: { type: 'string' },
                        address: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        radius: { type: 'number' },
                        photo: { type: 'string' },
                        createdById: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        deletedAt: { type: 'string' },
                        fee: { type: 'number' },
                        createdBy: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                                photoProfile: { type: 'string' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                                deletedAt: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    }
} as const

export const leave = {
    params: {
        type: 'object',
        properties: {
            eventId: { type: 'string' }
        }
    },
    response: {
        default: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                error: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        startDate: { type: 'string' },
                        endDate: { type: 'string' },
                        address: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        radius: { type: 'number' },
                        photo: { type: 'string' },
                        createdById: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        deletedAt: { type: 'string' },
                        fee: { type: 'number' },
                        createdBy: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                                photoProfile: { type: 'string' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                                deletedAt: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    }
} as const

export const participants = {
    params: {
        type: 'object',
        properties: {
            eventId: { type: 'string' }
        }
    },
    response: {
        default: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                error: { type: 'string' },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            eventId: { type: 'string' },
                            userId: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                            deletedAt: { type: 'string' },
                            user: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    email: { type: 'string' },
                                    name: { type: 'string' },
                                    photoProfile: { type: 'string' },
                                }
                            }
                        }
                    }
                }
            }
        }
    }
} as const

export const updateEventReceptionists = {
    params: {
        type: 'object',
        properties: {
            eventId: { type: 'string' }
        }
    },
    body: {
        type: 'object',
        properties: {
            receptionList: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        }
    },
    response: {
        default: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                error: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        startDate: { type: 'string' },
                        endDate: { type: 'string' },
                        address: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        radius: { type: 'number' },
                        photo: { type: 'string' },
                        createdById: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        deletedAt: { type: 'string' },
                        fee: { type: 'number' },
                        createdBy: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                email: { type: 'string' },
                                name: { type: 'string' },
                                photoProfile: { type: 'string' },
                            }
                        },
                        receptionists: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    eventId: { type: 'string' },
                                    userId: { type: 'string' },
                                    createdAt: { type: 'string' },
                                    updatedAt: { type: 'string' },
                                    deletedAt: { type: 'string' },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            email: { type: 'string' },
                                            name: { type: 'string' },
                                            photoProfile: { type: 'string' },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
} as const

export default { 
    create, 
    list, 
    detail, 
    update, 
    remove, 
    join, 
    leave, 
    participants, 
    updateEventReceptionists
} as const
