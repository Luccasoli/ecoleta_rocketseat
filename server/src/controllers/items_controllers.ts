import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsControllers {
    static async index(request: Request, response: Response): Promise<Response> {
        const items = await knex('items').select('*');

        const serializedItems = items.map(({ image, id, title }) => ({
            id,
            title,
            image_url: `http://localhost:3333/uploads/${image}`,
        }));

        return response.json(serializedItems);
    }
}

export default ItemsControllers;
