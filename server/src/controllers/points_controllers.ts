import knex from '../database/connection';
import { Response, Request } from 'express';

class PointsControllers {
    static async create(request: Request, response: Response): Promise<Response> {
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;

        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude: Number(latitude),
            longitude: Number(longitude),
            city,
            uf,
        };

        const [point_id] = await trx('points').insert(point);

        const pointsItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                };
            });

        await trx('points_items').insert(pointsItems);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point,
        });
    }

    static async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const point = await knex('points').where({ id }).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id);

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.0.107:3333/uploads/${point.image}`,
        };

        return response.json({ point: serializedPoint, items });
    }

    static async index(request: Request, response: Response): Promise<Response> {
        const { city, uf, items } = request.query;
        console.log({ city, uf, items });

        const parsedItems = String(items)
            .split(',')
            .map((item) => Number(item.trim()));

        const query = knex('points').join('points_items', 'points_items.point_id', '=', 'points.id');

        if (items) query.whereIn('points_items.item_id', parsedItems);
        if (uf) query.where('uf', String(uf));
        if (city) query.where('city', String(city));
        query.distinct().select('points.*');

        const points = await query;

        const serializedPoints = points.map((point) => ({
            ...point,
            image_url: `http://192.168.0.107:3333/uploads/${point.image}`,
        }));

        return response.json(serializedPoints);
    }
}

export default PointsControllers;
