import express from 'express';
import path from 'path';
import ItemsControllers from './controllers/items_controllers';
import PointsControllers from './controllers/points_controllers';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/items', ItemsControllers.index);

routes.post(
    '/points',
    upload.single('image'),
    celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.number().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().max(2),
                items: Joi.string().required(),
            }),
        },
        { abortEarly: false },
    ),
    PointsControllers.create,
);
routes.get('/points/:id', PointsControllers.show);
routes.get('/points', PointsControllers.index);

// Static files
routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

export default routes;
