export const register = {
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
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
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        }
      }
    }
  }
} as const

export const login = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
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
            accessToken: { type: 'string' },
            sessionId: { type: 'string' }
          }
        }
      }
    }
  
  }
} as const

export const sessions = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          createdAt: { type: 'string' },
          expires: { type: 'string' }
        }
      }
    }
  }
} as const

export const verifyEmail = {
  querystring: {
    type: 'object',
    required: ['token'],
    properties: {
      token: { type: 'string' }
    }
  }
} as const

export const forgotPassword = {
  body: {
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string', format: 'email' }
    }
  }
} as const

export const resetPassword = {
  body: {
    type: 'object',
    required: ['password'],
    properties: {
      password: { type: 'string' }
    }
  },
  querystring: {
    type: 'object',
    required: ['token'],
    properties: {
      token: { type: 'string' }
    }
  }
} as const

export default {
  register,
  login,
  sessions,
  verifyEmail,
  forgotPassword,
  resetPassword
}
