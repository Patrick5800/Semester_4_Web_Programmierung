const customerSchema =
{
    $id: "customerSchema",
    type: "object",
    properties: 
    {
        customer_id: {type: "integer"},
        name: {type: "string"},
        email: {type: "string"},
    },
};

const offerSchema =
 {
    $id: "offerSchema",
    type: "object",
    properties:
    {
        offer_id: {type: "integer"},
        customer_id: {type: "integer"}, // jedes angebot hat einen kunden
        title: {type: "string"},
    }
 }

 const createCustomerOptions = 
 {
    schema: 
    {
        body: 
        {
            type: "object",
            properties: 
            {
                name: {type: "string"},
                email: {type: "string"},
            },
            required: ["name", "email"],
        },
        response: 
        {
            200: 
            {
                type: "object",
                properties:
                {
                    customer : {$ref: "customerSchema"},
                },
            },
        },
    },
 };

 const createOfferOptions =
 {
    schema: 
    {
        body: 
        {
            type: "object",
            properties: 
            {
                customer_id: {type: "integer"},
                title: {type: "string"},
            },
            required: ["customer_id", "title"],
        },
        response: 
        {
            200: 
            {
                type: "object",
                properties:
                {
                    offer : {$ref: "offerSchema"},
                },
            },
        },
    },
 };

 const getCustomersOptions =
 {
    schema: 
    {
        response: 
        {
            200: 
            {
                type: "array",
                items: {$ref: "customerSchema"},
            },
        },
    },
 };

 const getOffersOptions =
 {
    schema: 
    {
        response: 
        {
            200: 
            {
                type: "array",
                items: {$ref: "offerSchema"},
            },
        },
    },
 };

 export {
    customerSchema,
    offerSchema,
    createCustomerOptions,
    createOfferOptions,
    getCustomersOptions,
    getOffersOptions,
 }