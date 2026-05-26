import { RequestHandler } from 'express';
import { CreatePizzaRequestBody } from '../../schemas/pizza';
import { createPizza as createPizzaService } from '../../services/pizza';

export const createPizza: RequestHandler = async (req, res) => {
    const { name, ingredients, prices, category, image }: CreatePizzaRequestBody = req.body;

    try {
        await createPizzaService(name, ingredients, prices, category, image ?? '');
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Database error' });
    }

    res.status(201).send({
        status: 'success',
        message: 'Pizza successfully created',
    });
};
