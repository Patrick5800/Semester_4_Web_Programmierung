export const createTestcustomersOptions = {
  type: 'object',
  properties: {
    customers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: ['string', 'null'] },
          address: { type: ['string', 'null'] },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: ['string', 'null'], format: 'date-time' }
        },
        required: ['name', 'email']
      }
    }
  },
  required: ['customers']
};

export const offerSchema = {
  type: 'object',
  properties: {
    offers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          customer_id: { type: 'integer' },
          price: { type: ['number', 'null'] },
          currency: { type: ['string', 'null'] },
          status: { type: 'string', enum: ['Draft', 'In Progress', 'Active', 'On Ice'] },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: ['string', 'null'], format: 'date-time' }
        },
        required: ['title', 'customer_id']
      }
    }
  },
  required: ['offers']
};

export const createTestOfferOptions = {
  type: 'object',
  properties: {
    customers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: ['string', 'null'] },
          address: { type: ['string', 'null'] },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: ['string', 'null'], format: 'date-time' }
        },
        required: ['name', 'email']
      }
    },
    offers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          customer_id: { type: 'integer' },
          price: { type: ['number', 'null'] },
          currency: { type: ['string', 'null'] },
          status: { type: 'string', enum: ['Draft', 'In Progress', 'Active', 'On Ice'] },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: ['string', 'null'], format: 'date-time' }
        },
        required: ['title', 'description', 'customer_id']
      }
    }
  },
  required: ['customers', 'offers']
};