import {
    createCustomerOptions,
    getCustomersOptions,
    getCustomerByIdOptions,
    updateCustomerOptions,
    deleteCustomerOptions,
} from "../schemas/customerSchemas.js";

import {
    createOfferOptions,
    getOffersOptions,
    getOfferByIdOptions,
    updateOfferOptions,
    deleteOfferOptions,
    changeOfferStatusOptions,
    legacyOfferOptions,
} from "../schemas/offerSchemas.js";

import {
    createCommentOptions,
    getCommentsByOfferIdOptions,
    getCommentByIdOptions,
    updateCommentOptions,
    deleteCommentOptions,
} from "../schemas/commentSchemas.js";

import {
    createFileOptions,
    getFilesByOfferIdOptions,
    getFileByIdOptions,
    deleteFileOptions,
} from "../schemas/fileSchemas.js";

import {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
    changeOfferStatus,
    getCommentsByOfferId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    createFile,
    getFilesByOfferId,
    getFileById,
    deleteFile,
    createLegacyOffer,
    createTestCustomer,
    createTestOffer,
} from "../core/core.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Import tags, tasks, files

/*
In customerRoutes sind folgende Routen definiert:
- Get all customers
- Create a customer
*/

export async function customerRoutes(fastify, options)
{
    fastify.get("/all", getCustomersOptions, async (request, reply) =>
    {
        const customers = getCustomers(fastify);
        if (!customers)
        {
            reply.code(404);
            return {error: "No customers found"};
        }
        return customers;
    });
    fastify.post("/create", createCustomerOptions, async (request, reply) =>
    {
        const customerProperties = request.body;
        const customer = createCustomer(fastify, customerProperties);
        if (!customer)
        {
            reply.code(500);
            return {error: "Could not create customer"};
        }
        reply.code(201);
        return {customer: customer};
    })
    fastify.get("/:customer_id", getCustomerByIdOptions, async (request, reply) => 
    {
        const customer_id = request.params.customer_id;
        const customer = getCustomerById(fastify, customer_id);
        if (!customer)
        {
            reply.code(404);
            return {error: "Customer not found"};
        }
        return {customer: customer};
    });
    fastify.post("/:customer_id/update", updateCustomerOptions, async (request, reply) =>
    {
        const customer_id = request.params.customer_id;
        const customerProperties = request.body;
        const customer = updateCustomer(fastify, customer_id, customerProperties);
        if (!customer)
        {
            reply.code(500);
            return {error: "Could not update customer"};
        }
        return {customer: customer};
    });
    fastify.delete("/:customer_id/delete", deleteCustomerOptions, async (request, reply) =>
    {
        const customer_id = request.params.customer_id;
        const success = deleteCustomer(fastify, customer_id);
        if (!success)
        {
            reply.code(500);
            return {error: "Could not delete customer"};
        }
        return {message: "Customer deleted"};
    });
}

/*
In offferRoutes sind folgende Routen definiert:
- Get all offers
- Create an offer
*/

export async function offerRoutes(fastify, options)
{
    fastify.get("/all", getOffersOptions, async (request, reply) =>
    {
        const offers = getOffers(fastify);
        if (!offers)
        {
            reply.code(404);
            return {error: "No offers found"};
        }
        return offers;
    });

    fastify.post("/create", createOfferOptions, async (request, reply) =>
    {
        const offerProperties = request.body;
        const offer = createOffer(fastify, offerProperties);
        if (!offer)
        {
            reply.code(500);
            return {error: "Could not create offer"};
        }
        reply.code(201);
        return {offer: offer};
    });
    fastify.get("/:offer_id/offer", getOfferByIdOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const offer = getOfferById(fastify, offer_id);
        if (!offer)
        {
            reply.code(404);
            return {error: "Offer not found"};
        }
        return {offer: offer};
    });
    fastify.post("/:offer_id/update", updateOfferOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const offerProperties = request.body;
        const offer = updateOffer(fastify, offer_id, offerProperties);
        if (!offer)
        {
            reply.code(500);
            return {error: "Could not update offer"};
        }
        return {offer: offer};
    });
    fastify.delete("/:offer_id/delete", deleteOfferOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const offer = getOfferById(fastify, offer_id);
        if (!offer) {
            reply.code(404);
            return { error: "Offer not found" };
        }
        if (offer.status !== "Draft" && offer.status !== "On Ice") {
            reply.code(400);
            return { error: "Offer can only be deleted in Draft or On Ice status" };
        }
        const success = deleteOffer(fastify, offer_id);
        if (!success)
        {
            reply.code(500);
            return {error: "Could not delete offer"};
        }
        return {message: "Offer deleted"};
    });
    fastify.patch("/:offer_id/status", changeOfferStatusOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const status = request.body.status;
        const offer = changeOfferStatus(fastify, offer_id, status);
        if (!offer)
        {
            reply.code(500);
            return {error: "Could not change status"};
        }
        return {offer: offer};
    });

    fastify.post("/legacy/create", legacyOfferOptions, async (request, reply) => {
        const legacyData = request.body;

       const offer = createLegacyOffer(fastify, legacyData);

        if (!offer) {
            reply.code(500);
            return { error: "Could not create offer and comments from legacy data" };
        }

        // Create comments from hints
        const hints = legacyData.xOffer.hints;
        for (const hint of hints) {
            const commentProperties = {
                offer_id: offer.offer_id,
                comment_text: hint,
            };
            const comment = createComment(fastify, commentProperties);
            if (!comment) {
                reply.code(500);
                return { error: "Could not create comment from hint" };
            }
        }

        reply.code(201).send({ offer: offer });
    });
}

export async function commentRoutes(fastify, options)
{
    fastify.get("/:offer_id/comment", getCommentsByOfferIdOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const comments = getCommentsByOfferId(fastify, offer_id);
        if (!comments)
        {
            reply.code(404);
            return {error: "No comments found"};
        }
        return comments;
    });
    fastify.post("/create", createCommentOptions, async (request, reply) =>
    {
        const commentProperties = request.body;
        const offer = getOfferById(fastify, commentProperties.offer_id);
        if (!offer) {
            reply.code(404);
            return { error: "Offer not found" };
        }
        if (offer.status === "Draft") {
            reply.code(400);
            return { error: "Cannot add comments to an offer in Draft status" };
        }
        const comment = createComment(fastify, commentProperties);
        if (!comment)
        {
            reply.code(500);
            return {error: "Could not create comment"};
        }
        reply.code(201);
        return {comment: comment};
    });
    fastify.get("/:comment_id", getCommentByIdOptions, async (request, reply) =>
    {
        const comment_id = request.params.comment_id;
        const comment = getCommentById(fastify, comment_id);
        if (!comment)
        {
            reply.code(404);
            return {error: "Comment not found"};
        }
        return {comment: comment};
    });
    fastify.post("/:comment_id/update", updateCommentOptions, async (request, reply) =>
    {
        const comment_id = request.params.comment_id;
        const commentProperties = request.body;
        const comment = updateComment(fastify, comment_id, commentProperties);
        if (!comment)
        {
            reply.code(500);
            return {error: "Could not update comment"};
        }
        return {comment: comment};
    });
    fastify.delete("/:comment_id/delete", deleteCommentOptions, async (request, reply) => //TODO: Implement deleteComment bruno error
    {
        const comment_id = request.params.comment_id;
        const success = deleteComment(fastify, comment_id);
        if (!success)
        {
            reply.code(500);
            return {error: "Could not delete comment"};
        }
        return {message: "Comment deleted"};
    });
}

//createFile
//getFilesByOfferId
//getFileById

export async function fileRoutes(fastify, options) {
    fastify.post('/upload/:offer_id', createFileOptions, async (request, reply) => {
        const offer_id = parseInt(request.params.offer_id, 10); // Ensure offer_id is an integer
        const data = await request.file();

        if (!offer_id) {
            return reply.status(400).send({ error: 'offer_id is required' });
        }

        if (data.mimetype !== 'text/plain') {
            return reply.status(400).send({ error: 'Only .txt files are supported' });
        }

        // Create a placeholder fileInfo object
        const fileInfo = {
            offer_id: offer_id,
            file_name: data.filename,
            file_path: '' // Placeholder, will be updated after file creation
        };

        // Save fileInfo to your database to get the file_id
        const createdFile = createFile(fastify, fileInfo);

        if (!createdFile) {
            return reply.status(500).send({ error: 'Could not save file information' });
        }

        // Use the file_id to create the file path
        const filePath = path.join(__dirname, '../../assets', `${createdFile.file_id}.txt`);
        try {
            await fs.writeFile(filePath, await data.toBuffer());
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Could not save file to disk' });
        }

        // Update file_path in the database
        const updateStatement = fastify.db.prepare("UPDATE files SET file_path = ? WHERE file_id = ?");
        updateStatement.run(filePath, createdFile.file_id);

        // Update the createdFile object with the correct file_path
        createdFile.file_path = filePath;

        reply.code(201).send({file: createdFile});
    });

    fastify.get('/:offer_id', getFilesByOfferIdOptions, async (request, reply) => {
        const offer_id = parseInt(request.params.offer_id, 10); // Ensure offer_id is an integer

        // Fetch file information from your database based on offer_id
        const files = getFilesByOfferId(fastify, offer_id);

        if (!files) {
            return reply.status(404).send({ error: 'No files found for this offer' });
        }

        reply.send(files);
    });

    fastify.get('/:file_id/content', getFileByIdOptions, async (request, reply) => {
        const file_id = parseInt(request.params.file_id, 10); // Ensure file_id is an integer
        const filePath = path.join(__dirname, '../../assets', `${file_id}.txt`);

        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            reply.type('text/plain').send(fileContent);
        } catch (error) {
            reply.status(404).send({ error: 'File content not found' });
        }
    });

    fastify.get('/:file_id/file', getFileByIdOptions, async (request, reply) => {
        const file_id = parseInt(request.params.file_id, 10); // Ensure file_id is an integer
        const file = getFileById(fastify, file_id);
        if (!file) {
            return reply.status(404).send({ error: 'File not found' });
        }
        reply.send({file: file});
    });
    fastify.delete('/:file_id/delete', deleteFileOptions, async (request, reply) => {
        const file_id = parseInt(request.params.file_id, 10); // Ensure file_id is an integer
        const file = getFileById(fastify, file_id);
        if (!file) {
            return reply.status(404).send({ error: 'File not found' });
        }
        const filePath = path.join(__dirname, '../../assets', `${file_id}.txt`);

        try {
            await fs.unlink(filePath);
            deleteFile(fastify, file_id);
            reply.send({message: 'File deleted'});
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Could not delete file' });
        }
    });
}

import { createTestcustomersOptions, createTestOfferOptions } from '../schemas/testSchemas.js';

export function testRoutes(fastify, options) {
    fastify.post("/customers", createTestcustomersOptions, async (request, reply) => {
        const { customers } = request.body;

        const createdCustomers = [];
        for (const customer of customers) {
            try {
                const createdCustomer = await createTestCustomer(fastify, customer);
                if (!createdCustomer) {
                    return reply.status(500).send({ error: "Could not create test customer" });
                }
                createdCustomers.push(createdCustomer);
            } catch (error) {
                return reply.status(500).send({ error: "Could not create test customer" });
            }
        }

        reply.code(201).send({ customers: createdCustomers });
    });

    fastify.post("/offers", createTestOfferOptions , async (request, reply) => {
        const { customers, offers } = request.body;

        const createdCustomers = [];
        for (const customer of customers) {
            try {
                const createdCustomer = await createTestCustomer(fastify, customer);
                if (!createdCustomer) {
                    return reply.status(500).send({ error: "Could not create test customer" });
                }
                createdCustomers.push(createdCustomer);
            } catch (error) {
                return reply.status(500).send({ error: "Could not create test customer" });
            }
        }

        const createdOffers = [];
        for (const offer of offers) {
            try {
                const createdOffer = await createTestOffer(fastify, offer);
                if (!createdOffer) {
                    return reply.status(500).send({ error: "Could not create offer" });
                }
                createdOffers.push(createdOffer);
            } catch (error) {
                return reply.status(500).send({ error: "Could not create offer" });
            }
        }

        reply.code(201).send({ customers: createdCustomers, offers: createdOffers });
    });
}

export async function tagRoutes(fastify, options)
{}

export async function taskRoutes(fastify, options)
{}